"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArticleCard } from "@/components/article-card"
import { articles, categories } from "@/lib/data"

export function SearchClient() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const results = useMemo(() => {
    let filtered = articles

    if (activeCategory) {
      filtered = filtered.filter((a) => a.category === activeCategory)
    }

    if (query.trim()) {
      const q = query.toLowerCase()
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      )
    }

    return filtered
  }, [query, activeCategory])

  return (
    <section className="px-4 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for articles, topics, strategies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 rounded-lg border-border bg-card pl-12 pr-12 text-base text-card-foreground placeholder:text-muted-foreground"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          <Button
            variant={activeCategory === null ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setActiveCategory(null)}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.slug}
              variant={activeCategory === cat.slug ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setActiveCategory(activeCategory === cat.slug ? null : cat.slug)}
            >
              {cat.name}
            </Button>
          ))}
        </div>

        <p className="mb-6 text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "article" : "articles"} found
          {query && ` for "${query}"`}
          {activeCategory && ` in ${categories.find(c => c.slug === activeCategory)?.name}`}
        </p>

        {results.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg font-medium text-foreground">No articles found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your search query or removing category filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
