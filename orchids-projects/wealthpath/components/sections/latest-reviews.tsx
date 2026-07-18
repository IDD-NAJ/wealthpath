'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import { StarRating } from '@/components/ui/star-rating'
import { reviews } from '@/lib/affiliate-data'

export function LatestReviews() {
  const featured = reviews.slice(0, 3)

  return (
    <section className="bg-secondary/40 px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-teal-600">
              Latest Insights
            </p>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Expert Reviews
            </h2>
            <p className="mt-2 text-muted-foreground">
              In-depth analysis from our team of financial and tech experts.
            </p>
          </div>
          <Link
            href="/reviews"
            className="flex items-center gap-1.5 text-sm font-medium text-teal-600 transition-colors hover:text-teal-700"
          >
            All reviews
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((review, i) => (
            <motion.article
              key={review.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group flex flex-col rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-card-hover overflow-hidden"
            >
              {/* Category band */}
              <div className="bg-navy-900 px-5 py-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                  {review.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                {/* Rating */}
                <StarRating rating={review.rating} size="sm" className="mb-3" />

                {/* Title */}
                <Link href={`/reviews/${review.slug}`}>
                  <h3 className="font-heading text-base font-bold leading-snug text-foreground transition-colors group-hover:text-teal-700 text-balance">
                    {review.title}
                  </h3>
                </Link>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {review.excerpt}
                </p>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
                      {review.author.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">{review.author.name}</p>
                      <p className="text-xs text-muted-foreground">{review.author.title}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {review.readingTime} min
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
