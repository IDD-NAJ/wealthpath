'use client'

import { useState } from 'react'
import { CheckSquare, Square, RotateCcw, Luggage } from 'lucide-react'

const ITEMS = [
  { id: 'passport', label: 'Passport / ID', category: 'Documents' },
  { id: 'visa', label: 'Visa & Entry Documents', category: 'Documents' },
  { id: 'insurance', label: 'Travel Insurance Policy', category: 'Documents' },
  { id: 'tickets', label: 'Flight / Train Tickets', category: 'Documents' },
  { id: 'hotel', label: 'Hotel Confirmations', category: 'Documents' },
  { id: 'adapter', label: 'Universal Power Adapter', category: 'Electronics' },
  { id: 'phone', label: 'Phone + Charger', category: 'Electronics' },
  { id: 'camera', label: 'Camera / GoPro', category: 'Electronics' },
  { id: 'powerbank', label: 'Portable Power Bank', category: 'Electronics' },
  { id: 'meds', label: 'Prescription Medications', category: 'Health' },
  { id: 'firstaid', label: 'Basic First Aid Kit', category: 'Health' },
  { id: 'sunscreen', label: 'Sunscreen SPF 50+', category: 'Health' },
  { id: 'clothes', label: 'Appropriate Clothing', category: 'Clothing' },
  { id: 'shoes', label: 'Comfortable Walking Shoes', category: 'Clothing' },
  { id: 'rain', label: 'Rain Jacket / Umbrella', category: 'Clothing' },
  { id: 'cash', label: 'Local Currency', category: 'Money' },
  { id: 'card', label: 'Travel Credit Card', category: 'Money' },
]

const CATEGORIES = Array.from(new Set(ITEMS.map((i) => i.category)))

export default function PackingChecklist({ config = {} }: { config?: { title?: string; subtitle?: string } }) {
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const { title = 'Packing Checklist', subtitle = 'Never forget an essential again' } = config

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const pct = Math.round((checked.size / ITEMS.length) * 100)

  return (
    <section className="bg-secondary/20 py-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Luggage className="h-4 w-4 text-teal" />
            <span className="text-sm font-semibold uppercase tracking-widest text-teal">Tool</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground text-balance">{title}</h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>

        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-2 w-40 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-teal transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-muted-foreground">
                {checked.size}/{ITEMS.length} packed
              </span>
            </div>
            <button
              onClick={() => setChecked(new Set())}
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {CATEGORIES.map((cat) => (
              <div key={cat}>
                <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-teal">{cat}</h4>
                <div className="space-y-1.5">
                  {ITEMS.filter((i) => i.category === cat).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-left transition-colors hover:bg-secondary"
                    >
                      {checked.has(item.id) ? (
                        <CheckSquare className="h-4 w-4 shrink-0 text-teal" />
                      ) : (
                        <Square className="h-4 w-4 shrink-0 text-muted-foreground" />
                      )}
                      <span className={checked.has(item.id) ? 'text-muted-foreground line-through' : 'text-foreground'}>
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
