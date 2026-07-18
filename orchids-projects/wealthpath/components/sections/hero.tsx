'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Search, ShieldCheck, RefreshCw, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const stats = [
  { value: '500+', label: 'Programs Reviewed' },
  { value: '12', label: 'Categories' },
  { value: '100K+', label: 'Monthly Readers' },
]

const floatingCards = [
  { label: 'Robinhood', value: '+22% this month', color: 'bg-emerald-500', icon: '📈' },
  { label: 'ChatGPT Plus', value: '30% recurring', color: 'bg-teal-500', icon: '🧠' },
  { label: 'Coinbase', value: '4.3 ★ rating', color: 'bg-blue-500', icon: '₿' },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-navy-900 px-4 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">
      {/* Grid background pattern */}
      <div className="absolute inset-0 bg-hero-grid opacity-40" aria-hidden="true" />

      {/* Subtle glow orb */}
      <div
        className="absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-teal-600/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
              <span className="text-xs font-medium text-teal-300">Updated weekly — July 2025</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-white text-balance md:text-5xl lg:text-6xl"
            >
              Find the Best{' '}
              <span className="text-teal-400">Wealth-Building</span>{' '}
              Platforms
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-white/60 md:text-lg"
            >
              Expert reviews and side-by-side comparisons of investment platforms,
              crypto exchanges, AI tools, and more — so you earn smarter, not harder.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link href="/programs">
                <Button
                  size="lg"
                  className="rounded-xl bg-teal-600 px-7 font-semibold text-white shadow-teal-glow hover:bg-teal-500"
                >
                  Explore Programs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/comparisons">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl border-white/20 bg-transparent px-7 font-medium text-white hover:bg-white/10 hover:text-white"
                >
                  Compare Platforms
                </Button>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              {[
                { icon: <ShieldCheck className="h-4 w-4 text-teal-400" />, label: 'Unbiased Reviews' },
                { icon: <Star className="h-4 w-4 text-gold-400" />, label: 'Expert Rated' },
                { icon: <RefreshCw className="h-4 w-4 text-blue-400" />, label: 'Updated Weekly' },
              ].map(({ icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 text-xs font-medium text-white/50">
                  {icon}
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: floating cards */}
          <div className="relative hidden lg:block">
            <div className="relative h-96 w-full">
              {floatingCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                  style={{
                    top: `${20 + i * 28}%`,
                    left: i % 2 === 0 ? '5%' : '35%',
                  }}
                  className="absolute"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 backdrop-blur-sm shadow-lg"
                  >
                    <span className="text-2xl">{card.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{card.label}</p>
                      <p className="text-xs text-white/60">{card.value}</p>
                    </div>
                    <span className={`ml-2 h-2 w-2 rounded-full ${card.color}`} />
                  </motion.div>
                </motion.div>
              ))}

              {/* Background decoration ring */}
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" aria-hidden="true" />
              <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-16 grid grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur-sm"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl font-extrabold text-white md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-xs text-white/50">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
