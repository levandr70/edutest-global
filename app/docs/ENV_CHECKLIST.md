# Environment Variables Checklist for edutestglobal.org

**Quick Reference:** Check off each variable as you verify it in Vercel.

---

## 🔐 Vercel Environment Variables Checklist

**Location:** Vercel Dashboard → Your Project → Settings → Environment Variables

For each variable, verify:
- [ ] Variable name is exactly correct (case-sensitive)
- [ ] Value is set (not empty)
- [ ] Not a placeholder (doesn't contain "your_", "your-", "yourdomain")
- [ ] **Production ✅** is selected
- [ ] **Preview ✅** is selected

---

### Firebase Configuration (6 variables)

#### 1. NEXT_PUBLIC_FIREBASE_API_KEY
- [ ] Set in Vercel
- [ ] Value starts with `AIzaSy` (typical format)
- [ ] Production ✅ Preview ✅
- **Get from:** Firebase Console → Project Settings → Your apps

#### 2. NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- [ ] Set in Vercel
- [ ] Value ends with `.firebaseapp.com`
- [ ] Production ✅ Preview ✅
- **Example:** `your-project.firebaseapp.com`

#### 3. NEXT_PUBLIC_FIREBASE_PROJECT_ID
- [ ] Set in Vercel
- [ ] Value is your Firebase project ID
- [ ] Production ✅ Preview ✅
- **Example:** `your-project-id`

#### 4. NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- [ ] Set in Vercel
- [ ] Value ends with `.appspot.com`
- [ ] Production ✅ Preview ✅
- **Example:** `your-project.appspot.com`

#### 5. NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- [ ] Set in Vercel
- [ ] Value is numeric (typically 12 digits)
- [ ] Production ✅ Preview ✅
- **Example:** `123456789012`

#### 6. NEXT_PUBLIC_FIREBASE_APP_ID
- [ ] Set in Vercel
- [ ] Value contains colons (format: `1:123456789012:web:abc123`)
- [ ] Production ✅ Preview ✅
- **Example:** `1:123456789012:web:abc123def456`

---

### Admin Access Control

#### 7. NEXT_PUBLIC_ADMIN_EMAILS
- [ ] Set in Vercel
- [ ] Value contains valid email(s)
- [ ] Format: `email1@example.com,email2@example.com` (no spaces around commas)
- [ ] Production ✅ Preview ✅
- **Example:** `muradkhanyan.levon@gmail.com`

---

### Cloudflare Turnstile

#### 8. NEXT_PUBLIC_TURNSTILE_SITE_KEY
- [ ] Set in Vercel
- [ ] Value is your Turnstile site key
- [ ] Production ✅ Preview ✅
- **Get from:** Cloudflare Dashboard → Turnstile → Site Key

#### 9. TURNSTILE_SECRET_KEY ⚠️ CRITICAL
- [ ] Set in Vercel
- [ ] Value is your Turnstile secret key
- [ ] **DOES NOT have `NEXT_PUBLIC_` prefix** (server-side only!)
- [ ] Production ✅ Preview ✅
- **Get from:** Cloudflare Dashboard → Turnstile → Secret Key

---

### Site URL

#### 10. NEXT_PUBLIC_SITE_URL ⚠️ CRITICAL
- [ ] Set in Vercel
- [ ] **MUST start with `https://` protocol!**
- [ ] Value is: `https://edutestglobal.org` (or `https://your-project.vercel.app` for preview)
- [ ] Starts with `https://` (not `http://`)
- [ ] No trailing slash
- [ ] Production ✅ Preview ✅
- **✅ Correct:** `https://edutestglobal.org`
- **❌ Wrong:** `edutestglobal.org` (missing protocol - causes build error!)
- **❌ Wrong:** `https://edutestglobal.org/` (has trailing slash)

---

## ✅ Final Verification

### All Variables Checked:
- [ ] All 10 variables are present in Vercel
- [ ] All variables have Production ✅ selected
- [ ] All variables have Preview ✅ selected
- [ ] `TURNSTILE_SECRET_KEY` does NOT have `NEXT_PUBLIC_` prefix
- [ ] All other variables have `NEXT_PUBLIC_` prefix
- [ ] No placeholder values found
- [ ] `NEXT_PUBLIC_SITE_URL` is exactly `https://edutestglobal.org` (no trailing slash)

### Quick Test:
- [ ] Run verification script: `node scripts/verify-env.js` (for local .env.local)
- [ ] Or check Vercel build logs for any missing variable errors
- [ ] Deploy and test site functionality

---

## 📝 Quick Copy-Paste List for Vercel

Copy these variable names one by one into Vercel:

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_ADMIN_EMAILS
NEXT_PUBLIC_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY
NEXT_PUBLIC_SITE_URL
```

---

## 🚨 Common Mistakes to Avoid

1. ❌ **TURNSTILE_SECRET_KEY with NEXT_PUBLIC_ prefix**
   - ✅ Correct: `TURNSTILE_SECRET_KEY`
   - ❌ Wrong: `NEXT_PUBLIC_TURNSTILE_SECRET_KEY`

2. ❌ **NEXT_PUBLIC_SITE_URL with trailing slash**
   - ✅ Correct: `https://edutestglobal.org`
   - ❌ Wrong: `https://edutestglobal.org/`

3. ❌ **Admin emails with spaces**
   - ✅ Correct: `email1@example.com,email2@example.com`
   - ❌ Wrong: `email1@example.com, email2@example.com` (has space)

4. ❌ **Variables not set for Production/Preview**
   - ✅ Correct: Both Production ✅ and Preview ✅ selected
   - ❌ Wrong: Only one environment selected

---

## 🔍 How to Verify in Vercel

1. Go to: **Vercel Dashboard** → **Your Project** → **Settings** → **Environment Variables**
2. Scroll through the list
3. Check each variable:
   - Name matches exactly
   - Value is set (click to view)
   - Production ✅ and Preview ✅ are both checked
4. Count: Should see exactly 10 variables

---

## 📚 Related Documentation

- **Detailed Guide:** `ENV_VERIFICATION.md`
- **Template:** `env.template`
- **Quick Start:** `QUICK_START_VERCEL.md`
- **Full Checklist:** `DEPLOYMENT_CHECKLIST.md`

---

**Domain:** edutestglobal.org  
**Status:** Use this checklist to verify all variables are correctly set in Vercel

