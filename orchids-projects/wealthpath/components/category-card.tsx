import Link from "next/link"
import { ArrowRight, Briefcase, TrendingUp, Globe, Zap, Layers, Home } from "lucide-react"
import type { Category } from "@/lib/data"

const iconMap: Record<string, React.ElementType> = {
  Briefcase,
  TrendingUp,
  Globe,
  Zap,
  Layers,
  Home,
}

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Briefcase

  return (
    <Link
      href={`/category/${category.slug}`}
      className="group flex items-start gap-4 rounded-lg border border-border bg-card p-6 transition-all hover:shadow-md"
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
        <Icon className="h-5 w-5 text-secondary-foreground" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-card-foreground group-hover:text-muted-foreground transition-colors">
          {category.name}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {category.description}
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-foreground">
          {category.articleCount} {category.articleCount === 1 ? "article" : "articles"}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
