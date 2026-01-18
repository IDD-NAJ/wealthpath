import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sql } from "@/lib/db";
import { verifyPaystackTransaction } from "@/lib/paystack";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.json(
        { success: false, error: "Reference is required" },
        { status: 400 }
      );
    }

    // Get the session token from cookies
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, error: "Unauthorized - Please log in" },
        { status: 401 }
      );
    }

    // Verify the session
    const sessions = await sql`
      SELECT s.user_id
      FROM sessions s
      WHERE s.token = ${sessionToken}
        AND s.expires_at > NOW()
    `;

    if (sessions.length === 0) {
      return NextResponse.json(
        { success: false, error: "Session expired" },
        { status: 401 }
      );
    }

    const userId = sessions[0].user_id;

    // Check if transaction exists and belongs to user
    const existingTx = await sql`
      SELECT id, status, amount, user_id
      FROM transactions
      WHERE reference = ${reference}
    `;

    if (existingTx.length === 0) {
      return NextResponse.json(
        { success: false, error: "Transaction not found" },
        { status: 404 }
      );
    }

    const transaction = existingTx[0];

    // Verify ownership
    if (transaction.user_id !== userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    // If already processed successfully, return current status
    if (transaction.status === "success") {
      return NextResponse.json({
        success: true,
        data: {
          status: "success",
          amount: transaction.amount,
          reference,
          message: "Payment already verified and credited",
        },
      });
    }

    // Verify with Paystack
    const verifyResult = await verifyPaystackTransaction(reference);

    if (!verifyResult.success) {
      return NextResponse.json(
        { success: false, error: verifyResult.error },
        { status: 400 }
      );
    }

    const paystackData = verifyResult.data!;
    const paystackStatus = paystackData.status;

    if (paystackStatus === "success") {
      // Verify amount matches (convert from pesewas to GHS)
      const paidAmount = paystackData.amount / 100;
      
      if (paidAmount !== transaction.amount) {
        // Log the discrepancy but still credit the actual paid amount
        console.warn(
          `Amount mismatch for ${reference}: expected ${transaction.amount}, got ${paidAmount}`
        );
      }

      // Update transaction and credit wallet in a single operation
      await sql`
        WITH updated_tx AS (
          UPDATE transactions
          SET status = 'success',
              metadata = metadata || ${JSON.stringify({
                verified_at: new Date().toISOString(),
                paystack_id: paystackData.id,
                paid_at: paystackData.paid_at,
                channel: paystackData.channel,
                gateway_response: paystackData.gateway_response,
                customer_email: paystackData.customer.email,
              })}::jsonb
          WHERE reference = ${reference}
            AND status != 'success'
          RETURNING user_id, amount
        )
        UPDATE users
        SET wallet_balance = wallet_balance + (SELECT amount FROM updated_tx)
        WHERE id = (SELECT user_id FROM updated_tx)
      `;

      // Get updated balance
      const userResult = await sql`
        SELECT wallet_balance FROM users WHERE id = ${userId}
      `;

      return NextResponse.json({
        success: true,
        data: {
          status: "success",
          amount: paidAmount,
          reference,
          message: "Payment verified and wallet credited",
          newBalance: userResult[0]?.wallet_balance || 0,
        },
      });
    } else if (paystackStatus === "failed" || paystackStatus === "abandoned") {
      // Update transaction status
      await sql`
        UPDATE transactions
        SET status = 'failed',
            metadata = metadata || ${JSON.stringify({
              verified_at: new Date().toISOString(),
              paystack_status: paystackStatus,
              gateway_response: paystackData.gateway_response,
            })}::jsonb
        WHERE reference = ${reference}
      `;

      return NextResponse.json({
        success: false,
        data: {
          status: paystackStatus,
          reference,
          message: paystackData.gateway_response || "Payment was not successful",
        },
      });
    } else {
      // Payment is still pending
      return NextResponse.json({
        success: true,
        data: {
          status: "pending",
          reference,
          message: "Payment is still being processed",
        },
      });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
