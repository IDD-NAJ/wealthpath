'use client'

import { useAdmin } from '@/lib/admin-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Users, DollarSign } from 'lucide-react'

export default function AdminSubscriptions() {
  const { state, cancelSubscription } = useAdmin()

  const plans = [
    { name: 'Basic', price: 9.99, users: 342, growth: '+12%', color: 'blue' },
    { name: 'Pro', price: 29.99, users: 156, growth: '+8%', color: 'purple' },
    { name: 'Enterprise', price: 99.99, users: 45, growth: '+5%', color: 'emerald' },
  ]

  const mrr = (342 * 9.99 + 156 * 29.99 + 45 * 99.99).toFixed(2)
  const churnRate = 2.3
  const activeSubscriptions = state.subscriptions.filter(s => s.status === 'active').length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold">Subscription Management</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Monitor subscriptions, plans, and recurring revenue
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Monthly Recurring Revenue</p>
              <p className="mt-2 text-3xl font-bold">${mrr}</p>
            </div>
            <DollarSign className="h-6 w-6 text-primary" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Subscriptions</p>
              <p className="mt-2 text-3xl font-bold">{activeSubscriptions}</p>
            </div>
            <Users className="h-6 w-6 text-primary" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Churn Rate</p>
              <p className="mt-2 text-3xl font-bold">{churnRate}%</p>
              <p className="mt-1 text-xs text-green-600">Lower is better</p>
            </div>
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
        </Card>
      </div>

      {/* Subscription Plans */}
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan, idx) => (
          <Card key={idx} className="p-6">
            <h3 className="font-semibold text-lg">{plan.name}</h3>
            <p className="mt-2 text-2xl font-bold">${plan.price}<span className="text-sm text-muted-foreground">/mo</span></p>
            <div className="mt-4 space-y-3 border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Subscribers</span>
                <span className="font-medium text-sm">{plan.users}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Growth</span>
                <span className="text-sm font-medium text-green-600">{plan.growth}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Revenue</span>
                <span className="font-medium text-sm">${(plan.price * plan.users).toFixed(0)}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Subscriptions Table */}
      <Card className="overflow-hidden">
        <div className="border-b border-border p-6">
          <h3 className="font-semibold">Active Subscriptions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Plan</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Next Billing</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.subscriptions.slice(0, 10).map((sub) => (
                <tr key={sub.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-sm">{sub.userId}</p>
                  </td>
                  <td className="px-6 py-4 text-sm">{sub.plan}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      sub.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{new Date(sub.nextBillingDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium text-sm">${sub.price}</td>
                  <td className="px-6 py-4 text-right">
                    {sub.status === 'active' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (confirm(`Cancel subscription for ${sub.userId}?`)) {
                            cancelSubscription(sub.id)
                          }
                        }}
                      >
                        Cancel
                      </Button>
                    )}
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
