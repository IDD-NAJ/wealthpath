'use client'

import { useEffect, useState, useTransition } from 'react'
import { Plus, Pencil, Trash2, RefreshCw, Check, X, Send, Clock } from 'lucide-react'
import { getBlogPosts, deleteBlogPost, publishBlogPost, updateBlogPost } from '@/app/actions/blog'
import type { BlogPost } from '@/lib/db/schema'

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    published: 'bg-green-500/10 text-green-500',
    draft: 'bg-secondary text-muted-foreground',
    scheduled: 'bg-yellow-500/10 text-yellow-500',
    archived: 'bg-red-500/10 text-red-500',
  }
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${map[status] ?? map.draft}`}>
      {status}
    </span>
  )
}

export default function AdminBlogCms() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [pending, startTransition] = useTransition()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<BlogPost>>({})

  const load = async () => {
    setLoading(true)
    const data = await getBlogPosts()
    setPosts(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = (id: string) => {
    if (!confirm('Delete this post?')) return
    startTransition(async () => {
      await deleteBlogPost(id)
      setPosts((p) => p.filter((b) => b.id !== id))
    })
  }

  const handlePublish = (id: string) => {
    startTransition(async () => {
      await publishBlogPost(id)
      setPosts((p) => p.map((b) => b.id === id ? { ...b, status: 'published', publishedAt: new Date() } : b))
    })
  }

  const startEdit = (post: BlogPost) => {
    setEditingId(post.id)
    setEditData({ title: post.title, excerpt: post.excerpt, category: post.category, featured: post.featured })
  }

  const saveEdit = (id: string) => {
    startTransition(async () => {
      await updateBlogPost(id, editData)
      setPosts((p) => p.map((b) => b.id === id ? { ...b, ...editData } : b))
      setEditingId(null)
    })
  }

  const draftCount = posts.filter((p) => p.status === 'draft').length
  const publishedCount = posts.filter((p) => p.status === 'published').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Blog Posts</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage articles, guides, and reviews.</p>
        </div>
        <button disabled className="flex items-center gap-2 rounded-xl bg-teal px-4 py-2 text-sm font-semibold text-white opacity-60" title="Full editor coming soon">
          <Plus className="h-4 w-4" /> New Post
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Posts', value: posts.length },
          { label: 'Published', value: publishedCount },
          { label: 'Drafts', value: draftCount },
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
        <div className="overflow-hidden rounded-xl border border-border/50">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Title</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Author</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 bg-card">
              {posts.map((post) => (
                <tr key={post.id} className="transition-colors hover:bg-secondary/30">
                  <td className="px-4 py-3">
                    {editingId === post.id ? (
                      <input
                        className="w-full rounded border border-border bg-background px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-teal"
                        value={editData.title ?? post.title}
                        onChange={(e) => setEditData((p) => ({ ...p, title: e.target.value }))}
                      />
                    ) : (
                      <div>
                        <p className="line-clamp-1 font-semibold text-foreground">{post.title}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" /> {post.readTimeMinutes} min read
                        </p>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{post.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">{post.author}</td>
                  <td className="px-4 py-3"><StatusBadge status={post.status} /></td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {editingId === post.id ? (
                        <>
                          <button onClick={() => saveEdit(post.id)} disabled={pending} className="rounded-lg bg-teal px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-teal/90">
                            <Check className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => setEditingId(null)} className="rounded-lg border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </>
                      ) : (
                        <>
                          {post.status !== 'published' && (
                            <button onClick={() => handlePublish(post.id)} disabled={pending} className="flex items-center gap-1 rounded-lg bg-teal/10 px-2.5 py-1.5 text-xs font-semibold text-teal hover:bg-teal/20">
                              <Send className="h-3 w-3" /> Publish
                            </button>
                          )}
                          <button onClick={() => startEdit(post)} className="rounded-lg border border-border p-1.5 text-muted-foreground hover:border-teal/40 hover:text-teal">
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => handleDelete(post.id)} disabled={pending} className="rounded-lg border border-border p-1.5 text-muted-foreground hover:border-red-500/40 hover:text-red-500">
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
