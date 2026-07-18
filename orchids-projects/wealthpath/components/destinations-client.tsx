'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star, MapPin, DollarSign, Calendar } from 'lucide-react'

interface Destination {
  id: string
  name: string
  slug: string
  country: string
  image_url: string
  avg_price_usd: number
  best_season: string
  rating: number
  featured: boolean
  trending: boolean
}

export default function DestinationsClient({ destinations }: { destinations: Destination[] }) {
  const [sort, setSort] = useState<'rating' | 'price' | 'trending'>('trending')

  const sorted = [...destinations].sort((a, b) => {
    if (sort === 'rating') return b.rating - a.rating
    if (sort === 'price') return a.avg_price_usd - b.avg_price_usd
    return (b.trending ? 1 : 0) - (a.trending ? 1 : 0)
  })

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex gap-2">
          {(['trending', 'rating', 'price'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                sort === s
                  ? 'bg-teal text-white'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{sorted.length} destinations</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((dest) => (
          <Link
            key={dest.id}
            href={`/destinations/${dest.slug}`}
            className="group overflow-hidden rounded-lg border border-border transition-shadow hover:shadow-lg"
          >
            <div className="relative h-48 overflow-hidden bg-secondary">
              <img
                src={dest.image_url}
                alt={dest.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              {dest.featured && (
                <div className="absolute top-4 right-4 rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-black">
                  Featured
                </div>
              )}
            </div>
            <div className="p-4 space-y-3">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-teal transition-colors">
                {dest.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {dest.country}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-gold text-gold" />
                  <span>{dest.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span>${dest.avg_price_usd}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                Best: {dest.best_season}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
