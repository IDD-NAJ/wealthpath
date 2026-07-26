# Clerk Authentication Setup Guide

This guide will help you set up Clerk authentication for the WealthPath application with role-based dashboard routing.

## Prerequisites

- Clerk account (create one at https://dashboard.clerk.com)
- Node.js and pnpm installed
- Vercel project connected (optional, for deployment)

## Step 1: Create a Clerk Application

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Click "Create Application"
3. Choose your preferred authentication methods (Email/Password recommended)
4. Click "Create"

## Step 2: Get Your API Keys

1. In the Clerk Dashboard, go to **API Keys**
2. Copy your:
   - **Publishable Key** (starts with `pk_`)
   - **Secret Key** (starts with `sk_`)
3. Go to **Webhooks** (optional, for events)
4. If needed, create a new webhook endpoint and copy the **Signing Secret**

## Step 3: Set Environment Variables

Create a `.env.local` file in the project root and add:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY
CLERK_SECRET_KEY=sk_test_YOUR_KEY
```

Optional environment variables:

```bash
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/auth-selection
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/auth-selection
```

## Step 4: Configure Allowed Redirect URIs

In the Clerk Dashboard:

1. Go to **Settings > URLs**
2. Add your application URLs:
   - Local development: `http://localhost:3000`
   - Production: `https://yourdomain.com`
   - Vercel preview: `https://*.vercel.app`

## Step 5: User Metadata Setup

Users will be assigned roles through user metadata during the `/auth-selection` flow:

```typescript
// In auth-selection/page.tsx
await user?.update({
  unsafeMetadata: {
    role: 'admin' | 'user' | 'affiliate',
  },
})
```

## Step 6: Run the Application

```bash
pnpm install
pnpm dev
```

Visit `http://localhost:3000` and test the authentication flow:

1. Click sign-up or sign-in
2. Create a test account
3. Choose your role (User, Affiliate, or Admin)
4. Get redirected to your role-specific dashboard

## Authentication Flow

```
Home Page
    ↓
Sign In/Up (Clerk Component)
    ↓
Auth Selection (Choose Role)
    ↓
Role-Specific Dashboard
    ├── /admin/dashboard (Admin)
    ├── /user/dashboard (User)
    └── /affiliate/dashboard (Affiliate)
```

## Dashboard Features

### Admin Dashboard (`/admin/dashboard`)
- Full platform management
- User and content management
- Analytics and settings

### User Dashboard (`/user/dashboard`)
- Browse deals and destinations
- Save favorite programs
- View shared content

### Affiliate Dashboard (`/affiliate/dashboard`)
- Manage affiliate programs
- Track earnings and referrals
- Generate affiliate links

## Role-Based Protection

All dashboards check the user's role and redirect to `/auth-selection` if unauthorized:

```typescript
const userRole = (user?.unsafeMetadata as any)?.role
if (userRole !== 'expectedRole') {
  router.push('/auth-selection')
}
```

## Deployment on Vercel

1. Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

2. Update Clerk Dashboard with your Vercel production URL

3. Deploy using `vercel deploy` or push to Git (auto-deployment)

## Troubleshooting

### Signup/Signin not working
- Check that `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set
- Verify redirect URIs in Clerk Dashboard
- Clear browser cookies and cache

### Role not persisting
- Ensure `user?.update()` is called successfully in auth-selection
- Check browser console for errors
- Verify user metadata is saved in Clerk Dashboard (Users section)

### Dashboard redirects to auth-selection
- Check that role is correctly set in user metadata
- Make sure the role matches exactly: 'admin', 'user', or 'affiliate'
- Clear localStorage and cookies

### Webhook Events (Optional)

To set up webhook events:

1. In Clerk Dashboard, go to **Webhooks**
2. Create endpoint pointing to `/api/webhooks/clerk`
3. Subscribe to events: `user.created`, `user.updated`

Example webhook handler:

```typescript
// app/api/webhooks/clerk/route.ts
import { Webhook } from 'svix'
import { headers } from 'next/headers'

export async function POST(req: Request) {
  const svix_id = headers().get('svix-id')
  const svix_timestamp = headers().get('svix-timestamp')
  const svix_signature = headers().get('svix-signature')

  const body = await req.text()
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!)

  try {
    const evt = wh.verify(body, {
      'svix-id': svix_id!,
      'svix-timestamp': svix_timestamp!,
      'svix-signature': svix_signature!,
    })
    
    // Handle event
    console.log('Webhook event:', evt.type)
    return new Response(null, { status: 200 })
  } catch (err) {
    return new Response('Webhook error', { status: 400 })
  }
}
```

## Documentation Links

- [Clerk Documentation](https://clerk.com/docs)
- [Next.js Integration](https://clerk.com/docs/nextjs/overview)
- [User Metadata](https://clerk.com/docs/users/metadata)
- [Webhooks](https://clerk.com/docs/webhooks/overview)
