'use client'

import { useEffect, useState, useTransition } from 'react'
import { Plus, Trash2, RefreshCw, Check, X, Pencil, ToggleLeft, ToggleRight } from 'lucide-react'
import { getAllFaqs, deleteFaq, updateFaq, createFaq } from '@/app/actions/faqs'
import type { FAQ } from '@/lib/db/schema'

export default function AdminFaqsCms() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [pending, startTransition] = useTransition()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<FAQ>>({})
  const [adding, setAdding] = useState(false)
  const [newFaq, setNewFaq] = useState({ question: '', answer: '', category: 'general' })

  const load = async () => {
    setLoading(true)
    const data = await getAllFaqs()
    setFaqs(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = (id: string) => {
    if (!confirm('Delete this FAQ?')) return
    startTransition(async () => {
      await deleteFaq(id)
      setFaqs((p) => p.filter((f) => f.id !== id))
    })
  }

  const handleTogglePublished = (id: string, published: boolean) => {
    startTransition(async () => {
      await updateFaq(id, { published })
      setFaqs((p) => p.map((f) => f.id === id ? { ...f, published } : f))
    })
  }

  const startEdit = (faq: FAQ) => {
    setEditingId(faq.id)
    setEditData({ question: faq.question, answer: faq.answer, category: faq.category })
  }

  const saveEdit = (id: string) => {
    startTransition(async () => {
      await updateFaq(id, editData)
      setFaqs((p) => p.map((f) => f.id === id ? { ...f, ...editData } : f))
      setEditingId(null)
    })
  }

  const handleAdd = () => {
    if (!newFaq.question || !newFaq.answer) return
    startTransition(async () => {
      await createFaq({
        question: newFaq.question,
        answer: newFaq.answer,
        category: newFaq.category,
        sectionOrder: faqs.length + 1,
        published: true,
      })
      await load()
      setAdding(false)
      setNewFaq({ question: '', answer: '', category: 'general' })
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">FAQs</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage frequently asked questions shown on the site.</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 rounded-xl bg-teal px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal/90"
        >
          <Plus className="h-4 w-4" /> Add FAQ
        </button>
      </div>

      {adding && (
        <div className="rounded-xl border border-teal/40 bg-teal/5 p-4 space-y-3">
          <h3 className="font-semibold text-foreground">New FAQ</h3>
          <input
            placeholder="Question"
            value={newFaq.question}
            onChange={(e) => setNewFaq((p) => ({ ...p, question: e.target.value }))}
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal/40"
          />
          <textarea
            placeholder="Answer"
            rows={3}
            value={newFaq.answer}
            onChange={(e) => setNewFaq((p) => ({ ...p, answer: e.target.value }))}
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal/40"
          />
          <select
            value={newFaq.category}
            onChange={(e) => setNewFaq((p) => ({ ...p, category: e.target.value }))}
            className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal/40"
          >
            {['general', 'deals', 'travel', 'finance', 'affiliate'].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <button onClick={handleAdd} disabled={pending} className="rounded-xl bg-teal px-4 py-2 text-sm font-semibold text-white hover:bg-teal/90">
              Save FAQ
            </button>
            <button onClick={() => setAdding(false)} className="rounded-xl border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="space-y-2">
          {faqs.map((faq) => (
            <div key={faq.id} className="rounded-xl border border-border/50 bg-card p-4">
              {editingId === faq.id ? (
                <div className="space-y-2">
                  <input
                    value={editData.question ?? faq.question}
                    onChange={(e) => setEditData((p) => ({ ...p, question: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-teal"
                  />
                  <textarea
                    rows={3}
                    value={editData.answer ?? faq.answer}
                    onChange={(e) => setEditData((p) => ({ ...p, answer: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-teal"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit(faq.id)} disabled={pending} className="rounded-lg bg-teal px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal/90">
                      <Check className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => setEditingId(null)} className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground capitalize">{faq.category}</span>
                    </div>
                    <p className="font-semibold text-foreground">{faq.question}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={() => handleTogglePublished(faq.id, !faq.published)}
                      disabled={pending}
                      title={faq.published ? 'Hide FAQ' : 'Show FAQ'}
                      className={`transition-colors ${faq.published ? 'text-teal hover:text-teal/70' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      {faq.published ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                    </button>
                    <button onClick={() => startEdit(faq)} className="rounded-lg border border-border p-1.5 text-muted-foreground hover:border-teal/40 hover:text-teal">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => handleDelete(faq.id)} disabled={pending} className="rounded-lg border border-border p-1.5 text-muted-foreground hover:border-red-500/40 hover:text-red-500">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
