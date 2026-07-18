'use client'

import { useAdmin } from '@/lib/admin-context'
import { Card } from '@/components/ui/card'
import { affiliatePrograms, getProgramStatus } from '@/lib/affiliate-data'
import {
  DollarSign, TrendingUp, MousePointer, Eye,
  ArrowUpRight, CheckCircle2, AlertCircle, Clock,
} from 'lucide-react'

function StatCard({
  label, value, change, icon: Icon, accent,
}: {
  label: string
  value: string
  change: string
  icon: React.ElementType
  accent: string
}) {
  return (
    <Card className="p-6 border-border/60 bg-card">
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
  )
}

const stats = [
  { label: 'Monthly Revenue', value: '$24,500', change: '+15% vs last month', icon: DollarSign, accent: 'bg-teal' },
  { label: 'Active Programs', value: String(affiliatePrograms.filter((p) => getProgramStatus(p) === 'active').length), change: '+3 this week', icon: TrendingUp, accent: 'bg-blue-500' },
  { label: 'Click-Through Rate', value: '3.8%', change: '+0.5% this month', icon: MousePointer, accent: 'bg-violet-500' },
  { label: 'Page Views', value: '24.5K', change: '+12% this month', icon: Eye, accent: 'bg-amber-500' },
]

const recentActivity = [
  { icon: CheckCircle2, label: 'New program approved', detail: 'Fidelity Investments', time: '2h ago', color: 'text-emerald-500' },
  { icon: TrendingUp, label: 'Commission milestone hit', detail: 'Robinhood — $1,000 earned', time: '5h ago', color: 'text-teal' },
  { icon: AlertCircle, label: 'Program flagged for review', detail: 'Unnamed Crypto Exchange', time: '1d ago', color: 'text-amber-500' },
  { icon: Clock, label: 'Scheduled review due', detail: '4 programs need refresh', time: '2d ago', color: 'text-muted-foreground' },
]

export default function AdminOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Dashboard Overview</h2>
        <p className="mt-1 text-sm text-muted-foreground">Your affiliate platform at a glance</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="border-border/60 bg-card p-6">
          <h3 className="mb-5 text-sm font-semibold text-foreground">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="flex items-start gap-3">
                  <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${item.color}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
                </div>
              )
            })}
          </div>
        </Card>

        {/* System Status */}
        <Card className="border-border/60 bg-card p-6">
          <h3 className="mb-5 text-sm font-semibold text-foreground">System Status</h3>
          <div className="space-y-3">
            {[
              { label: 'API', status: 'Operational', ok: true },
              { label: 'Database (Neon)', status: 'Healthy', ok: true },
              { label: 'CDN / Assets', status: 'Operational', ok: true },
              { label: 'Affiliate Tracking', status: 'Active', ok: true },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    s.ok ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${s.ok ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  {s.status}
                </span>
              </div>
            ))}
            <div className="pt-3 border-t border-border/40 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Server Load</span>
                <span className="font-medium text-foreground">34%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Storage Used</span>
                <span className="font-medium text-foreground">2.4 GB / 100 GB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Avg Load Time</span>
                <span className="font-medium text-foreground">1.2s</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Top programs quick list */}
      <Card className="border-border/60 bg-card overflow-hidden">
        <div className="border-b border-border/40 px-6 py-4">
          <h3 className="text-sm font-semibold text-foreground">Top Programs by Commission</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 bg-secondary/40">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Program</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Commission</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {affiliatePrograms.slice(0, 8).map((prog) => (
                <tr key={prog.id} className="border-b border-border/30 transition-colors hover:bg-secondary/30">
                  <td className="px-6 py-3 text-sm font-medium text-foreground">{prog.name}</td>
                  <td className="px-6 py-3 text-sm capitalize text-muted-foreground">{prog.category}</td>
                  <td className="px-6 py-3 text-sm font-semibold text-teal">{prog.commission}</td>
                  <td className="px-6 py-3 text-sm text-foreground">{prog.rating.toFixed(1)} / 5</td>
                  <td className="px-6 py-3">
                    {(() => { const s = getProgramStatus(prog); return (
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        s === 'active'
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : s === 'pending'
                          ? 'bg-amber-500/10 text-amber-600'
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {s}
                      </span>
                    )})()}
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
