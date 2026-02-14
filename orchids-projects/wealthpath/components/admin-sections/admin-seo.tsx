'use client'

import { Card } from '@/components/ui/card'
import { Eye, TrendingUp, Search } from 'lucide-react'

export default function AdminSEO() {
  const seoMetrics = [
    { keyword: 'freelancing tips', position: 3, volume: 2400, traffic: 1240, difficulty: 'Medium' },
    { keyword: 'stock market investing', position: 5, volume: 1800, traffic: 890, difficulty: 'High' },
    { keyword: 'passive income ideas', position: 2, volume: 1200, traffic: 950, difficulty: 'Low' },
    { keyword: 'dropshipping business', position: 8, volume: 950, traffic: 340, difficulty: 'High' },
    { keyword: 'make money online', position: 1, volume: 4200, traffic: 3100, difficulty: 'Very High' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold">SEO Tools & Analytics</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Monitor keywords, rankings, and SEO performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Indexed Pages</p>
              <p className="mt-2 text-3xl font-bold">1,240</p>
            </div>
            <Search className="h-6 w-6 text-primary" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Organic Traffic</p>
              <p className="mt-2 text-3xl font-bold">12.5K</p>
              <p className="mt-1 text-xs text-green-600">+18% vs last month</p>
            </div>
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Average Ranking</p>
              <p className="mt-2 text-3xl font-bold">4.2</p>
            </div>
            <Eye className="h-6 w-6 text-primary" />
          </div>
        </Card>
      </div>

      {/* Top Keywords */}
      <Card className="overflow-hidden">
        <div className="border-b border-border p-6">
          <h3 className="font-semibold">Top Performing Keywords</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-3 text-left text-sm font-semibold">Keyword</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Position</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Search Volume</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Est. Traffic</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {seoMetrics.map((metric, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4 font-medium text-sm">{metric.keyword}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      metric.position <= 3
                        ? 'bg-green-100 text-green-700'
                        : metric.position <= 5
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      #{metric.position}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{metric.volume.toLocaleString()}</td>
                  <td className="px-6 py-4 font-medium text-sm">{metric.traffic.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">{metric.difficulty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
