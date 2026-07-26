'use client'

import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary to-primary/90 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl font-bold text-white">WealthPath</h1>
          <p className="mt-2 text-white/80">Sign in to your account</p>
        </div>
        <SignIn 
          afterSignInUrl="/auth-selection"
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
