import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, ExternalLink, ShieldCheck } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { StarRating } from '@/components/ui/star-rating'
import { CommissionBadge, CookieBadge, ProgramBadge, EditorsBadge } from '@/components/ui/affiliate-badge'
import { Button } from '@/components/ui/button'
import {
  getProgramBySlug,
  affiliatePrograms,
  getProgramsByCategory,
} from '@/lib/affiliate-data'
import { ProgramCard } from '@/components/ui/program-card'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return affiliatePrograms.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const program = getProgramBySlug(slug)
  if (!program) return {}
  return {
    title: `${program.name} Review — Is It Worth It?`,
    description: program.tagline,
  }
}

export default async function ProgramReviewPage({ params }: Props) {
  const { slug } = await params
  const program = getProgramBySlug(slug)
  if (!program) notFound()

  const related = getProgramsByCategory(program.categorySlug)
    .filter((p) => p.slug !== slug)
    .slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-navy-900 px-4 py-14 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/programs"
              className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              All Programs
            </Link>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  {program.badge && <ProgramBadge badge={program.badge} />}
                  {program.editorsPick && <EditorsBadge />}
                  <Link
                    href={`/category/${program.categorySlug}`}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 hover:bg-white/20"
                  >
                    {program.category}
                  </Link>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                    {program.logo}
                  </div>
                  <div>
                    <h1 className="font-heading text-3xl font-extrabold text-white md:text-4xl">
                      {program.name}
                    </h1>
                    <p className="mt-1 text-white/60">{program.tagline}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <StarRating
                    rating={program.rating}
                    reviewCount={program.reviewCount}
                    size="md"
                    className="[&_span]:text-white [&_span.text-muted-foreground]:text-white/50"
                  />
                  <CommissionBadge commission={program.commission} variant="highlight" />
                  <CookieBadge days={program.cookieDuration} className="border-white/20 bg-white/10 text-white" />
                </div>
              </div>

              {/* CTA card */}
              <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:w-80">
                <p className="mb-2 text-sm font-semibold text-white">Affiliate Commission</p>
                <p className="font-heading text-2xl font-extrabold text-teal-400">{program.commission}</p>
                <div className="my-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-white/40">Cookie</p>
                    <p className="font-semibold text-white">{program.cookieDuration} days</p>
                  </div>
                  <div>
                    <p className="text-white/40">Payout</p>
                    <p className="font-semibold text-white">{program.payoutFrequency}</p>
                  </div>
                  <div>
                    <p className="text-white/40">Min Payout</p>
                    <p className="font-semibold text-white">{program.payoutThreshold}</p>
                  </div>
                  <div>
                    <p className="text-white/40">Founded</p>
                    <p className="font-semibold text-white">{program.founded ?? '—'}</p>
                  </div>
                </div>
                <a
                  href={program.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <Button className="w-full rounded-xl bg-teal-600 font-semibold text-white hover:bg-teal-500">
                    Join Affiliate Program
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a
                  href={program.website}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="mt-2 flex items-center justify-center gap-1.5 text-xs text-white/40 hover:text-white/60 transition-colors"
                >
                  Visit {program.name} website
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Main content */}
            <div className="space-y-10 lg:col-span-2">
              {/* Overview */}
              <section>
                <h2 className="font-heading text-2xl font-bold mb-4">Overview</h2>
                <p className="leading-relaxed text-muted-foreground">{program.description}</p>
              </section>

              {/* Pros / Cons */}
              <section>
                <h2 className="font-heading text-2xl font-bold mb-4">Pros & Cons</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                    <h3 className="mb-3 font-semibold text-emerald-800">Pros</h3>
                    <ul className="space-y-2">
                      {program.pros.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-emerald-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                    <h3 className="mb-3 font-semibold text-red-800">Cons</h3>
                    <ul className="space-y-2">
                      {program.cons.map((c) => (
                        <li key={c} className="flex items-start gap-2 text-sm text-red-700">
                          <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Pricing */}
              <section>
                <h2 className="font-heading text-2xl font-bold mb-4">Pricing</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {program.pricing.map((tier) => (
                    <div
                      key={tier.name}
                      className={`rounded-2xl border p-5 ${
                        tier.highlight
                          ? 'border-teal-300 bg-teal-50 ring-2 ring-teal-200'
                          : 'border-border bg-card'
                      }`}
                    >
                      {tier.highlight && (
                        <span className="mb-2 inline-block rounded-full bg-teal-600 px-2.5 py-0.5 text-xs font-bold text-white">
                          Most Popular
                        </span>
                      )}
                      <h3 className="font-heading text-base font-bold">{tier.name}</h3>
                      <p className="mt-1">
                        <span className="font-heading text-2xl font-extrabold">{tier.price}</span>
                        <span className="ml-1 text-sm text-muted-foreground">/{tier.period}</span>
                      </p>
                      <ul className="mt-4 space-y-1.5">
                        {tier.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-teal-600" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              {program.faq.length > 0 && (
                <section>
                  <h2 className="font-heading text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {program.faq.map((item) => (
                      <div key={item.question} className="rounded-2xl border border-border bg-card p-5">
                        <h3 className="font-semibold text-foreground">{item.question}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Affiliate disclosure */}
              <div className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/50 p-5">
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-600" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  <strong>Affiliate Disclosure:</strong> WealthPath may earn a commission if you sign up through the links on this page. This does not influence our review scores or editorial opinions. We only review programs we&apos;d genuinely recommend.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Sticky CTA */}
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-2xl">
                    {program.logo}
                  </div>
                  <div>
                    <p className="font-heading text-sm font-bold">{program.name}</p>
                    <StarRating rating={program.rating} size="sm" showLabel={false} />
                  </div>
                </div>
                <CommissionBadge commission={program.commission} className="mb-4 w-full justify-center" />
                <a href={program.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow">
                  <Button className="w-full rounded-xl bg-teal-600 font-semibold text-white hover:bg-teal-500">
                    Join Program
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>

                <div className="mt-5 space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Key Features
                  </h4>
                  {program.features.slice(0, 5).map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-teal-600" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Related programs */}
        {related.length > 0 && (
          <section className="bg-secondary/40 px-4 py-14 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold">More in {program.category}</h2>
                <Link
                  href={`/category/${program.categorySlug}`}
                  className="flex items-center gap-1.5 text-sm font-medium text-teal-600 hover:text-teal-700"
                >
                  View all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p, i) => (
                  <ProgramCard key={p.id} program={p} variant="default" index={i} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
