# 🛡️ Security Action Plan - Step by Step

## Priority 1: CRITICAL - Rotate Exposed Keys (Do First!)

### Step 1: Rotate Firebase API Key

1. **Go to Firebase Console:**
   - Visit [console.firebase.google.com](https://console.firebase.google.com)
   - Select project: `edutest-global`

2. **Regenerate API Key:**
   - Go to **Project Settings** → **General**
   - Scroll to **"Your apps"** section
   - Click on your web app
   - Click **"Regenerate API Key"** (or create new web app)
   - **Copy the new API key**

3. **Update Everywhere:**
   - [ ] Update in **Vercel** → Settings → Environment Variables → `NEXT_PUBLIC_FIREBASE_API_KEY`
   - [ ] Update in **local `.env.local`** file
   - [ ] **Redeploy** on Vercel after updating

### Step 2: Rotate Turnstile Secret Key

1. **Go to Cloudflare Dashboard:**
   - Visit [dash.cloudflare.com](https://dash.cloudflare.com)
   - Navigate to **Turnstile**

2. **Regenerate Secret Key:**
   - Find your Turnstile site
   - Click **"Regenerate Secret Key"** (or create new site)
   - **Copy the new secret key**

3. **Update Everywhere:**
   - [ ] Update in **Vercel** → Settings → Environment Variables → `TURNSTILE_SECRET_KEY`
   - [ ] Update in **local `.env.local`** file
   - [ ] **Redeploy** on Vercel after updating

### Step 3: Verify After Rotation

- [ ] Test site loads correctly
- [ ] Test contact form works
- [ ] Test admin login works
- [ ] Check browser console for errors

---

## Priority 2: HIGH - Restrict Firebase API Key

### Step 1: Go to Google Cloud Console

1. Visit [console.cloud.google.com](https://console.cloud.google.com)
2. Select project: `edutest-global`
3. Go to **APIs & Services** → **Credentials**

### Step 2: Restrict API Key

1. Find your Firebase API Key (starts with `AIzaSy...`)
2. Click on the key name
3. Under **"API restrictions":**
   - Select **"Restrict key"**
   - Check only: **Firebase APIs**
4. Under **"Application restrictions":**
   - Select **"HTTP referrers (web sites)"**
   - Click **"Add an item"**
   - Add these referrers:
     - `https://edutestglobal.org/*`
     - `https://www.edutestglobal.org/*`
     - `https://*.vercel.app/*`
5. Click **"Save"**

**This prevents the API key from being used on unauthorized domains!**

---

## Priority 3: HIGH - Verify Firebase Rules

### Step 1: Verify Firestore Rules

1. **Go to Firebase Console:**
   - Firestore Database → **Rules** tab
   - Verify rules match `firestore.rules` file
   - Should show admin email: `muradkhanyan.levon@gmail.com`
   - Click **"Publish"** if not already published

### Step 2: Verify Storage Rules

1. **Go to Firebase Console:**
   - Storage → **Rules** tab
   - Verify rules match `docs/storage.rules.txt`
   - Should allow:
     - Public read for `celtaTrainers` and `celtaResources`
     - Write only for authenticated users
   - Click **"Publish"** if not already published

---

## Priority 4: MEDIUM - GitHub Security

### Step 1: Enable Branch Protection

1. **Go to GitHub:**
   - Repository → **Settings** → **Branches**
   - Click **"Add rule"**

2. **Configure Rule:**
   - Branch name pattern: `main`
   - Enable:
     - ✅ **Require a pull request before merging**
     - ✅ **Require approvals:** 1
     - ✅ **Require status checks to pass before merging**
     - ✅ **Include administrators**
   - Click **"Create"**

**This prevents direct pushes to main and requires code review!**

### Step 2: Enable Dependabot

1. **Go to GitHub:**
   - Repository → **Settings** → **Security**
   - Click **"Dependabot"** in left sidebar
   - Click **"Enable Dependabot"**

2. **Configure:**
   - Enable **Dependabot alerts**
   - Enable **Dependabot security updates**
   - Enable **Dependabot version updates** (optional)

**This automatically updates dependencies and alerts you to vulnerabilities!**

### Step 3: Review Secret Scanning Alerts

1. **Go to GitHub:**
   - Repository → **Security** tab
   - Click **"Secret scanning"**
   - Review any alerts
   - After rotating keys, dismiss old alerts

---

## Priority 5: MEDIUM - Enhanced Security Headers

### Already Implemented ✅

I've enhanced your `next.config.ts` with additional security headers:
- ✅ `Strict-Transport-Security` (HSTS)
- ✅ `X-XSS-Protection`
- ✅ `Permissions-Policy`

**Action Required:**
- [ ] Commit and push the updated `next.config.ts`
- [ ] Redeploy on Vercel
- [ ] Verify headers are present (check in browser DevTools → Network tab)

---

## Priority 6: LOW - Additional Improvements

### 1. Add Rate Limiting (Future)

**For Admin Login:**
- Limit to 5 attempts per 15 minutes per IP
- Use Vercel Edge Config or external service

**For Contact Form:**
- Limit to 3 submissions per hour per IP
- Already has Turnstile, but rate limiting adds extra layer

### 2. Monitor Security

**Set up:**
- [ ] Firebase Authentication logs review (weekly)
- [ ] Vercel function logs review (weekly)
- [ ] GitHub security alerts (daily)
- [ ] Dependency updates (monthly)

### 3. Regular Security Reviews

**Schedule:**
- [ ] Monthly: Review access logs
- [ ] Quarterly: Rotate keys (even if not exposed)
- [ ] Quarterly: Review and update dependencies
- [ ] Annually: Full security audit

---

## 📋 Quick Security Checklist

### Critical (Do Now):
- [ ] Rotate Firebase API Key
- [ ] Rotate Turnstile Secret Key
- [ ] Update Vercel with new keys
- [ ] Update local `.env.local` with new keys
- [ ] Redeploy on Vercel

### High Priority (This Week):
- [ ] Restrict Firebase API Key by domain
- [ ] Verify Firestore rules deployed
- [ ] Verify Storage rules deployed
- [ ] Enable GitHub Branch Protection
- [ ] Commit enhanced security headers

### Medium Priority (This Month):
- [ ] Enable Dependabot
- [ ] Review GitHub secret scanning alerts
- [ ] Set up monitoring and alerts
- [ ] Test all security measures

---

## 🎯 Security Score Improvement

**Current:** 7/10
**After Priority 1-3:** 9/10
**After All Priorities:** 10/10

---

## 📚 Reference Documents

- **Full Audit:** `SECURITY_AUDIT_COMPREHENSIVE.md`
- **Key Rotation:** `SECURITY_ALERT_FIX.md`
- **Firebase Setup:** `docs/FIREBASE_SETUP_COMPLETE.md`
- **Storage Rules:** `docs/STORAGE_SETUP.md`

---

**Start with Priority 1 - Rotate the exposed keys!** This is the most critical security issue.

