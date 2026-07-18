'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, ArrowRight, Star, Shield, Zap } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface HeroSectionProps {
  config?: { headline?: string; subheading?: string }
}

const TRUST_BADGES = [
  { icon: Star, text: '4.9/5 from 12,000+ reviews' },
  { icon: Shield, text: 'Secure & verified deals' },
  { icon: Zap, text: 'Updated daily' },
]

export default function HeroSection({ config = {} }: HeroSectionProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const {
    headline = 'Explore the World, Build Your Wealth',
    subheading = 'Top deals on travel, finance tools, and affiliate programs — curated by experts.',
  } = config

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/destinations?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <section className="relative overflow-hidden bg-navy py-24 md:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#14b8a6_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,#1a2744_0%,transparent_50%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-sm font-semibold text-teal">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            Trusted by 500,000+ travelers worldwide
          </div>

          <h1 className="mt-4 text-4xl font-bold text-white text-balance sm:text-5xl md:text-6xl leading-tight">
            {headline}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60 leading-relaxed">
            {subheading}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          onSubmit={handleSearch}
          className="mx-auto mt-10 flex max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm focus-within:border-teal/50"
        >
          <div className="flex flex-1 items-center gap-3 px-4">
            <Search className="h-5 w-5 shrink-0 text-white/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations, deals, programs..."
              className="flex-1 bg-transparent py-4 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 bg-teal px-5 py-4 text-sm font-semibold text-white transition-colors hover:bg-teal/90"
          >
            Search <ArrowRight className="h-4 w-4" />
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6"
        >
          {TRUST_BADGES.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-white/50">
              <Icon className="h-4 w-4 text-teal/70" />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {['Bali', 'Paris', 'Tokyo', 'Maldives', 'Dubai'].map((dest) => (
            <Link
              key={dest}
              href={`/destinations/${dest.toLowerCase()}`}
              className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/60 transition-colors hover:border-teal/40 hover:text-white"
            >
              {dest}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
