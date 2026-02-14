'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageSquare, AlertCircle } from 'lucide-react'

export default function AdminSupport() {
  const supportTickets = [
    { id: 'TKT001', user: 'John Doe', subject: 'Course access issue', status: 'open', priority: 'high', created: '2024-02-13' },
    { id: 'TKT002', user: 'Jane Smith', subject: 'Payment failed', status: 'open', priority: 'urgent', created: '2024-02-13' },
    { id: 'TKT003', user: 'Mike Johnson', subject: 'Certificate question', status: 'in-progress', priority: 'medium', created: '2024-02-12' },
    { id: 'TKT004', user: 'Sarah Connor', subject: 'Feature request', status: 'resolved', priority: 'low', created: '2024-02-11' },
    { id: 'TKT005', user: 'Alex Brown', subject: 'Technical glitch', status: 'open', priority: 'high', created: '2024-02-10' },
  ]

  const stats = {
    open: supportTickets.filter(t => t.status === 'open').length,
    inProgress: supportTickets.filter(t => t.status === 'in-progress').length,
    resolved: supportTickets.filter(t => t.status === 'resolved').length,
    avgResponseTime: '2h 15m',
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold">Customer Support</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage support tickets and customer inquiries
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Open Tickets</p>
          <p className="mt-2 text-3xl font-bold text-orange-600">{stats.open}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">In Progress</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">{stats.inProgress}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Resolved</p>
          <p className="mt-2 text-3xl font-bold text-green-600">{stats.resolved}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Avg Response Time</p>
          <p className="mt-2 text-2xl font-bold">{stats.avgResponseTime}</p>
        </Card>
      </div>

      {/* Support Tickets */}
      <Card className="overflow-hidden">
        <div className="border-b border-border p-6">
          <h3 className="font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Support Tickets
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Subject</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Priority</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Created</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {supportTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4 font-mono text-sm font-medium">{ticket.id}</td>
                  <td className="px-6 py-4 text-sm">{ticket.user}</td>
                  <td className="px-6 py-4 text-sm">{ticket.subject}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      ticket.priority === 'urgent'
                        ? 'bg-red-100 text-red-700'
                        : ticket.priority === 'high'
                        ? 'bg-orange-100 text-orange-700'
                        : ticket.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      ticket.status === 'resolved'
                        ? 'bg-green-100 text-green-700'
                        : ticket.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{ticket.created}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="outline" size="sm">
                      Reply
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
