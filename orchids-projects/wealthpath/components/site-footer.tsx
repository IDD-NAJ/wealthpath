import Link from "next/link"
import { categories } from "@/lib/data"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight">
              WealthPath
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
              Your trusted guide to building income and creating financial freedom through proven strategies.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/50">
              Navigation
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link href="/" className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/50">
              Categories
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/50">
              Resources
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link href="/admin" className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                  Manage Content
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-primary-foreground/10 pt-8">
          <p className="text-center text-xs text-primary-foreground/40">
            {'WealthPath. All rights reserved. Content is for informational purposes only and does not constitute financial advice.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
