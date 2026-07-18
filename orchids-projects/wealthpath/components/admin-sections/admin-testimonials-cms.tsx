'use client'

import { useEffect, useState, useTransition } from 'react'
import { Trash2, Star, RefreshCw, Check, X } from 'lucide-react'
import { getTestimonials, deleteTestimonial, toggleTestimonialFeatured } from '@/app/actions/testimonials'
import type { Testimonial } from '@/lib/db/schema'

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-3 w-3 ${i < count ? 'fill-gold text-gold' : 'text-border'}`} />
      ))}
    </div>
  )
}

export default function AdminTestimonialsCms() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [pending, startTransition] = useTransition()

  const load = async () => {
    setLoading(true)
    const data = await getTestimonials()
    setTestimonials(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    startTransition(async () => {
      await deleteTestimonial(id)
      setTestimonials((p) => p.filter((t) => t.id !== id))
    })
  }

  const handleToggleFeatured = (id: string, featured: boolean) => {
    startTransition(async () => {
      await toggleTestimonialFeatured(id, featured)
      setTestimonials((p) => p.map((t) => t.id === id ? { ...t, featured } : t))
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Testimonials</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage customer reviews displayed on the homepage.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Total Reviews', value: testimonials.length },
          { label: 'Featured', value: testimonials.filter((t) => t.featured).length },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border/50 bg-card p-4">
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-xl border border-border/50 bg-card p-4 shadow-sm">
              <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-foreground">{t.authorName}</p>
                  <p className="text-xs text-muted-foreground">{t.authorTitle}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleFeatured(t.id, !t.featured)}
                    disabled={pending}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${
                      t.featured
                        ? 'bg-gold/10 text-gold hover:bg-gold/20'
                        : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {t.featured ? 'Featured' : 'Set Featured'}
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    disabled={pending}
                    className="rounded-lg border border-border p-1.5 text-muted-foreground transition-colors hover:border-red-500/40 hover:text-red-500"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <StarRow count={t.rating} />
              <p className="mt-2 line-clamp-3 text-xs text-muted-foreground">{t.content}</p>
              {t.destination && (
                <p className="mt-2 text-xs font-medium text-teal">{t.destination}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
