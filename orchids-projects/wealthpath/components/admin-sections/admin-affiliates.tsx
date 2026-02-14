'use client'

import { useAdmin } from '@/lib/admin-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Share2 } from 'lucide-react'

export default function AdminAffiliates() {
  const { state } = useAdmin()

  const totalCommissions = state.affiliates.reduce((sum, a) => sum + a.totalEarnings, 0)
  const activeAffiliates = state.affiliates.filter(a => a.status === 'active').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold">Affiliate Management</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage affiliate partners and commissions
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Affiliate
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Affiliates</p>
          <p className="mt-2 text-3xl font-bold">{state.affiliates.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Active Partners</p>
          <p className="mt-2 text-3xl font-bold">{activeAffiliates}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Commissions</p>
          <p className="mt-2 text-3xl font-bold">${totalCommissions.toLocaleString()}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Avg Commission Rate</p>
          <p className="mt-2 text-3xl font-bold">
            {state.affiliates.length > 0 
              ? (state.affiliates.reduce((sum, a) => sum + a.commissionRate, 0) / state.affiliates.length).toFixed(1)
              : 0}%
          </p>
        </Card>
      </div>

      {/* Affiliates Table */}
      <Card className="overflow-hidden">
        <div className="border-b border-border p-6">
          <h3 className="font-semibold flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Affiliate Partners
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Commission Rate</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Total Earnings</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Referrals</th>
              </tr>
            </thead>
            <tbody>
              {state.affiliates.map((affiliate) => (
                <tr key={affiliate.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4 font-medium text-sm">{affiliate.name}</td>
                  <td className="px-6 py-4 text-sm">{affiliate.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      affiliate.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {affiliate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-sm">{affiliate.commissionRate}%</td>
                  <td className="px-6 py-4 font-medium text-sm">${affiliate.totalEarnings.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">{affiliate.totalReferrals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
