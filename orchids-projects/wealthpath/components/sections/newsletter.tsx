'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section className="bg-navy-900 px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600">
            <Mail className="h-7 w-7 text-white" />
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-teal-400">
            Free Weekly Newsletter
          </p>

          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl text-balance">
            Stay Ahead of the Best Affiliate Opportunities
          </h2>

          <p className="mt-4 text-base leading-relaxed text-white/60">
            Every Friday we send the top 5 highest-paying new affiliate programs,
            updated commission rates, and tips from our editorial team.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 flex items-center justify-center gap-3 rounded-2xl border border-teal-500/30 bg-teal-500/10 px-8 py-5"
            >
              <CheckCircle2 className="h-5 w-5 text-teal-400" />
              <p className="font-medium text-white">
                You&apos;re in! Check your inbox for a confirmation email.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/40 focus-visible:ring-teal-500 h-12"
              />
              <Button
                type="submit"
                size="lg"
                className="flex-shrink-0 rounded-xl bg-teal-600 px-6 font-semibold text-white hover:bg-teal-500 shadow-teal-glow h-12"
              >
                Subscribe Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-white/30">
            No spam, ever. Unsubscribe in one click. Sent every Friday.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
