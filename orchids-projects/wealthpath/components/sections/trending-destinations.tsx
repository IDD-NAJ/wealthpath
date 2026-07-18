'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Star, ArrowRight, TrendingUp } from 'lucide-react'

interface Destination {
  id: string
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
}

interface TrendingDestinationsProps {
  destinations: Destination[]
  config: { title?: string; subtitle?: string }
}

export default function TrendingDestinations({ destinations, config }: TrendingDestinationsProps) {
  if (!destinations.length) return null
  const { title = 'Where to Go Next', subtitle = 'Most searched destinations this week' } = config

  return (
    <section className="bg-secondary/30 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-teal" />
              <span className="text-sm font-semibold uppercase tracking-widest text-teal">
                Trending
              </span>
            </div>
            <h2 className="text-3xl font-bold text-foreground text-balance">{title}</h2>
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          </div>
          <Link
            href="/destinations"
            className="hidden items-center gap-1 text-sm font-semibold text-teal transition-colors hover:text-teal/80 md:flex"
          >
            All destinations <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Feature first large destination + 3 smaller ones */}
        <div className="grid gap-5 lg:grid-cols-5">
          {destinations[0] && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative col-span-2 row-span-2 overflow-hidden rounded-2xl lg:col-span-3"
            >
              <div className="relative h-[420px]">
                <Image
                  src={destinations[0].imageUrl}
                  alt={destinations[0].name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {destinations[0].tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{destinations[0].name}</h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-white/80">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{destinations[0].country}</span>
                    <span>&bull;</span>
                    <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                    <span>{destinations[0].rating}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-white/70">
                    {destinations[0].description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-white/70">
                      From{' '}
                      <span className="font-bold text-white">
                        ${destinations[0].avgPriceUsd.toLocaleString()}
                      </span>
                      /person
                    </span>
                    <Link
                      href={`/destinations/${destinations[0].slug}`}
                      className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-white/90"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="col-span-2 grid gap-5">
            {destinations.slice(1, 5).map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex gap-4 overflow-hidden rounded-2xl border border-border/50 bg-card p-3 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={dest.imageUrl}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="112px"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between py-1">
                  <div>
                    <h3 className="font-semibold text-foreground leading-tight">{dest.name}</h3>
                    <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{dest.country}</span>
                      <Star className="ml-1 h-3 w-3 fill-gold text-gold" />
                      <span>{dest.rating}</span>
                    </div>
                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                      Best: {dest.bestSeason}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      From{' '}
                      <span className="font-semibold text-teal">
                        ${dest.avgPriceUsd.toLocaleString()}
                      </span>
                    </span>
                    <Link
                      href={`/destinations/${dest.slug}`}
                      className="text-xs font-semibold text-teal hover:underline"
                    >
                      View &rarr;
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
