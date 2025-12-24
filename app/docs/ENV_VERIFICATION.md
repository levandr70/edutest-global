# Environment Variables Verification Guide

This guide helps you verify that all required environment variables are correctly set for your Vercel deployment.

---

## 🔍 Quick Verification Methods

### Method 1: Run Verification Script (Recommended)

```bash
node scripts/verify-env.js
```

This script will:
- ✅ Check if all 10 required variables are set
- ✅ Validate variable formats
- ✅ Check for placeholder values
- ✅ Verify correct prefixes (NEXT_PUBLIC_)
- ✅ Ensure TURNSTILE_SECRET_KEY doesn't have NEXT_PUBLIC_ prefix

### Method 2: Manual Checklist

Use this checklist to verify each variable:

---

## 📋 Complete Variable Checklist

### ✅ Firebase Configuration (6 variables)

#### 1. NEXT_PUBLIC_FIREBASE_API_KEY
- [ ] Variable is set
- [ ] Starts with `AIzaSy` (typical Firebase API key format)
- [ ] Not a placeholder (doesn't contain "your_")
- [ ] Has `NEXT_PUBLIC_` prefix
- **Where to find:** Firebase Console → Project Settings → Your apps → Web app config

#### 2. NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- [ ] Variable is set
- [ ] Ends with `.firebaseapp.com`
- [ ] Not a placeholder (doesn't contain "your-")
- [ ] Has `NEXT_PUBLIC_` prefix
- **Example:** `your-project.firebaseapp.com`

#### 3. NEXT_PUBLIC_FIREBASE_PROJECT_ID
- [ ] Variable is set
- [ ] Not a placeholder (doesn't contain "your-")
- [ ] Has `NEXT_PUBLIC_` prefix
- **Example:** `your-project-id`

#### 4. NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- [ ] Variable is set
- [ ] Ends with `.appspot.com` or starts with `gs://`
- [ ] Not a placeholder (doesn't contain "your-")
- [ ] Has `NEXT_PUBLIC_` prefix
- **Example:** `your-project.appspot.com`

#### 5. NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- [ ] Variable is set
- [ ] Numeric value (typically 12 digits)
- [ ] Not a placeholder (doesn't contain "your_")
- [ ] Has `NEXT_PUBLIC_` prefix
- **Example:** `123456789012`

#### 6. NEXT_PUBLIC_FIREBASE_APP_ID
- [ ] Variable is set
- [ ] Contains colons (format: `1:123456789012:web:abc123`)
- [ ] Not a placeholder (doesn't contain "your_")
- [ ] Has `NEXT_PUBLIC_` prefix
- **Example:** `1:123456789012:web:abc123def456`

---

### ✅ Admin Access Control

#### 7. NEXT_PUBLIC_ADMIN_EMAILS
- [ ] Variable is set
- [ ] Contains valid email addresses
- [ ] Comma-separated format (no spaces around commas)
- [ ] Has `NEXT_PUBLIC_` prefix
- **Example:** `muradkhanyan.levon@gmail.com,admin2@example.com`
- **Format:** `email1@example.com,email2@example.com` (no spaces)

---

### ✅ Cloudflare Turnstile

#### 8. NEXT_PUBLIC_TURNSTILE_SITE_KEY
- [ ] Variable is set
- [ ] Starts with `0x4AAAAAA` or similar (Turnstile format)
- [ ] Not a placeholder (doesn't contain "your_")
- [ ] Has `NEXT_PUBLIC_` prefix
- **Where to find:** Cloudflare Dashboard → Turnstile → Site Key

#### 9. TURNSTILE_SECRET_KEY ⚠️ IMPORTANT
- [ ] Variable is set
- [ ] Starts with `0x4AAAAAA` or similar (Turnstile format)
- [ ] Not a placeholder (doesn't contain "your_")
- [ ] **DOES NOT have `NEXT_PUBLIC_` prefix** (server-side only!)
- **Where to find:** Cloudflare Dashboard → Turnstile → Secret Key

---

### ✅ Site URL

#### 10. NEXT_PUBLIC_SITE_URL
- [ ] Variable is set
- [ ] Starts with `https://` (not `http://`)
- [ ] No trailing slash
- [ ] Matches your domain: `https://edutestglobal.org`
- [ ] Has `NEXT_PUBLIC_` prefix
- **Example:** `https://edutestglobal.org` (no trailing slash!)

---

## 🔍 Where Variables Are Used

### Firebase Variables
- **File:** `lib/firebase/client.ts`
- **Used for:** Firebase initialization, Firestore, Auth, Storage

### Admin Emails
- **Files:** 
  - `lib/env.ts`
  - `components/admin/AdminAuthGuard.tsx`
- **Used for:** Admin access control

### Turnstile Keys
- **Files:**
  - `components/ContactForm.tsx` (site key)
  - `app/api/contact/route.ts` (secret key)
- **Used for:** Contact form spam protection

### Site URL
- **Files:**
  - `app/layout.tsx`
  - `app/robots.ts`
  - `app/sitemap.ts`
  - `lib/env.ts`
- **Used for:** SEO, sitemap generation, metadata

---

## ✅ Verification Checklist for Vercel

### Before Deployment:
- [ ] All 10 variables are added in Vercel
- [ ] Each variable has **Production ✅** selected
- [ ] Each variable has **Preview ✅** selected
- [ ] `TURNSTILE_SECRET_KEY` does NOT have `NEXT_PUBLIC_` prefix
- [ ] All other variables have `NEXT_PUBLIC_` prefix
- [ ] `NEXT_PUBLIC_SITE_URL` is set to `https://edutestglobal.org`
- [ ] No placeholder values (no "your_", "your-", "yourdomain")
- [ ] Firebase values match your Firebase project
- [ ] Admin emails match Firestore security rules
- [ ] Turnstile keys are for the correct domain

### After Deployment:
- [ ] Build succeeds in Vercel
- [ ] Site loads at `https://edutestglobal.org`
- [ ] Contact form works (Turnstile widget appears)
- [ ] Admin login works (with allowed email)
- [ ] Firebase data loads (calendars, CELTA content)
- [ ] No console errors in browser

---

## 🐛 Common Issues

### Issue: Variable not found
**Solution:** Make sure variable name is exactly correct (case-sensitive)

### Issue: TURNSTILE_SECRET_KEY has NEXT_PUBLIC_ prefix
**Solution:** Remove `NEXT_PUBLIC_` prefix - this is server-side only

### Issue: NEXT_PUBLIC_SITE_URL has trailing slash
**Solution:** Remove trailing slash - should be `https://edutestglobal.org` not `https://edutestglobal.org/`

### Issue: Admin emails not working
**Solution:** 
- Check format: comma-separated, no spaces
- Verify email matches exactly (case-insensitive but check for typos)
- Ensure user exists in Firebase Authentication

### Issue: Contact form not working
**Solution:**
- Verify both Turnstile keys are set
- Check Turnstile keys are for correct domain
- Ensure `TURNSTILE_SECRET_KEY` doesn't have `NEXT_PUBLIC_` prefix

---

## 📝 Quick Reference

**All 10 Required Variables:**
1. `NEXT_PUBLIC_FIREBASE_API_KEY`
2. `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
3. `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
4. `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
5. `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
6. `NEXT_PUBLIC_FIREBASE_APP_ID`
7. `NEXT_PUBLIC_ADMIN_EMAILS`
8. `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
9. `TURNSTILE_SECRET_KEY` (no prefix!)
10. `NEXT_PUBLIC_SITE_URL`

**Domain:** `edutestglobal.org`

---

## 🚀 Next Steps

1. Run verification script: `node scripts/verify-env.js`
2. Fix any issues found
3. Add variables to Vercel (if not already done)
4. Deploy and test

For detailed deployment steps, see:
- `QUICK_START_VERCEL.md` - Quick deployment guide
- `DEPLOYMENT_CHECKLIST.md` - Complete step-by-step checklist


