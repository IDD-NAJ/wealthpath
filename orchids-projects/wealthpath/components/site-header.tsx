"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categories } from "@/lib/data"

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-foreground">
          WealthPath
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          <Link href="/" className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground">
            Home
          </Link>
          <Link href="/categories" className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground">
            Categories
          </Link>
          <Link href="/search" className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Search className="h-4 w-4" />
              Search
            </span>
          </Link>
          <Link href="/contact" className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground">
            Contact
          </Link>
          <Link href="/admin">
            <Button variant="default" size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              Manage Content
            </Button>
          </Link>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border bg-background px-4 pb-6 pt-4 md:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-4">
            <Link href="/" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-foreground">
              Home
            </Link>
            <Link href="/categories" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-foreground">
              Categories
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setMobileOpen(false)}
                className="pl-4 text-sm text-muted-foreground"
              >
                {cat.name}
              </Link>
            ))}
            <Link href="/search" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-foreground">
              Search
            </Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-foreground">
              Contact
            </Link>
            <Link href="/admin" onClick={() => setMobileOpen(false)}>
              <Button variant="default" size="sm" className="w-full rounded-full bg-primary text-primary-foreground">
                Manage Content
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
