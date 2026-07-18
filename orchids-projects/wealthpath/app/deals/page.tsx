'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ExternalLink, Tag } from 'lucide-react'

interface DealType {
  id: string
  title: string
  type: string
  description: string
  image_url: string
  original_price_usd?: number
  sale_price_usd?: number
  discount_percent?: number
  affiliate_url: string
}

const mockDeals: DealType[] = [
  {
    id: '1',
    title: 'Luxury Bali Villa - 7 Nights',
    type: 'hotel',
    description: 'Private pool villa in Ubud with daily breakfast and spa access included.',
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    original_price_usd: 1800,
    sale_price_usd: 899,
    discount_percent: 50,
    affiliate_url: 'https://booking.com',
  },
  {
    id: '2',
    title: 'Paris Return Flights from $299',
    type: 'flight',
    description: 'Non-stop return flights from New York to Paris with a major carrier.',
    image_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
    original_price_usd: 599,
    sale_price_usd: 299,
    discount_percent: 50,
    affiliate_url: 'https://skyscanner.com',
  },
  {
    id: '3',
    title: 'Tokyo Explorer Pass - 5 Days',
    type: 'tour',
    description: 'Unlimited transport, skip-the-line entry to 15 attractions, and guided Shibuya tour.',
    image_url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    original_price_usd: 450,
    sale_price_usd: 249,
    discount_percent: 45,
    affiliate_url: 'https://getyourguide.com',
  },
]

export default function DealsPage() {
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const types = ['hotel', 'flight', 'tour', 'cruise', 'insurance']
  const deals = typeFilter === 'all' ? mockDeals : mockDeals.filter((d) => d.type === typeFilter)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-12 space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Travel Deals</h1>
            <p className="text-lg text-muted-foreground">
              Exclusive discounts on flights, hotels, tours, cruises, and travel insurance
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setTypeFilter('all')}
              className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                typeFilter === 'all'
                  ? 'bg-teal text-white'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              All Deals
            </button>
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`rounded-lg px-4 py-2 font-medium transition-colors capitalize ${
                  typeFilter === type
                    ? 'bg-teal text-white'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deals.map((deal) => (
              <a
                key={deal.id}
                href={deal.affiliate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-lg border border-border transition-all hover:border-teal hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden bg-secondary">
                  <img
                    src={deal.image_url}
                    alt={deal.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  {deal.discount_percent && (
                    <div className="absolute top-4 right-4 rounded-lg bg-red-500/90 px-3 py-1 text-sm font-bold text-white">
                      {deal.discount_percent}% OFF
                    </div>
                  )}
                </div>
                <div className="flex-1 p-4 space-y-3 flex flex-col">
                  <div className="flex items-center gap-2">
                    <Tag className="h-3 w-3 text-teal" />
                    <span className="text-xs font-semibold text-teal uppercase">{deal.type}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-teal transition-colors line-clamp-2">
                    {deal.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{deal.description}</p>
                  {deal.original_price_usd && deal.sale_price_usd && (
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gold">${deal.sale_price_usd}</span>
                        <span className="text-sm line-through text-muted-foreground">${deal.original_price_usd}</span>
                      </div>
                    </div>
                  )}
                  <button className="mt-auto rounded-lg bg-teal/10 py-2 text-center font-semibold text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                    View Deal <ExternalLink className="inline h-4 w-4 ml-2" />
                  </button>
                </div>
              </a>
            ))}
          </div>

          {deals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No deals found in this category</p>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
