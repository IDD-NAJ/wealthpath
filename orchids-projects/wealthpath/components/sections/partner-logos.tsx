import { Building2 } from 'lucide-react'

const PARTNERS = [
  { name: 'Booking.com', abbr: 'BKG' },
  { name: 'Skyscanner', abbr: 'SKY' },
  { name: 'Airbnb', abbr: 'ABB' },
  { name: 'Viator', abbr: 'VIA' },
  { name: 'World Nomads', abbr: 'WN' },
  { name: 'Expedia', abbr: 'EXP' },
  { name: 'Chase Sapphire', abbr: 'CSP' },
  { name: 'Amex Travel', abbr: 'AMX' },
]

interface PartnerLogosProps {
  config?: { title?: string }
}

export default function PartnerLogos({ config = {} }: PartnerLogosProps) {
  const { title = 'Our Trusted Partners' } = config
  return (
    <section className="border-y border-border/50 bg-secondary/20 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-2 rounded-xl border border-border/50 bg-card px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:border-teal/40 hover:text-foreground"
            >
              <Building2 className="h-4 w-4 text-teal/60" />
              {p.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
