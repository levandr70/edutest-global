# 🚀 Final Deployment Checklist - Ready to Deploy!

This is your **complete, step-by-step checklist** to deploy your site successfully. Follow this in order.

---

## ✅ Pre-Deployment: Code Verification

### Step 1: Verify Local Build Works
```bash
# Run these commands locally first
npm install
npm run build
npm run lint
```

**Check:**
- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] `.next` directory is created

**If build fails locally, fix errors before deploying to Vercel!**

---

## 🔐 Step 2: Environment Variables Setup (CRITICAL)

### Go to Vercel Dashboard → Your Project → Settings → Environment Variables

**Add ALL 10 variables. For EACH variable:**
- [ ] Variable name is exactly correct (copy from list below)
- [ ] Value is set (not empty, not placeholder)
- [ ] ✅ **Production** is selected
- [ ] ✅ **Preview** is selected

### Required Variables:

#### 1. Firebase Configuration (6 variables)
- [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
  - Get from: Firebase Console → Project Settings → Your apps
  - Format: `AIzaSy...`
  
- [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - Format: `your-project.firebaseapp.com`
  
- [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - Format: `your-project-id`
  
- [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - Format: `your-project.appspot.com`
  
- [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  - Format: `123456789012` (numeric)
  
- [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`
  - Format: `1:123456789012:web:abc123...`

#### 2. Application Configuration (4 variables)
- [ ] `NEXT_PUBLIC_ADMIN_EMAILS`
  - Format: `email1@example.com,email2@example.com` (no spaces)
  - Example: `muradkhanyan.levon@gmail.com`
  
- [ ] `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
  - Get from: Cloudflare Dashboard → Turnstile
  - Format: `0x4AAAAAA...`
  
- [ ] `TURNSTILE_SECRET_KEY` ⚠️ **IMPORTANT: NO `NEXT_PUBLIC_` prefix!**
  - Get from: Cloudflare Dashboard → Turnstile
  - Server-side only, must NOT have `NEXT_PUBLIC_` prefix
  
- [ ] `NEXT_PUBLIC_SITE_URL`
  - **MUST include `https://` protocol!**
  - For now: `https://your-project.vercel.app` (your Vercel URL)
  - After DNS setup: `https://edutestglobal.org` (no trailing slash!)
  - ✅ **Correct:** `https://edutestglobal.org`
  - ❌ **Wrong:** `edutestglobal.org` (missing protocol - will cause build error!)

---

## 📦 Step 3: Deploy to Vercel

### Option A: First Time Deployment
1. [ ] Go to [vercel.com](https://vercel.com)
2. [ ] Sign in with GitHub
3. [ ] Click **"Add New Project"**
4. [ ] Import your repository: `edutestglobal-site`
5. [ ] Framework: **Next.js** (auto-detected)
6. [ ] Root Directory: `./` (default)
7. [ ] Build Command: `npm run build` (default)
8. [ ] Output Directory: `.next` (default)
9. [ ] **DO NOT click Deploy yet!** (Add env vars first)

### Option B: Existing Project
1. [ ] Go to Vercel Dashboard → Your Project
2. [ ] Verify all environment variables are set (Step 2)
3. [ ] Go to **Deployments** tab

### Deploy
1. [ ] If first time: Click **"Deploy"** (after env vars are set)
2. [ ] If redeploying: Click **"..."** on latest deployment → **"Redeploy"**
3. [ ] Wait for build to complete (1-3 minutes)
4. [ ] Check deployment status:
   - ✅ **Ready** = Success!
   - ❌ **Error** = Check build logs, fix issues, redeploy

---

## 🔍 Step 4: Verify Deployment

### Check Build Logs
1. [ ] Go to **Deployments** → Click latest deployment
2. [ ] Click **"View Build Logs"**
3. [ ] Verify:
   - [ ] No errors
   - [ ] Build completed successfully
   - [ ] No warnings about missing env vars

### Test Your Site
Visit your Vercel URL: `https://your-project.vercel.app`

**Basic Pages:**
- [ ] Home page (`/`) loads
- [ ] About page (`/about`) loads
- [ ] Contact page (`/contact`) loads
- [ ] Testing page (`/testing`) loads

**Testing Pages:**
- [ ] TOEFL page (`/testing/toefl`) loads
- [ ] GRE page (`/testing/gre`) loads
- [ ] ACT page (`/testing/act`) loads

**Other Pages:**
- [ ] CELTA page (`/celta`) loads
- [ ] Admin login (`/admin/login`) loads

**SEO:**
- [ ] Sitemap: `https://your-project.vercel.app/sitemap.xml`
- [ ] Robots.txt: `https://your-project.vercel.app/robots.txt`

---

## 🧪 Step 5: Functional Testing

### Contact Form
- [ ] Turnstile widget displays
- [ ] Form validation works
- [ ] Submit button enabled after Turnstile
- [ ] Form submission succeeds
- [ ] Success message appears

### Firebase Integration
- [ ] Calendar dates load on testing pages
- [ ] CELTA courses display
- [ ] CELTA trainers display
- [ ] No Firebase errors in browser console (F12)

### Admin Access
- [ ] Login with admin email works
- [ ] Redirects to `/admin` after login
- [ ] Admin dashboard loads
- [ ] Can create/edit test dates
- [ ] Can manage CELTA content

### Navigation
- [ ] Header navigation works
- [ ] Footer navigation works
- [ ] Mobile menu works
- [ ] Active page highlighting works

---

## 🌐 Step 6: Custom Domain Setup (Optional)

**Only do this after Vercel deployment is working!**

### In Vercel Dashboard:
1. [ ] Go to **Project Settings** → **Domains**
2. [ ] Add your domain: `edutestglobal.org`
3. [ ] Follow Vercel's DNS instructions

### Update Environment Variable:
1. [ ] Go to **Environment Variables**
2. [ ] Update `NEXT_PUBLIC_SITE_URL` to: `https://edutestglobal.org`
3. [ ] Redeploy

### DNS Configuration:
See `DNS_CONFIGURATION.md` for detailed DNS setup instructions.

---

## 🔥 Step 7: Firebase Rules Deployment

**Important:** Deploy Firestore security rules to Firebase.

### Using Firebase CLI:
```bash
# Install Firebase CLI (if not installed)
npm install -g firebase-tools

# Login
firebase login

# Deploy rules
firebase deploy --only firestore:rules
```

**Or manually in Firebase Console:**
1. [ ] Go to Firebase Console → Firestore Database → Rules
2. [ ] Copy contents from `firestore.rules`
3. [ ] Paste into Firebase Console
4. [ ] Click **"Publish"**

**Verify:**
- [ ] Rules are deployed
- [ ] Admin emails in rules match `NEXT_PUBLIC_ADMIN_EMAILS`

---

## 📊 Step 8: Final Verification

### Performance Check
- [ ] Page load times < 3 seconds
- [ ] No broken images
- [ ] No console errors (F12 → Console tab)
- [ ] No network errors (F12 → Network tab)

### SEO Check
- [ ] Sitemap is accessible
- [ ] Robots.txt is correct
- [ ] Meta tags are present (view page source)
- [ ] Open Graph tags work (test with [opengraph.xyz](https://www.opengraph.xyz))

### Security Check
- [ ] Admin routes are protected
- [ ] Non-admin users cannot access `/admin`
- [ ] Firestore rules prevent unauthorized writes
- [ ] Contact form has spam protection (Turnstile)

---

## 🚨 Common Issues & Quick Fixes

### Issue: Build Fails
**Fix:**
- [ ] Check all 10 environment variables are set
- [ ] Variables are set for Production AND Preview
- [ ] No typos in variable names
- [ ] Check build logs for specific errors

### Issue: Site Shows 404
**Fix:**
- [ ] See `QUICK_FIX_NOT_FOUND.md`
- [ ] Verify environment variables
- [ ] Redeploy after fixing

### Issue: Contact Form Doesn't Work
**Fix:**
- [ ] Verify `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set
- [ ] Verify `TURNSTILE_SECRET_KEY` is set (no `NEXT_PUBLIC_` prefix)
- [ ] Check Vercel function logs for API errors

### Issue: Admin Login Doesn't Work
**Fix:**
- [ ] Verify `NEXT_PUBLIC_ADMIN_EMAILS` is set correctly
- [ ] Email matches exactly (check for typos)
- [ ] User exists in Firebase Authentication
- [ ] Firestore rules match admin email

### Issue: Calendar Not Loading
**Fix:**
- [ ] Verify all Firebase environment variables are correct
- [ ] Check Firestore has data (Firebase Console)
- [ ] Check browser console for errors

---

## 📝 Post-Deployment Tasks

### Immediate (Do Now):
- [ ] Bookmark your Vercel dashboard URL
- [ ] Save your deployment URL
- [ ] Test all major features
- [ ] Check mobile responsiveness

### Short Term (This Week):
- [ ] Set up custom domain (if needed)
- [ ] Update `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Test admin functionality thoroughly
- [ ] Monitor Vercel function logs for errors

### Long Term (Ongoing):
- [ ] Monitor site performance
- [ ] Check Vercel analytics
- [ ] Review error logs regularly
- [ ] Keep dependencies updated

---

## 🎯 Success Criteria

Your deployment is successful when:
- ✅ All pages load without errors
- ✅ Contact form works
- ✅ Admin login works
- ✅ Firebase data displays correctly
- ✅ No console errors
- ✅ Build completes successfully
- ✅ All environment variables are set

---

## 📚 Additional Resources

- **Quick Fix Guide:** `QUICK_FIX_NOT_FOUND.md`
- **Comprehensive Guide:** `VERCEL_NOT_FOUND_COMPREHENSIVE_GUIDE.md`
- **Environment Variables:** `ENV_CHECKLIST.md`
- **DNS Setup:** `DNS_CONFIGURATION.md`
- **Troubleshooting:** `VERCEL_404_TROUBLESHOOTING.md`

---

## 🆘 Need Help?

1. **Check build logs** in Vercel Dashboard
2. **Check browser console** (F12) for client-side errors
3. **Check Vercel function logs** for API errors
4. **Review documentation** files in your project
5. **Verify environment variables** are all set correctly

---

**🎉 Once all checkboxes are checked, your site is ready for production!**

