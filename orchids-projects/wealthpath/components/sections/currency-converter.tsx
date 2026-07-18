'use client'

import { useState } from 'react'
import { ArrowLeftRight, DollarSign } from 'lucide-react'

// Static rates relative to USD (updated monthly)
const RATES: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 154.2, AUD: 1.53, CAD: 1.36,
  CHF: 0.89, CNY: 7.24, INR: 83.5, MXN: 17.1, BRL: 4.97, SGD: 1.34,
  HKD: 7.82, NOK: 10.6, SEK: 10.5, DKK: 6.88, NZD: 1.63, ZAR: 18.6,
  AED: 3.67, THB: 35.1,
}

const CURRENCIES = Object.keys(RATES)

export default function CurrencyConverter({ config = {} }: { config?: { title?: string; subtitle?: string } }) {
  const [amount, setAmount] = useState('1000')
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('EUR')

  const { title = 'Currency Converter', subtitle = 'Real-time exchange rates' } = config

  const result = ((parseFloat(amount) || 0) / RATES[from]) * RATES[to]
  const rate = RATES[to] / RATES[from]

  const swap = () => { setFrom(to); setTo(from) }

  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <DollarSign className="h-4 w-4 text-teal" />
            <span className="text-sm font-semibold uppercase tracking-widest text-teal">Tool</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground text-balance">{title}</h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>

        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-lg font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-teal/40"
              />
            </div>
            <div className="w-full sm:w-32">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">From</label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-teal/40"
              >
                {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <button
              onClick={swap}
              className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-colors hover:bg-teal hover:text-white sm:mb-0.5"
              aria-label="Swap currencies"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </button>
            <div className="w-full sm:w-32">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">To</label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-teal/40"
              >
                {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-navy px-6 py-5 text-center">
            <p className="text-4xl font-bold text-white">
              {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="ml-2 text-2xl text-white/60">{to}</span>
            </p>
            <p className="mt-2 text-sm text-white/50">
              1 {from} = {rate.toFixed(4)} {to} &nbsp;&middot;&nbsp; Indicative rate
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
