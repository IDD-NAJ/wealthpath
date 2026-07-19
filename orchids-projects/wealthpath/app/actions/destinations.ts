'use server'

import { db } from '@/lib/db/index'
import { destinations } from '@/lib/db/schema'
import { asc, desc, eq, ilike, or } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { nanoid } from 'nanoid'

export async function getDestinations() {
  return db.select().from(destinations).orderBy(asc(destinations.name))
}

export async function getFeaturedDestinations() {
  return db
    .select()
    .from(destinations)
    .where(eq(destinations.featured, true))
    .orderBy(desc(destinations.rating))
    .limit(6)
}

export async function getTrendingDestinations() {
  return db
    .select()
    .from(destinations)
    .where(eq(destinations.trending, true))
    .orderBy(desc(destinations.rating))
    .limit(8)
}

export async function getDestinationBySlug(slug: string) {
  const rows = await db
    .select()
    .from(destinations)
    .where(eq(destinations.slug, slug))
    .limit(1)
  return rows[0] ?? null
}

export async function searchDestinations(query: string) {
  return db
    .select()
    .from(destinations)
    .where(
      or(
        ilike(destinations.name, `%${query}%`),
        ilike(destinations.country, `%${query}%`),
        ilike(destinations.continent, `%${query}%`)
      )
    )
    .orderBy(desc(destinations.rating))
    .limit(20)
}

export async function createDestination(data: {
  name: string
  slug: string
  country: string
  continent: string
  description: string
  imageUrl: string
  avgPriceUsd: number
  bestSeason: string
  rating: string
  featured: boolean
  trending: boolean
  tags: string[]
  status: string
}) {
  await db.insert(destinations).values({ id: nanoid(), ...data })
  revalidatePath('/')
  revalidatePath('/destinations')
  revalidatePath('/admin')
}

export async function updateDestination(
  id: string,
  data: Partial<{
    name: string
    slug: string
    country: string
    continent: string
    description: string
    imageUrl: string
    avgPriceUsd: number
    bestSeason: string
    rating: string
    featured: boolean
    trending: boolean
    tags: string[]
    status: string
  }>
) {
  await db
    .update(destinations)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(destinations.id, id))
  revalidatePath('/')
  revalidatePath('/destinations')
  revalidatePath('/admin')
}

export async function deleteDestination(id: string) {
  await db.delete(destinations).where(eq(destinations.id, id))
  revalidatePath('/')
  revalidatePath('/destinations')
  revalidatePath('/admin')
}
