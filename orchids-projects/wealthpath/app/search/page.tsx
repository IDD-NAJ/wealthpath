import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SearchClient } from "@/components/search-client"

export const metadata: Metadata = {
  title: "Search Affiliate Programs - WealthPath",
  description: "Search and compare the best affiliate programs across finance, investing, credit cards, insurance, and more.",
}

export default function SearchPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border/40 bg-card px-4 py-14 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Search Programs
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Find the best affiliate programs across every financial category. Filter by commission, rating, or niche.
            </p>
          </div>
        </section>
        <SearchClient />
      </main>
      <SiteFooter />
    </div>
  )
}
