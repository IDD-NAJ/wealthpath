'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle } from 'lucide-react'

interface Faq {
  id: string
  question: string
  answer: string
  category: string
}

interface FaqSectionProps {
  faqs: Faq[]
  config?: { title?: string }
}

export default function FaqSection({ faqs, config = {} }: FaqSectionProps) {
  const [open, setOpen] = useState<string | null>(null)
  if (!faqs.length) return null
  const { title = 'Frequently Asked Questions' } = config

  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-10 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <HelpCircle className="h-4 w-4 text-teal" />
            <span className="text-sm font-semibold uppercase tracking-widest text-teal">FAQ</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground text-balance">{title}</h2>
        </div>

        <div className="divide-y divide-border">
          {faqs.map((faq) => (
            <div key={faq.id}>
              <button
                className="flex w-full items-start justify-between gap-4 py-5 text-left"
                onClick={() => setOpen(open === faq.id ? null : faq.id)}
              >
                <span className="font-semibold text-foreground leading-snug">{faq.question}</span>
                <span className="mt-0.5 shrink-0 rounded-full bg-secondary p-1 text-muted-foreground">
                  {open === faq.id ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
