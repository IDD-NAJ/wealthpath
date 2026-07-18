'use server'

import { db } from '@/lib/db'
import { affiliateProgramsCms } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { nanoid } from 'nanoid'

export async function getAffiliateProgramsCms() {
  return db.select().from(affiliateProgramsCms).orderBy(desc(affiliateProgramsCms.createdAt))
}

export async function getFeaturedAffiliateProgramsCms() {
  return db
    .select()
    .from(affiliateProgramsCms)
    .where(eq(affiliateProgramsCms.featured, true))
    .orderBy(desc(affiliateProgramsCms.rating))
    .limit(8)
}

export async function createAffiliateProgram(data: {
  name: string
  slug: string
  logoUrl?: string
  tagline: string
  description: string
  category: string
  commission: string
  rating: string
  affiliateUrl: string
  website: string
  featured: boolean
  trending: boolean
  status: string
}) {
  await db.insert(affiliateProgramsCms).values({ id: nanoid(), ...data })
  revalidatePath('/')
  revalidatePath('/programs')
  revalidatePath('/admin')
}

export async function updateAffiliateProgram(
  id: string,
  data: Partial<{
    name: string
    slug: string
    logoUrl: string
    tagline: string
    description: string
    category: string
    commission: string
    rating: string
    affiliateUrl: string
    website: string
    featured: boolean
    trending: boolean
    status: string
  }>
) {
  await db
    .update(affiliateProgramsCms)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(affiliateProgramsCms.id, id))
  revalidatePath('/')
  revalidatePath('/programs')
  revalidatePath('/admin')
}

export async function deleteAffiliateProgram(id: string) {
  await db.delete(affiliateProgramsCms).where(eq(affiliateProgramsCms.id, id))
  revalidatePath('/')
  revalidatePath('/programs')
  revalidatePath('/admin')
}
