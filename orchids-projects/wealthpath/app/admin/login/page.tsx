'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/lib/admin-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const { login } = useAdmin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    setTimeout(() => {
      if (login(email, password)) {
        router.push('/admin/dashboard')
      } else {
        setError('Invalid email or password')
      }
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary to-primary/90 px-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="border-b border-border bg-gradient-to-r from-primary to-primary/80 px-6 py-8 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold">WealthPath</h1>
              <p className="text-sm text-white/80">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Admin Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@wealthpath.com"
                disabled={isLoading}
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
                className="mt-2"
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-3 rounded-lg bg-destructive/10 p-4 text-destructive">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? 'Signing in...' : 'Sign In to Dashboard'}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 space-y-3 border-t border-border pt-8">
            <p className="text-center text-sm font-medium text-foreground">Demo Credentials</p>
            <div className="rounded-lg bg-secondary p-4 text-sm">
              <p className="font-mono"><span className="font-semibold">Email:</span> admin@wealthpath.com</p>
              <p className="mt-1 font-mono"><span className="font-semibold">Password:</span> Admin@2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
