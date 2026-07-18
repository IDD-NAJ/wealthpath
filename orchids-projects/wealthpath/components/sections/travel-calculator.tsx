'use client'

import { useState } from 'react'
import { Calculator } from 'lucide-react'

const CATEGORIES = [
  { key: 'flights', label: 'Flights', placeholder: 800 },
  { key: 'accommodation', label: 'Accommodation', placeholder: 1200 },
  { key: 'food', label: 'Food & Dining', placeholder: 400 },
  { key: 'activities', label: 'Activities', placeholder: 300 },
  { key: 'transport', label: 'Local Transport', placeholder: 150 },
  { key: 'misc', label: 'Shopping & Misc', placeholder: 200 },
]

export default function TravelCalculator({ config = {} }: { config?: { title?: string; subtitle?: string } }) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [travelers, setTravelers] = useState('2')
  const [days, setDays] = useState('7')

  const total = CATEGORIES.reduce((sum, cat) => {
    const v = parseFloat(values[cat.key] ?? '0') || 0
    return sum + v
  }, 0)

  const perPerson = travelers ? total / Math.max(1, parseInt(travelers)) : total
  const perDay = days ? total / Math.max(1, parseInt(days)) : total

  const { title = 'Budget Calculator', subtitle = 'Estimate your total trip cost' } = config

  return (
    <section className="bg-secondary/30 py-16">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Calculator className="h-4 w-4 text-teal" />
            <span className="text-sm font-semibold uppercase tracking-widest text-teal">Tool</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground text-balance">{title}</h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>

        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Travelers
              </label>
              <input
                type="number"
                min="1"
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal/40"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Trip Days
              </label>
              <input
                type="number"
                min="1"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal/40"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {CATEGORIES.map((cat) => (
              <div key={cat.key}>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {cat.label}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                  <input
                    type="number"
                    min="0"
                    placeholder={String(cat.placeholder)}
                    value={values[cat.key] ?? ''}
                    onChange={(e) => setValues((v) => ({ ...v, [cat.key]: e.target.value }))}
                    className="w-full rounded-xl border border-border bg-background py-2.5 pl-7 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal/40"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl bg-navy p-4">
            <div className="text-center">
              <p className="text-xs text-white/50 uppercase tracking-wide">Total Budget</p>
              <p className="mt-1 text-xl font-bold text-white">${total.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-white/50 uppercase tracking-wide">Per Person</p>
              <p className="mt-1 text-xl font-bold text-teal">${perPerson.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-white/50 uppercase tracking-wide">Per Day</p>
              <p className="mt-1 text-xl font-bold text-gold">${perDay.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
