# Vercel 404 NOT_FOUND Error - Troubleshooting Guide

## Common Causes

1. **Missing Environment Variables** (Most Common)
2. **Build Failed**
3. **Deployment Not Complete**
4. **Incorrect Route Access**

---

## Step 1: Check Vercel Deployment Status

1. Go to **Vercel Dashboard** → **Your Project** → **Deployments**
2. Check the latest deployment:
   - ✅ **Ready** = Deployment successful
   - ❌ **Error** = Build failed (check logs)
   - ⏳ **Building** = Still in progress (wait)

### If Build Failed:
- Click on the failed deployment
- Click **"View Build Logs"**
- Look for errors related to:
  - Missing environment variables
  - TypeScript errors
  - Import errors

---

## Step 2: Verify Environment Variables

**Critical:** All 10 environment variables must be set for the build to succeed.

### Quick Check:
1. Go to: **Project Settings** → **Environment Variables**
2. Verify all 10 variables are present:
   - [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
   - [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`
   - [ ] `NEXT_PUBLIC_ADMIN_EMAILS`
   - [ ] `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - [ ] `TURNSTILE_SECRET_KEY`
   - [ ] `NEXT_PUBLIC_SITE_URL`

3. **For each variable:**
   - Must have **Production** ✅ selected
   - Must have **Preview** ✅ selected
   - Value is not empty

### Common Issues:
- ❌ Variable name has typo
- ❌ Missing `NEXT_PUBLIC_` prefix (except `TURNSTILE_SECRET_KEY`)
- ❌ Value is empty or placeholder text
- ❌ Only set for Development, not Production/Preview

---

## Step 3: Check Build Logs

1. Go to **Deployments** → Click on latest deployment
2. Click **"View Build Logs"**
3. Look for:
   - `Error: Firebase configuration is missing`
   - `Error: Environment variable X is not set`
   - TypeScript compilation errors
   - Import/module errors

### If You See Firebase Errors:
- All 6 Firebase variables must be set
- Check Firebase Console for correct values

### If You See TypeScript Errors:
- These should be fixed before deployment
- Run `npm run build` locally to catch them

---

## Step 4: Redeploy After Fixing Variables

1. **After adding/fixing environment variables:**
   - Go to **Deployments**
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**
   - Or push a new commit to trigger automatic deployment

2. **Wait for build to complete:**
   - Usually takes 1-3 minutes
   - Check deployment status

---

## Step 5: Test the Deployment

### If Deployment is "Ready":

1. **Check the deployment URL:**
   - Should be: `https://your-project.vercel.app`
   - Or your custom domain if configured

2. **Test these routes:**
   - `/` (home page)
   - `/testing`
   - `/testing/toefl`
   - `/about`
   - `/contact`

3. **If specific route gives 404:**
   - Check if the page file exists in `app/` directory
   - Verify the route matches the file path

---

## Step 6: Common Fixes

### Fix 1: Missing NEXT_PUBLIC_SITE_URL
**Error:** Sitemap/robots not working
**Solution:** Set `NEXT_PUBLIC_SITE_URL` to your Vercel preview URL temporarily:
```
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

### Fix 2: Firebase Variables Not Set
**Error:** Build fails or Firebase errors
**Solution:** 
- Get values from Firebase Console
- Add all 6 Firebase variables
- Redeploy

### Fix 3: Admin Emails Not Set
**Error:** Admin pages show "Admin not configured"
**Solution:**
- Set `NEXT_PUBLIC_ADMIN_EMAILS`
- Format: `email1@example.com,email2@example.com`
- Redeploy

### Fix 4: Turnstile Keys Missing
**Error:** Contact form doesn't work
**Solution:**
- Set both `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`
- Get from Cloudflare Dashboard
- Redeploy

---

## Step 7: Verify Deployment

After redeploying with all variables:

1. **Check deployment status:** Should be "Ready" ✅
2. **Visit the URL:** Should load home page
3. **Check browser console:** No Firebase errors
4. **Test admin login:** Should work if emails are set
5. **Test contact form:** Should show Turnstile widget

---

## Still Getting 404?

### Check These:

1. **Are you accessing the correct URL?**
   - Use the Vercel deployment URL, not localhost
   - Format: `https://project-name.vercel.app`

2. **Is the route correct?**
   - `/` = home page
   - `/testing` = professional tests page
   - `/admin` = admin dashboard (requires login)

3. **Check Vercel Function Logs:**
   - Go to **Deployments** → **Functions** tab
   - Look for runtime errors

4. **Verify GitHub Connection:**
   - Go to **Project Settings** → **Git**
   - Ensure repository is connected
   - Check if latest commit is deployed

---

## Quick Diagnostic Commands

If you have access to Vercel CLI:

```bash
vercel logs
vercel inspect
```

---

## Next Steps

1. ✅ Verify all 10 environment variables are set
2. ✅ Check deployment logs for errors
3. ✅ Redeploy after fixing variables
4. ✅ Test the deployment URL
5. ✅ Check browser console for client-side errors

---

**Most Common Solution:** Add all missing environment variables and redeploy.



