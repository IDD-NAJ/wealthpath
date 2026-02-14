'use client'

import { useAdmin } from '@/lib/admin-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'

export default function AdminModeration() {
  const { state, approveContent, rejectContent } = useAdmin()

  const pendingItems = state.moderationQueue.filter(m => m.status === 'pending')
  const approvedItems = state.moderationQueue.filter(m => m.status === 'approved').length
  const rejectedItems = state.moderationQueue.filter(m => m.status === 'rejected').length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold">Content Moderation</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Review and approve user-generated content
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Pending Review</p>
          <p className="mt-2 text-3xl font-bold">{pendingItems.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Approved</p>
          <p className="mt-2 text-3xl font-bold text-green-600">{approvedItems}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Rejected</p>
          <p className="mt-2 text-3xl font-bold text-red-600">{rejectedItems}</p>
        </Card>
      </div>

      {/* Pending Content */}
      <Card className="overflow-hidden">
        <div className="border-b border-border p-6">
          <h3 className="font-semibold">Pending Content Review</h3>
        </div>
        <div className="space-y-3 p-6">
          {pendingItems.length > 0 ? (
            pendingItems.map((item) => (
              <div key={item.id} className="flex items-start justify-between border-l-4 border-yellow-400 bg-yellow-50/50 p-4">
                <div>
                  <p className="font-medium text-sm">{item.contentType}: {item.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Submitted by: {item.submittedBy}</p>
                  <p className="mt-1 text-sm text-foreground">{item.description}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => approveContent(item.id)}
                    className="text-green-600 hover:text-green-700"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => rejectContent(item.id, 'Does not meet guidelines')}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-muted-foreground py-6">No pending items for review</p>
          )}
        </div>
      </Card>

      {/* Recently Moderated */}
      <Card className="overflow-hidden">
        <div className="border-b border-border p-6">
          <h3 className="font-semibold">Recently Moderated</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-3 text-left text-sm font-semibold">Content</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Submitted By</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Reviewed</th>
              </tr>
            </thead>
            <tbody>
              {state.moderationQueue.filter(m => m.status !== 'pending').slice(0, 10).map((item) => (
                <tr key={item.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4 font-medium text-sm">{item.title}</td>
                  <td className="px-6 py-4 text-sm capitalize">{item.contentType}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      item.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{item.submittedBy}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {item.reviewedAt ? new Date(item.reviewedAt).toLocaleDateString() : '-'}
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
