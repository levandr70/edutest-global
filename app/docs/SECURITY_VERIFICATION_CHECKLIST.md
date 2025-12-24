# ✅ Security Verification Checklist

Use this checklist to verify all security improvements are working correctly.

---

## 🔍 Step 1: Site Functionality Check

### Basic Site Load
- [ ] Site loads at `https://www.edutestglobal.org/`
- [ ] No 404 errors
- [ ] Home page displays correctly
- [ ] Navigation works

### Browser Console Check
1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Check for errors:
   - [ ] No Firebase errors (e.g., `auth/invalid-api-key`)
   - [ ] No network errors
   - [ ] No JavaScript errors
   - [ ] Turnstile widget loads (if on contact page)

---

## 🔐 Step 2: Firebase API Key Verification

### Check if New Key is Working
- [ ] Site loads without Firebase errors
- [ ] No console errors about invalid API key
- [ ] Firebase features work (if applicable)

### Verify Key Rotation
- [ ] New API key is different from the old one
- [ ] New key is updated in Vercel
- [ ] New key is updated in `.env.local`
- [ ] Site still works after rotation

---

## 🛡️ Step 3: Security Headers Check

### Verify Security Headers are Present
1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Reload the page
4. Click on the main document request
5. Go to **Headers** tab → **Response Headers**
6. Check for these headers:

- [ ] `X-DNS-Prefetch-Control: on`
- [ ] `X-Frame-Options: SAMEORIGIN`
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `Referrer-Policy: origin-when-cross-origin`
- [ ] `Strict-Transport-Security: max-age=31536000; includeSubDomains` (if HTTPS)

**If headers are missing:** The deployment might not have the latest code. Check Vercel deployments.

---

## 🔑 Step 4: Environment Variables Verification

### Check Vercel Environment Variables
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify all 10 variables are set:
   - [ ] `NEXT_PUBLIC_FIREBASE_API_KEY` (new rotated key)
   - [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`
   - [ ] `NEXT_PUBLIC_ADMIN_EMAILS`
   - [ ] `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - [ ] `TURNSTILE_SECRET_KEY` (no `NEXT_PUBLIC_` prefix)
   - [ ] `NEXT_PUBLIC_SITE_URL` (should be `https://edutestglobal.org`)

3. For each variable:
   - [ ] Has **Production** ✅ selected
   - [ ] Has **Preview** ✅ selected
   - [ ] Value is not empty
   - [ ] Not a placeholder value

---

## 🧪 Step 5: Feature Testing

### Contact Form
- [ ] Visit `/contact` page
- [ ] Turnstile widget appears
- [ ] Form can be submitted
- [ ] No errors in console

### Admin Access (if applicable)
- [ ] Visit `/admin/login`
- [ ] Can log in with admin email
- [ ] Admin dashboard loads
- [ ] No Firebase auth errors

### Firebase Integration
- [ ] Calendar dates load (if applicable)
- [ ] No Firestore errors in console
- [ ] No Storage errors in console

---

## 🔒 Step 6: Firebase Security Rules

### Verify Firestore Rules
1. Go to Firebase Console → Firestore → Rules
2. Check:
   - [ ] Rules are deployed (not just saved)
   - [ ] `isAdmin()` function is defined
   - [ ] Write access restricted to admins
   - [ ] Read access configured correctly

### Verify Storage Rules
1. Go to Firebase Console → Storage → Rules
2. Check:
   - [ ] Rules are deployed
   - [ ] Upload restricted to admins
   - [ ] Read access configured correctly

---

## 🚨 Step 7: GitHub Security

### Check Secret Scanning Alerts
1. Go to GitHub → Your Repository → Security tab
2. Check:
   - [ ] No active secret scanning alerts
   - [ ] Old alerts dismissed (after rotating keys)
   - [ ] No secrets in recent commits

### Repository Security
- [ ] `.env.local` is in `.gitignore`
- [ ] No secrets in documentation files
- [ ] All secrets replaced with placeholders

---

## 📊 Step 8: Deployment Status

### Check Vercel Deployment
1. Go to Vercel Dashboard → Deployments
2. Check latest deployment:
   - [ ] Status: **Ready** ✅
   - [ ] Build completed successfully
   - [ ] No build errors
   - [ ] Deployment is recent (after security changes)

### Verify Latest Code is Deployed
- [ ] Security headers are present (Step 3)
- [ ] Latest changes are live
- [ ] No old code cached

---

## ✅ Final Verification

### All Critical Items Complete
- [ ] Firebase API Key rotated
- [ ] Turnstile Secret Key rotated (if applicable)
- [ ] Keys updated in Vercel
- [ ] Keys updated in `.env.local`
- [ ] Site works correctly
- [ ] No console errors
- [ ] Security headers present
- [ ] Firebase rules deployed

### Security Score
- **Before:** 7/10
- **After:** 9/10 (if all items complete)

---

## 🆘 If Something Doesn't Work

### Site Not Loading
1. Check Vercel deployment status
2. Check browser console for errors
3. Verify environment variables in Vercel
4. Check build logs in Vercel

### Firebase Errors
1. Verify new API key is correct
2. Check Firebase Console for app status
3. Verify all Firebase env vars are set
4. Check browser console for specific error

### Security Headers Missing
1. Verify latest code is deployed
2. Check `next.config.ts` has security headers
3. Redeploy on Vercel
4. Clear browser cache

---

**Complete this checklist to verify all security improvements are working!** ✅


