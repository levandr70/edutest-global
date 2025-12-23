# Vercel Deployment Checklist for edutestglobal.org

Complete step-by-step checklist for deploying to Vercel with your domain: **edutestglobal.org**

---

## ✅ Pre-Deployment Setup

### Step 1: Verify Code is Ready
- [ ] All code is committed to Git
- [ ] Code is pushed to GitHub repository
- [ ] No build errors locally (`npm run build` succeeds)
- [ ] All dependencies are in `package.json`

### Step 2: Create Vercel Project
- [ ] Go to [vercel.com](https://vercel.com) and sign in
- [ ] Click **"Add New Project"**
- [ ] Import your GitHub repository: `edutestglobal-site`
- [ ] Framework: **Next.js** (auto-detected)
- [ ] Root Directory: `./` (default)
- [ ] Build Command: `npm run build` (default)
- [ ] Output Directory: `.next` (default)
- [ ] Install Command: `npm install` (default)
- [ ] Node.js Version: **20.x** (set in Project Settings → General)

---

## 🔐 Environment Variables Setup

### Step 3: Add All 10 Environment Variables

**Go to:** Vercel Dashboard → Your Project → Settings → Environment Variables

**For EACH variable:**
- Click **"Add New"**
- Paste the **Key** (variable name)
- Paste your **Value**
- Select **✅ Production** AND **✅ Preview**
- Click **"Save"**

#### Required Variables:

1. **NEXT_PUBLIC_FIREBASE_API_KEY**
   - Value: [Your Firebase API Key]
   - Get from: Firebase Console → Project Settings → Your apps

2. **NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN**
   - Value: `your-project.firebaseapp.com`
   - Get from: Firebase Console → Project Settings

3. **NEXT_PUBLIC_FIREBASE_PROJECT_ID**
   - Value: [Your Firebase Project ID]
   - Get from: Firebase Console → Project Settings

4. **NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET**
   - Value: `your-project.appspot.com`
   - Get from: Firebase Console → Project Settings

5. **NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID**
   - Value: [Your Firebase Messaging Sender ID]
   - Get from: Firebase Console → Project Settings

6. **NEXT_PUBLIC_FIREBASE_APP_ID**
   - Value: [Your Firebase App ID]
   - Get from: Firebase Console → Project Settings

7. **NEXT_PUBLIC_ADMIN_EMAILS**
   - Value: `muradkhanyan.levon@gmail.com` (or comma-separated list)
   - Format: `email1@example.com,email2@example.com` (no spaces)

8. **NEXT_PUBLIC_TURNSTILE_SITE_KEY**
   - Value: [Your Cloudflare Turnstile Site Key]
   - Get from: Cloudflare Dashboard → Turnstile

9. **TURNSTILE_SECRET_KEY** ⚠️
   - Value: [Your Cloudflare Turnstile Secret Key]
   - **IMPORTANT:** This should NOT have `NEXT_PUBLIC_` prefix (server-side only)
   - Get from: Cloudflare Dashboard → Turnstile

10. **NEXT_PUBLIC_SITE_URL**
    - Value: `https://edutestglobal.org`
    - **Update this AFTER domain is connected** (can set now, but verify after)

### Step 4: Verify Environment Variables
- [ ] All 10 variables are added
- [ ] Each variable has **Production ✅** selected
- [ ] Each variable has **Preview ✅** selected
- [ ] `TURNSTILE_SECRET_KEY` does NOT have `NEXT_PUBLIC_` prefix
- [ ] All other variables have `NEXT_PUBLIC_` prefix
- [ ] `NEXT_PUBLIC_SITE_URL` is set to `https://edutestglobal.org`

---

## 🌐 Domain Configuration

### Step 5: Add Domain to Vercel
- [ ] Go to: Project Settings → Domains
- [ ] Click **"Add Domain"**
- [ ] Enter: `edutestglobal.org` (apex domain)
- [ ] Click **"Add"**
- [ ] Add: `www.edutestglobal.org` (www subdomain)
- [ ] Configure redirect: `www.edutestglobal.org` → `edutestglobal.org` (308 redirect)

### Step 6: Configure DNS Records

**Vercel will show you exact DNS values - use those, not examples below!**

#### For Apex Domain (edutestglobal.org):

**Option A: If your registrar supports ALIAS/ANAME (recommended):**
- Type: **ALIAS** or **ANAME**
- Name: `@` or leave blank
- Value: [Vercel will show exact value, e.g., `76.76.21.21`]
- TTL: 3600

**Option B: If ALIAS not available, use A record:**
- Type: **A**
- Name: `@` or leave blank
- Value: [Vercel will show exact IP address]
- TTL: 3600

#### For WWW Subdomain (www.edutestglobal.org):
- Type: **CNAME**
- Name: `www`
- Value: [Vercel will show exact CNAME, e.g., `cname.vercel-dns.com`]
- TTL: 3600

### Step 7: Wait for DNS Propagation
- [ ] DNS records are configured at your registrar
- [ ] Wait 1-24 hours for DNS propagation
- [ ] Check DNS propagation: Use `nslookup edutestglobal.org` or online tools
- [ ] SSL certificate will be issued automatically (check Vercel Domains page)

### Step 8: Update Site URL (After Domain is Active)
- [ ] Domain is active and resolving
- [ ] SSL certificate is issued (green lock in Vercel)
- [ ] Go to: Environment Variables
- [ ] Update `NEXT_PUBLIC_SITE_URL` to: `https://edutestglobal.org`
- [ ] Redeploy: Deployments → Latest → "..." → "Redeploy"

---

## 🚀 Deployment

### Step 9: Initial Deployment
- [ ] Click **"Deploy"** in Vercel (or push to GitHub for auto-deploy)
- [ ] Wait for build to complete
- [ ] Check build logs for errors
- [ ] Build should succeed (if env vars are set correctly)

### Step 10: Redeploy After Adding Variables
- [ ] If you added env vars after first deploy, go to Deployments
- [ ] Click **"..."** on latest deployment
- [ ] Click **"Redeploy"**
- [ ] Verify build succeeds

---

## ✅ Post-Deployment Verification

### Step 11: Basic Site Access
- [ ] Home page loads: `https://edutestglobal.org`
- [ ] HTTPS is active (green lock in browser)
- [ ] No console errors in browser DevTools (F12)
- [ ] Mobile responsive (test on phone)

### Step 12: SEO Files
- [ ] Robots.txt: `https://edutestglobal.org/robots.txt`
  - Should show: `Disallow: /admin` and `Disallow: /admin/*`
- [ ] Sitemap: `https://edutestglobal.org/sitemap.xml`
  - Should use `https://edutestglobal.org` (not localhost)
  - All public pages listed

### Step 13: Public Pages
- [ ] Testing page: `https://edutestglobal.org/testing`
- [ ] TOEFL page: `https://edutestglobal.org/testing/toefl`
  - Calendar loads and displays dates
  - Month navigation works
- [ ] GRE page: `https://edutestglobal.org/testing/gre`
  - Calendar loads
- [ ] ACT page: `https://edutestglobal.org/testing/act`
  - Calendar loads
- [ ] CELTA page: `https://edutestglobal.org/celta`
  - Courses display from Firestore
  - Trainers display from Firestore
- [ ] About page: `https://edutestglobal.org/about`
- [ ] Contact page: `https://edutestglobal.org/contact`

### Step 14: Contact Form
- [ ] Turnstile widget displays on contact form
- [ ] Form validation works
- [ ] Submit button enabled after Turnstile verification
- [ ] Form submission succeeds
- [ ] Success message appears
- [ ] Check Vercel function logs (if any errors)

### Step 15: Admin Access Control
- [ ] Admin login: `https://edutestglobal.org/admin/login`
- [ ] Login with **allowed email** (from `NEXT_PUBLIC_ADMIN_EMAILS`):
  - ✅ Login succeeds
  - ✅ Redirects to `/admin`
  - ✅ Dashboard loads
- [ ] Login with **non-allowed email**:
  - ✅ Shows "Access denied" message
  - ✅ Redirects to `/admin/login?reason=forbidden`
- [ ] Admin can create/edit test dates
- [ ] Admin can manage CELTA content

### Step 16: Firebase Integration
- [ ] Firestore data loads on public pages
- [ ] Calendar dates display correctly
- [ ] CELTA courses display correctly
- [ ] CELTA trainers display correctly
- [ ] Admin can write to Firestore (test date creation)

### Step 17: Performance & UX
- [ ] Page load times are reasonable (< 3 seconds)
- [ ] Images load properly
- [ ] No broken assets (check Network tab)
- [ ] Calendar components render without errors
- [ ] Header navigation works on all pages
- [ ] Footer navigation works
- [ ] Mobile menu works

---

## 🔧 Troubleshooting

### Build Fails
- [ ] Check all 10 environment variables are set
- [ ] Variables are set for Production AND Preview
- [ ] No typos in variable names
- [ ] Check Vercel build logs for specific errors

### Domain Not Resolving
- [ ] DNS records are correct (use Vercel's exact values)
- [ ] DNS propagation time (can take up to 48 hours)
- [ ] Use `nslookup edutestglobal.org` to verify
- [ ] SSL certificate is issued (check Vercel Domains page)

### Admin Login Not Working
- [ ] `NEXT_PUBLIC_ADMIN_EMAILS` is set correctly
- [ ] Email matches exactly (case-insensitive, but check for typos)
- [ ] User exists in Firebase Authentication
- [ ] Firestore rules are deployed with matching email

### Contact Form Not Working
- [ ] `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set
- [ ] `TURNSTILE_SECRET_KEY` is set (server-side)
- [ ] Turnstile keys are for correct domain (edutestglobal.org)
- [ ] Check Vercel function logs for API errors

### Calendar Not Loading
- [ ] Firebase environment variables are correct
- [ ] Firestore has data (check Firebase Console)
- [ ] Browser console for JavaScript errors
- [ ] Network tab for failed requests

---

## 📝 Quick Reference

### Environment Variables Summary
```
1. NEXT_PUBLIC_FIREBASE_API_KEY
2. NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
3. NEXT_PUBLIC_FIREBASE_PROJECT_ID
4. NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
5. NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
6. NEXT_PUBLIC_FIREBASE_APP_ID
7. NEXT_PUBLIC_ADMIN_EMAILS
8. NEXT_PUBLIC_TURNSTILE_SITE_KEY
9. TURNSTILE_SECRET_KEY (no NEXT_PUBLIC_ prefix!)
10. NEXT_PUBLIC_SITE_URL (https://edutestglobal.org)
```

### Domain: edutestglobal.org
- Apex: `edutestglobal.org`
- WWW: `www.edutestglobal.org` (redirects to apex)

### Important Links
- Vercel Dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
- Firebase Console: [console.firebase.google.com](https://console.firebase.google.com)
- Cloudflare Turnstile: [dash.cloudflare.com](https://dash.cloudflare.com)

---

**Last Updated:** Ready for deployment
**Domain:** edutestglobal.org
**Status:** Follow this checklist step-by-step

