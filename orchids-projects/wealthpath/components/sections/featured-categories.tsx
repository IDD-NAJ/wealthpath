'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { categories } from '@/lib/affiliate-data'

export function FeaturedCategories() {
  const featured = categories.filter((c) => c.featured)

  return (
    <section className="bg-background px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-teal-600">
              Browse by Category
            </p>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Top Affiliate Categories
            </h2>
            <p className="mt-2 text-muted-foreground">
              Handpicked programs across every wealth-building vertical.
            </p>
          </div>
          <Link
            href="/categories"
            className="flex items-center gap-1.5 text-sm font-medium text-teal-600 transition-colors hover:text-teal-700"
          >
            View all categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {featured.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <Link
                href={`/category/${cat.slug}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center shadow-sm transition-all hover:border-teal-200 hover:shadow-card-hover"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-3xl shadow-sm transition-transform group-hover:scale-110">
                  {cat.icon}
                </div>
                <div>
                  <p className="font-heading text-sm font-bold text-foreground">{cat.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{cat.programCount} programs</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* All categories strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center gap-2"
        >
          {categories
            .filter((c) => !c.featured)
            .map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-teal-200 hover:text-teal-700"
              >
                <span>{cat.icon}</span>
                {cat.name}
              </Link>
            ))}
        </motion.div>
      </div>
    </section>
  )
}
