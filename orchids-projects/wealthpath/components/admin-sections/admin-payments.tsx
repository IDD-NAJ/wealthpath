'use client'

import { useAdmin } from '@/lib/admin-context'
import { Card } from '@/components/ui/card'
import { CreditCard, CheckCircle2, Clock } from 'lucide-react'

export default function AdminPayments() {
  const { state } = useAdmin()

  const recentTransactions = [
    { id: 'TXN001', user: 'John Doe', amount: 99.99, status: 'completed', date: '2024-02-13', method: 'Credit Card' },
    { id: 'TXN002', user: 'Jane Smith', amount: 49.99, status: 'completed', date: '2024-02-13', method: 'PayPal' },
    { id: 'TXN003', user: 'Mike Johnson', amount: 199.99, status: 'pending', date: '2024-02-13', method: 'Bank Transfer' },
    { id: 'TXN004', user: 'Sarah Connor', amount: 79.99, status: 'completed', date: '2024-02-12', method: 'Credit Card' },
    { id: 'TXN005', user: 'Alex Brown', amount: 29.99, status: 'completed', date: '2024-02-12', method: 'Apple Pay' },
  ]

  const paymentMethods = [
    { method: 'Credit Card', transactions: 856, percentage: 58, revenue: '$42,500' },
    { method: 'PayPal', transactions: 342, percentage: 23, revenue: '$17,100' },
    { method: 'Bank Transfer', transactions: 156, percentage: 11, revenue: '$7,800' },
    { method: 'Other', transactions: 98, percentage: 8, revenue: '$3,600' },
  ]

  const totalRevenue = 71000
  const monthlyRevenue = 24500
  const successRate = 98.5

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold">Payment Processing</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage payments, transactions, and payment methods
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="mt-2 text-3xl font-bold">${(totalRevenue / 1000).toFixed(1)}K</p>
          <p className="mt-1 text-xs text-muted-foreground">All time</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Monthly Revenue</p>
          <p className="mt-2 text-3xl font-bold">${(monthlyRevenue / 1000).toFixed(1)}K</p>
          <p className="mt-1 text-xs text-green-600">+18% vs last month</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Success Rate</p>
          <p className="mt-2 text-3xl font-bold">{successRate}%</p>
          <p className="mt-1 text-xs text-muted-foreground">Payment completion</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Transactions</p>
          <p className="mt-2 text-3xl font-bold">1.4K</p>
          <p className="mt-1 text-xs text-muted-foreground">This month</p>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card className="p-6">
        <h3 className="mb-4 font-semibold">Payment Methods</h3>
        <div className="space-y-4">
          {paymentMethods.map((pm, idx) => (
            <div key={idx}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">{pm.method}</span>
                <span className="text-sm font-medium">{pm.revenue}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${pm.percentage}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {pm.transactions} transactions ({pm.percentage}%)
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="overflow-hidden">
        <div className="border-b border-border p-6">
          <h3 className="font-semibold">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-3 text-left text-sm font-semibold">Transaction ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Method</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((txn) => (
                <tr key={txn.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4 font-mono text-sm font-medium">{txn.id}</td>
                  <td className="px-6 py-4 text-sm">{txn.user}</td>
                  <td className="px-6 py-4 font-medium text-sm">${txn.amount}</td>
                  <td className="px-6 py-4 text-sm">{txn.method}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {txn.status === 'completed' ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-xs font-medium text-green-700">Completed</span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4 text-yellow-600" />
                          <span className="text-xs font-medium text-yellow-700">Pending</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
