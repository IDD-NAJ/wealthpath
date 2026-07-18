import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const getDatabaseUrl = (): string => {
  const dbUrl = process.env.DATABASE_URL || ''
  if (dbUrl.includes('psql')) {
    const match = dbUrl.match(/'([^']+)'/)
    if (match?.[1]) return match[1]
  }
  return dbUrl
}

export const pool = new Pool({ connectionString: getDatabaseUrl() })
export const db = drizzle(pool, { schema })
