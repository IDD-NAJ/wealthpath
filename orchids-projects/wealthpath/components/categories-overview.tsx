import { categories } from "@/lib/data"
import { CategoryCard } from "@/components/category-card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CategoriesOverview() {
  return (
    <section className="border-y border-border bg-card px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold text-card-foreground">Browse by Category</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Find the income strategy that fits your goals
            </p>
          </div>
          <Link
            href="/categories"
            className="hidden items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground md:flex"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            View all categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
