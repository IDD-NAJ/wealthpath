'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, Search, ChevronDown, TrendingUp, BarChart3,
  Globe, Brain, CreditCard, Briefcase, ArrowRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { categories } from '@/lib/affiliate-data'

const navLinks = [
  { label: 'Programs', href: '/programs' },
  { label: 'Comparisons', href: '/comparisons' },
  { label: 'Reviews', href: '/reviews' },
]

const categoryIcons: Record<string, React.ReactNode> = {
  investing: <TrendingUp className="h-4 w-4" />,
  crypto: <BarChart3 className="h-4 w-4" />,
  'ai-tools': <Brain className="h-4 w-4" />,
  'web-hosting': <Globe className="h-4 w-4" />,
  'credit-cards': <CreditCard className="h-4 w-4" />,
  'business-software': <Briefcase className="h-4 w-4" />,
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setCategoriesOpen(false)
  }, [pathname])

  const featuredCategories = categories.filter((c) => c.featured).slice(0, 6)

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-navy-900/95 backdrop-blur-md shadow-navy-deep'
          : 'bg-navy-900'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600">
            <span className="font-heading text-sm font-black text-white">W</span>
          </div>
          <span className="font-heading text-lg font-bold text-white">
            Wealth<span className="text-teal-400">Path</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {/* Categories dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCategoriesOpen(true)}
            onMouseLeave={() => setCategoriesOpen(false)}
          >
            <button
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white',
                categoriesOpen && 'bg-white/10 text-white'
              )}
              aria-expanded={categoriesOpen}
            >
              Categories
              <ChevronDown
                className={cn('h-3.5 w-3.5 transition-transform duration-200', categoriesOpen && 'rotate-180')}
              />
            </button>

            <AnimatePresence>
              {categoriesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-1 w-80 rounded-2xl border border-white/10 bg-navy-900 p-4 shadow-navy-deep"
                >
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                    Browse Categories
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {featuredCategories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        className="group flex items-center gap-2 rounded-xl p-2.5 transition-colors hover:bg-white/10"
                      >
                        <span className="text-teal-400">
                          {categoryIcons[cat.slug] ?? <Briefcase className="h-4 w-4" />}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-white transition-colors group-hover:text-teal-300">
                            {cat.name}
                          </p>
                          <p className="text-xs text-white/40">{cat.programCount} programs</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 border-t border-white/10 pt-3">
                    <Link
                      href="/categories"
                      className="flex items-center gap-1.5 text-sm font-medium text-teal-400 transition-colors hover:text-teal-300"
                    >
                      View all categories
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'bg-white/10 text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/search" aria-label="Search programs">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
            >
              <Search className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/programs">
            <Button
              size="sm"
              className="rounded-xl bg-teal-600 font-medium text-white shadow-sm hover:bg-teal-500"
            >
              Explore Programs
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-white/80 hover:bg-white/10 hover:text-white lg:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10 bg-navy-900 lg:hidden"
          >
            <nav className="flex flex-col gap-1 p-4" aria-label="Mobile navigation">
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-white/40">
                Categories
              </p>
              {featuredCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <span className="text-teal-400">
                    {categoryIcons[cat.slug] ?? <Briefcase className="h-4 w-4" />}
                  </span>
                  {cat.name}
                </Link>
              ))}
              <div className="my-2 border-t border-white/10" />
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2">
                <Link href="/search">
                  <Button variant="outline" className="w-full rounded-xl border-white/20 text-white hover:bg-white/10">
                    <Search className="mr-2 h-4 w-4" />
                    Search Programs
                  </Button>
                </Link>
                <Link href="/programs">
                  <Button className="w-full rounded-xl bg-teal-600 text-white hover:bg-teal-500">
                    Explore Programs
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
