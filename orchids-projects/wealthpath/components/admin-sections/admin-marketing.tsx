'use client'

import { useAdmin } from '@/lib/admin-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Megaphone } from 'lucide-react'

export default function AdminMarketing() {
  const { state } = useAdmin()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold">Marketing Campaigns</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Create and manage marketing campaigns and promotions
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Campaign Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Active Campaigns</p>
          <p className="mt-2 text-3xl font-bold">{state.marketingCampaigns.filter(c => c.status === 'active').length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Reach</p>
          <p className="mt-2 text-3xl font-bold">
            {state.marketingCampaigns.reduce((sum, c) => sum + c.metrics.reach, 0).toLocaleString()}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Conversions</p>
          <p className="mt-2 text-3xl font-bold">
            {state.marketingCampaigns.reduce((sum, c) => sum + c.metrics.conversions, 0)}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Avg ROI</p>
          <p className="mt-2 text-3xl font-bold">
            {(state.marketingCampaigns.reduce((sum, c) => sum + c.metrics.roi, 0) / state.marketingCampaigns.length || 0).toFixed(1)}%
          </p>
        </Card>
      </div>

      {/* Campaigns List */}
      <Card className="overflow-hidden">
        <div className="border-b border-border p-6">
          <h3 className="font-semibold flex items-center gap-2">
            <Megaphone className="h-5 w-5" />
            All Campaigns
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-3 text-left text-sm font-semibold">Campaign</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Channel</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Reach</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Conversions</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">ROI</th>
              </tr>
            </thead>
            <tbody>
              {state.marketingCampaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4 text-sm font-medium">{campaign.name}</td>
                  <td className="px-6 py-4 text-sm capitalize">{campaign.channel}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      campaign.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : campaign.status === 'paused'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-sm">{campaign.metrics.reach.toLocaleString()}</td>
                  <td className="px-6 py-4 font-medium text-sm">{campaign.metrics.conversions}</td>
                  <td className="px-6 py-4 font-medium text-sm text-green-600">{campaign.metrics.roi.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
