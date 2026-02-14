'use client'

import { useAdmin } from '@/lib/admin-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Search, Trash2, Mail, Phone, Calendar } from 'lucide-react'

export default function AdminUsers() {
  const { state, deleteUser } = useAdmin()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = state.users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = [
    { label: 'Total Users', value: state.users.length, color: 'blue' },
    { label: 'Premium Users', value: state.users.filter(u => u.role === 'premium').length, color: 'purple' },
    { label: 'Active This Month', value: Math.floor(state.users.length * 0.75), color: 'green' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold">User Management</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage users, permissions, and user data
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card className="p-6">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>
      </Card>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Joined</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.slice(0, 15).map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-sm">{user.name}</p>
                  </td>
                  <td className="px-6 py-4 text-sm">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      user.role === 'admin'
                        ? 'bg-red-100 text-red-700'
                        : user.role === 'premium'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (confirm(`Delete user ${user.name}?`)) {
                          deleteUser(user.id)
                        }
                      }}
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
