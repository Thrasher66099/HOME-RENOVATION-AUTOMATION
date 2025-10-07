# Renovation Estimator Pro - Setup Guide

This guide will help you set up and deploy the Renovation Estimator Pro application with Supabase backend and Vercel hosting.

## Prerequisites

- Node.js 18+ installed
- A GitHub account
- A Supabase account (free tier works)
- A Vercel account (free tier works)

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in project details:
   - **Name**: renovation-estimator-pro
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose closest to your users
4. Wait for project to be created (~2 minutes)

## Step 2: Set Up Database Schema

1. In your Supabase project dashboard, navigate to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `supabase/schema.sql` from this repository
4. Paste into the SQL editor and click **Run**
5. Wait for all tables and policies to be created

## Step 3: Get Supabase Credentials

1. In Supabase dashboard, go to **Project Settings** (gear icon)
2. Navigate to **API** section
3. Copy the following values:
   - **Project URL** (under Project URL)
   - **anon public** key (under Project API keys)

## Step 4: Configure Environment Variables Locally

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 5: Install Dependencies and Run Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Step 6: Create First User

1. In Supabase dashboard, go to **Authentication** > **Users**
2. Click **Add User** > **Create new user**
3. Enter email and password
4. The user will be automatically assigned the "Estimator" role via the database trigger

Or use the signup API:
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "SecurePassword123!"}'
```

## Step 7: Update User Role to Admin

1. In Supabase, go to **Table Editor** > **profiles**
2. Find your user's profile row
3. Change `role` from "Estimator" to "Admin"

## Step 8: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **Add New** > **Project**
4. Import your GitHub repository
5. Configure environment variables:
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click **Deploy**

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts and add environment variables when asked
```

## Step 9: Configure Supabase for Production

1. In Supabase dashboard, go to **Authentication** > **URL Configuration**
2. Add your Vercel deployment URL to **Site URL**
3. Add `https://your-app.vercel.app/**` to **Redirect URLs**

## Step 10: Seed Sample Data (Optional)

To add sample regions and vendors, the schema already includes:
- 4 sample regions (IL, CA, FL, NJ)
- 2 sample vendors (Home Depot, Lowe's)

To add more unit costs, you can:
1. Import via CSV through the Table Editor
2. Use the Unit Costs management page in the app (requires Admin role)

## Architecture Overview

```
┌─────────────────┐
│   Vercel Edge   │  ← Next.js App (Frontend + API Routes)
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│    Supabase     │
├─────────────────┤
│  PostgreSQL DB  │  ← Tables with RLS policies
│  Auth           │  ← User authentication
│  Storage        │  ← Photos & PDFs
│  Realtime       │  ← Live collaboration
└─────────────────┘
```

## Key Features Implemented

✅ Supabase authentication with email/password
✅ Row Level Security (RLS) policies for data access control
✅ Role-based permissions (Admin, Manager, Estimator, Viewer, Client)
✅ Projects CRUD operations
✅ Property information management
✅ Unit costs database
✅ Estimates with line items
✅ Purchase orders
✅ Photo uploads
✅ Activity logging
✅ Auto-save functionality (30-second intervals)

## Next Steps

1. **Create your first project**: Navigate to Projects > New Project
2. **Set up unit costs**: Go to Unit Costs (Admin only) and import or add pricing
3. **Configure regions**: Update regional multipliers in the Regions table
4. **Invite team members**: Add users through Supabase Auth dashboard
5. **Customize branding**: Update company logo and colors in the theme settings

## Troubleshooting

### "Unauthorized" errors
- Check that your user has been created in Supabase Auth
- Verify the user has a profile in the `profiles` table
- Check RLS policies are enabled

### Environment variables not working
- Ensure `.env.local` is not committed to Git (it's in .gitignore)
- On Vercel, verify environment variables are set in Project Settings
- Restart dev server after changing .env.local

### Database connection errors
- Verify Supabase URL and key are correct
- Check Supabase project is not paused (free tier pauses after 1 week inactivity)

### Build fails on Vercel
- Check build logs for specific errors
- Ensure all dependencies are in package.json
- Verify TypeScript has no errors: `npm run build` locally

## Support

For issues or questions:
1. Check the [PRD documentation](Docs/construction-prd.md)
2. Review Supabase docs: https://supabase.com/docs
3. Review Next.js docs: https://nextjs.org/docs

## Security Notes

- ⚠️ Never commit `.env.local` to Git
- ⚠️ Never expose your SUPABASE_SERVICE_ROLE_KEY (if you use it)
- ✅ Use environment variables for all secrets
- ✅ RLS policies protect data at the database level
- ✅ All API routes check authentication before operations
