import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// GET all articles
export async function GET() {
  try {
    const result = await sql.query(
      `SELECT * FROM articles ORDER BY created_at DESC`
    );

    return NextResponse.json({ success: true, articles: result });
  } catch (error) {
    console.error('[v0] Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

// POST new article
export async function POST(request: NextRequest) {
  try {
    const {
      title,
      slug,
      content,
      excerpt,
      category,
      author_id,
      status,
      featured,
      meta_title,
      meta_description,
      tags
    } = await request.json();

    const result = await sql.query(
      `INSERT INTO articles (title, slug, content, excerpt, category, author_id, status, featured, meta_title, meta_description, tags)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        title,
        slug,
        content,
        excerpt,
        category,
        author_id,
        status || 'draft',
        featured || false,
        meta_title,
        meta_description,
        tags || []
      ]
    );

    return NextResponse.json({
      success: true,
      article: result[0]
    });
  } catch (error) {
    console.error('[v0] Error creating article:', error);
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
}
