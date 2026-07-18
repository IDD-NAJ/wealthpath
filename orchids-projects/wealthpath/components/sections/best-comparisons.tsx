'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart2 } from 'lucide-react'
import { comparisons } from '@/lib/affiliate-data'

export function BestComparisons() {
  return (
    <section className="bg-background px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
              Side-by-Side
            </p>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Platform Comparisons
            </h2>
            <p className="mt-2 text-muted-foreground">
              Can&apos;t decide? Our head-to-head comparisons make the choice clear.
            </p>
          </div>
          <Link
            href="/comparisons"
            className="flex items-center gap-1.5 text-sm font-medium text-teal-600 transition-colors hover:text-teal-700"
          >
            All comparisons
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* List */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {comparisons.map((comparison, i) => (
            <motion.div
              key={comparison.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
            >
              <Link
                href={`/compare/${comparison.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-teal-200 hover:shadow-card-hover"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <BarChart2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-foreground transition-colors group-hover:text-teal-700 leading-snug">
                      {comparison.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                      {comparison.description}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-teal-600" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
