# WealthPath Authentication System

## Overview

WealthPath uses Clerk for authentication with role-based dashboard routing. Users choose their role during signup, which determines their dashboard access.

## Authentication Pages

### `/sign-up` - User Registration
- Clerk sign-up form
- Redirects to `/auth-selection` after signup
- Supports email/password and OAuth

### `/sign-in` - User Login
- Clerk sign-in form
- Redirects to `/auth-selection` after signin
- Supports email/password and OAuth

### `/auth-selection` - Role Selection
- Users choose their account type
- Updates user metadata with selected role
- Routes to appropriate dashboard based on role

## User Roles

### 1. Admin (`/admin/dashboard`)
- Full platform management
- Content management
- User management
- Analytics and insights
- Settings and configuration

**Role Value:** `admin`

### 2. User (`/user/dashboard`)
- Browse deals and destinations
- Save favorite programs
- View shared content
- User profile management

**Role Value:** `user`

### 3. Affiliate Partner (`/affiliate/dashboard`)
- Manage affiliate programs
- Track earnings and referrals
- Generate affiliate links
- Program analytics

**Role Value:** `affiliate`

## Authentication Flow

```
┌─────────────────────────────────────────────┐
│            WealthPath Home                   │
│        (Public - All Users)                  │
└────────────────┬────────────────────────────┘
                 │
         ┌───────┴───────┐
         │               │
    ┌────▼───────┐  ┌───▼──────┐
    │  Sign Up   │  │ Sign In  │
    │ (Clerk)    │  │ (Clerk)  │
    └────┬───────┘  └───┬──────┘
         │              │
         └──────┬───────┘
                │
        ┌───────▼──────────────┐
        │  Auth Selection      │
        │  Choose Role:        │
        │  • User              │
        │  • Affiliate         │
        │  • Admin             │
        └───────┬──────────────┘
                │
    ┌───────────┼────────────┐
    │           │            │
┌───▼──────┐ ┌──▼────┐ ┌────▼────┐
│  Admin   │ │ User  │ │Affiliate│
│Dashboard │ │Board  │ │Dashboard│
└──────────┘ └───────┘ └─────────┘
```

## Clerk Integration

### Environment Variables Required

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### Setup Steps

1. Create Clerk account at https://dashboard.clerk.com
2. Create a new application
3. Get your API keys from the Clerk Dashboard
4. Add keys to `.env.local`
5. Configure redirect URIs in Clerk Dashboard

See `CLERK_SETUP.md` for detailed setup instructions.

## Role-Based Access Control

Each dashboard page checks the user's role and redirects if unauthorized:

```typescript
const { user } = useUser()
const userRole = (user?.unsafeMetadata as any)?.role

// Redirect if wrong role
if (userRole !== 'expectedRole') {
  router.push('/auth-selection')
}
```

## User Metadata Structure

After role selection, user metadata is updated:

```typescript
{
  role: 'admin' | 'user' | 'affiliate'
}
```

This metadata is set in the auth-selection page:

```typescript
await user?.update({
  unsafeMetadata: {
    role: selectedRole,
  },
})
```

## Protected Routes

All dashboard routes are protected with authentication and role checks:

- `/admin/dashboard` - Admin only
- `/user/dashboard` - User only
- `/affiliate/dashboard` - Affiliate only
- `/auth-selection` - Authenticated users

## Session Management

Clerk automatically manages user sessions through:

1. **Cookies** - Session tokens stored securely
2. **User Context** - `useUser()` hook provides current user
3. **Client Components** - All dashboards use `'use client'` for client-side routing

## Logout Flow

Users logout through the Clerk UserButton component:

```tsx
<UserButton afterSignOutUrl="/" />
```

This:
1. Clears the session
2. Removes auth cookies
3. Redirects to specified URL (homepage)

## Security Considerations

1. **Role Verification** - Each page verifies role matches before rendering
2. **Metadata Immutability** - Roles are part of user metadata, not client-controlled
3. **Session Security** - Clerk handles secure session management
4. **Redirect Protection** - Unauthorized users redirected to auth flow

## Testing Authentication

### Local Testing

1. Start dev server: `pnpm dev`
2. Visit `http://localhost:3000/sign-up`
3. Create test account
4. Select role on `/auth-selection`
5. Verify redirected to correct dashboard

### With Real Clerk Keys

1. Get keys from Clerk Dashboard
2. Add to `.env.local`
3. Test signup/signin flow
4. Verify role selection works

### Testing Without Clerk

To test the UI without Clerk configured:
- Visit `/admin/dashboard`, `/user/dashboard`, `/affiliate/dashboard` directly
- Clerk redirects to `/sign-in` automatically
- Forms show but can't submit without configured keys

## Troubleshooting

### Issue: "Loading..." appears indefinitely

**Solution:**
- Check `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set
- Verify redirect URIs in Clerk Dashboard
- Clear browser cache and cookies

### Issue: Sign-up/Sign-in buttons not working

**Solution:**
- Ensure Clerk keys are configured
- Check browser console for errors
- Verify redirect URLs match Clerk settings

### Issue: Role not persisting after selection

**Solution:**
- Check user metadata in Clerk Dashboard
- Verify `user?.update()` call succeeded
- Clear localStorage and reload

### Issue: Dashboard shows wrong content

**Solution:**
- Verify user role in Clerk Dashboard (Users section)
- Check that role matches exactly: 'admin', 'user', or 'affiliate'
- Log out and sign in again

## API Integration

Dashboards can integrate with your backend APIs:

```typescript
// Example: Fetch user data
const response = await fetch('/api/user/profile', {
  headers: {
    'Authorization': `Bearer ${user?.id}`,
  },
})
```

The user ID from Clerk can be used to scope API calls:

```typescript
const userId = user?.id // From Clerk
```

## Database Schema

Recommended user table structure:

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,           -- From Clerk
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  role TEXT NOT NULL,            -- 'admin', 'user', 'affiliate'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)
```

## Next Steps

1. Configure Clerk with your API keys
2. Test the complete authentication flow
3. Customize dashboards for your needs
4. Connect database for user data storage
5. Deploy to production with Vercel

## Documentation Links

- [Clerk Documentation](https://clerk.com/docs)
- [Next.js + Clerk Setup](https://clerk.com/docs/nextjs/overview)
- [User Metadata Guide](https://clerk.com/docs/users/metadata)
- [useUser Hook](https://clerk.com/docs/references/nextjs/use-user)
