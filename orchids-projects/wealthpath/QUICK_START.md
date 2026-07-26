# Quick Start: Clerk Authentication Setup

## 3 Simple Steps to Enable Authentication

### Step 1: Create Clerk Application (5 minutes)

1. Go to [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Sign up or log in
3. Click "Create Application"
4. Select your preferred auth methods (Email/Password recommended)
5. Click "Create"

### Step 2: Get Your API Keys (2 minutes)

1. In Clerk Dashboard, go to **API Keys**
2. Copy the **Publishable Key** (`pk_test_...`)
3. Copy the **Secret Key** (`sk_test_...`)

### Step 3: Add to Your Project (1 minute)

Create `.env.local` in your project root:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_paste_your_key_here
CLERK_SECRET_KEY=sk_test_paste_your_key_here
```

**Done!** 🎉

---

## Test It Out

```bash
# Start development server
pnpm dev

# Open your browser
http://localhost:3000/sign-up
```

### Testing Flow

1. **Sign Up** → Create a test account
2. **Select Role** → Choose User, Affiliate, or Admin
3. **View Dashboard** → You're now logged in!

### Test Credentials

- **Email:** test@example.com
- **Password:** TestPassword123!

---

## What You Get

### Three Role-Based Dashboards

**👤 User Dashboard** (`/user/dashboard`)
- Browse deals and programs
- Save favorites
- View shared content

**💼 Affiliate Dashboard** (`/affiliate/dashboard`)
- Manage your programs
- Track earnings
- Generate affiliate links

**⚙️ Admin Dashboard** (`/admin/dashboard`)
- Manage platform content
- View analytics
- Configure settings

---

## The Authentication Flow

```
Homepage → Sign Up/In → Choose Role → Dashboard
```

Automatic role-based routing handles everything:
- ✅ User with "user" role → User Dashboard
- ✅ User with "affiliate" role → Affiliate Dashboard
- ✅ User with "admin" role → Admin Dashboard
- ✅ Unauthorized access → Redirected to Sign In

---

## Configure Redirect URLs

In Clerk Dashboard, go to **Settings → URLs** and add:

```
http://localhost:3000          (Local development)
https://yourdomain.com         (Production)
https://*.vercel.app           (Vercel previews)
```

---

## Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Clerk authentication"
   git push
   ```

2. **Set Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - Add `CLERK_SECRET_KEY`

3. **Update Clerk Redirect URLs**
   - Add your Vercel domain

4. **Done!** Vercel auto-deploys

---

## Common Issues & Solutions

### Issue: Pages show loading spinner indefinitely

**Fix:**
1. Check `.env.local` has correct keys
2. Clear browser cache and cookies
3. Restart dev server: `pnpm dev`

### Issue: Sign up/in buttons aren't working

**Fix:**
1. Verify Clerk keys are in `.env.local`
2. Check Clerk Dashboard for any errors
3. Ensure redirect URLs are configured

### Issue: Role not working after selection

**Fix:**
1. Check Clerk Dashboard → Users section
2. Verify user metadata shows the role
3. Log out and sign in again

### Issue: Wrong dashboard showing

**Fix:**
1. Check Clerk Dashboard for the actual role value
2. Ensure it matches exactly: 'admin', 'user', or 'affiliate'
3. Try different role on `/auth-selection`

---

## File Structure

```
app/
├── sign-up/page.tsx                    ← Sign up page
├── sign-in/page.tsx                    ← Sign in page
├── auth-selection/page.tsx             ← Role selection
├── admin/
│   └── dashboard/page.tsx              ← Admin dashboard
├── user/
│   └── dashboard/page.tsx              ← User dashboard
├── affiliate/
│   └── dashboard/page.tsx              ← Affiliate dashboard
└── layout.tsx                          ← Updated with ClerkProvider

docs/
├── CLERK_SETUP.md                      ← Detailed setup guide
├── AUTHENTICATION.md                   ← Full documentation
├── IMPLEMENTATION_SUMMARY.md           ← What was built
└── QUICK_START.md                      ← This file
```

---

## Next: Customize Your Dashboards

Each dashboard is located in:
- `/app/admin/dashboard/page.tsx`
- `/app/user/dashboard/page.tsx`
- `/app/affiliate/dashboard/page.tsx`

Edit these files to:
- Add real data fetching
- Customize layouts
- Add business logic
- Connect to your backend

---

## Support

- **Clerk Docs:** https://clerk.com/docs
- **Next.js Guide:** https://clerk.com/docs/nextjs/overview
- **Troubleshooting:** https://clerk.com/support

---

## Checklist

- [ ] Clerk account created
- [ ] API keys obtained
- [ ] `.env.local` file created with keys
- [ ] Dev server started (`pnpm dev`)
- [ ] Sign up tested
- [ ] Role selection works
- [ ] Dashboards load correctly
- [ ] Redirect URLs configured in Clerk
- [ ] Ready for production deployment!

---

**That's it!** You now have a production-ready authentication system with role-based dashboards. 🚀
