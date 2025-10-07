# Deployment Guide - Renovation Estimator Pro

Your code is now on GitHub! Here's how to deploy to Vercel.

## ✅ GitHub Repository

**Repository URL**: https://github.com/Thrasher66099/HOME-RENOVATION-AUTOMATION.git

Your code has been successfully pushed with:
- Complete frontend application
- Supabase integration
- Database schema
- Authentication setup
- API routes
- Documentation

## 🚀 Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click **Add New** → **Project**
   - Find **HOME-RENOVATION-AUTOMATION** in your repositories
   - Click **Import**

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

4. **Add Environment Variables**
   Click **Environment Variables** and add:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://eogjycnjruemhizishbc.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvZ2p5Y25qcnVlbWhpemlzaGJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NDI5ODYsImV4cCI6MjA3NTQxODk4Nn0.HfOli0eT_JHpV44TrTlW2krAPEdwApoqw0sl8mxmU3o
   ```

5. **Deploy**
   - Click **Deploy**
   - Wait 2-3 minutes for build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# Set up and deploy? [Y/n] Y
# Which scope? [Your account]
# Link to existing project? [n] n
# What's your project's name? renovation-estimator-pro
# In which directory is your code located? ./
# Want to override settings? [n] n

# Add environment variables when prompted
```

## 🔧 Post-Deployment Configuration

### 1. Update Supabase Auth Settings

After deployment, you need to configure Supabase to allow authentication from your Vercel domain:

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Update the following:

   **Site URL**:
   ```
   https://your-project.vercel.app
   ```

   **Redirect URLs** (add these):
   ```
   https://your-project.vercel.app/**
   http://localhost:3000/**
   ```

4. Click **Save**

### 2. Verify Deployment

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. You should be redirected to `/login`
3. Try logging in with a Supabase user
4. Verify dashboard loads and shows "No projects" (or your projects if you've created any)

### 3. Set Up Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions
5. Update Supabase redirect URLs to include your custom domain

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Your changes"
git push

# Vercel will automatically deploy!
```

**Branch Deployments**:
- `main` branch → Production deployment
- Other branches → Preview deployments

## 📊 Monitor Your Deployment

### Vercel Dashboard
- **Analytics**: View traffic and performance
- **Logs**: Check runtime logs for errors
- **Build Logs**: Review build process
- **Environment Variables**: Manage secrets

### Useful Links After Deployment
- **Production**: `https://your-project.vercel.app`
- **Dashboard**: `https://vercel.com/your-username/renovation-estimator-pro`
- **GitHub**: https://github.com/Thrasher66099/HOME-RENOVATION-AUTOMATION

## 🐛 Troubleshooting Deployment

### Build Fails

**Check Build Logs**:
1. Go to Vercel dashboard
2. Click on failed deployment
3. View **Build Logs**
4. Look for specific error messages

**Common Issues**:

1. **TypeScript Errors**
   ```bash
   # Test locally first
   npm run build
   ```

2. **Missing Environment Variables**
   - Verify all env vars are set in Vercel
   - Check variable names match exactly
   - No trailing spaces

3. **Node Version**
   - Vercel uses Node 18 by default
   - Add `"engines": { "node": "18.x" }` to package.json if needed

### Runtime Errors

**Check Function Logs**:
1. Vercel Dashboard → Your Project
2. Click **Functions** tab
3. View real-time logs
4. Look for API route errors

**Common Issues**:

1. **CORS Errors**
   - Verify Supabase URL configuration
   - Check redirect URLs include Vercel domain

2. **Authentication Issues**
   - Confirm Supabase auth URLs are updated
   - Test login flow end-to-end
   - Check browser console for errors

3. **Database Connection**
   - Verify Supabase project is active (not paused)
   - Test connection using Supabase dashboard
   - Check RLS policies allow access

## 🔐 Security Checklist

Before going live:

- [ ] Environment variables are set in Vercel (not in code)
- [ ] `.env.local` is in `.gitignore` (already done ✅)
- [ ] Supabase RLS policies are enabled (already done ✅)
- [ ] Auth redirect URLs are configured in Supabase
- [ ] HTTPS is enforced (Vercel does this automatically ✅)
- [ ] Database backups are configured in Supabase

## 📈 Next Steps After Deployment

1. **Run Database Schema**
   - If not done yet, run `supabase/schema.sql` in Supabase SQL Editor

2. **Create Admin User**
   - Create user in Supabase Auth
   - Update profile role to "Admin"

3. **Add Initial Data**
   - Regions (already in schema)
   - Vendors (already in schema)
   - Unit costs (import via UI when built)

4. **Test Production**
   - Create a test project
   - Verify all features work
   - Test on mobile device

5. **Invite Team Members**
   - Add users via Supabase Auth
   - Assign appropriate roles
   - Share production URL

## 🎉 You're Live!

Your Renovation Estimator Pro is now deployed and accessible worldwide!

**Production URL**: `https://your-project.vercel.app` (after deployment)
**GitHub Repo**: https://github.com/Thrasher66099/HOME-RENOVATION-AUTOMATION
**Supabase Dashboard**: https://supabase.com/dashboard/project/eogjycnjruemhizishbc

Happy estimating! 🏗️
