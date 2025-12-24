# 🔧 Fix Turnstile Error 110200 - Step by Step

## 🎯 The Problem

Error 110200 means your Turnstile site key doesn't match the domain you're accessing the site from.

**Your site domains:**
- Production: `https://edutestglobal.org`
- WWW: `https://www.edutestglobal.org`
- Vercel: `https://edutest-global-xllr.vercel.app`

## ✅ Solution: Create/Update Turnstile Site for Your Domain

### Step 1: Go to Cloudflare Turnstile

1. Open: https://dash.cloudflare.com/
2. Log in to your account
3. In the left sidebar, click **"Turnstile"**
   - If you don't see it, look under "Security" or "Products"
   - Direct link: https://dash.cloudflare.com/?to=/:account/turnstile

### Step 2: Check Existing Sites

1. Look at your list of Turnstile sites
2. Check if any site has these domains configured:
   - `edutestglobal.org`
   - `www.edutestglobal.org`
   - `edutest-global-xllr.vercel.app`

### Step 3A: If You Have an Existing Site

**Option 1: Update Domain Configuration**
1. Click on your existing Turnstile site
2. Look for "Domain" or "Domains" section
3. Add all your domains:
   - `edutestglobal.org`
   - `www.edutestglobal.org`
   - `edutest-global-xllr.vercel.app` (if you test on Vercel URL)
4. Save changes
5. Copy the **Site Key** and **Secret Key**

**Option 2: Create a New Site (Recommended)**
1. Click **"Add Site"** or **"Create"**
2. Fill in:
   - **Site name**: `EduTest Global Production`
   - **Domain**: Add all domains (one per line or comma-separated):
     ```
     edutestglobal.org
     www.edutestglobal.org
     edutest-global-xllr.vercel.app
     ```
   - **Widget mode**: `Managed` (recommended)
3. Click **"Create"**
4. Copy both keys:
   - **Site Key** (public) - starts with `0x4AAAAAA...`
   - **Secret Key** (private) - also starts with `0x4AAAAAA...`

### Step 3B: If You Don't Have a Site Yet

1. Click **"Add Site"** or **"Create"**
2. Fill in:
   - **Site name**: `EduTest Global Production`
   - **Domain**: 
     ```
     edutestglobal.org
     www.edutestglobal.org
     edutest-global-xllr.vercel.app
     ```
   - **Widget mode**: `Managed`
3. Click **"Create"**
4. Copy both keys immediately

## 🔑 Step 4: Update Vercel Environment Variables

1. Go to **Vercel Dashboard**: https://vercel.com/dashboard
2. Select your project: `edutest-global` (or your project name)
3. Go to: **Settings** → **Environment Variables**

### Update Site Key:
1. Find: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
2. Click **"Edit"** or **"..."** → **"Edit"**
3. Paste your new **Site Key** from Cloudflare
4. Make sure **Production ✅** and **Preview ✅** are checked
5. Click **"Save"**

### Update Secret Key:
1. Find: `TURNSTILE_SECRET_KEY` (⚠️ NO `NEXT_PUBLIC_` prefix!)
2. Click **"Edit"** or **"..."** → **"Edit"**
3. Paste your new **Secret Key** from Cloudflare
4. Make sure **Production ✅** and **Preview ✅** are checked
5. Click **"Save"**

## 🚀 Step 5: Redeploy

1. Go to **Deployments** tab in Vercel
2. Find the latest deployment
3. Click **"..."** (three dots) on the right
4. Click **"Redeploy"**
5. Wait for deployment to complete (2-5 minutes)

## ✅ Step 6: Test

1. **Clear your browser cache:**
   - Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
   - Select "Cached images and files"
   - Click "Clear data"

2. **Hard refresh the page:**
   - Press `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)

3. **Visit your contact page:**
   - Go to: `https://edutestglobal.org/contact`
   - Check browser console (F12) - Error 110200 should be gone
   - Turnstile widget should load without errors

## 🆘 Quick Fix: Temporarily Disable Turnstile

If you need the form to work **right now** while fixing Turnstile:

1. Go to **Vercel** → **Settings** → **Environment Variables**
2. Find: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
3. Click **"Edit"**
4. **Delete the value** (leave it empty) OR set to: `DISABLED`
5. Click **"Save"**
6. **Redeploy** (Deployments → ... → Redeploy)

⚠️ **Note:** This disables verification (less secure), but the form will work.

## 📋 Verification Checklist

After updating:

- [ ] Turnstile site created/updated in Cloudflare
- [ ] All domains added to Turnstile site:
  - [ ] `edutestglobal.org`
  - [ ] `www.edutestglobal.org`
  - [ ] `edutest-global-xllr.vercel.app` (if needed)
- [ ] Site Key copied from Cloudflare
- [ ] Secret Key copied from Cloudflare
- [ ] `NEXT_PUBLIC_TURNSTILE_SITE_KEY` updated in Vercel
- [ ] `TURNSTILE_SECRET_KEY` updated in Vercel (no `NEXT_PUBLIC_` prefix!)
- [ ] Both variables have Production ✅ and Preview ✅ checked
- [ ] Site redeployed in Vercel
- [ ] Browser cache cleared
- [ ] Tested on contact page - no Error 110200

## 🔍 Still Getting Errors?

### Check These:

1. **Domain Mismatch:**
   - What URL are you accessing? (`edutestglobal.org` vs `www.edutestglobal.org` vs Vercel URL)
   - Make sure that exact domain is in your Turnstile site configuration

2. **Environment Variables:**
   - Double-check the keys are correct (no extra spaces, correct values)
   - Make sure `TURNSTILE_SECRET_KEY` does NOT have `NEXT_PUBLIC_` prefix

3. **Deployment:**
   - Make sure you redeployed after updating variables
   - Check Vercel deployment logs for any errors

4. **Browser:**
   - Try a different browser
   - Try incognito/private mode
   - Clear all cookies for your domain

## 📞 Need More Help?

If errors persist:
1. Check Cloudflare Turnstile dashboard for any error messages
2. Check Vercel deployment logs
3. Verify domain DNS is correctly configured
4. Try creating a completely new Turnstile site with a new key

