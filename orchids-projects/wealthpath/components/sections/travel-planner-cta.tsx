import Link from 'next/link'
import { Map, ArrowRight } from 'lucide-react'

interface TravelPlannerCtaProps {
  config?: { title?: string; subtitle?: string }
}

export default function TravelPlannerCta({ config = {} }: TravelPlannerCtaProps) {
  const {
    title = 'Plan Your Perfect Trip',
    subtitle = 'Get a personalised itinerary — destinations, hotels, flights and budget — in minutes.',
  } = config

  return (
    <section className="bg-navy py-16">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Map className="h-5 w-5 text-teal" />
          <span className="text-sm font-semibold uppercase tracking-widest text-teal">
            Trip Planner
          </span>
        </div>
        <h2 className="text-4xl font-bold text-white text-balance">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/60 leading-relaxed">{subtitle}</p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 rounded-xl bg-teal px-6 py-3 font-semibold text-white transition-colors hover:bg-teal/90"
          >
            Browse Destinations <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/deals"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            View Today&apos;s Deals
          </Link>
        </div>
      </div>
    </section>
  )
}
