import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import type { Article } from "@/lib/data"
import { categories } from "@/lib/data"

interface ArticleCardProps {
  article: Article
  variant?: "default" | "featured" | "compact"
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const category = categories.find(c => c.slug === article.category)

  if (variant === "featured") {
    return (
      <Link
        href={`/article/${article.slug}`}
        className="group relative flex flex-col justify-end overflow-hidden rounded-lg border border-border bg-primary p-8 transition-all hover:shadow-lg md:p-10"
      >
        <div className="relative z-10">
          {category && (
            <span className="mb-3 inline-block rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-medium text-primary-foreground">
              {category.name}
            </span>
          )}
          <h3 className="font-serif text-2xl font-bold leading-tight text-primary-foreground md:text-3xl text-balance">
            {article.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70 line-clamp-2">
            {article.excerpt}
          </p>
          <div className="mt-5 flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-primary-foreground/50">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime}
            </span>
            <span className="text-xs text-primary-foreground/50">
              {article.author}
            </span>
          </div>
          <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-primary-foreground">
            Read Article
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    )
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/article/${article.slug}`}
        className="group flex items-start gap-4 border-b border-border py-5 transition-colors last:border-0"
      >
        <div className="flex-1">
          {category && (
            <span className="mb-1 inline-block text-xs font-medium text-muted-foreground">
              {category.name}
            </span>
          )}
          <h3 className="font-serif text-base font-semibold leading-snug text-foreground group-hover:text-muted-foreground transition-colors">
            {article.title}
          </h3>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-xs text-muted-foreground">{article.readTime}</span>
            <span className="text-xs text-muted-foreground">{article.author}</span>
          </div>
        </div>
        <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </Link>
    )
  }

  return (
    <Link
      href={`/article/${article.slug}`}
      className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-all hover:shadow-md"
    >
      {category && (
        <span className="mb-3 inline-block self-start rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          {category.name}
        </span>
      )}
      <h3 className="font-serif text-lg font-semibold leading-snug text-card-foreground group-hover:text-muted-foreground transition-colors text-balance">
        {article.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
        {article.excerpt}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {article.readTime}
          </span>
          <span className="text-xs text-muted-foreground">{article.author}</span>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}
