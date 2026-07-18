import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Star, MapPin, ThermometerSun } from 'lucide-react'
import { getDestinationBySlug } from '@/app/actions/destinations'
import { getFeaturedDeals } from '@/app/actions/deals'

export const metadata = {
  title: 'Destination - WealthPath',
  description: 'Explore destination guides and deals.',
}

export default async function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const destination = await getDestinationBySlug(params.slug)

  if (!destination) {
    notFound()
  }

  const deals = await getFeaturedDeals()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8">
          {/* Hero image */}
          <div className="relative h-96 w-full overflow-hidden rounded-xl mb-8">
            <img
              src={destination.image_url}
              alt={destination.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Header */}
          <div className="mb-8 space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold text-foreground">{destination.name}</h1>
              {destination.featured && (
                <div className="rounded-full bg-gold/10 px-3 py-1 text-sm font-semibold text-gold">
                  Featured Destination
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-4 text-lg text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-teal" />
                {destination.country}, {destination.continent}
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-gold text-gold" />
                {destination.rating.toFixed(1)} rating
              </div>
            </div>
          </div>

          {/* Key info grid */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <div className="rounded-lg bg-secondary p-4">
              <p className="text-sm text-muted-foreground">Average Daily Cost</p>
              <p className="text-2xl font-bold text-foreground">${destination.avg_price_usd}</p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <ThermometerSun className="h-4 w-4" /> Best Season
              </p>
              <p className="text-2xl font-bold text-foreground">{destination.best_season}</p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <p className="text-sm text-muted-foreground">Popular Tags</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {destination.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="inline-block rounded bg-teal/20 px-2 py-1 text-xs font-medium text-teal">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-12 space-y-4">
            <h2 className="text-2xl font-bold text-foreground">About {destination.name}</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">{destination.description}</p>
          </div>

          {/* Deals section */}
          {deals.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Deals & Packages</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {deals.map((deal) => (
                  <a
                    key={deal.id}
                    href={deal.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-lg border border-border bg-secondary/50 p-4 transition-all hover:border-teal hover:shadow-lg"
                  >
                    <h3 className="font-semibold text-foreground group-hover:text-teal transition-colors mb-2">
                      {deal.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{deal.description}</p>
                    {deal.discount_percent && (
                      <div className="text-sm font-semibold text-gold">
                        Save {deal.discount_percent}% — ${deal.sale_price_usd} from ${deal.original_price_usd}
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
