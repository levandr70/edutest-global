# Fix 404 NOT_FOUND Error on Vercel

**Error:** `404: NOT_FOUND` when accessing `edutest-global-xllr.vercel.app`

## 🔍 Most Common Cause: Missing Environment Variables

The 404 error usually means the build failed or environment variables are missing.

---

## ✅ Quick Fix Steps

### Step 1: Check Deployment Status

1. Go to **Vercel Dashboard** → **Your Project** → **Deployments**
2. Click on the latest deployment
3. Check the status:
   - ✅ **Ready** = Deployment successful (but might still need env vars)
   - ❌ **Error** = Build failed (check logs)
   - ⏳ **Building** = Wait for it to finish

### Step 2: Check Build Logs

1. In the deployment, click **"View Build Logs"** or **"Logs"**
2. Look for errors like:
   - `Environment variable X is not set`
   - `Firebase configuration is missing`
   - `TypeScript errors`
   - `Build failed`

### Step 3: Add Environment Variables (CRITICAL)

**This is likely the issue!** The build needs all 10 environment variables.

1. Go to: **Project Settings** → **Environment Variables**
2. Add all 10 variables (see `VERCEL_ENV_QUICK_ADD.md` for exact values)

**Quick list:**
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAkJaV4OArITN4_g6YUZPbcCMXxcwD8Bh4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=edutest-global.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=edutest-global
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=edutest-global.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1833963372
NEXT_PUBLIC_FIREBASE_APP_ID=1:1833963372:web:52a2f650ba7db6c9f46d49
NEXT_PUBLIC_ADMIN_EMAILS=muradkhanyan.levon@gmail.com,admin2@example.com
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAACHJqtWXAret01gb
TURNSTILE_SECRET_KEY=0x4AAAAAACHJqkRwaGpYWPGv1eV-rjAqzbg
NEXT_PUBLIC_SITE_URL=https://edutest-global-xllr.vercel.app
```

**Important:**
- Select **✅ Production** AND **✅ Preview** for each variable
- `TURNSTILE_SECRET_KEY` should NOT have `NEXT_PUBLIC_` prefix
- For `NEXT_PUBLIC_SITE_URL`, use the Vercel deployment URL temporarily: `https://edutest-global-xllr.vercel.app`

### Step 4: Redeploy

**After adding environment variables:**

1. Go to **Deployments**
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**
4. Wait for build to complete (1-3 minutes)
5. Check status - should be **"Ready"** ✅

### Step 5: Test Again

1. Visit: `https://edutest-global-xllr.vercel.app`
2. Should now load the home page
3. If still 404, check build logs again

---

## 🔍 Other Possible Causes

### Cause 1: Build Failed
**Solution:**
- Check build logs for errors
- Fix any TypeScript/build errors
- Redeploy

### Cause 2: Route Not Found
**Solution:**
- Make sure you're accessing the root: `https://edutest-global-xllr.vercel.app/`
- Not a subdirectory like `/admin` (unless logged in)

### Cause 3: Deployment Not Complete
**Solution:**
- Wait for deployment to finish
- Check deployment status is "Ready"

---

## 📋 Verification Checklist

After adding variables and redeploying:

- [ ] All 10 environment variables added in Vercel
- [ ] Each variable has **Production ✅** and **Preview ✅** selected
- [ ] Redeployed after adding variables
- [ ] Deployment status shows **"Ready"** ✅
- [ ] Build logs show no errors
- [ ] Site loads at: `https://edutest-global-xllr.vercel.app`
- [ ] Home page displays correctly
- [ ] No console errors in browser

---

## 🚨 If Still Getting 404

### Check These:

1. **Deployment Status:**
   - Is it "Ready" or "Error"?
   - If "Error", check build logs

2. **Environment Variables:**
   - Are all 10 variables added?
   - Are they set for Production AND Preview?
   - Are values correct (no typos)?

3. **Build Logs:**
   - Any error messages?
   - Missing dependencies?
   - TypeScript errors?

4. **URL:**
   - Are you using the correct Vercel URL?
   - Try: `https://edutest-global-xllr.vercel.app/` (with trailing slash)
   - Or: `https://edutest-global-xllr.vercel.app` (without)

---

## 💡 Quick Test

After redeploying with environment variables:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Visit: `https://edutest-global-xllr.vercel.app`
4. Check for errors:
   - If you see Firebase errors = Firebase env vars missing/wrong
   - If you see no errors but 404 = routing issue
   - If page loads = Success! ✅

---

## 📝 Next Steps After Fixing

Once the site loads:

1. ✅ Update `NEXT_PUBLIC_SITE_URL` to: `https://edutestglobal.org` (after DNS is configured)
2. ✅ Test all pages work
3. ✅ Test contact form
4. ✅ Test admin login
5. ✅ Configure DNS for custom domain

---

**Most Likely Solution:** Add all 10 environment variables and redeploy.

See `VERCEL_ENV_QUICK_ADD.md` for exact values to copy-paste.

