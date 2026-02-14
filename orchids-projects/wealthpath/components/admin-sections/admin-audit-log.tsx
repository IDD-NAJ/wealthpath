'use client'

import { Card } from '@/components/ui/card'
import { Lock, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function AdminAuditLog() {
  const [searchTerm, setSearchTerm] = useState('')

  const auditLogs = [
    { id: 1, timestamp: '2024-02-13 14:32:10', admin: 'Admin User', action: 'Edited Article', target: 'Stock Market Investing', change: 'Updated content' },
    { id: 2, timestamp: '2024-02-13 13:15:45', admin: 'Admin User', action: 'Created Course', target: 'Advanced Freelancing', change: 'New course created' },
    { id: 3, timestamp: '2024-02-13 12:01:22', admin: 'Admin User', action: 'Deleted User', target: 'User #234', change: 'Account removed' },
    { id: 4, timestamp: '2024-02-13 11:45:33', admin: 'Admin User', action: 'Updated Settings', target: 'Payment Settings', change: 'Fee changed from 2% to 1.5%' },
    { id: 5, timestamp: '2024-02-13 10:20:15', admin: 'Admin User', action: 'Approved Content', target: 'User Comment', change: 'Comment approved for publication' },
    { id: 6, timestamp: '2024-02-13 09:55:42', admin: 'Admin User', action: 'Generated Report', target: 'Monthly Analytics', change: 'Report generated' },
    { id: 7, timestamp: '2024-02-13 08:30:11', admin: 'Admin User', action: 'Issued Refund', target: 'Subscription #SKU123', change: '$99.99 refunded' },
    { id: 8, timestamp: '2024-02-13 07:15:20', admin: 'Admin User', action: 'Added Affiliate', target: 'John Partner', change: 'New affiliate created' },
  ]

  const filteredLogs = auditLogs.filter(log =>
    log.admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.target.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const actions = [...new Set(auditLogs.map(l => l.action))]
  const admins = [...new Set(auditLogs.map(l => l.admin))]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold">Audit Log</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Track all administrative actions and security events
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Logged Events</p>
          <p className="mt-2 text-3xl font-bold">{auditLogs.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Today's Activity</p>
          <p className="mt-2 text-3xl font-bold">{auditLogs.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Security Events</p>
          <p className="mt-2 text-3xl font-bold">0</p>
          <p className="mt-1 text-xs text-green-600">No anomalies detected</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search audit logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs font-medium text-muted-foreground">Quick Filter:</span>
            {actions.slice(0, 3).map((action) => (
              <button
                key={action}
                onClick={() => setSearchTerm(action)}
                className="text-xs px-2 py-1 rounded-full bg-secondary hover:bg-secondary/80 transition"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Audit Log Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-3 text-left text-sm font-semibold">Timestamp</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Admin</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Target</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Change Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{log.timestamp}</td>
                  <td className="px-6 py-4 text-sm font-medium">{log.admin}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{log.target}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{log.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Security Policies */}
      <Card className="p-6">
        <h3 className="mb-4 font-semibold flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Security & Compliance
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
            <span className="text-sm font-medium">2FA Enforcement</span>
            <span className="text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">Active</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
            <span className="text-sm font-medium">Session Timeout</span>
            <span className="text-sm">30 minutes</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
            <span className="text-sm font-medium">Backup Status</span>
            <span className="text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">Daily</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
            <span className="text-sm font-medium">Last Security Audit</span>
            <span className="text-sm">2024-02-10</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
