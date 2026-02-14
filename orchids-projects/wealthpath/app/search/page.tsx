import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SearchClient } from "@/components/search-client"

export const metadata: Metadata = {
  title: "Search Articles - WealthPath",
  description: "Search our library of income-generating strategies, guides, and expert articles.",
}

export default function SearchPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-primary px-4 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
              Search Articles
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/60">
              Find exactly what you need across our entire library of guides and strategies.
            </p>
          </div>
        </section>
        <SearchClient />
      </main>
      <SiteFooter />
    </div>
  )
}
