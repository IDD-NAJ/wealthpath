'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, TrendingUp, Search, ArrowUpRight, RefreshCw } from 'lucide-react'

const seoMetrics = [
  { keyword: 'best credit card affiliate programs', position: 2, volume: 3200, traffic: 1820, difficulty: 'High' },
  { keyword: 'robinhood affiliate program', position: 1, volume: 2800, traffic: 2240, difficulty: 'Medium' },
  { keyword: 'best investing platforms 2025', position: 4, volume: 2200, traffic: 980, difficulty: 'High' },
  { keyword: 'personal finance affiliate', position: 3, volume: 1800, traffic: 1100, difficulty: 'Medium' },
  { keyword: 'make money with finance blog', position: 6, volume: 4200, traffic: 720, difficulty: 'Very High' },
  { keyword: 'best robo advisor reviews', position: 2, volume: 1400, traffic: 960, difficulty: 'Low' },
]

const difficultyColor = (d: string) => {
  if (d === 'Low') return 'bg-emerald-500/10 text-emerald-500'
  if (d === 'Medium') return 'bg-amber-500/10 text-amber-600'
  if (d === 'High') return 'bg-orange-500/10 text-orange-500'
  return 'bg-red-500/10 text-red-400'
}

const positionColor = (pos: number) => {
  if (pos <= 3) return 'bg-emerald-500/10 text-emerald-500'
  if (pos <= 5) return 'bg-amber-500/10 text-amber-600'
  return 'bg-red-500/10 text-red-400'
}

export default function AdminSEO() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">SEO Tools</h2>
        <p className="mt-1 text-sm text-muted-foreground">Keyword rankings, organic traffic, and indexing status</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Search, label: 'Indexed Pages', value: '1,240', accent: 'bg-teal' },
          { icon: TrendingUp, label: 'Organic Traffic', value: '12.5K', sub: '+18% vs last month', accent: 'bg-blue-500' },
          { icon: Eye, label: 'Avg. Ranking', value: '3.1', sub: 'Across tracked keywords', accent: 'bg-violet-500' },
        ].map(({ icon: Icon, label, value, sub, accent }) => (
          <Card key={label} className="border-border/60 bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
                <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
                {sub && (
                  <p className="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-500">
                    <ArrowUpRight className="h-3 w-3" />
                    {sub}
                  </p>
                )}
              </div>
              <div className={`rounded-xl p-3 ${accent}`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Meta Settings */}
      <Card className="border-border/60 bg-card p-6">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Site-Wide Meta Defaults</h3>
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Default Meta Title Template</label>
            <Input
              defaultValue="%s | WealthPath — Best Affiliate Programs"
              className="bg-background border-border/60 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Default Meta Description</label>
            <Input
              defaultValue="Discover and compare the best affiliate programs in finance, investing, and personal finance."
              className="bg-background border-border/60 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Canonical Base URL</label>
            <Input
              defaultValue="https://wealthpath.io"
              className="bg-background border-border/60 text-sm"
            />
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <Button className="bg-teal text-white hover:bg-teal/90 text-sm">Save Defaults</Button>
          <Button variant="outline" className="text-sm gap-2">
            <RefreshCw className="h-3.5 w-3.5" /> Request Re-index
          </Button>
        </div>
      </Card>

      {/* Keyword Rankings */}
      <Card className="overflow-hidden border-border/60 bg-card">
        <div className="flex items-center justify-between border-b border-border/40 px-6 py-4">
          <h3 className="text-sm font-semibold text-foreground">Keyword Rankings</h3>
          <span className="text-xs text-muted-foreground">Updated daily</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 bg-secondary/30">
                {['Keyword', 'Position', 'Search Vol.', 'Est. Traffic', 'Difficulty'].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {seoMetrics.map((row, idx) => (
                <tr key={idx} className="border-b border-border/30 transition-colors hover:bg-secondary/20">
                  <td className="px-6 py-3 text-sm font-medium text-foreground">{row.keyword}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${positionColor(row.position)}`}>
                      #{row.position}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">{row.volume.toLocaleString()}</td>
                  <td className="px-6 py-3 text-sm font-semibold text-foreground">{row.traffic.toLocaleString()}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${difficultyColor(row.difficulty)}`}>
                      {row.difficulty}
                    </span>
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
