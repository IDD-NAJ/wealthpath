'use client'

import { useState } from 'react'
import { useAdmin } from '@/lib/admin-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react'

export default function AdminArticles() {
  const { state, addArticle, updateArticle, deleteArticle } = useAdmin()
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'freelancing',
    excerpt: '',
    featured: false,
  })

  const handleSubmit = () => {
    if (editingId) {
      updateArticle(editingId, formData)
      setEditingId(null)
    } else {
      addArticle({
        ...formData,
        author: 'Admin',
        status: 'draft',
        slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
      } as any)
    }
    setFormData({ title: '', content: '', category: 'freelancing', excerpt: '', featured: false })
    setIsOpen(false)
  }

  const handleEdit = (article: any) => {
    setFormData(article)
    setEditingId(article.id)
    setIsOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold">Articles Management</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Article' : 'Create New Article'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Article title"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Excerpt</Label>
                <Input
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief summary"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Content</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Article content"
                  className="mt-1 min-h-48"
                />
              </div>
              <div>
                <Label>Category</Label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                >
                  <option>freelancing</option>
                  <option>investing</option>
                  <option>ecommerce</option>
                  <option>passive-income</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="h-4 w-4"
                />
                <Label htmlFor="featured" className="mb-0">Mark as featured</Label>
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editingId ? 'Update Article' : 'Create Article'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Published</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.articles.slice(0, 10).map((article) => (
                <tr key={article.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-sm">{article.title}</p>
                      <p className="text-xs text-muted-foreground">{article.excerpt}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{article.category}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      article.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{new Date(article.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(article)}
                      className="mr-2"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteArticle(article.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
