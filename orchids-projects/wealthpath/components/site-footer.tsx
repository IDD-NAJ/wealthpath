'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const footerColumns = [
  {
    title: 'Programs',
    links: [
      { label: 'Investing', href: '/category/investing' },
      { label: 'Crypto', href: '/category/crypto' },
      { label: 'AI Tools', href: '/category/ai-tools' },
      { label: 'Web Hosting', href: '/category/web-hosting' },
      { label: 'Business Software', href: '/category/business-software' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'All Reviews', href: '/reviews' },
      { label: 'Comparisons', href: '/comparisons' },
      { label: 'Search Programs', href: '/search' },
      { label: 'Categories', href: '/categories' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'How We Review', href: '/methodology' },
      { label: 'Advertise', href: '/advertise' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Affiliate Disclosure', href: '/disclosure' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-navy-900 text-white">
      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="font-heading text-xl font-bold">
                Weekly affiliate program picks
              </h3>
              <p className="mt-1 text-sm text-white/60">
                Get the highest-paying programs delivered to your inbox every Friday.
              </p>
            </div>
            <form className="flex w-full max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="your@email.com"
                className="rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/40 focus-visible:ring-teal-500"
              />
              <Button
                type="submit"
                className="flex-shrink-0 rounded-xl bg-teal-600 text-white hover:bg-teal-500"
              >
                Subscribe
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main columns */}
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600">
                <span className="font-heading text-sm font-black text-white">W</span>
              </div>
              <span className="font-heading text-lg font-bold">
                Wealth<span className="text-teal-400">Path</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/50">
              Unbiased reviews and comparisons of wealth-building platforms. Updated weekly.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://twitter.com/wealthpath"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Twitter / X"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/wealthpath"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center md:flex-row md:text-left lg:px-8">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} WealthPath. All rights reserved.
          </p>
          <p className="max-w-lg text-xs text-white/30">
            <strong className="text-white/50">Affiliate Disclosure:</strong> WealthPath may earn a commission when you click links on this site. This does not affect our editorial independence or the objectivity of our reviews.
          </p>
        </div>
      </div>
    </footer>
  )
}
