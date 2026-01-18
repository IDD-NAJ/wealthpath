import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { validatePaystackWebhook, type PaystackWebhookEvent } from "@/lib/paystack";

export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get("x-paystack-signature");

    if (!signature) {
      console.error("Webhook: Missing signature");
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    // Validate the webhook signature
    const isValid = validatePaystackWebhook(body, signature);

    if (!isValid) {
      console.error("Webhook: Invalid signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    const event: PaystackWebhookEvent = JSON.parse(body);
    console.log(`Webhook received: ${event.event}`);

    // Handle different event types
    switch (event.event) {
      case "charge.success":
        await handleChargeSuccess(event.data);
        break;

      case "charge.failed":
        await handleChargeFailed(event.data);
        break;

      case "transfer.success":
        await handleTransferSuccess(event.data);
        break;

      case "transfer.failed":
        await handleTransferFailed(event.data);
        break;

      default:
        console.log(`Unhandled webhook event: ${event.event}`);
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    // Still return 200 to prevent retries for parsing errors
    return NextResponse.json({ received: true, error: "Processing error" });
  }
}

async function handleChargeSuccess(data: PaystackWebhookEvent["data"]) {
  const reference = data.reference;
  const amount = data.amount / 100; // Convert from pesewas to GHS

  console.log(`Processing successful charge: ${reference}, amount: ${amount}`);

  try {
    // Check if transaction exists
    const existingTx = await sql`
      SELECT id, status, user_id, amount
      FROM transactions
      WHERE reference = ${reference}
    `;

    if (existingTx.length === 0) {
      // Transaction not found - might be from a different source
      // Create a new transaction record if we have user info in metadata
      const userId = data.metadata?.user_id;
      
      if (userId) {
        await sql`
          INSERT INTO transactions (
            user_id, type, amount, status, description, reference, metadata
          ) VALUES (
            ${userId},
            'deposit',
            ${amount},
            'success',
            'Wallet funding via Paystack (webhook)',
            ${reference},
            ${JSON.stringify({
              source: "webhook",
              paystack_id: data.id,
              paid_at: data.paid_at,
              channel: data.channel,
              gateway_response: data.gateway_response,
              customer_email: data.customer.email,
            })}
          )
        `;

        // Credit user wallet
        await sql`
          UPDATE users
          SET wallet_balance = wallet_balance + ${amount}
          WHERE id = ${userId}
        `;

        console.log(`Created new transaction and credited wallet for user ${userId}`);
      }
      return;
    }

    const transaction = existingTx[0];

    // If already processed, skip
    if (transaction.status === "success") {
      console.log(`Transaction ${reference} already processed`);
      return;
    }

    // Update transaction and credit wallet
    await sql`
      WITH updated_tx AS (
        UPDATE transactions
        SET status = 'success',
            metadata = COALESCE(metadata, '{}'::jsonb) || ${JSON.stringify({
              webhook_processed_at: new Date().toISOString(),
              paystack_id: data.id,
              paid_at: data.paid_at,
              channel: data.channel,
              gateway_response: data.gateway_response,
              customer_email: data.customer.email,
            })}::jsonb
        WHERE reference = ${reference}
          AND status != 'success'
        RETURNING user_id, amount
      )
      UPDATE users
      SET wallet_balance = wallet_balance + (SELECT amount FROM updated_tx)
      WHERE id = (SELECT user_id FROM updated_tx)
    `;

    console.log(`Successfully processed charge for transaction ${reference}`);
  } catch (error) {
    console.error(`Error processing charge success for ${reference}:`, error);
    throw error;
  }
}

async function handleChargeFailed(data: PaystackWebhookEvent["data"]) {
  const reference = data.reference;

  console.log(`Processing failed charge: ${reference}`);

  try {
    await sql`
      UPDATE transactions
      SET status = 'failed',
          metadata = COALESCE(metadata, '{}'::jsonb) || ${JSON.stringify({
            webhook_processed_at: new Date().toISOString(),
            failure_reason: data.gateway_response,
            paystack_status: data.status,
          })}::jsonb
      WHERE reference = ${reference}
        AND status = 'pending'
    `;

    console.log(`Marked transaction ${reference} as failed`);
  } catch (error) {
    console.error(`Error processing charge failure for ${reference}:`, error);
    throw error;
  }
}

async function handleTransferSuccess(data: PaystackWebhookEvent["data"]) {
  // Handle successful transfers (for future withdrawal feature)
  console.log(`Transfer success: ${data.reference}`);
}

async function handleTransferFailed(data: PaystackWebhookEvent["data"]) {
  // Handle failed transfers (for future withdrawal feature)
  console.log(`Transfer failed: ${data.reference}`);
}
