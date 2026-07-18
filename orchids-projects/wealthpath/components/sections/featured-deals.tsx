'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Tag, ArrowRight, Clock } from 'lucide-react'

interface Deal {
  id: string
  title: string
  slug: string
  type: string
  description: string
  imageUrl: string
  originalPriceUsd: number | null
  salePriceUsd: number | null
  discountPercent: number | null
  affiliateUrl: string
  featured: boolean
}

interface FeaturedDealsProps {
  deals: Deal[]
  config: { title?: string; subtitle?: string }
}

const TYPE_LABELS: Record<string, string> = {
  hotel: 'Hotel',
  flight: 'Flight',
  tour: 'Tour',
  cruise: 'Cruise',
  insurance: 'Insurance',
}

export default function FeaturedDeals({ deals, config }: FeaturedDealsProps) {
  if (!deals.length) return null

  const { title = "Today's Best Deals", subtitle = 'Handpicked offers updated daily' } = config

  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Tag className="h-4 w-4 text-teal" />
              <span className="text-sm font-semibold uppercase tracking-widest text-teal">
                Limited Time
              </span>
            </div>
            <h2 className="text-3xl font-bold text-foreground text-balance">{title}</h2>
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          </div>
          <Link
            href="/deals"
            className="hidden items-center gap-1 text-sm font-semibold text-teal transition-colors hover:text-teal/80 md:flex"
          >
            All deals <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {deals.slice(0, 8).map((deal, i) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={deal.imageUrl}
                  alt={deal.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                {deal.discountPercent && (
                  <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-bold text-white">
                    -{deal.discountPercent}%
                  </span>
                )}
                <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                  {TYPE_LABELS[deal.type] ?? deal.type}
                </span>
              </div>
              <div className="p-4">
                <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-foreground leading-snug">
                  {deal.title}
                </h3>
                <p className="mb-3 line-clamp-2 text-xs text-muted-foreground">
                  {deal.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    {deal.salePriceUsd && (
                      <span className="text-lg font-bold text-teal">
                        ${deal.salePriceUsd.toLocaleString()}
                      </span>
                    )}
                    {deal.originalPriceUsd && (
                      <span className="ml-1.5 text-xs text-muted-foreground line-through">
                        ${deal.originalPriceUsd.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <a
                    href={deal.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="rounded-lg bg-teal px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-teal/90"
                  >
                    Book
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/deals"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            View all deals <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
