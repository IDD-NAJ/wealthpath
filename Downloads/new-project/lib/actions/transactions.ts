"use server";

import { sql } from "@/lib/db";
import { getCurrentUser, updateWalletBalance } from "./auth";

export interface Transaction {
  id: string;
  user_id: string;
  type: "deposit" | "airtime" | "data";
  amount: number;
  status: "pending" | "success" | "failed";
  reference: string;
  description: string | null;
  network: string | null;
  phone_number: string | null;
  data_plan: string | null;
  payment_method: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  // Paystack-specific fields
  paystack_reference: string | null;
  paystack_access_code: string | null;
  payment_channel: string | null;
  currency: string | null;
  fees: number | null;
  paid_at: string | null;
}

export interface TransactionResult {
  success: boolean;
  error?: string;
  transaction?: Transaction;
  newBalance?: number;
}

function generateReference(prefix: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export async function fundWallet(
  amount: number,
  paymentMethod: string
): Promise<TransactionResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    const reference = generateReference("DEP");

    // Create transaction record
    const result = await sql`
      INSERT INTO transactions (user_id, type, amount, status, reference, description, payment_method)
      VALUES (${user.id}, 'deposit', ${amount}, 'success', ${reference}, ${"Wallet funding via " + paymentMethod}, ${paymentMethod})
      RETURNING *
    `;

    // Update wallet balance
    const walletResult = await updateWalletBalance(user.id, amount, "add");
    
    if (!walletResult.success) {
      // Mark transaction as failed
      await sql`UPDATE transactions SET status = 'failed' WHERE reference = ${reference}`;
      return { success: false, error: walletResult.error };
    }

    return {
      success: true,
      transaction: result[0] as Transaction,
      newBalance: walletResult.newBalance,
    };
  } catch (error) {
    console.error("Fund wallet error:", error);
    return { success: false, error: "Failed to fund wallet. Please try again." };
  }
}

export async function purchaseAirtime(
  amount: number,
  phoneNumber: string,
  network: string
): Promise<TransactionResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    // Check wallet balance
    if (Number(user.wallet_balance) < amount) {
      return { success: false, error: "Insufficient wallet balance" };
    }

    const reference = generateReference("AIR");

    // Create transaction record
    const result = await sql`
      INSERT INTO transactions (user_id, type, amount, status, reference, description, network, phone_number)
      VALUES (${user.id}, 'airtime', ${amount}, 'success', ${reference}, ${`${network} Airtime - ₦${amount.toLocaleString()}`}, ${network}, ${phoneNumber})
      RETURNING *
    `;

    // Deduct from wallet
    const walletResult = await updateWalletBalance(user.id, amount, "subtract");
    
    if (!walletResult.success) {
      await sql`UPDATE transactions SET status = 'failed' WHERE reference = ${reference}`;
      return { success: false, error: walletResult.error };
    }

    return {
      success: true,
      transaction: result[0] as Transaction,
      newBalance: walletResult.newBalance,
    };
  } catch (error) {
    console.error("Purchase airtime error:", error);
    return { success: false, error: "Failed to purchase airtime. Please try again." };
  }
}

export async function purchaseData(
  amount: number,
  phoneNumber: string,
  network: string,
  dataPlan: string
): Promise<TransactionResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    // Check wallet balance
    if (Number(user.wallet_balance) < amount) {
      return { success: false, error: "Insufficient wallet balance" };
    }

    const reference = generateReference("DAT");

    // Create transaction record
    const result = await sql`
      INSERT INTO transactions (user_id, type, amount, status, reference, description, network, phone_number, data_plan)
      VALUES (${user.id}, 'data', ${amount}, 'success', ${reference}, ${`${network} Data - ${dataPlan}`}, ${network}, ${phoneNumber}, ${dataPlan})
      RETURNING *
    `;

    // Deduct from wallet
    const walletResult = await updateWalletBalance(user.id, amount, "subtract");
    
    if (!walletResult.success) {
      await sql`UPDATE transactions SET status = 'failed' WHERE reference = ${reference}`;
      return { success: false, error: walletResult.error };
    }

    return {
      success: true,
      transaction: result[0] as Transaction,
      newBalance: walletResult.newBalance,
    };
  } catch (error) {
    console.error("Purchase data error:", error);
    return { success: false, error: "Failed to purchase data. Please try again." };
  }
}

export async function getTransactions(
  type?: "deposit" | "airtime" | "data",
  limit = 50
): Promise<Transaction[]> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return [];
    }

    let result;
    if (type) {
      result = await sql`
        SELECT * FROM transactions 
        WHERE user_id = ${user.id} AND type = ${type}
        ORDER BY created_at DESC
        LIMIT ${limit}
      `;
    } else {
      result = await sql`
        SELECT * FROM transactions 
        WHERE user_id = ${user.id}
        ORDER BY created_at DESC
        LIMIT ${limit}
      `;
    }

    return result as Transaction[];
  } catch (error) {
    console.error("Get transactions error:", error);
    return [];
  }
}

export async function getTransactionByReference(
  reference: string
): Promise<Transaction | null> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return null;
    }

    const result = await sql`
      SELECT * FROM transactions 
      WHERE user_id = ${user.id} AND reference = ${reference}
    `;

    if (result.length === 0) {
      return null;
    }

    return result[0] as Transaction;
  } catch (error) {
    console.error("Get transaction error:", error);
    return null;
  }
}
