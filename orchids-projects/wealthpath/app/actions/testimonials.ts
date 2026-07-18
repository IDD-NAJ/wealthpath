'use server'

import { db } from '@/lib/db'
import { testimonials } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { nanoid } from 'nanoid'

export async function getTestimonials() {
  return db.select().from(testimonials).orderBy(desc(testimonials.createdAt))
}

export async function getFeaturedTestimonials() {
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.featured, true))
    .orderBy(desc(testimonials.rating))
    .limit(6)
}

export async function createTestimonial(data: {
  authorName: string
  authorTitle: string
  authorAvatarUrl?: string
  content: string
  rating: number
  destination?: string
  featured: boolean
  status: string
}) {
  await db.insert(testimonials).values({ id: nanoid(), ...data })
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function updateTestimonial(
  id: string,
  data: Partial<{
    authorName: string
    authorTitle: string
    authorAvatarUrl: string
    content: string
    rating: number
    destination: string
    featured: boolean
    status: string
  }>
) {
  await db.update(testimonials).set(data).where(eq(testimonials.id, id))
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function deleteTestimonial(id: string) {
  await db.delete(testimonials).where(eq(testimonials.id, id))
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function toggleTestimonialFeatured(id: string, featured: boolean) {
  await db.update(testimonials).set({ featured }).where(eq(testimonials.id, id))
  revalidatePath('/')
  revalidatePath('/admin')
}
