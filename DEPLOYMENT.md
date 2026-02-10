# RumorStreet - Netlify Deployment Guide

## 🚀 Quick Deploy to Netlify

### Prerequisites
- Netlify account (https://netlify.com)
- Firebase project credentials
- Git repository (GitHub/GitLab) OR Netlify CLI

---

## Method 1: Git Integration (Recommended)

### Step 1: Push to Git Repository

```bash
cd c:\Users\lenovo\Downloads\game

# Initialize git if not already done
git init
git add .
git commit -m "Initial commit - RumorStreet v1.0"

# Push to GitHub (create repo first on GitHub)
git remote add origin https://github.com/YOUR_USERNAME/rumorstreet.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Netlify

1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and select your repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Branch:** `main`

### Step 3: Set Environment Variables

In Netlify dashboard → Site settings → Environment variables, add:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCuqdDxTpg7w0-gB8YaZE7...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=rumorstreet-6beb5.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=rumorstreet-6beb5
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=rumorstreet-6beb5.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=64699...
NEXT_PUBLIC_FIREBASE_APP_ID=1:64699...
```

### Step 4: Deploy

Click **"Deploy site"** - Netlify will automatically build and deploy!

**Your site will be live at:** `https://your-site-name.netlify.app`

---

## Method 2: Netlify CLI (Quick Test)

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify

```bash
netlify login
```

### Step 3: Initialize Project

```bash
cd c:\Users\lenovo\Downloads\game
netlify init
```

Follow the prompts:
- Create & configure a new site
- Team: Your team
- Site name: rumorstreet (or custom)
- Build command: `npm run build`
- Publish directory: `.next`

### Step 4: Deploy

```bash
# Deploy to draft URL for testing
netlify deploy

# Deploy to production
netlify deploy --prod
```

---

## Post-Deployment Configuration

### 1. Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records

### 2. Firebase Authentication URLs

Update Firebase console → Authentication → Settings:
- Add your Netlify URL to **Authorized domains**
- Update **Authorized redirect URIs**

Example:
```
https://rumorstreet.netlify.app
https://your-custom-domain.com
```

### 3. Enable Netlify Features

- **Forms:** Already configured in `netlify.toml`
- **Analytics:** Enable in Netlify dashboard
- **Split Testing:** A/B test different versions

---

## Build Optimization Checklist

✅ **Included in this setup:**
- Next.js Image optimization
- Code splitting
- CSS minification
- SWC compiler for faster builds
- Security headers
- Asset caching
- Next.js Runtime plugin

---

## Troubleshooting

### Build Fails

**Error:** "Module not found"
**Solution:** Ensure all dependencies are in `package.json`

```bash
npm install
```

### Environment Variables Not Working

**Error:** Firebase errors
**Solution:** Check that all `NEXT_PUBLIC_` variables are set in Netlify dashboard

### Images Not Loading

**Error:** Image optimization errors
**Solution:** Add Firebase storage domain to `next.config.mjs` images.domains

---

## Monitoring & Updates

### View Build Logs
- Netlify dashboard → Deploys → Click on deploy → View logs

### Auto-Deploy on Push
- Every `git push` to main branch triggers auto-deploy
- Preview deploys for pull requests

### Rollback if Needed
- Netlify dashboard → Deploys → Click old deploy → "Publish deploy"

---

## Expected Performance

- **Build Time:** ~2-3 minutes
- **Deploy Time:** ~30 seconds
- **Page Load:** <2 seconds (global CDN)
- **Lighthouse Score:** 90+ (with optimizations)

---

## 🎉 Your App is Live!

After deployment, test:
1. Visit your Netlify URL
2. Sign up with email/password
3. Test all pages and features
4. Check Firebase console for user data
5. Monitor Netlify analytics

**Need help?** Check Netlify docs: https://docs.netlify.com/integrations/frameworks/next-js/
