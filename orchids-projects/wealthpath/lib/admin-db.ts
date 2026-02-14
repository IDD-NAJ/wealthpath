import { sql } from './db';

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar_url?: string;
  created_at: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  author_id: number;
  status: string;
  featured: boolean;
  views: number;
  created_at: string;
  updated_at: string;
}

// Article operations
export async function getArticles() {
  try {
    const result = await sql.query(`SELECT * FROM articles ORDER BY created_at DESC`);
    return result;
  } catch (error) {
    console.error('[v0] Error fetching articles:', error);
    return [];
  }
}

export async function createArticle(data: Omit<Article, 'id' | 'created_at' | 'updated_at' | 'views'>) {
  try {
    const result = await sql.query(
      `INSERT INTO articles (title, slug, content, excerpt, category, author_id, status, featured, meta_title, meta_description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        data.title,
        data.slug,
        data.content,
        data.excerpt,
        data.category,
        data.author_id,
        data.status,
        data.featured,
        data.title,
        data.excerpt
      ]
    );
    return result[0];
  } catch (error) {
    console.error('[v0] Error creating article:', error);
    throw error;
  }
}

export async function updateArticle(id: number, data: Partial<Article>) {
  try {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    for (const [key, value] of Object.entries(data)) {
      if (key !== 'id' && key !== 'created_at') {
        updates.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    }

    if (updates.length === 0) return null;

    values.push(id);
    const result = await sql.query(
      `UPDATE articles SET ${updates.join(', ')}, updated_at = NOW() WHERE id = $${paramCount} RETURNING *`,
      values
    );
    return result[0];
  } catch (error) {
    console.error('[v0] Error updating article:', error);
    throw error;
  }
}

export async function deleteArticle(id: number) {
  try {
    await sql.query(`DELETE FROM articles WHERE id = $1`, [id]);
    return true;
  } catch (error) {
    console.error('[v0] Error deleting article:', error);
    throw error;
  }
}

// User operations
export async function getUsers() {
  try {
    const result = await sql.query(`SELECT id, email, name, role, avatar_url, created_at FROM users`);
    return result;
  } catch (error) {
    console.error('[v0] Error fetching users:', error);
    return [];
  }
}

export async function getUserById(id: number) {
  try {
    const result = await sql.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return result[0];
  } catch (error) {
    console.error('[v0] Error fetching user:', error);
    return null;
  }
}

// Dashboard stats
export async function getDashboardStats() {
  try {
    const [
      userCount,
      articleCount,
      courseCount,
      totalRevenue
    ] = await Promise.all([
      sql.query(`SELECT COUNT(*) as count FROM users`),
      sql.query(`SELECT COUNT(*) as count FROM articles`),
      sql.query(`SELECT COUNT(*) as count FROM courses`),
      sql.query(`SELECT COALESCE(SUM(amount), 0) as total FROM payments WHERE status = 'completed'`)
    ]);

    return {
      totalUsers: userCount[0]?.count || 0,
      totalArticles: articleCount[0]?.count || 0,
      totalCourses: courseCount[0]?.count || 0,
      totalRevenue: parseFloat(totalRevenue[0]?.total || 0)
    };
  } catch (error) {
    console.error('[v0] Error fetching dashboard stats:', error);
    return {
      totalUsers: 0,
      totalArticles: 0,
      totalCourses: 0,
      totalRevenue: 0
    };
  }
}

// Payment operations
export async function getPayments(limit = 50) {
  try {
    const result = await sql.query(
      `SELECT * FROM payments ORDER BY created_at DESC LIMIT $1`,
      [limit]
    );
    return result;
  } catch (error) {
    console.error('[v0] Error fetching payments:', error);
    return [];
  }
}

// Course operations
export async function getCourses() {
  try {
    const result = await sql.query(`SELECT * FROM courses ORDER BY created_at DESC`);
    return result;
  } catch (error) {
    console.error('[v0] Error fetching courses:', error);
    return [];
  }
}

// Subscription operations
export async function getSubscriptions() {
  try {
    const result = await sql.query(`SELECT * FROM subscriptions ORDER BY started_at DESC`);
    return result;
  } catch (error) {
    console.error('[v0] Error fetching subscriptions:', error);
    return [];
  }
}
