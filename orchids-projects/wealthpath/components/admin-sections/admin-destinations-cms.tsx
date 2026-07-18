'use client'

import { useEffect, useState, useTransition } from 'react'
import { Plus, Pencil, Trash2, Star, TrendingUp, MapPin, RefreshCw, Check, X } from 'lucide-react'
import { getDestinations, deleteDestination, updateDestination } from '@/app/actions/destinations'
import type { Destination } from '@/lib/db/schema'
import Image from 'next/image'

export default function AdminDestinationsCms() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [pending, startTransition] = useTransition()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Destination>>({})

  const load = async () => {
    setLoading(true)
    const data = await getDestinations()
    setDestinations(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = (id: string) => {
    if (!confirm('Delete this destination?')) return
    startTransition(async () => {
      await deleteDestination(id)
      setDestinations((p) => p.filter((d) => d.id !== id))
    })
  }

  const startEdit = (dest: Destination) => {
    setEditingId(dest.id)
    setEditData({ name: dest.name, country: dest.country, featured: dest.featured, trending: dest.trending, status: dest.status })
  }

  const saveEdit = (id: string) => {
    startTransition(async () => {
      await updateDestination(id, editData)
      setDestinations((p) => p.map((d) => d.id === id ? { ...d, ...editData } : d))
      setEditingId(null)
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Destinations</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage travel destinations shown across the site.</p>
        </div>
        <button
          disabled
          className="flex items-center gap-2 rounded-xl bg-teal px-4 py-2 text-sm font-semibold text-white opacity-60"
          title="Full create form coming soon"
        >
          <Plus className="h-4 w-4" /> Add Destination
        </button>
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
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Destination</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Country</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Rating</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Flags</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 bg-card">
              {destinations.map((dest) => (
                <tr key={dest.id} className="transition-colors hover:bg-secondary/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-14 overflow-hidden rounded-lg">
                        <Image src={dest.imageUrl} alt={dest.name} fill className="object-cover" sizes="56px" />
                      </div>
                      {editingId === dest.id ? (
                        <input
                          className="rounded border border-border bg-background px-2 py-1 text-sm text-foreground w-32 focus:outline-none focus:ring-1 focus:ring-teal"
                          value={editData.name ?? dest.name}
                          onChange={(e) => setEditData((p) => ({ ...p, name: e.target.value }))}
                        />
                      ) : (
                        <span className="font-semibold text-foreground">{dest.name}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {dest.country}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-gold">
                      <Star className="h-3.5 w-3.5 fill-gold" />
                      <span className="font-semibold text-foreground">{dest.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      {dest.featured && (
                        <span className="rounded-full bg-teal/10 px-2 py-0.5 text-xs font-medium text-teal">Featured</span>
                      )}
                      {dest.trending && (
                        <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-xs font-medium text-orange-500">Trending</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      dest.status === 'published'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-secondary text-muted-foreground'
                    }`}>
                      {dest.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {editingId === dest.id ? (
                        <>
                          <button
                            onClick={() => saveEdit(dest.id)}
                            disabled={pending}
                            className="rounded-lg bg-teal px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-teal/90"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="rounded-lg border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(dest)}
                            className="rounded-lg border border-border p-1.5 text-muted-foreground transition-colors hover:border-teal/40 hover:text-teal"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(dest.id)}
                            disabled={pending}
                            className="rounded-lg border border-border p-1.5 text-muted-foreground transition-colors hover:border-red-500/40 hover:text-red-500"
                          >
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
