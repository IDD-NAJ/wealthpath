import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProgramCard } from '@/components/ui/program-card'
import { getEditorsPickPrograms } from '@/lib/affiliate-data'

export function EditorsPicks() {
  const picks = getEditorsPickPrograms()
  const [primary, ...rest] = picks

  return (
    <section className="bg-background px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gold-500">
              ★ Editor&apos;s Selection
            </p>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Our Top Picks
            </h2>
            <p className="mt-2 text-muted-foreground">
              Curated by our editorial team — the programs we trust and recommend.
            </p>
          </div>
          <Link
            href="/programs"
            className="flex items-center gap-1.5 text-sm font-medium text-teal-600 transition-colors hover:text-teal-700"
          >
            All programs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Layout: 1 featured + 3 compact */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Featured card spans 1 col (full card) */}
          {primary && (
            <div className="lg:col-span-1">
              <ProgramCard program={primary} variant="featured" index={0} />
            </div>
          )}

          {/* Remaining picks */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {rest.slice(0, 4).map((program, i) => (
              <ProgramCard key={program.id} program={program} variant="compact" index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
