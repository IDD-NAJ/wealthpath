'use client'

import { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'

interface NewsletterSectionProps {
  config?: { title?: string; subtitle?: string }
}

export default function NewsletterSection({ config = {} }: NewsletterSectionProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const { title = 'Stay Ahead of the Deals', subtitle = 'Get weekly travel deals and finance tips straight to your inbox.' } = config

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section className="bg-gradient-to-br from-teal/10 via-background to-background py-16">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Mail className="h-4 w-4 text-teal" />
          <span className="text-sm font-semibold uppercase tracking-widest text-teal">Newsletter</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground text-balance">{title}</h2>
        <p className="mt-3 text-muted-foreground">{subtitle}</p>

        {submitted ? (
          <div className="mt-8 flex items-center justify-center gap-3 rounded-xl border border-teal/30 bg-teal/10 px-6 py-4">
            <CheckCircle className="h-5 w-5 text-teal" />
            <span className="font-semibold text-teal">You&apos;re subscribed! Welcome aboard.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal/40"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-teal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal/90"
            >
              Subscribe
            </button>
          </form>
        )}
        <p className="mt-3 text-xs text-muted-foreground">
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  )
}
