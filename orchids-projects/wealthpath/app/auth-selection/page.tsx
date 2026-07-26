'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BarChart3, Users, Zap } from 'lucide-react'

export default function AuthSelectionPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in')
    }
  }, [isLoaded, user, router])

  const handleRoleSelection = async (role: string) => {
    if (!user) return
    
    setSelectedRole(role)
    setIsLoading(true)

    try {
      // Update user metadata with role
      await user.update({
        unsafeMetadata: {
          role,
        },
      })

      // Wait a moment for metadata to propagate
      await new Promise(resolve => setTimeout(resolve, 500))

      // Route based on role
      switch (role) {
        case 'admin':
          router.push('/admin/dashboard')
          break
        case 'user':
          router.push('/user/dashboard')
          break
        case 'affiliate':
          router.push('/affiliate/dashboard')
          break
        default:
          setIsLoading(false)
      }
    } catch (error) {
      console.error('[v0] Error updating user role:', error)
      setIsLoading(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4">
      <div className="w-full max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl font-bold">Welcome to WealthPath!</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Choose your account type to get started
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* User Role */}
          <Card 
            className="relative cursor-pointer border-2 border-transparent transition-all hover:border-primary hover:shadow-lg"
            onClick={() => handleRoleSelection('user')}
          >
            <div className="p-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-blue-100 p-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="mb-2 font-bold text-lg">User</h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Browse deals, reviews, and affiliate programs
              </p>
              <Button
                className="w-full"
                variant={selectedRole === 'user' ? 'default' : 'outline'}
                disabled={isLoading && selectedRole !== 'user'}
                onClick={() => handleRoleSelection('user')}
              >
                {isLoading && selectedRole === 'user' ? 'Setting up...' : 'Continue as User'}
              </Button>
            </div>
          </Card>

          {/* Affiliate Role */}
          <Card 
            className="relative cursor-pointer border-2 border-transparent transition-all hover:border-primary hover:shadow-lg"
            onClick={() => handleRoleSelection('affiliate')}
          >
            <div className="p-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-amber-100 p-4">
                  <Zap className="h-8 w-8 text-amber-600" />
                </div>
              </div>
              <h3 className="mb-2 font-bold text-lg">Affiliate Partner</h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Manage your affiliate programs and earnings
              </p>
              <Button
                className="w-full"
                variant={selectedRole === 'affiliate' ? 'default' : 'outline'}
                disabled={isLoading && selectedRole !== 'affiliate'}
                onClick={() => handleRoleSelection('affiliate')}
              >
                {isLoading && selectedRole === 'affiliate' ? 'Setting up...' : 'Continue as Affiliate'}
              </Button>
            </div>
          </Card>

          {/* Admin Role */}
          <Card 
            className="relative cursor-pointer border-2 border-transparent transition-all hover:border-primary hover:shadow-lg"
            onClick={() => handleRoleSelection('admin')}
          >
            <div className="p-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-green-100 p-4">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="mb-2 font-bold text-lg">Admin</h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Manage platform content and settings
              </p>
              <Button
                className="w-full"
                variant={selectedRole === 'admin' ? 'default' : 'outline'}
                disabled={isLoading && selectedRole !== 'admin'}
                onClick={() => handleRoleSelection('admin')}
              >
                {isLoading && selectedRole === 'admin' ? 'Setting up...' : 'Continue as Admin'}
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Can&apos;t decide? You can change your role later in settings.
          </p>
        </div>
      </div>
    </div>
  )
}
