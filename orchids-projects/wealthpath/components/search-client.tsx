"use client"

import { useState, useMemo } from "react"
import { Search, X, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ProgramCard } from "@/components/ui/program-card"
import { affiliatePrograms, affiliateCategories, getProgramCommissionValue, getProgramNiche } from "@/lib/affiliate-data"

const SORT_OPTIONS = [
  { label: "Best Rated", value: "rating" },
  { label: "Highest Commission", value: "commission" },
  { label: "Most Popular", value: "popular" },
]

export function SearchClient() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [sort, setSort] = useState("rating")

  const results = useMemo(() => {
    let filtered = [...affiliatePrograms]

    if (activeCategory) {
      filtered = filtered.filter((p) => p.category === activeCategory)
    }

    if (query.trim()) {
      const q = query.toLowerCase()
      filtered = filtered.filter(
        (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      getProgramNiche(p).toLowerCase().includes(q)
      )
    }

    if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating)
    else if (sort === "commission") filtered.sort((a, b) => getProgramCommissionValue(b) - getProgramCommissionValue(a))
    else if (sort === "popular") filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))

    return filtered
  }, [query, activeCategory, sort])

  return (
    <section className="px-4 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search programs, niches, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-13 rounded-xl border-border bg-card pl-12 pr-12 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-teal"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Filter row */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeCategory === null ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setActiveCategory(null)}
            >
              All Categories
            </Button>
            {affiliateCategories.slice(0, 8).map((cat) => (
              <Button
                key={cat.slug}
                variant={activeCategory === cat.slug ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setActiveCategory(activeCategory === cat.slug ? null : cat.slug)}
              >
                {cat.icon} {cat.name}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />
            <div className="flex gap-1">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSort(opt.value)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    sort === opt.value
                      ? "bg-teal text-white"
                      : "text-muted-foreground hover:bg-card hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mb-6 text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "program" : "programs"} found
          {query && <> for &ldquo;{query}&rdquo;</>}
          {activeCategory &&
            <> in {affiliateCategories.find((c) => c.slug === activeCategory)?.name}</>}
        </p>

        {results.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card py-20 text-center">
            <p className="text-lg font-semibold text-foreground">No programs found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your search or removing category filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => { setQuery(""); setActiveCategory(null) }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
