"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="border-t border-border bg-secondary px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary">
          <Mail className="h-5 w-5 text-primary-foreground" />
        </div>
        <h2 className="mt-6 font-serif text-2xl font-bold text-secondary-foreground">
          Stay Ahead of the Curve
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Get the latest income strategies, market insights, and expert tips delivered to your inbox every week.
        </p>

        {submitted ? (
          <div className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-foreground">
            <CheckCircle className="h-5 w-5" />
            Thank you for subscribing!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 rounded-full border-border bg-background px-5 text-foreground placeholder:text-muted-foreground"
            />
            <Button type="submit" className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90">
              Subscribe
            </Button>
          </form>
        )}

        <p className="mt-4 text-xs text-muted-foreground">
          No spam, ever. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}
