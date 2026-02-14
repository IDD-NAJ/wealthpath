import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-primary px-4 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl text-center">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-4 py-1.5 text-xs font-medium text-primary-foreground/70">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-chart-2" />
          Trusted strategies for building real income
        </p>
        <h1 className="mx-auto max-w-4xl font-serif text-4xl font-bold leading-tight tracking-tight text-primary-foreground md:text-5xl lg:text-6xl text-balance">
          Your Guide to Building Sustainable Income
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/60 md:text-lg">
          Explore expert articles on freelancing, investing, online business, and more. Actionable strategies backed by research to help you grow your wealth.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/categories">
            <Button size="lg" className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8">
              Explore Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/search">
            <Button size="lg" variant="outline" className="rounded-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground px-8">
              Search Articles
            </Button>
          </Link>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-8">
          <div>
            <p className="font-serif text-3xl font-bold text-primary-foreground">15+</p>
            <p className="mt-1 text-xs text-primary-foreground/50">In-Depth Articles</p>
          </div>
          <div>
            <p className="font-serif text-3xl font-bold text-primary-foreground">6</p>
            <p className="mt-1 text-xs text-primary-foreground/50">Income Categories</p>
          </div>
          <div>
            <p className="font-serif text-3xl font-bold text-primary-foreground">100%</p>
            <p className="mt-1 text-xs text-primary-foreground/50">Free Resources</p>
          </div>
        </div>
      </div>
    </section>
  )
}
