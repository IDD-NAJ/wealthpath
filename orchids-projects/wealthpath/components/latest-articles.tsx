import { articles } from "@/lib/data"
import { ArticleCard } from "@/components/article-card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function LatestArticles() {
  const latest = articles.slice(0, 9)

  return (
    <section className="px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground">Latest Articles</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Stay informed with our newest guides and strategies
            </p>
          </div>
          <Link
            href="/search"
            className="hidden items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground md:flex"
          >
            Browse all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            Browse all articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
