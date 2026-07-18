import Link from 'next/link'
import { ArrowRight, Flame } from 'lucide-react'
import { ProgramCard } from '@/components/ui/program-card'
import { getTrendingPrograms } from '@/lib/affiliate-data'

export function TrendingPrograms() {
  const trending = getTrendingPrograms()

  return (
    <section className="bg-secondary/40 px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-orange-500">
              <Flame className="h-3.5 w-3.5" />
              Trending Now
            </p>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Highest-Paying Programs
            </h2>
            <p className="mt-2 text-muted-foreground">
              The affiliate programs our readers are clicking most this week.
            </p>
          </div>
          <Link
            href="/programs"
            className="flex items-center gap-1.5 text-sm font-medium text-teal-600 transition-colors hover:text-teal-700"
          >
            View all programs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trending.map((program, i) => (
            <ProgramCard key={program.id} program={program} variant="default" index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
