import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArticleCard } from "@/components/article-card"
import { categories, getCategoryBySlug, getArticlesByCategory } from "@/lib/data"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) return { title: "Category Not Found" }
  return {
    title: `${category.name} - WealthPath`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) notFound()

  const categoryArticles = getArticlesByCategory(slug)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-primary px-4 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/categories"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              All Categories
            </Link>
            <h1 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
              {category.name}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/60">
              {category.description}
            </p>
            <p className="mt-4 text-xs text-primary-foreground/40">
              {categoryArticles.length} {categoryArticles.length === 1 ? "article" : "articles"}
            </p>
          </div>
        </section>

        <section className="px-4 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {categoryArticles.length === 0 ? (
              <p className="text-center text-muted-foreground">No articles in this category yet.</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categoryArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
