'use client'

import { SignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SignUpPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary to-primary/90 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl font-bold text-white">WealthPath</h1>
          <p className="mt-2 text-white/80">Create your account to get started</p>
        </div>
        <SignUp 
          redirectUrl="/sign-in"
          afterSignUpUrl="/auth-selection"
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'bg-white shadow-xl rounded-lg',
              headerTitle: 'text-foreground font-bold',
              headerSubtitle: 'text-muted-foreground',
              socialButtonsBlockButton: 'bg-white border border-input hover:bg-accent',
              socialButtonsBlockButtonText: 'text-foreground font-medium',
              formButtonPrimary: 'bg-primary hover:bg-primary/90 text-white',
              formFieldLabel: 'text-foreground font-medium',
              formFieldInput: 'bg-input border border-input rounded-md',
              footerActionLink: 'text-primary hover:text-primary/80',
            },
          }}
        />
      </div>
    </div>
  )
}
