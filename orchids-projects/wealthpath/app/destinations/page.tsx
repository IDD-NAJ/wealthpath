import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Star, MapPin, DollarSign, Calendar } from 'lucide-react'
import { getDestinations } from '@/app/actions/destinations'
import DestinationsClient from '@/components/destinations-client'

export const metadata = {
  title: 'Explore Destinations - WealthPath',
  description: 'Discover the world\'s best travel destinations with expert guides and exclusive deals.',
}

export default async function DestinationsPage() {
  const destinations = await getDestinations()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Explore Destinations</h1>
            <p className="text-lg text-muted-foreground">
              Discover the world's best travel destinations with expert guides and exclusive deals
            </p>
          </div>
          <DestinationsClient destinations={destinations} />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
