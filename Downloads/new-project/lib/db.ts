import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

function getCleanConnectionString(): string {
  let connectionString = process.env.DATABASE_URL || "";
  
  // Remove 'psql' prefix and everything before the actual URL
  // Handles formats like: psql 'postgresql://...' or psql "postgresql://..."
  const postgresMatch = connectionString.match(/postgres(?:ql)?:\/\/[^'"\s]+/);
  if (postgresMatch) {
    connectionString = postgresMatch[0];
  }
  
  // Remove channel_binding parameter as it can cause issues with some drivers
  connectionString = connectionString.replace(/[&?]channel_binding=[^&]*/g, "");
  
  // Clean up any double && or trailing ? or &
  connectionString = connectionString.replace(/&&/g, "&").replace(/\?&/g, "?").replace(/[?&]$/, "");
  
  return connectionString.trim();
}

let sql: NeonQueryFunction<false, false>;

try {
  const connectionString = getCleanConnectionString();
  if (connectionString && (connectionString.startsWith("postgresql://") || connectionString.startsWith("postgres://"))) {
    sql = neon(connectionString);
  } else {
    // Create a dummy function that throws a helpful error
    sql = (() => {
      throw new Error(
        "Database not configured. Please set DATABASE_URL environment variable to a valid PostgreSQL connection string (e.g., postgresql://user:pass@host/db)"
      );
    }) as unknown as NeonQueryFunction<false, false>;
  }
} catch (error) {
  console.error("[v0] Failed to initialize database connection:", error);
  sql = (() => {
    throw new Error("Database connection failed to initialize. Check DATABASE_URL format.");
  }) as unknown as NeonQueryFunction<false, false>;
}

export { sql };

export async function query<T>(
  queryText: string,
  params?: unknown[]
): Promise<T[]> {
  try {
    const result = await sql(queryText, params);
    return result as T[];
  } catch (error) {
    console.error("[v0] Database query error:", error);
    throw error;
  }
}
