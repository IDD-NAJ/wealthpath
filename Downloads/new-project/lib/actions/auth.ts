"use server";

import { sql } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export interface User {
  id: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  wallet_balance: number;
  is_verified: boolean;
  created_at: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: User;
}

export async function register(formData: {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<AuthResult> {
  try {
    const { email, phone, password, firstName, lastName } = formData;

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email} OR phone = ${phone}
    `;

    if (existingUser.length > 0) {
      return { success: false, error: "Email or phone number already exists" };
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const result = await sql`
      INSERT INTO users (email, phone, password_hash, first_name, last_name)
      VALUES (${email}, ${phone}, ${passwordHash}, ${firstName}, ${lastName})
      RETURNING id, email, phone, first_name, last_name, wallet_balance, is_verified, created_at
    `;

    if (!result || result.length === 0) {
      return { success: false, error: "Failed to create user. Please try again." };
    }

    const user = result[0] as User;

    // Create session
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await sql`
      INSERT INTO sessions (user_id, token, expires_at)
      VALUES (${user.id}, ${token}, ${expiresAt.toISOString()})
    `;

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });

    return { success: true, user };
  } catch (error: unknown) {
    console.error("Registration error:", error);
    
    // Check if it's a database configuration error
    if (error instanceof Error && error.message.includes("Database not configured")) {
      return { 
        success: false, 
        error: "Database not configured. Please set DATABASE_URL environment variable in .env.local" 
      };
    }
    
    // Check for database constraint errors (unique violations, etc.)
    if (error && typeof error === "object" && "code" in error) {
      const dbError = error as { code?: string; message?: string };
      
      // PostgreSQL unique violation error code
      if (dbError.code === "23505" || dbError.message?.includes("unique constraint")) {
        return {
          success: false,
          error: "Email or phone number already exists. Please use different credentials."
        };
      }
      
      // PostgreSQL not null violation
      if (dbError.code === "23502" || dbError.message?.includes("null value")) {
        return {
          success: false,
          error: "All fields are required. Please fill in all information."
        };
      }
      
      // PostgreSQL check constraint violation
      if (dbError.code === "23514") {
        return {
          success: false,
          error: dbError.message || "Invalid data provided. Please check your input."
        };
      }
    }
    
    // Check for validation errors in the error message
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();
      
      if (errorMessage.includes("email") || errorMessage.includes("invalid")) {
        return {
          success: false,
          error: "Invalid email format. Please enter a valid email address."
        };
      }
      
      if (errorMessage.includes("phone")) {
        return {
          success: false,
          error: "Invalid phone number format. Please enter a valid phone number."
        };
      }
    }
    
    // Log the full error for debugging
    if (error instanceof Error) {
      console.error("Registration error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    
    return { success: false, error: "Failed to create account. Please try again." };
  }
}

export async function login(formData: {
  email: string;
  password: string;
}): Promise<AuthResult> {
  try {
    const { email, password } = formData;

    // Find user
    const result = await sql`
      SELECT id, email, phone, password_hash, first_name, last_name, wallet_balance, is_verified, created_at
      FROM users WHERE email = ${email}
    `;

    if (result.length === 0) {
      return { success: false, error: "Invalid email or password" };
    }

    const user = result[0] as User & { password_hash: string };

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return { success: false, error: "Invalid email or password" };
    }

    // Create session
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await sql`
      INSERT INTO sessions (user_id, token, expires_at)
      VALUES (${user.id}, ${token}, ${expiresAt.toISOString()})
    `;

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });

    // Remove password_hash from returned user
    const { password_hash: _, ...safeUser } = user;

    return { success: true, user: safeUser };
  } catch (error) {
    console.error("Login error:", error);
    
    // Check if it's a database configuration error
    if (error instanceof Error && error.message.includes("Database not configured")) {
      return { 
        success: false, 
        error: "Database not configured. Please set DATABASE_URL environment variable in .env.local" 
      };
    }
    
    return { success: false, error: "Failed to login. Please try again." };
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (token) {
    await sql`DELETE FROM sessions WHERE token = ${token}`;
    cookieStore.delete("session_token");
  }

  redirect("/login");
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    if (!token) {
      return null;
    }

    const result = await sql`
      SELECT u.id, u.email, u.phone, u.first_name, u.last_name, u.wallet_balance, u.is_verified, u.created_at
      FROM users u
      JOIN sessions s ON u.id = s.user_id
      WHERE s.token = ${token} AND s.expires_at > NOW()
    `;

    if (result.length === 0) {
      return null;
    }

    return result[0] as User;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}

export async function updateWalletBalance(
  userId: string,
  amount: number,
  operation: "add" | "subtract"
): Promise<{ success: boolean; newBalance?: number; error?: string }> {
  try {
    const operator = operation === "add" ? "+" : "-";
    
    const result = await sql`
      UPDATE users 
      SET wallet_balance = wallet_balance ${sql.unsafe(operator)} ${amount}
      WHERE id = ${userId}
      RETURNING wallet_balance
    `;

    if (result.length === 0) {
      return { success: false, error: "User not found" };
    }

    return { success: true, newBalance: Number(result[0].wallet_balance) };
  } catch (error) {
    console.error("Update wallet balance error:", error);
    return { success: false, error: "Failed to update wallet balance" };
  }
}
