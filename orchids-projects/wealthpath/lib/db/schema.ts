import {
  pgTable, text, boolean, integer, numeric, jsonb, timestamp, serial,
} from 'drizzle-orm/pg-core'

// ─── Homepage section configuration ─────────────────────────────────────────
export const homepageSections = pgTable('homepage_sections', {
  id: text('id').primaryKey(),
  key: text('key').notNull().unique(),
  label: text('label').notNull(),
  enabled: boolean('enabled').notNull().default(true),
  sectionOrder: integer('section_order').notNull().default(0),
  scheduledAt: timestamp('scheduled_at', { withTimezone: true }),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  config: jsonb('config').notNull().default({}),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// ─── Destinations ────────────────────────────────────────────────────────────
export const destinations = pgTable('destinations', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  country: text('country').notNull(),
  continent: text('continent').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(),
  avgPriceUsd: integer('avg_price_usd').notNull().default(0),
  bestSeason: text('best_season').notNull(),
  rating: numeric('rating', { precision: 3, scale: 1 }).notNull().default('4.5'),
  featured: boolean('featured').notNull().default(false),
  trending: boolean('trending').notNull().default(false),
  tags: text('tags').array().notNull().default([]),
  status: text('status').notNull().default('published'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// ─── Deals ───────────────────────────────────────────────────────────────────
export const deals = pgTable('deals', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  type: text('type').notNull(), // hotel | flight | tour | cruise | insurance | affiliate | car_rental
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(),
  originalPriceUsd: integer('original_price_usd'),
  salePriceUsd: integer('sale_price_usd'),
  discountPercent: integer('discount_percent'),
  affiliateUrl: text('affiliate_url').notNull(),
  destinationId: text('destination_id'),
  featured: boolean('featured').notNull().default(false),
  status: text('status').notNull().default('published'),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// ─── Blog posts ──────────────────────────────────────────────────────────────
export const blogPosts = pgTable('blog_posts', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  coverImageUrl: text('cover_image_url').notNull(),
  author: text('author').notNull().default('WealthPath Editorial'),
  category: text('category').notNull(),
  tags: text('tags').array().notNull().default([]),
  status: text('status').notNull().default('draft'), // draft | published | scheduled | archived
  featured: boolean('featured').notNull().default(false),
  viewCount: integer('view_count').notNull().default(0),
  readTimeMinutes: integer('read_time_minutes').notNull().default(5),
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  scheduledAt: timestamp('scheduled_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// ─── Testimonials ────────────────────────────────────────────────────────────
export const testimonials = pgTable('testimonials', {
  id: text('id').primaryKey(),
  authorName: text('author_name').notNull(),
  authorTitle: text('author_title').notNull(),
  authorAvatarUrl: text('author_avatar_url'),
  content: text('content').notNull(),
  rating: integer('rating').notNull().default(5),
  destination: text('destination'),
  featured: boolean('featured').notNull().default(false),
  status: text('status').notNull().default('published'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

// ─── Affiliate programs ──────────────────────────────────────────────────────
export const affiliatePrograms = pgTable('affiliate_programs_cms', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  logoUrl: text('logo_url'),
  tagline: text('tagline').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  commission: text('commission').notNull(),
  rating: numeric('rating', { precision: 3, scale: 1 }).notNull().default('4.0'),
  affiliateUrl: text('affiliate_url').notNull(),
  website: text('website').notNull(),
  featured: boolean('featured').notNull().default(false),
  trending: boolean('trending').notNull().default(false),
  status: text('status').notNull().default('active'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

// ─── FAQs ────────────────────────────────────────────────────────────────────
export const faqs = pgTable('faqs', {
  id: text('id').primaryKey(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  category: text('category').notNull().default('general'),
  sectionOrder: integer('section_order').notNull().default(0),
  published: boolean('published').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

// ─── Aliases for backward compatibility ──────────────────────────────────────
export const affiliateProgramsCms = affiliatePrograms

// ─── Type exports ─────────────────────────────────────────────────────────────
export type HomepageSection = typeof homepageSections.$inferSelect
export type NewHomepageSection = typeof homepageSections.$inferInsert
export type Destination = typeof destinations.$inferSelect
export type NewDestination = typeof destinations.$inferInsert
export type Deal = typeof deals.$inferSelect
export type NewDeal = typeof deals.$inferInsert
export type BlogPost = typeof blogPosts.$inferSelect
export type NewBlogPost = typeof blogPosts.$inferInsert
export type Testimonial = typeof testimonials.$inferSelect
export type NewTestimonial = typeof testimonials.$inferInsert
export type AffiliateProgram = typeof affiliatePrograms.$inferSelect
export type NewAffiliateProgram = typeof affiliatePrograms.$inferInsert
export type FAQ = typeof faqs.$inferSelect
export type NewFAQ = typeof faqs.$inferInsert
