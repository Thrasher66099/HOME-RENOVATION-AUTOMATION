# Renovation Estimator Pro (REP)

A cloud-based construction estimation and project management platform built with Next.js, Supabase, and Vercel.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Prerequisites

- Node.js 18+
- A Supabase account (free tier works)
- A Vercel account for deployment (free tier works)

## 🔧 Setup

### 1. Database Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** in your Supabase dashboard
3. Copy and paste the contents of `supabase/schema.sql`
4. Click **Run** to create all tables and policies

### 2. Environment Variables

Your `.env.local` is already configured with Supabase credentials:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### 3. Create Your First User

**Option A: Via Supabase Dashboard**
1. Go to **Authentication** > **Users** in Supabase
2. Click **Add User** > **Create new user**
3. Enter email and password
4. User will automatically get "Estimator" role

**Option B: Via Signup (when implemented)**
- Use the signup page at `/signup` (coming soon)

### 4. Set User as Admin

1. In Supabase, go to **Table Editor** > **profiles**
2. Find your user's profile
3. Change `role` from "Estimator" to "Admin"

## 🏗️ Architecture

```
┌─────────────────┐
│   Next.js App   │  ← Frontend + API Routes
│   (Vercel)      │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│    Supabase     │
├─────────────────┤
│  PostgreSQL     │  ← Database with RLS
│  Auth           │  ← Authentication
│  Storage        │  ← File uploads
│  Realtime       │  ← Live updates
└─────────────────┘
```

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── login/             # Login page
│   ├── projects/          # Projects pages
│   ├── estimates/         # Estimates pages
│   └── page.tsx           # Dashboard
├── components/            # React components
│   ├── ui/               # UI primitives
│   ├── layout/           # Layout components
│   ├── dashboard/        # Dashboard components
│   └── projects/         # Project components
├── lib/                  # Utilities
│   ├── supabase/         # Supabase clients
│   └── types/            # TypeScript types
├── supabase/             # Database
│   └── schema.sql        # Database schema
└── middleware.ts         # Auth middleware
```

## ✨ Features Implemented

✅ **Authentication**
- Email/password login
- Session management
- Protected routes via middleware
- Role-based access control

✅ **Database**
- PostgreSQL with Row Level Security (RLS)
- Automatic profile creation on signup
- 5 user roles: Admin, Manager, Estimator, Viewer, Client
- Complete schema matching PRD

✅ **Projects**
- Create, read, update, delete projects
- Real-time updates via Supabase Realtime
- Kanban board with status columns
- Filtering by region, date, search

✅ **API Routes**
- RESTful API for projects
- Server-side Supabase client
- Protected with authentication

## 🔐 User Roles & Permissions

| Role      | Permissions |
|-----------|-------------|
| **Admin** | Full access - manage everything |
| **Manager** | Manage projects, estimates, POs, approve changes |
| **Estimator** | Create/edit projects, estimates, POs |
| **Viewer** | Read-only access to projects |
| **Client** | View approved estimates only |

## 🚢 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy!

### Configure Supabase for Production

1. In Supabase: **Authentication** > **URL Configuration**
2. Add your Vercel URL to:
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**: `https://your-app.vercel.app/**`

## 📖 Documentation

- **[Setup Guide](SETUP.md)**: Detailed setup instructions
- **[PRD](Docs/construction-prd.md)**: Complete product requirements
- **[Supabase Docs](https://supabase.com/docs)**: Supabase documentation
- **[Next.js Docs](https://nextjs.org/docs)**: Next.js documentation

## 🧪 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: Radix UI, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Hosting**: Vercel
- **Real-time**: Supabase Realtime

## 📝 Next Steps

1. ✅ ~~Set up Supabase and run schema~~
2. ✅ ~~Configure environment variables~~
3. ✅ ~~Create first user and set as Admin~~
4. 🔲 Run SQL schema in Supabase
5. 🔲 Create your first project
6. 🔲 Add unit costs to database
7. 🔲 Configure regional multipliers
8. 🔲 Deploy to Vercel

## 🐛 Troubleshooting

**"Unauthorized" errors**
- Verify user exists in Supabase Auth
- Check user has profile in `profiles` table
- Confirm RLS policies are enabled

**Environment variables not working**
- Ensure `.env.local` exists (not committed to Git)
- Restart dev server after changes
- On Vercel, verify variables in Project Settings

**Build fails**
- Run `npm run build` locally to check for errors
- Check TypeScript types: `npx tsc --noEmit`
- Review build logs for specific errors

## 📄 License

Proprietary - All rights reserved

## 🤝 Support

For issues or questions, see the [Setup Guide](SETUP.md) or check:
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
