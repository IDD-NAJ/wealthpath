'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

interface Testimonial {
  id: string
  authorName: string
  authorTitle: string
  authorAvatarUrl: string | null
  content: string
  rating: number
  destination: string | null
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  config?: { title?: string; subtitle?: string }
}

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < count ? 'fill-gold text-gold' : 'text-border'}`}
        />
      ))}
    </div>
  )
}

function Initials({ name }: { name: string }) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export default function TestimonialsSection({ testimonials, config = {} }: TestimonialsSectionProps) {
  if (!testimonials.length) return null
  const { title = 'What Travelers Say', subtitle = 'Real reviews from real customers' } = config

  return (
    <section className="bg-navy py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Star className="h-4 w-4 fill-gold text-gold" />
            <span className="text-sm font-semibold uppercase tracking-widest text-gold">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white text-balance">{title}</h2>
          <p className="mt-2 text-white/60">{subtitle}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <Quote className="absolute right-5 top-5 h-6 w-6 text-white/10" />
              <StarRow count={t.rating} />
              <p className="mt-4 text-sm leading-relaxed text-white/80">{t.content}</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">
                  <Initials name={t.authorName} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.authorName}</p>
                  <p className="text-xs text-white/50">
                    {t.authorTitle}
                    {t.destination ? ` · ${t.destination}` : ''}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
