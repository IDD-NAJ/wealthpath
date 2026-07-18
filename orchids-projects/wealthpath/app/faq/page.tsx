'use client'

import { useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ChevronDown } from 'lucide-react'

const mockFaqs = [
  { id: '1', question: 'How does WealthPath make money?', answer: 'WealthPath earns a commission when you click an affiliate link and make a purchase.', category: 'general' },
  { id: '2', question: 'Are the deals legitimate?', answer: 'Yes, every deal is verified by our editorial team.', category: 'deals' },
  { id: '3', question: 'How do I find flight deals?', answer: 'Use our Flight Deals section and set up price alerts via our newsletter.', category: 'travel' },
]

export default function FaqPage() {
  const [openId, setOpenId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const allFaqs = mockFaqs
  const faqs = selectedCategory === 'all' ? allFaqs : allFaqs.filter((f) => f.category === selectedCategory)
  const categories = Array.from(new Set(allFaqs.map((f) => f.category)))

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <div className="mb-12 space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about WealthPath, travel deals, and our services
            </p>
          </div>

          {/* Category filters */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-teal text-white'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-4 py-2 font-medium transition-colors capitalize ${
                  selectedCategory === cat
                    ? 'bg-teal text-white'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            {faqs.map((faq) => (
              <button
                key={faq.id}
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full text-left"
              >
                <div className="rounded-lg border border-border bg-secondary/50 p-4 transition-colors hover:bg-secondary/75">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-foreground pr-4">{faq.question}</h3>
                    <ChevronDown
                      className={`h-5 w-5 text-teal flex-shrink-0 transition-transform ${
                        openId === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  {openId === faq.id && (
                    <p className="mt-4 text-muted-foreground leading-relaxed">{faq.answer}</p>
                  )}
                </div>
              </button>
            ))}
          </div>

          {faqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No FAQs found in this category</p>
            </div>
          )}

          {/* Contact section */}
          <div className="mt-16 rounded-lg border border-border bg-teal/10 p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              {"Can't find the answer you're looking for? Contact our support team."}
            </p>
            <a
              href="/contact"
              className="inline-block rounded-lg bg-teal px-6 py-3 font-semibold text-white hover:bg-teal/90 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
