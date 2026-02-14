'use client'

import { useAdmin } from '@/lib/admin-context'
import { Card } from '@/components/ui/card'
import { Users, BookOpen, DollarSign, TrendingUp, Eye, MessageSquare } from 'lucide-react'

const StatCard = ({ icon: Icon, label, value, trend }: any) => (
  <Card className="p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-2 text-3xl font-bold">{value}</p>
        {trend && (
          <p className={`mt-1 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}% from last month
          </p>
        )}
      </div>
      <div className="rounded-lg bg-secondary p-3">
        <Icon className="h-6 w-6 text-primary" />
      </div>
    </div>
  </Card>
)

export default function AdminOverview() {
  const { state } = useAdmin()

  const stats = [
    { icon: Users, label: 'Total Users', value: state.users.length, trend: 12 },
    { icon: BookOpen, label: 'Published Articles', value: state.articles.filter(a => a.status === 'published').length, trend: 8 },
    { icon: DollarSign, label: 'Monthly Revenue', value: '$24,500', trend: 15 },
    { icon: TrendingUp, label: 'Active Subscriptions', value: state.subscriptions.filter(s => s.status === 'active').length, trend: 5 },
  ]

  const recentActivities = [
    { type: 'article', action: 'New article published', user: 'Admin', time: '2 hours ago' },
    { type: 'course', action: 'New course created', user: 'Admin', time: '4 hours ago' },
    { type: 'payment', action: 'Payment processed', user: 'System', time: '6 hours ago' },
    { type: 'user', action: 'New user registered', user: 'System', time: '8 hours ago' },
  ]

  return (
    <div className="space-y-8">
      {/* Statistics */}
      <div>
        <h2 className="mb-4 font-serif text-2xl font-bold">Dashboard Overview</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 font-semibold">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                <div>
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.user}</p>
                </div>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 font-semibold">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">API Status</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                <span className="h-2 w-2 rounded-full bg-green-700" />
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Database</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                <span className="h-2 w-2 rounded-full bg-green-700" />
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Server Load</span>
              <span className="text-sm font-medium">34%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Storage Used</span>
              <span className="text-sm font-medium">2.4 GB / 100 GB</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="mb-4 font-semibold">Quick Stats</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-secondary p-4">
            <p className="text-sm text-muted-foreground">Avg Session Duration</p>
            <p className="mt-1 text-2xl font-bold">12m 34s</p>
          </div>
          <div className="rounded-lg bg-secondary p-4">
            <p className="text-sm text-muted-foreground">Bounce Rate</p>
            <p className="mt-1 text-2xl font-bold">28%</p>
          </div>
          <div className="rounded-lg bg-secondary p-4">
            <p className="text-sm text-muted-foreground">Conversion Rate</p>
            <p className="mt-1 text-2xl font-bold">3.8%</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
