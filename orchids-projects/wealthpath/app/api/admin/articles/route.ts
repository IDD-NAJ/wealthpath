import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// GET all articles
export async function GET() {
  try {
    const result = await sql(
      `SELECT * FROM articles ORDER BY created_at DESC`
    );

    return NextResponse.json({ success: true, articles: result || [] });
  } catch (error) {
    console.error('[v0] Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles', articles: [] },
      { status: 200 }
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

    if (!title || !slug || !content || !excerpt || !category || !author_id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await sql(
      `INSERT INTO articles (id, title, slug, content, excerpt, category, author_id, status, featured, meta_title, meta_description, tags)
       VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
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
        tags ? tags.join(',') : ''
      ]
    );

    return NextResponse.json({
      success: true,
      article: result && result.length > 0 ? result[0] : null
    });
  } catch (error) {
    console.error('[v0] Error creating article:', error);
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
}
