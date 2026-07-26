'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DollarSign, Zap, Users, TrendingUp } from 'lucide-react'

export default function AffiliateDashboardPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    if (!user) {
      router.push('/sign-in')
      return
    }

    // Check if user has affiliate role
    const userRole = (user?.unsafeMetadata as any)?.role
    if (userRole !== 'affiliate') {
      router.push('/auth-selection')
    }
  }, [isLoaded, user, router])

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading affiliate dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || (user?.unsafeMetadata as any)?.role !== 'affiliate') {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-serif text-2xl font-bold">Affiliate Partner</h1>
            <p className="text-sm text-muted-foreground">Earnings & Programs</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">{user?.primaryEmailAddress?.emailAddress}</span>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Welcome, {user?.firstName}!</h2>
          <p className="mt-2 text-muted-foreground">Manage your affiliate programs and track earnings</p>
        </div>

        {/* Revenue Stats */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                <p className="mt-2 text-2xl font-bold">$5,234</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="mt-2 text-2xl font-bold">$892</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Programs</p>
                <p className="mt-2 text-2xl font-bold">12</p>
              </div>
              <Zap className="h-8 w-8 text-amber-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Referrals</p>
                <p className="mt-2 text-2xl font-bold">143</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </Card>
        </div>

        {/* Management */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="mb-4 font-bold">Affiliate Management</h3>
            <div className="space-y-3">
              <Button className="w-full" variant="outline">
                View My Programs
              </Button>
              <Button className="w-full" variant="outline">
                Generate Links
              </Button>
              <Button className="w-full" variant="outline">
                View Analytics
              </Button>
              <Button className="w-full" variant="outline">
                Request Payout
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 font-bold">Affiliate Information</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p className="font-medium">{user?.firstName} {user?.lastName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Account Type</p>
                <p className="font-medium">Affiliate Partner</p>
              </div>
              <div>
                <p className="text-muted-foreground">Member Since</p>
                <p className="font-medium">
                  {user?.createdAt?.toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
