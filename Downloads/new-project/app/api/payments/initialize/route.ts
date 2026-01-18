import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sql } from "@/lib/db";
import {
  initializePaystackTransaction,
  generatePaystackReference,
} from "@/lib/paystack";

export async function POST(request: NextRequest) {
  try {
    // Get the session token from cookies
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, error: "Unauthorized - Please log in" },
        { status: 401 }
      );
    }

    // Verify the session and get user
    const sessions = await sql`
      SELECT s.user_id, u.email, u.full_name
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.token = ${sessionToken}
        AND s.expires_at > NOW()
    `;

    if (sessions.length === 0) {
      return NextResponse.json(
        { success: false, error: "Session expired - Please log in again" },
        { status: 401 }
      );
    }

    const user = sessions[0];
    const body = await request.json();
    const { amount } = body;

    // Validate amount
    if (!amount || typeof amount !== "number" || amount < 1) {
      return NextResponse.json(
        { success: false, error: "Invalid amount - minimum is GH₵1" },
        { status: 400 }
      );
    }

    if (amount > 10000) {
      return NextResponse.json(
        { success: false, error: "Maximum amount is GH₵10,000" },
        { status: 400 }
      );
    }

    // Generate unique reference
    const reference = generatePaystackReference();

    // Convert to pesewas (Paystack uses smallest currency unit)
    const amountInPesewas = Math.round(amount * 100);

    // Get the callback URL
    const baseUrl = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "";
    const callbackUrl = `${baseUrl}/dashboard?payment=callback&reference=${reference}`;

    // Create pending transaction in database
    await sql`
      INSERT INTO transactions (
        user_id, type, amount, status, description, reference, metadata
      ) VALUES (
        ${user.user_id},
        'deposit',
        ${amount},
        'pending',
        'Wallet funding via Paystack',
        ${reference},
        ${JSON.stringify({
          payment_method: "paystack",
          initiated_at: new Date().toISOString(),
        })}
      )
    `;

    // Initialize Paystack transaction
    const result = await initializePaystackTransaction(
      user.email,
      amountInPesewas,
      reference,
      {
        user_id: user.user_id,
        user_name: user.full_name,
        transaction_type: "wallet_funding",
      },
      callbackUrl
    );

    if (!result.success) {
      // Update transaction status to failed
      await sql`
        UPDATE transactions
        SET status = 'failed',
            metadata = metadata || ${JSON.stringify({ error: result.error })}::jsonb
        WHERE reference = ${reference}
      `;

      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    // Update transaction with Paystack access code
    await sql`
      UPDATE transactions
      SET metadata = metadata || ${JSON.stringify({
        paystack_access_code: result.data?.access_code,
      })}::jsonb
      WHERE reference = ${reference}
    `;

    return NextResponse.json({
      success: true,
      data: {
        authorization_url: result.data?.authorization_url,
        access_code: result.data?.access_code,
        reference: result.data?.reference,
      },
    });
  } catch (error) {
    console.error("Payment initialization error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to initialize payment" },
      { status: 500 }
    );
  }
}
