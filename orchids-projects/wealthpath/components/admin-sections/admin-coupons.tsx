'use client'

import { useState } from 'react'
import { useAdmin } from '@/lib/admin-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus, Copy, Trash2 } from 'lucide-react'

export default function AdminCoupons() {
  const { state, addCoupon, deactivateCoupon } = useAdmin()
  const [isOpen, setIsOpen] = useState(false)
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: 10,
    expiresAt: new Date().toISOString().split('T')[0],
  })

  const handleCreate = () => {
    if (newCoupon.code.trim()) {
      addCoupon(newCoupon.code, newCoupon.discount, newCoupon.expiresAt)
      setNewCoupon({ code: '', discount: 10, expiresAt: new Date().toISOString().split('T')[0] })
      setIsOpen(false)
    }
  }

  const activeCoupons = state.coupons.filter(c => c.active)
  const inactiveCoupons = state.coupons.filter(c => !c.active)
  const totalSavings = state.coupons.reduce((sum, c) => sum + (c.discountPercent * c.usedCount), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold">Coupon Management</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Create and manage discount coupons
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Coupon Code</Label>
                <Input
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  placeholder="e.g., SAVE20"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Discount (%)</Label>
                <Input
                  type="number"
                  value={newCoupon.discount}
                  onChange={(e) => setNewCoupon({ ...newCoupon, discount: parseInt(e.target.value) })}
                  min="1"
                  max="100"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Expires At</Label>
                <Input
                  type="date"
                  value={newCoupon.expiresAt}
                  onChange={(e) => setNewCoupon({ ...newCoupon, expiresAt: e.target.value })}
                  className="mt-1"
                />
              </div>
              <Button onClick={handleCreate} className="w-full">
                Create Coupon
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Active Coupons</p>
          <p className="mt-2 text-3xl font-bold">{activeCoupons.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Used</p>
          <p className="mt-2 text-3xl font-bold">{state.coupons.reduce((sum, c) => sum + c.usedCount, 0)}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Savings</p>
          <p className="mt-2 text-3xl font-bold">${totalSavings}</p>
        </Card>
      </div>

      {/* Coupons Table */}
      <Card className="overflow-hidden">
        <div className="border-b border-border p-6">
          <h3 className="font-semibold">All Coupons</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-3 text-left text-sm font-semibold">Code</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Discount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Used</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Max Uses</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Expires</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.coupons.map((coupon) => (
                <tr key={coupon.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4 font-mono font-medium text-sm">{coupon.code}</td>
                  <td className="px-6 py-4 font-medium text-sm">{coupon.discountPercent}%</td>
                  <td className="px-6 py-4 text-sm">{coupon.usedCount}</td>
                  <td className="px-6 py-4 text-sm">{coupon.maxUses}</td>
                  <td className="px-6 py-4 text-sm">{new Date(coupon.expiresAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      coupon.active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {coupon.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    {coupon.active && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deactivateCoupon(coupon.code)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
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
