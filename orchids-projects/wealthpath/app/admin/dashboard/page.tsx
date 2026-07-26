'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BarChart3, Users, FileText, Settings } from 'lucide-react'

export default function AdminDashboardPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    if (!user) {
      router.push('/sign-in')
      return
    }

    // Check if user has admin role
    const userRole = (user?.unsafeMetadata as any)?.role
    if (userRole !== 'admin') {
      router.push('/auth-selection')
    }
  }, [isLoaded, user, router])

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || (user?.unsafeMetadata as any)?.role !== 'admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-serif text-2xl font-bold">WealthPath Admin</h1>
            <p className="text-sm text-muted-foreground">Dashboard</p>
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
          <h2 className="text-3xl font-bold">Welcome back, {user?.firstName}!</h2>
          <p className="mt-2 text-muted-foreground">Here&apos;s an overview of your admin panel</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="mt-2 text-2xl font-bold">1,234</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Articles</p>
                <p className="mt-2 text-2xl font-bold">456</p>
              </div>
              <FileText className="h-8 w-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Affiliate Programs</p>
                <p className="mt-2 text-2xl font-bold">89</p>
              </div>
              <BarChart3 className="h-8 w-8 text-amber-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="mt-2 text-2xl font-bold">$12.5K</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </Card>
        </div>

        {/* Admin Actions */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="mb-4 font-bold">Quick Actions</h3>
            <div className="space-y-3">
              <Button className="w-full" variant="outline">
                Create New Article
              </Button>
              <Button className="w-full" variant="outline">
                Manage Affiliates
              </Button>
              <Button className="w-full" variant="outline">
                View Analytics
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <a href="/admin/settings">Settings</a>
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 font-bold">Admin Information</h3>
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
                <p className="text-muted-foreground">Role</p>
                <p className="font-medium">Administrator</p>
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
