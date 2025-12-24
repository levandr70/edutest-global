# Production Deployment Guide

This guide covers deploying the EduTest Global website to Vercel.

## Prerequisites

- GitHub repository with code pushed
- Vercel account (free tier works)
- Firebase project configured
- Cloudflare Turnstile account (for contact form)

---

## Step 1: Push Code to GitHub

1. **Commit all changes:**
   ```bash
   git add .
   git commit -m "Prepare for production deployment"
   ```

2. **Push to GitHub:**
   ```bash
   git push origin main
   ```
   (Replace `main` with your branch name if different)

---

## Step 2: Import Project to Vercel

1. **Go to Vercel Dashboard:**
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New Project"

2. **Import from GitHub:**
   - Select your repository: `edutestglobal-site`
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

4. **Click "Deploy"** (we'll add environment variables next)

---

## Step 3: Set Environment Variables

**IMPORTANT:** Set these for **BOTH** Production and Preview environments.

### In Vercel Dashboard:
1. Go to: **Project Settings** → **Environment Variables**
2. Add each variable below for **Production**, **Preview**, and **Development**

### Required Environment Variables:

#### Firebase Configuration (6 variables)
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Where to find:** Firebase Console → Project Settings → General → Your apps

#### Admin Access Control (1 variable)
```
NEXT_PUBLIC_ADMIN_EMAILS=muradkhanyan.levon@gmail.com,admin2@example.com
```

**Format:** Comma-separated list of admin email addresses (no spaces around commas)

#### Cloudflare Turnstile (2 variables)
```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here
TURNSTILE_SECRET_KEY=your_secret_key_here
```

**Where to find:** Cloudflare Dashboard → Turnstile → Site Keys

#### Production URL (1 variable)
```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

**Important:** 
- Use your actual production domain (e.g., `https://edutestglobal.com`)
- Include `https://` protocol
- No trailing slash

---

## Step 4: Deploy Firestore Security Rules

The Firestore rules must be deployed separately to Firebase.

### Option A: Firebase Console (Recommended for first-time)

1. **Open Firebase Console:**
   - Go to [console.firebase.google.com](https://console.firebase.google.com)
   - Select your project

2. **Navigate to Firestore:**
   - Click "Firestore Database" in left sidebar
   - Click "Rules" tab

3. **Update Rules:**
   - Copy contents from `firestore.rules` file in this repo
   - Paste into the rules editor
   - **IMPORTANT:** Update the email list in the `isAdmin()` function (line 11) to match `NEXT_PUBLIC_ADMIN_EMAILS`
   - Example:
     ```javascript
     function isAdmin() {
       return request.auth != null
         && request.auth.token.email != null
         && request.auth.token.email in [
           "muradkhanyan.levon@gmail.com",
           "admin2@example.com"
         ];
     }
     ```

4. **Publish:**
   - Click "Publish" button
   - Wait for confirmation

### Option B: Firebase CLI

1. **Install Firebase CLI** (if not installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login:**
   ```bash
   firebase login
   ```

3. **Initialize** (if not already done):
   ```bash
   firebase init firestore
   ```
   - Select your project
   - Use existing `firestore.rules` file

4. **Deploy:**
   ```bash
   firebase deploy --only firestore:rules
   ```

---

## Step 5: Redeploy on Vercel

After setting environment variables:

1. **Trigger Redeploy:**
   - Go to Vercel Dashboard → Your Project
   - Click "Deployments" tab
   - Click "..." on latest deployment → "Redeploy"
   - OR push a new commit to trigger automatic deployment

2. **Verify Build:**
   - Check build logs for any errors
   - Build should complete successfully

---

## Step 6: Smoke Tests

After deployment, verify the following:

### Public Pages
- [ ] Home page loads (`/`)
- [ ] Professional Tests page loads (`/testing`)
- [ ] TOEFL page loads (`/testing/toefl`)
- [ ] GRE page loads (`/testing/gre`)
- [ ] ACT page loads (`/testing/act`)
- [ ] CELTA page loads (`/celta`)
- [ ] About page loads (`/about`)
- [ ] Contact page loads (`/contact`)

### SEO & Metadata
- [ ] Sitemap accessible: `https://yourdomain.com/sitemap.xml`
- [ ] Robots.txt accessible: `https://yourdomain.com/robots.txt`
- [ ] Verify robots.txt disallows `/admin` paths

### Contact Form
- [ ] Contact form displays Turnstile widget
- [ ] Form submission works
- [ ] Success message appears after submission

### Admin Access
- [ ] Admin login page loads (`/admin/login`)
- [ ] Login with allowed email works
- [ ] Login with non-allowed email shows "Access denied"
- [ ] Admin dashboard accessible after login
- [ ] Can create/edit test dates
- [ ] Can manage CELTA content

### Calendar Functionality
- [ ] Test dates calendar displays on public pages
- [ ] Month navigation works
- [ ] Dates show correctly

### Navigation
- [ ] Header navigation works on all pages
- [ ] Footer navigation works
- [ ] Active page highlighting works in header

---

## Troubleshooting

### Build Fails
- **Check:** Environment variables are set for correct environment (Production/Preview)
- **Check:** All `NEXT_PUBLIC_*` variables are set
- **Check:** Build logs for specific error messages

### Admin Login Not Working
- **Check:** `NEXT_PUBLIC_ADMIN_EMAILS` is set correctly
- **Check:** Email in Firebase Authentication matches allowlist
- **Check:** Firestore rules are deployed with matching email list

### Contact Form Not Working
- **Check:** `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set
- **Check:** `TURNSTILE_SECRET_KEY` is set (server-side only)
- **Check:** Turnstile keys are for correct domain

### Firebase Errors
- **Check:** All Firebase environment variables are correct
- **Check:** Firebase project is active
- **Check:** Firestore rules are deployed

### Sitemap/Robots Not Working
- **Check:** `NEXT_PUBLIC_SITE_URL` is set to production domain
- **Check:** Domain includes `https://` protocol
- **Check:** No trailing slash in URL

---

## Post-Deployment Checklist

- [ ] All environment variables set for Production and Preview
- [ ] Firestore rules deployed with correct admin emails
- [ ] Production domain configured in Vercel
- [ ] Custom domain added (if applicable)
- [ ] SSL certificate active (automatic with Vercel)
- [ ] All smoke tests passed
- [ ] Analytics/monitoring set up (optional)

---

## Updating Admin Emails

When adding new admin users:

1. **Update Environment Variable:**
   - Vercel Dashboard → Environment Variables
   - Edit `NEXT_PUBLIC_ADMIN_EMAILS`
   - Add new email: `existing@email.com,new@email.com`
   - Redeploy

2. **Update Firestore Rules:**
   - Firebase Console → Firestore → Rules
   - Add email to `isAdmin()` function array
   - Publish rules

3. **Add User to Firebase Authentication:**
   - Firebase Console → Authentication → Users
   - Add new user with email/password

---

## Support

For issues:
- Check Vercel deployment logs
- Check Firebase Console for errors
- Review browser console for client-side errors
- Verify all environment variables are set correctly



