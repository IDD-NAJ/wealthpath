import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArticleContent } from "@/components/article-content"
import { ArticleSidebar } from "@/components/article-sidebar"
import { articles, getArticleBySlug, categories, getArticlesByCategory } from "@/lib/data"
import type { Metadata } from "next"

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: "Article Not Found" }
  return {
    title: `${article.title} - WealthPath`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) notFound()

  const category = categories.find((c) => c.slug === article.category)
  const relatedArticles = getArticlesByCategory(article.category)
    .filter((a) => a.id !== article.id)
    .slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <ArticleContent article={article} categoryName={category?.name} />
            <ArticleSidebar article={article} relatedArticles={relatedArticles} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
