'use server'

import { db } from '@/lib/db'
import { deals } from '@/lib/db/schema'
import { asc, desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { nanoid } from 'nanoid'

export async function getDeals() {
  return db.select().from(deals).orderBy(desc(deals.createdAt))
}

export async function getFeaturedDeals() {
  return db
    .select()
    .from(deals)
    .where(eq(deals.featured, true))
    .orderBy(desc(deals.createdAt))
    .limit(8)
}

export async function getDealsByType(type: string) {
  return db
    .select()
    .from(deals)
    .where(eq(deals.type, type))
    .orderBy(desc(deals.discountPercent))
    .limit(12)
}

export async function getDealBySlug(slug: string) {
  const rows = await db
    .select()
    .from(deals)
    .where(eq(deals.slug, slug))
    .limit(1)
  return rows[0] ?? null
}

export async function createDeal(data: {
  title: string
  slug: string
  type: string
  description: string
  imageUrl: string
  originalPriceUsd?: number
  salePriceUsd?: number
  discountPercent?: number
  affiliateUrl: string
  destinationId?: string
  featured: boolean
  status: string
  expiresAt?: Date
}) {
  await db.insert(deals).values({ id: nanoid(), ...data })
  revalidatePath('/')
  revalidatePath('/deals')
  revalidatePath('/admin')
}

export async function updateDeal(
  id: string,
  data: Partial<{
    title: string
    slug: string
    type: string
    description: string
    imageUrl: string
    originalPriceUsd: number
    salePriceUsd: number
    discountPercent: number
    affiliateUrl: string
    destinationId: string
    featured: boolean
    status: string
    expiresAt: Date
  }>
) {
  await db
    .update(deals)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(deals.id, id))
  revalidatePath('/')
  revalidatePath('/deals')
  revalidatePath('/admin')
}

export async function deleteDeal(id: string) {
  await db.delete(deals).where(eq(deals.id, id))
  revalidatePath('/')
  revalidatePath('/deals')
  revalidatePath('/admin')
}
