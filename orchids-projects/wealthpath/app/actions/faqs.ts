'use server'

import { db } from '@/lib/db/index'
import { faqs } from '@/lib/db/schema'
import { asc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { nanoid } from 'nanoid'

export async function getFaqs() {
  return db
    .select()
    .from(faqs)
    .where(eq(faqs.published, true))
    .orderBy(asc(faqs.sectionOrder))
}

export async function getAllFaqs() {
  return db.select().from(faqs).orderBy(asc(faqs.sectionOrder))
}

export async function createFaq(data: {
  question: string
  answer: string
  category: string
  sectionOrder: number
  published: boolean
}) {
  await db.insert(faqs).values({ id: nanoid(), ...data })
  revalidatePath('/')
  revalidatePath('/faq')
  revalidatePath('/admin')
}

export async function updateFaq(
  id: string,
  data: Partial<{
    question: string
    answer: string
    category: string
    sectionOrder: number
    published: boolean
  }>
) {
  await db.update(faqs).set(data).where(eq(faqs.id, id))
  revalidatePath('/')
  revalidatePath('/faq')
  revalidatePath('/admin')
}

export async function deleteFaq(id: string) {
  await db.delete(faqs).where(eq(faqs.id, id))
  revalidatePath('/')
  revalidatePath('/faq')
  revalidatePath('/admin')
}
