'use client'

import { Card } from '@/components/ui/card'
import { TrendingUp, Users, Eye, MousePointer } from 'lucide-react'

export default function AdminAnalytics() {
  const metrics = [
    { icon: Eye, label: 'Page Views', value: '24,530', change: '+12%', color: 'blue' },
    { icon: Users, label: 'Unique Visitors', value: '8,234', change: '+8%', color: 'purple' },
    { icon: MousePointer, label: 'Click-Through Rate', value: '3.8%', change: '+0.5%', color: 'green' },
    { icon: TrendingUp, label: 'Conversion Rate', value: '2.4%', change: '+1.2%', color: 'orange' },
  ]

  const trafficSources = [
    { source: 'Organic Search', visitors: 6240, percentage: 45 },
    { source: 'Direct', visitors: 3100, percentage: 22 },
    { source: 'Referral', visitors: 2200, percentage: 16 },
    { source: 'Social Media', visitors: 1694, percentage: 12 },
    { source: 'Email', visitors: 400, percentage: 3 },
  ]

  const topPages = [
    { title: 'How to Start Freelancing', views: 3200, bounceRate: 22 },
    { title: 'Stock Market Investing Guide', views: 2800, bounceRate: 18 },
    { title: 'Dropshipping 101', views: 2100, bounceRate: 31 },
    { title: 'Passive Income Streams', views: 1900, bounceRate: 25 },
    { title: 'Cryptocurrency Basics', views: 1500, bounceRate: 42 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold">Analytics Dashboard</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Real-time website and user analytics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon
          return (
            <Card key={idx} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="mt-2 text-3xl font-bold">{metric.value}</p>
                  <p className="mt-1 text-sm text-green-600 font-medium">{metric.change}</p>
                </div>
                <div className={`rounded-lg p-3 bg-${metric.color}-100`}>
                  <Icon className={`h-6 w-6 text-${metric.color}-600`} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Traffic Sources */}
      <Card className="p-6">
        <h3 className="mb-4 font-semibold">Traffic Sources</h3>
        <div className="space-y-4">
          {trafficSources.map((source, idx) => (
            <div key={idx}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">{source.source}</span>
                <span className="text-sm font-medium">{source.visitors.toLocaleString()}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${source.percentage}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{source.percentage}% of total</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Pages */}
      <Card className="p-6">
        <h3 className="mb-4 font-semibold">Top Performing Pages</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-2 text-left text-sm font-medium">Page Title</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Views</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Bounce Rate</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((page, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-4 py-3 text-sm">{page.title}</td>
                  <td className="px-4 py-3 font-medium text-sm">{page.views.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">{page.bounceRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Time Metrics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 font-semibold">Engagement Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Avg Session Duration</span>
              <span className="font-medium">12m 34s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Pages per Session</span>
              <span className="font-medium">3.2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Return Visitor Rate</span>
              <span className="font-medium">42%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Goal Completion Rate</span>
              <span className="font-medium">8.3%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 font-semibold">Device Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Desktop</span>
              <span className="font-medium">58%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Mobile</span>
              <span className="font-medium">35%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Tablet</span>
              <span className="font-medium">7%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Avg Load Time</span>
              <span className="font-medium">1.2s</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
