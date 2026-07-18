'use client'

import { Card } from '@/components/ui/card'
import { Eye, Users, MousePointer, TrendingUp, ArrowUpRight } from 'lucide-react'

const metrics = [
  { icon: Eye, label: 'Page Views', value: '24,530', change: '+12%', accent: 'bg-blue-500' },
  { icon: Users, label: 'Unique Visitors', value: '8,234', change: '+8%', accent: 'bg-teal' },
  { icon: MousePointer, label: 'Click-Through Rate', value: '3.8%', change: '+0.5%', accent: 'bg-violet-500' },
  { icon: TrendingUp, label: 'Conversion Rate', value: '2.4%', change: '+1.2%', accent: 'bg-amber-500' },
]

const trafficSources = [
  { source: 'Organic Search', visitors: 6240, pct: 45 },
  { source: 'Direct', visitors: 3100, pct: 22 },
  { source: 'Referral', visitors: 2200, pct: 16 },
  { source: 'Social Media', visitors: 1694, pct: 12 },
  { source: 'Email', visitors: 400, pct: 3 },
  { source: 'Other', visitors: 200, pct: 2 },
]

const topPages = [
  { title: 'Best Credit Cards 2025', views: 3200, bounce: 22 },
  { title: 'Top Investing Platforms', views: 2800, bounce: 18 },
  { title: 'Robinhood Review', views: 2100, bounce: 31 },
  { title: 'Best Robo-Advisors', views: 1900, bounce: 25 },
  { title: 'Life Insurance Guide', views: 1500, bounce: 28 },
]

const BAR_COLORS = ['bg-teal', 'bg-blue-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500', 'bg-slate-500']

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Analytics</h2>
        <p className="mt-1 text-sm text-muted-foreground">Traffic, engagement, and conversion metrics</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(({ icon: Icon, label, value, change, accent }) => (
          <Card key={label} className="border-border/60 bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
                <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
                <p className="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-500">
                  <ArrowUpRight className="h-3 w-3" />
                  {change}
                </p>
              </div>
              <div className={`rounded-xl p-3 ${accent}`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Traffic Sources */}
        <Card className="border-border/60 bg-card p-6">
          <h3 className="mb-5 text-sm font-semibold text-foreground">Traffic Sources</h3>
          <div className="space-y-4">
            {trafficSources.map((src, i) => (
              <div key={src.source}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-foreground">{src.source}</span>
                  <span className="font-semibold text-foreground">{src.visitors.toLocaleString()}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className={`h-full rounded-full transition-all ${BAR_COLORS[i % BAR_COLORS.length]}`}
                    style={{ width: `${src.pct}%` }}
                  />
                </div>
                <p className="mt-1 text-right text-xs text-muted-foreground">{src.pct}%</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Engagement */}
        <Card className="border-border/60 bg-card p-6">
          <h3 className="mb-5 text-sm font-semibold text-foreground">Engagement & Device</h3>
          <div className="space-y-3">
            {[
              ['Avg Session Duration', '12m 34s'],
              ['Pages per Session', '3.2'],
              ['Return Visitor Rate', '42%'],
              ['Goal Completion Rate', '8.3%'],
            ].map(([label, val]) => (
              <div key={label} className="flex items-center justify-between border-b border-border/30 pb-3 last:border-0">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-semibold text-foreground">{val}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Device Breakdown</p>
            {[
              { label: 'Desktop', pct: 58 },
              { label: 'Mobile', pct: 35 },
              { label: 'Tablet', pct: 7 },
            ].map((d, i) => (
              <div key={d.label} className="flex items-center gap-3">
                <span className="w-14 text-xs text-muted-foreground">{d.label}</span>
                <div className="flex-1 h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className={`h-full rounded-full ${BAR_COLORS[i]}`}
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs font-medium text-foreground">{d.pct}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Pages */}
      <Card className="overflow-hidden border-border/60 bg-card">
        <div className="border-b border-border/40 px-6 py-4">
          <h3 className="text-sm font-semibold text-foreground">Top Performing Pages</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 bg-secondary/30">
                {['Page', 'Views', 'Bounce Rate', 'Performance'].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topPages.map((page, idx) => (
                <tr key={idx} className="border-b border-border/30 transition-colors hover:bg-secondary/20">
                  <td className="px-6 py-3 text-sm font-medium text-foreground">{page.title}</td>
                  <td className="px-6 py-3 text-sm font-semibold text-foreground">{page.views.toLocaleString()}</td>
                  <td className="px-6 py-3">
                    <span className={`text-sm font-medium ${page.bounce < 25 ? 'text-emerald-500' : page.bounce < 35 ? 'text-amber-500' : 'text-red-400'}`}>
                      {page.bounce}%
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-teal"
                          style={{ width: `${(page.views / 3200) * 100}%` }}
                        />
                      </div>
                    </div>
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
