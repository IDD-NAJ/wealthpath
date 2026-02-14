import { neon } from '@neondatabase/serverless';

// Extract URL from environment variable (handles both raw URL and psql command format)
const getDatabaseUrl = (): string => {
  const dbUrl = process.env.DATABASE_URL || '';
  
  // If it contains 'psql', extract the URL from the quoted string
  if (dbUrl.includes('psql')) {
    const match = dbUrl.match(/'([^']+)'/);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return dbUrl;
};

const connectionString = getDatabaseUrl();

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

export const sql = neon(connectionString);

// Type-safe query helper
export async function query<T = any>(
  strings: TemplateStringsArray,
  ...values: any[]
): Promise<T[]> {
  try {
    const result = await sql(strings, ...values);
    return result as T[];
  } catch (error) {
    console.error('[v0] Database query error:', error);
    throw error;
  }
}

// Seed initial data
export async function seedDatabase() {
  try {
    console.log('[v0] Checking if admin user exists...');
    
    // Check if admin user exists
    const existingAdmin = await sql(
      `SELECT * FROM users WHERE email = $1 AND role = $2`,
      ['admin@wealthpath.com', 'admin']
    );

    if (existingAdmin.length === 0) {
      console.log('[v0] Creating admin user...');
      
      // Hash the password (in production, use bcrypt)
      const hashedPassword = Buffer.from('Admin@2024').toString('base64');
      
      await sql(
        `INSERT INTO users (email, password_hash, name, role, avatar_url) 
         VALUES ($1, $2, $3, $4, $5)`,
        ['admin@wealthpath.com', hashedPassword, 'Admin User', 'admin', '/avatars/admin.jpg']
      );
      
      console.log('[v0] Admin user created successfully');
    } else {
      console.log('[v0] Admin user already exists');
    }
  } catch (error) {
    console.error('[v0] Error seeding database:', error);
    throw error;
  }
}
