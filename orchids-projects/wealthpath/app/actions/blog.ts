'use server'

import { db } from '@/lib/db/index'
import { blogPosts } from '@/lib/db/schema'
import { desc, eq, ilike, or } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { nanoid } from 'nanoid'

export async function getBlogPosts() {
  return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt))
}

export async function getPublishedBlogPosts(limit = 20) {
  return db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, 'published'))
    .orderBy(desc(blogPosts.publishedAt))
    .limit(limit)
}

export async function getFeaturedBlogPosts(limit = 3) {
  return db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.featured, true))
    .orderBy(desc(blogPosts.publishedAt))
    .limit(limit)
}

export async function getBlogPostBySlug(slug: string) {
  const rows = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1)
  return rows[0] ?? null
}

export async function getBlogPostsByCategory(category: string, limit = 12) {
  return db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.category, category))
    .orderBy(desc(blogPosts.publishedAt))
    .limit(limit)
}

export async function searchBlogPosts(query: string) {
  return db
    .select()
    .from(blogPosts)
    .where(
      or(
        ilike(blogPosts.title, `%${query}%`),
        ilike(blogPosts.excerpt, `%${query}%`),
        ilike(blogPosts.category, `%${query}%`)
      )
    )
    .orderBy(desc(blogPosts.publishedAt))
    .limit(20)
}

export async function createBlogPost(data: {
  title: string
  slug: string
  excerpt: string
  content: string
  coverImageUrl: string
  author: string
  category: string
  tags: string[]
  status: string
  featured: boolean
  readTimeMinutes: number
  metaTitle?: string
  metaDescription?: string
  publishedAt?: Date
  scheduledAt?: Date
}) {
  await db.insert(blogPosts).values({ id: nanoid(), ...data })
  revalidatePath('/blog')
  revalidatePath('/admin')
}

export async function updateBlogPost(
  id: string,
  data: Partial<{
    title: string
    slug: string
    excerpt: string
    content: string
    coverImageUrl: string
    author: string
    category: string
    tags: string[]
    status: string
    featured: boolean
    readTimeMinutes: number
    metaTitle: string
    metaDescription: string
    publishedAt: Date
    scheduledAt: Date
  }>
) {
  await db
    .update(blogPosts)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(blogPosts.id, id))
  revalidatePath('/blog')
  revalidatePath('/admin')
}

export async function deleteBlogPost(id: string) {
  await db.delete(blogPosts).where(eq(blogPosts.id, id))
  revalidatePath('/blog')
  revalidatePath('/admin')
}

export async function publishBlogPost(id: string) {
  await db
    .update(blogPosts)
    .set({ status: 'published', publishedAt: new Date(), updatedAt: new Date() })
    .where(eq(blogPosts.id, id))
  revalidatePath('/blog')
  revalidatePath('/admin')
}
