'use server'

import { db } from '@/lib/db'
import { homepageSections } from '@/lib/db/schema'
import { asc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function getHomepageSections() {
  return db
    .select()
    .from(homepageSections)
    .orderBy(asc(homepageSections.sectionOrder))
}

export async function getEnabledHomepageSections() {
  return db
    .select()
    .from(homepageSections)
    .where(eq(homepageSections.enabled, true))
    .orderBy(asc(homepageSections.sectionOrder))
}

export async function updateSectionEnabled(id: string, enabled: boolean) {
  await db
    .update(homepageSections)
    .set({ enabled, updatedAt: new Date() })
    .where(eq(homepageSections.id, id))
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function updateSectionOrder(sections: { id: string; order: number }[]) {
  await Promise.all(
    sections.map(({ id, order }) =>
      db
        .update(homepageSections)
        .set({ sectionOrder: order, updatedAt: new Date() })
        .where(eq(homepageSections.id, id))
    )
  )
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function updateSectionConfig(id: string, config: Record<string, unknown>) {
  await db
    .update(homepageSections)
    .set({ config, updatedAt: new Date() })
    .where(eq(homepageSections.id, id))
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function updateSectionSchedule(
  id: string,
  scheduledAt: Date | null,
  expiresAt: Date | null
) {
  await db
    .update(homepageSections)
    .set({ scheduledAt, expiresAt, updatedAt: new Date() })
    .where(eq(homepageSections.id, id))
  revalidatePath('/')
  revalidatePath('/admin')
}
