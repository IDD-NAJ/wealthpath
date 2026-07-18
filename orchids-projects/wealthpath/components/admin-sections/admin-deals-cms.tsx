'use client'

import { useEffect, useState, useTransition } from 'react'
import { Plus, Pencil, Trash2, RefreshCw, Check, X, Tag } from 'lucide-react'
import { getDeals, deleteDeal, updateDeal } from '@/app/actions/deals'
import type { Deal } from '@/lib/db/schema'
import Image from 'next/image'

const TYPE_COLORS: Record<string, string> = {
  hotel: 'bg-teal/10 text-teal',
  flight: 'bg-blue-500/10 text-blue-400',
  tour: 'bg-green-500/10 text-green-500',
  cruise: 'bg-indigo-500/10 text-indigo-400',
  insurance: 'bg-purple-500/10 text-purple-400',
}

export default function AdminDealsCms() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [pending, startTransition] = useTransition()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Deal>>({})

  const load = async () => {
    setLoading(true)
    const data = await getDeals()
    setDeals(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = (id: string) => {
    if (!confirm('Delete this deal?')) return
    startTransition(async () => {
      await deleteDeal(id)
      setDeals((p) => p.filter((d) => d.id !== id))
    })
  }

  const startEdit = (deal: Deal) => {
    setEditingId(deal.id)
    setEditData({ title: deal.title, salePriceUsd: deal.salePriceUsd ?? undefined, featured: deal.featured, status: deal.status })
  }

  const saveEdit = (id: string) => {
    startTransition(async () => {
      await updateDeal(id, editData)
      setDeals((p) => p.map((d) => d.id === id ? { ...d, ...editData } : d))
      setEditingId(null)
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Deals</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage all travel deals and affiliate offers.</p>
        </div>
        <button disabled className="flex items-center gap-2 rounded-xl bg-teal px-4 py-2 text-sm font-semibold text-white opacity-60" title="Full form coming soon">
          <Plus className="h-4 w-4" /> Add Deal
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {(['hotel', 'flight', 'tour', 'cruise'] as const).map((type) => {
          const count = deals.filter((d) => d.type === type).length
          return (
            <div key={type} className="rounded-xl border border-border/50 bg-card p-4">
              <p className="text-xl font-bold text-foreground">{count}</p>
              <p className="mt-0.5 text-xs capitalize text-muted-foreground">{type}s</p>
            </div>
          )
        })}
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border/50">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Deal</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Price</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Discount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 bg-card">
              {deals.map((deal) => (
                <tr key={deal.id} className="transition-colors hover:bg-secondary/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-14 overflow-hidden rounded-lg">
                        <Image src={deal.imageUrl} alt={deal.title} fill className="object-cover" sizes="56px" />
                      </div>
                      {editingId === deal.id ? (
                        <input
                          className="rounded border border-border bg-background px-2 py-1 text-sm text-foreground w-40 focus:outline-none focus:ring-1 focus:ring-teal"
                          value={editData.title ?? deal.title}
                          onChange={(e) => setEditData((p) => ({ ...p, title: e.target.value }))}
                        />
                      ) : (
                        <span className="line-clamp-1 max-w-[160px] font-semibold text-foreground">{deal.title}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${TYPE_COLORS[deal.type] ?? 'bg-secondary text-muted-foreground'}`}>
                      {deal.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {editingId === deal.id ? (
                      <input
                        type="number"
                        className="w-20 rounded border border-border bg-background px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-teal"
                        value={editData.salePriceUsd ?? deal.salePriceUsd ?? ''}
                        onChange={(e) => setEditData((p) => ({ ...p, salePriceUsd: parseInt(e.target.value) }))}
                      />
                    ) : (
                      <span className="font-semibold text-teal">${deal.salePriceUsd?.toLocaleString() ?? '—'}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {deal.discountPercent && (
                      <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-bold text-red-500">
                        -{deal.discountPercent}%
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      deal.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-secondary text-muted-foreground'
                    }`}>
                      {deal.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {editingId === deal.id ? (
                        <>
                          <button onClick={() => saveEdit(deal.id)} disabled={pending} className="rounded-lg bg-teal px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-teal/90">
                            <Check className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => setEditingId(null)} className="rounded-lg border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEdit(deal)} className="rounded-lg border border-border p-1.5 text-muted-foreground hover:border-teal/40 hover:text-teal">
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => handleDelete(deal.id)} disabled={pending} className="rounded-lg border border-border p-1.5 text-muted-foreground hover:border-red-500/40 hover:text-red-500">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
