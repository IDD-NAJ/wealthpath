'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, TrendingUp } from 'lucide-react'

export default function AdminABTesting() {
  const experiments = [
    {
      id: 1,
      name: 'Homepage CTA Button Color',
      variant_a: 'Blue Button',
      variant_b: 'Green Button',
      conversions_a: 1240,
      conversions_b: 1680,
      status: 'running',
      confidence: 95,
    },
    {
      id: 2,
      name: 'Pricing Page Layout',
      variant_a: ' 3 Column Grid',
      variant_b: '2 Column + Sidebar',
      conversions_a: 890,
      conversions_b: 920,
      status: 'completed',
      confidence: 82,
    },
    {
      id: 3,
      name: 'Email Subject Line',
      variant_a: 'Learn X Strategy',
      variant_b: 'X Strategy: Make $$$',
      conversions_a: 2340,
      conversions_b: 3120,
      status: 'running',
      confidence: 99,
    },
    {
      id: 4,
      name: 'Course Landing Page',
      variant_a: 'Video First',
      variant_b: 'Text First',
      conversions_a: 560,
      conversions_b: 610,
      status: 'running',
      confidence: 78,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold">A/B Testing</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Run and analyze conversion experiments
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Experiment
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Active Experiments</p>
          <p className="mt-2 text-3xl font-bold">{experiments.filter(e => e.status === 'running').length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="mt-2 text-3xl font-bold">{experiments.filter(e => e.status === 'completed').length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Conversions Tracked</p>
          <p className="mt-2 text-3xl font-bold">
            {experiments.reduce((sum, e) => sum + e.conversions_a + e.conversions_b, 0).toLocaleString()}
          </p>
        </Card>
      </div>

      {/* Experiments */}
      <div className="space-y-4">
        {experiments.map((exp) => {
          const total_a = exp.conversions_a
          const total_b = exp.conversions_b
          const total = total_a + total_b
          const winner_b = total_b > total_a

          return (
            <Card key={exp.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{exp.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Status: <span className={`font-medium ${exp.status === 'running' ? 'text-blue-600' : 'text-green-600'}`}>
                      {exp.status}
                    </span>
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                  <TrendingUp className="h-3 w-3" />
                  {exp.confidence}% confident
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Variant A */}
                <div>
                  <p className="text-sm font-medium mb-2">Variant A: {exp.variant_a}</p>
                  <div className="space-y-2">
                    <div className="flex items-end gap-3">
                      <div className="flex-1">
                        <div className="h-8 w-full overflow-hidden rounded-lg bg-secondary">
                          <div
                            className={`h-full ${winner_b ? 'bg-gray-400' : 'bg-green-500'}`}
                            style={{ width: `${(total_a / total) * 100}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-bold w-16 text-right">{total_a}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {((total_a / total) * 100).toFixed(1)}% of conversions
                    </p>
                  </div>
                </div>

                {/* Variant B */}
                <div>
                  <p className="text-sm font-medium mb-2">Variant B: {exp.variant_b}</p>
                  <div className="space-y-2">
                    <div className="flex items-end gap-3">
                      <div className="flex-1">
                        <div className="h-8 w-full overflow-hidden rounded-lg bg-secondary">
                          <div
                            className={`h-full ${winner_b ? 'bg-green-500' : 'bg-gray-400'}`}
                            style={{ width: `${(total_b / total) * 100}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-bold w-16 text-right">{total_b}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {((total_b / total) * 100).toFixed(1)}% of conversions
                    </p>
                  </div>
                </div>
              </div>

              {exp.status === 'running' && (
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">Stop Test</Button>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
