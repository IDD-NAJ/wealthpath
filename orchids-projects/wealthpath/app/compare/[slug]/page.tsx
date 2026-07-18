import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, XCircle, ExternalLink, ShieldCheck } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { StarRating } from '@/components/ui/star-rating'
import { CommissionBadge, CookieBadge } from '@/components/ui/affiliate-badge'
import { Button } from '@/components/ui/button'
import {
  getComparisonBySlug,
  getComparisonPrograms,
  comparisons,
} from '@/lib/affiliate-data'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const comparison = getComparisonBySlug(slug)
  if (!comparison) return {}
  return {
    title: comparison.title,
    description: comparison.description,
  }
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params
  const comparison = getComparisonBySlug(slug)
  if (!comparison) notFound()
  const programs = getComparisonPrograms(comparison)

  const allFeatures = Array.from(
    new Set(programs.flatMap((p) => p.features))
  ).slice(0, 8)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-navy-900 px-4 py-14 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/comparisons"
              className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              All Comparisons
            </Link>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-teal-400">
              Side-by-Side Comparison
            </p>
            <h1 className="font-heading text-3xl font-extrabold text-white md:text-5xl text-balance">
              {comparison.title}
            </h1>
            <p className="mt-3 text-white/60">{comparison.description}</p>
            <p className="mt-2 text-xs text-white/30">
              Updated {new Date(comparison.updatedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8 space-y-10">
          {/* Quick comparison cards */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-6">At a Glance</h2>
            <div className={`grid gap-5 ${programs.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
              {programs.map((program) => (
                <div
                  key={program.id}
                  className={`rounded-2xl border p-6 ${
                    program.editorsPick
                      ? 'border-teal-300 bg-teal-50 ring-2 ring-teal-200'
                      : 'border-border bg-card'
                  }`}
                >
                  {program.editorsPick && (
                    <span className="mb-3 inline-block rounded-full bg-teal-600 px-2.5 py-0.5 text-xs font-bold text-white">
                      Editor&apos;s Pick
                    </span>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-2xl">
                      {program.logo}
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold">{program.name}</h3>
                      <StarRating rating={program.rating} size="sm" reviewCount={program.reviewCount} />
                    </div>
                  </div>
                  <CommissionBadge commission={program.commission} className="mb-3 w-full justify-center" />
                  <CookieBadge days={program.cookieDuration} className="mb-4 w-full justify-center" />
                  <div className="flex flex-col gap-2">
                    <Link href={`/programs/${program.slug}`}>
                      <Button variant="outline" className="w-full rounded-xl font-medium">
                        Read Full Review
                      </Button>
                    </Link>
                    <a href={program.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow">
                      <Button className="w-full rounded-xl bg-teal-600 font-medium text-white hover:bg-teal-500">
                        Join Program
                        <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Feature comparison table */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-6">Feature Comparison</h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary">
                    <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Feature</th>
                    {programs.map((p) => (
                      <th key={p.id} className="px-6 py-4 text-center font-heading font-bold text-foreground">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-2xl">{p.logo}</span>
                          {p.name}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allFeatures.map((feature, i) => (
                    <tr
                      key={feature}
                      className={`border-b border-border ${i % 2 === 0 ? 'bg-card' : 'bg-secondary/30'}`}
                    >
                      <td className="px-6 py-3.5 font-medium text-foreground">{feature}</td>
                      {programs.map((p) => (
                        <td key={p.id} className="px-6 py-3.5 text-center">
                          {p.features.includes(feature) ? (
                            <CheckCircle2 className="mx-auto h-5 w-5 text-teal-600" />
                          ) : (
                            <XCircle className="mx-auto h-5 w-5 text-muted-foreground/40" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Commission row */}
                  <tr className="border-b border-border bg-card font-medium">
                    <td className="px-6 py-3.5 text-foreground">Commission</td>
                    {programs.map((p) => (
                      <td key={p.id} className="px-6 py-3.5 text-center">
                        <span className="font-semibold text-teal-700">{p.commission}</span>
                      </td>
                    ))}
                  </tr>
                  {/* Cookie row */}
                  <tr className="border-b border-border bg-secondary/30 font-medium">
                    <td className="px-6 py-3.5 text-foreground">Cookie Duration</td>
                    {programs.map((p) => (
                      <td key={p.id} className="px-6 py-3.5 text-center">{p.cookieDuration} days</td>
                    ))}
                  </tr>
                  {/* Rating row */}
                  <tr className="bg-card font-medium">
                    <td className="px-6 py-3.5 text-foreground">Our Rating</td>
                    {programs.map((p) => (
                      <td key={p.id} className="px-6 py-3.5 text-center">
                        <StarRating rating={p.rating} size="sm" className="justify-center" />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Pros / Cons for each */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-6">Pros & Cons</h2>
            <div className={`grid gap-6 ${programs.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
              {programs.map((program) => (
                <div key={program.id} className="space-y-3">
                  <h3 className="flex items-center gap-2 font-heading text-base font-bold">
                    <span>{program.logo}</span>
                    {program.name}
                  </h3>
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="mb-2 text-xs font-semibold text-emerald-800">Pros</p>
                    <ul className="space-y-1.5">
                      {program.pros.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-xs text-emerald-700">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                    <p className="mb-2 text-xs font-semibold text-red-800">Cons</p>
                    <ul className="space-y-1.5">
                      {program.cons.map((c) => (
                        <li key={c} className="flex items-start gap-2 text-xs text-red-700">
                          <XCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Disclosure */}
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/50 p-5">
            <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-600" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              <strong>Affiliate Disclosure:</strong> WealthPath may earn a commission if you sign up through links on this page. This does not influence our ratings or comparisons.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
