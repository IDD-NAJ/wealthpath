import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CategoryCard } from "@/components/category-card"
import { categories } from "@/lib/data"

export const metadata: Metadata = {
  title: "Categories - WealthPath",
  description: "Browse income-generating strategies by category: freelancing, investing, online business, passive income, side hustles, and real estate.",
}

export default function CategoriesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-primary px-4 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl text-balance">
              All Categories
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/60">
              Explore our comprehensive collection of income strategies organized by topic. Each category contains in-depth articles and actionable guides.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
