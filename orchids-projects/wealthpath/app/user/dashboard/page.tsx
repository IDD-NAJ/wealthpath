'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Bookmark, Heart, Share2, TrendingUp } from 'lucide-react'

export default function UserDashboardPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    if (!user) {
      router.push('/sign-in')
      return
    }

    // Redirect if not a regular user
    const userRole = (user?.unsafeMetadata as any)?.role
    if (userRole !== 'user') {
      router.push('/auth-selection')
    }
  }, [isLoaded, user, router])

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || (user?.unsafeMetadata as any)?.role !== 'user') {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-serif text-2xl font-bold">WealthPath</h1>
            <p className="text-sm text-muted-foreground">Your Dashboard</p>
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
          <p className="mt-2 text-muted-foreground">Discover the best deals and affiliate programs</p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Saved Deals</p>
                <p className="mt-2 text-2xl font-bold">12</p>
              </div>
              <Bookmark className="h-8 w-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Favorites</p>
                <p className="mt-2 text-2xl font-bold">8</p>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Shared</p>
                <p className="mt-2 text-2xl font-bold">24</p>
              </div>
              <Share2 className="h-8 w-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Trending</p>
                <p className="mt-2 text-2xl font-bold">5</p>
              </div>
              <TrendingUp className="h-8 w-8 text-amber-500" />
            </div>
          </Card>
        </div>

        {/* Browse & Manage */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="mb-4 font-bold">Explore</h3>
            <div className="space-y-3">
              <Button className="w-full" variant="outline" asChild>
                <a href="/deals">Browse All Deals</a>
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <a href="/destinations">Explore Destinations</a>
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <a href="/search">Search Programs</a>
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <a href="/blog">Read Articles</a>
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 font-bold">Your Profile</h3>
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
                <p className="font-medium">Regular User</p>
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
