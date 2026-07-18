'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  affiliatePrograms, affiliateCategories, type AffiliateProgram,
  getProgramStatus, getProgramNiche, getProgramLink,
} from '@/lib/affiliate-data'
import {
  Plus, Search, ExternalLink, Edit2, Archive, TrendingUp, Star,
  DollarSign,
} from 'lucide-react'

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-emerald-500/10 text-emerald-500',
  pending: 'bg-amber-500/10 text-amber-600',
  inactive: 'bg-red-500/10 text-red-400',
}

export default function AdminAffiliates() {
  const [programs, setPrograms] = useState<AffiliateProgram[]>(affiliatePrograms)
  const [query, setQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editTarget, setEditTarget] = useState<AffiliateProgram | null>(null)

  // Derived metrics
  const activeCount = programs.filter((p) => getProgramStatus(p) === 'active').length
  const totalPrograms = programs.length
  const avgRating = (programs.reduce((s, p) => s + p.rating, 0) / totalPrograms).toFixed(1)
  const featuredCount = programs.filter((p) => p.featured).length

  const filtered = programs.filter((p) => {
    const niche = getProgramNiche(p).toLowerCase()
    const matchQ = !query || p.name.toLowerCase().includes(query.toLowerCase()) || niche.includes(query.toLowerCase())
    const matchCat = filterCategory === 'all' || p.categorySlug === filterCategory
    const matchStatus = filterStatus === 'all' || getProgramStatus(p) === filterStatus
    return matchQ && matchCat && matchStatus
  })

  const handleArchive = (id: string) => {
    setPrograms((prev) => prev.map((p): AffiliateProgram => p.id === id ? { ...p, status: 'inactive' } : p))
  }

  const handleActivate = (id: string) => {
    setPrograms((prev) => prev.map((p): AffiliateProgram => p.id === id ? { ...p, status: 'active' } : p))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Affiliate Programs</h2>
          <p className="mt-1 text-sm text-muted-foreground">Manage all programs, commissions, and featured listings</p>
        </div>
        <Button className="bg-teal text-white hover:bg-teal/90 shrink-0" onClick={() => { setEditTarget(null); setShowForm(true) }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Program
        </Button>
      </div>

      {/* KPI Strip */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Programs', value: totalPrograms, icon: TrendingUp },
          { label: 'Active', value: activeCount, icon: Star },
          { label: 'Featured', value: featuredCount, icon: DollarSign },
          { label: 'Avg Rating', value: avgRating, icon: Star },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label} className="flex items-center gap-4 border-border/60 bg-card p-5">
            <div className="rounded-xl bg-teal/10 p-2.5">
              <Icon className="h-4 w-4 text-teal" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-2xl font-bold text-foreground">{value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search programs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 bg-card border-border/60"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="rounded-md border border-border/60 bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-teal"
        >
          <option value="all">All Categories</option>
          {affiliateCategories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-md border border-border/60 bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-teal"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="inactive">Inactive</option>
        </select>
        <span className="flex items-center text-xs text-muted-foreground self-center">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Table */}
      <Card className="overflow-hidden border-border/60 bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 bg-secondary/30">
                {['Program', 'Category', 'Commission', 'Rating', 'Featured', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((prog) => (
                <tr key={prog.id} className="border-b border-border/30 transition-colors hover:bg-secondary/20">
                  <td className="px-5 py-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{prog.name}</p>
                      <p className="text-xs text-muted-foreground">{getProgramNiche(prog)}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm capitalize text-muted-foreground">{prog.category}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-teal">{prog.commission}</td>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-1 text-sm">
                      <Star className="h-3 w-3 fill-gold text-gold" />
                      {prog.rating.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${prog.featured ? 'bg-gold/10 text-gold' : 'bg-secondary text-muted-foreground'}`}>
                      {prog.featured ? 'Featured' : 'Standard'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {(() => { const s = getProgramStatus(prog); return (
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[s] ?? 'bg-secondary text-muted-foreground'}`}>
                        {s}
                      </span>
                    )})()}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        title="Edit"
                        onClick={() => { setEditTarget(prog); setShowForm(true) }}
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <a
                        href={getProgramLink(prog)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-teal"
                        title="Visit"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      {getProgramStatus(prog) === 'active' ? (
                        <button
                          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-red-400"
                          title="Archive"
                          onClick={() => handleArchive(prog.id)}
                        >
                          <Archive className="h-3.5 w-3.5" />
                        </button>
                      ) : (
                        <button
                          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-emerald-400"
                          title="Activate"
                          onClick={() => handleActivate(prog.id)}
                        >
                          <TrendingUp className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-sm text-muted-foreground">
              No programs match your filters.
            </div>
          )}
        </div>
      </Card>

      {/* Add/Edit modal placeholder */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <Card className="w-full max-w-lg border-border/60 bg-card p-6">
            <h3 className="mb-4 font-display text-lg font-bold text-foreground">
              {editTarget ? `Edit: ${editTarget.name}` : 'Add New Program'}
            </h3>
            <div className="space-y-3">
              <Input placeholder="Program name" defaultValue={editTarget?.name ?? ''} className="bg-background border-border/60" />
              <Input placeholder="Affiliate link" defaultValue={editTarget ? getProgramLink(editTarget) : ''} className="bg-background border-border/60" />
              <Input placeholder="Commission (e.g. $65 per lead)" defaultValue={editTarget?.commission ?? ''} className="bg-background border-border/60" />
              <select
                defaultValue={editTarget?.category ?? 'investing'}
                className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm text-foreground"
              >
                {affiliateCategories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button className="bg-teal text-white hover:bg-teal/90" onClick={() => setShowForm(false)}>
                {editTarget ? 'Save Changes' : 'Create Program'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
