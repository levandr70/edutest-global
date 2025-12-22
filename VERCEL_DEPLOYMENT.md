# Vercel Production Deployment Action Plan

Complete step-by-step guide for deploying EduTest Global to Vercel with custom domain.

---

## Part 1: Vercel Project Settings

### Step 1.1: Import Project to Vercel

1. **Go to Vercel Dashboard:**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click **"Add New Project"**

2. **Import Repository:**
   - Select repository: `edutestglobal-site`
   - Click **"Import"**

3. **Configure Project Settings:**
   
   **Framework Preset:**
   - ✅ **Next.js** (auto-detected, confirm it's selected)
   
   **Root Directory:**
   - ✅ `./` (default - leave as is)
   
   **Build Command:**
   - ✅ `npm run build` (default - leave as is)
   
   **Output Directory:**
   - ✅ `.next` (default - leave as is)
   
   **Install Command:**
   - ✅ `npm install` (default - leave as is)
   
   **Node.js Version:**
   - ✅ **20.x** (recommended: Node 20 LTS for stability)
   - Set in: Project Settings → General → Node.js Version
   - Or add `engines` to `package.json` (optional):
     ```json
     "engines": {
       "node": ">=20.0.0"
     }
     ```

4. **Click "Deploy"** (initial deployment will fail without env vars - that's expected)

---

## Part 2: Environment Variables

### Step 2.1: Navigate to Environment Variables

1. Go to: **Project Settings** → **Environment Variables**
2. Click **"Add New"** for each variable below

### Step 2.2: Add Environment Variables

**IMPORTANT:** For each variable, select **BOTH**:
- ✅ **Production**
- ✅ **Preview**

(Development is optional but recommended)

#### Required Variables (10 total):

**1. Firebase API Key (Public)**
- **Key:** `NEXT_PUBLIC_FIREBASE_API_KEY`
- **Value:** Your Firebase API key
- **Environments:** Production, Preview
- **Public:** Yes (NEXT_PUBLIC_ prefix)

**2. Firebase Auth Domain (Public)**
- **Key:** `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- **Value:** `your-project.firebaseapp.com`
- **Environments:** Production, Preview
- **Public:** Yes

**3. Firebase Project ID (Public)**
- **Key:** `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- **Value:** Your Firebase project ID
- **Environments:** Production, Preview
- **Public:** Yes

**4. Firebase Storage Bucket (Public)**
- **Key:** `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- **Value:** `your-project.appspot.com`
- **Environments:** Production, Preview
- **Public:** Yes

**5. Firebase Messaging Sender ID (Public)**
- **Key:** `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- **Value:** Your Firebase messaging sender ID
- **Environments:** Production, Preview
- **Public:** Yes

**6. Firebase App ID (Public)**
- **Key:** `NEXT_PUBLIC_FIREBASE_APP_ID`
- **Value:** Your Firebase app ID
- **Environments:** Production, Preview
- **Public:** Yes

**7. Admin Email Allowlist (Public)**
- **Key:** `NEXT_PUBLIC_ADMIN_EMAILS`
- **Value:** `muradkhanyan.levon@gmail.com,admin2@example.com`
- **Format:** Comma-separated, no spaces around commas
- **Environments:** Production, Preview
- **Public:** Yes

**8. Turnstile Site Key (Public)**
- **Key:** `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- **Value:** Your Cloudflare Turnstile site key
- **Environments:** Production, Preview
- **Public:** Yes

**9. Turnstile Secret Key (Secret)**
- **Key:** `TURNSTILE_SECRET_KEY`
- **Value:** Your Cloudflare Turnstile secret key
- **Environments:** Production, Preview
- **Public:** ❌ **NO** (server-side only, keep secret)

**10. Production Site URL (Public)**
- **Key:** `NEXT_PUBLIC_SITE_URL`
- **Value:** `https://yourdomain.com` (use your actual domain)
- **Important:** 
  - Must include `https://` protocol
  - No trailing slash
  - Use apex domain (e.g., `https://edutestglobal.com`)
  - Update this AFTER domain is connected
- **Environments:** Production, Preview
- **Public:** Yes

### Step 2.3: Verify All Variables

- [ ] All 10 variables added
- [ ] Each variable has Production ✅ and Preview ✅ selected
- [ ] `TURNSTILE_SECRET_KEY` is marked as secret (no NEXT_PUBLIC_ prefix)
- [ ] `NEXT_PUBLIC_SITE_URL` will be updated after domain setup

---

## Part 3: Domain Connection

### Step 3.1: Add Domain in Vercel

1. **Navigate to Domain Settings:**
   - Go to: **Project Settings** → **Domains**
   - Click **"Add Domain"**

2. **Add Apex Domain (Primary):**
   - Enter: `yourdomain.com` (e.g., `edutestglobal.com`)
   - Click **"Add"**
   - **This becomes your primary domain**

3. **Add WWW Subdomain:**
   - Enter: `www.yourdomain.com`
   - Click **"Add"**
   - Vercel will automatically configure redirect

### Step 3.2: Configure DNS Records

**Vercel will show you exact DNS values in the UI - use those, not examples below.**

#### Option A: Apex Domain (Root Domain)

**For `yourdomain.com`:**

**If your registrar supports ALIAS/ANAME records (recommended):**
- **Type:** ALIAS / ANAME
- **Name:** `@` or leave blank
- **Value:** Vercel will show: `76.76.21.21` (or current Vercel IP)
- **TTL:** 3600 (or default)

**If ALIAS not available, use A record:**
- **Type:** A
- **Name:** `@` or leave blank
- **Value:** Vercel will show exact IP (e.g., `76.76.21.21`)
- **TTL:** 3600

#### Option B: WWW Subdomain

**For `www.yourdomain.com`:**

- **Type:** CNAME
- **Name:** `www`
- **Value:** Vercel will show: `cname.vercel-dns.com` (or similar)
- **TTL:** 3600

### Step 3.3: Common Registrar Examples

**Important:** Always use the exact values Vercel shows in the Domains settings page.

#### Namecheap:
1. Go to Domain List → Manage → Advanced DNS
2. For apex: Add **A Record** → Host: `@`, Value: (Vercel IP)
3. For www: Add **CNAME Record** → Host: `www`, Value: (Vercel CNAME)

#### GoDaddy:
1. Go to DNS Management
2. For apex: Add **A Record** → Name: `@`, Value: (Vercel IP)
3. For www: Add **CNAME Record** → Name: `www`, Value: (Vercel CNAME)

#### Google Domains:
1. Go to DNS → Custom Records
2. For apex: Add **A Record** → Name: `@`, Data: (Vercel IP)
3. For www: Add **CNAME Record** → Name: `www`, Data: (Vercel CNAME)

#### Cloudflare:
1. Go to DNS → Records
2. For apex: Add **A Record** → Name: `@`, Content: (Vercel IP), Proxy: Off (DNS only)
3. For www: Add **CNAME Record** → Name: `www`, Target: (Vercel CNAME), Proxy: Off

### Step 3.4: Configure Redirects

**Vercel automatically redirects www → apex by default.**

To verify or change:
1. Go to: **Project Settings** → **Domains**
2. Click on `www.yourdomain.com`
3. Configure redirect:
   - **Redirect to:** `yourdomain.com` (apex)
   - **Status:** 308 Permanent Redirect (recommended)

**Primary Domain:** Use apex (`yourdomain.com`) as primary
- This is cleaner and more professional
- Better for SEO
- Shorter URL

### Step 3.5: SSL Certificate

- ✅ **Automatic:** Vercel provides SSL certificates automatically
- ✅ **Wait time:** 1-24 hours after DNS propagation
- ✅ **Status:** Check in Vercel Domains settings
- ✅ **Force HTTPS:** Enabled by default

### Step 3.6: Update NEXT_PUBLIC_SITE_URL

**After domain is connected and SSL is active:**

1. Go to: **Project Settings** → **Environment Variables**
2. Find: `NEXT_PUBLIC_SITE_URL`
3. Update value to: `https://yourdomain.com` (your actual domain)
4. Click **"Save"**
5. **Redeploy:** Go to Deployments → Latest → "..." → "Redeploy"

---

## Part 4: Post-Deployment Verification

### Step 4.1: Basic Site Access

- [ ] Home page loads: `https://yourdomain.com`
- [ ] HTTPS is active (green lock in browser)
- [ ] No console errors in browser DevTools
- [ ] Mobile responsive (test on phone)

### Step 4.2: SEO Files

- [ ] Robots.txt accessible: `https://yourdomain.com/robots.txt`
  - Verify it shows: `Disallow: /admin` and `Disallow: /admin/*`
- [ ] Sitemap accessible: `https://yourdomain.com/sitemap.xml`
  - Verify URLs use your production domain (not localhost)
  - Verify all public pages are listed

### Step 4.3: Public Pages

- [ ] Professional Tests: `https://yourdomain.com/testing`
- [ ] TOEFL page: `https://yourdomain.com/testing/toefl`
  - Calendar loads and displays dates
  - Month navigation works
- [ ] GRE page: `https://yourdomain.com/testing/gre`
  - Calendar loads and displays dates
- [ ] ACT page: `https://yourdomain.com/testing/act`
  - Calendar loads and displays dates
- [ ] CELTA page: `https://yourdomain.com/celta`
  - Courses display from Firestore
  - Trainers display from Firestore
- [ ] About page: `https://yourdomain.com/about`
- [ ] Contact page: `https://yourdomain.com/contact`

### Step 4.4: Contact Form

- [ ] Turnstile widget displays
- [ ] Form validation works
- [ ] Submit button enabled after Turnstile verification
- [ ] Form submission succeeds
- [ ] Success message appears
- [ ] Check Vercel function logs for API route errors (if any)

### Step 4.5: Admin Access Control

- [ ] Admin login page: `https://yourdomain.com/admin/login`
- [ ] Login with **allowed email** (from `NEXT_PUBLIC_ADMIN_EMAILS`):
  - ✅ Login succeeds
  - ✅ Redirects to `/admin`
  - ✅ Dashboard loads
- [ ] Login with **non-allowed email**:
  - ✅ Shows "Access denied" message
  - ✅ Redirects to `/admin/login?reason=forbidden`
- [ ] Admin can create/edit test dates
- [ ] Admin can manage CELTA content

### Step 4.6: Firestore Rules Enforcement

**Test that non-admin users cannot write to Firestore:**

1. **Create a test Firebase user** (not in admin allowlist)
2. **Try to write to Firestore** (via browser console or test script):
   ```javascript
   // This should FAIL for non-admin users
   import { collection, addDoc } from 'firebase/firestore';
   // Attempt to add a test date
   ```
3. **Expected result:**
   - ✅ Write operation is denied
   - ✅ Error: "Missing or insufficient permissions"
   - ✅ Only admin emails can write

**Verify admin can write:**
- [ ] Admin user can create test dates via admin UI
- [ ] Admin user can edit CELTA content via admin UI
- [ ] Changes appear on public pages

### Step 4.7: Navigation & UX

- [ ] Header navigation works on all pages
- [ ] Active page highlighting works (blue background)
- [ ] Footer navigation works
- [ ] Mobile menu works
- [ ] All internal links work
- [ ] External links open in new tab

### Step 4.8: Performance Check

- [ ] Page load times are reasonable (< 3 seconds)
- [ ] Images load properly
- [ ] No broken assets (check Network tab)
- [ ] Calendar components render without errors

---

## Part 5: Troubleshooting

### Build Fails

**Check:**
- [ ] All environment variables are set
- [ ] Variables are set for correct environment (Production/Preview)
- [ ] No typos in variable names
- [ ] Check Vercel build logs for specific errors

### Domain Not Resolving

**Check:**
- [ ] DNS records are correct (use Vercel's exact values)
- [ ] DNS propagation time (can take up to 48 hours)
- [ ] Use `dig yourdomain.com` or `nslookup yourdomain.com` to verify
- [ ] SSL certificate is issued (check Vercel Domains page)

### Admin Login Not Working

**Check:**
- [ ] `NEXT_PUBLIC_ADMIN_EMAILS` is set correctly
- [ ] Email matches exactly (case-insensitive, but check for typos)
- [ ] User exists in Firebase Authentication
- [ ] Firestore rules are deployed with matching email

### Contact Form Not Working

**Check:**
- [ ] `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set
- [ ] `TURNSTILE_SECRET_KEY` is set (server-side)
- [ ] Turnstile keys are for correct domain
- [ ] Check Vercel function logs for API errors

### Calendar Not Loading

**Check:**
- [ ] Firebase environment variables are correct
- [ ] Firestore has data (check Firebase Console)
- [ ] Browser console for JavaScript errors
- [ ] Network tab for failed requests

---

## Quick Reference Checklist

### Pre-Deployment
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] All 10 environment variables added
- [ ] Variables set for Production AND Preview

### Domain Setup
- [ ] Domain added in Vercel
- [ ] DNS records configured (use Vercel's exact values)
- [ ] SSL certificate issued
- [ ] `NEXT_PUBLIC_SITE_URL` updated to production domain

### Post-Deployment
- [ ] All public pages load
- [ ] SEO files accessible (robots.txt, sitemap.xml)
- [ ] Contact form works
- [ ] Admin access control works
- [ ] Firestore rules enforced
- [ ] No console errors

---

## Support Resources

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Vercel Status:** [vercel-status.com](https://www.vercel-status.com)
- **Firebase Console:** [console.firebase.google.com](https://console.firebase.google.com)
- **Project Deployment Guide:** See `DEPLOYMENT.md` in repo

---

**Last Updated:** Ready for production deployment
**Next Steps:** Follow this guide step-by-step, checking off each item as completed.

