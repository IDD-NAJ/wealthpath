import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, SlidersHorizontal } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProgramCard } from "@/components/ui/program-card"
import { affiliateCategories, getProgramsByCategory, affiliatePrograms } from "@/lib/affiliate-data"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return affiliateCategories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = affiliateCategories.find((c) => c.slug === slug)
  if (!category) return { title: "Category Not Found" }
  return {
    title: `Best ${category.name} Programs - WealthPath`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = affiliateCategories.find((c) => c.slug === slug)
  if (!category) notFound()

  const programs = getProgramsByCategory(slug)

  const topPicks = affiliateCategories
    .filter((c) => c.slug !== slug)
    .slice(0, 5)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="border-b border-border/40 bg-card px-4 py-14 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-teal/10 text-3xl">
                {category.icon}
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                  {category.name}
                </h1>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {programs.length} programs available
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row">
            {/* Sidebar */}
            <aside className="w-full lg:w-56 shrink-0">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Other Categories
              </h3>
              <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                {topPicks.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </Link>
                ))}
              </div>
            </aside>

            {/* Programs Grid */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-xl font-bold text-foreground">
                  Top {category.name} Programs
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>{programs.length} results</span>
                </div>
              </div>
              {programs.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-16 text-center">
                  <p className="text-muted-foreground">No programs in this category yet. Check back soon.</p>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {programs.map((program) => (
                    <ProgramCard key={program.id} program={program} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
