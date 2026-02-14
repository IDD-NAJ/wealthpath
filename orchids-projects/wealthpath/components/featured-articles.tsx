import { getFeaturedArticles } from "@/lib/data"
import { ArticleCard } from "@/components/article-card"

export function FeaturedArticles() {
  const featured = getFeaturedArticles()

  return (
    <section className="px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h2 className="font-serif text-3xl font-bold text-foreground">Featured Articles</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Hand-picked guides to accelerate your income journey
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((article) => (
            <ArticleCard key={article.id} article={article} variant="featured" />
          ))}
        </div>
      </div>
    </section>
  )
}
