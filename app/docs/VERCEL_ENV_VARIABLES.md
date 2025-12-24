# Vercel Environment Variables Reference

Use this document to quickly copy-paste environment variables into Vercel.

## How to Add in Vercel

1. Go to: **Vercel Dashboard** → **Your Project** → **Settings** → **Environment Variables**
2. For each variable below:
   - Click **"Add New"**
   - Paste the **Key** (variable name)
   - Paste your **Value**
   - Select **Production** ✅ and **Preview** ✅
   - Click **"Save"**

---

## All 10 Required Environment Variables

### 1. Firebase API Key
```
Key: NEXT_PUBLIC_FIREBASE_API_KEY
Value: [Your Firebase API Key]
Environments: Production ✅ Preview ✅
Type: Public (NEXT_PUBLIC_ prefix)
```

### 2. Firebase Auth Domain
```
Key: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
Value: [Your Firebase Auth Domain, e.g., your-project.firebaseapp.com]
Environments: Production ✅ Preview ✅
Type: Public
```

### 3. Firebase Project ID
```
Key: NEXT_PUBLIC_FIREBASE_PROJECT_ID
Value: [Your Firebase Project ID]
Environments: Production ✅ Preview ✅
Type: Public
```

### 4. Firebase Storage Bucket
```
Key: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
Value: [Your Firebase Storage Bucket, e.g., your-project.appspot.com]
Environments: Production ✅ Preview ✅
Type: Public
```

### 5. Firebase Messaging Sender ID
```
Key: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
Value: [Your Firebase Messaging Sender ID]
Environments: Production ✅ Preview ✅
Type: Public
```

### 6. Firebase App ID
```
Key: NEXT_PUBLIC_FIREBASE_APP_ID
Value: [Your Firebase App ID]
Environments: Production ✅ Preview ✅
Type: Public
```

### 7. Admin Email Allowlist
```
Key: NEXT_PUBLIC_ADMIN_EMAILS
Value: muradkhanyan.levon@gmail.com,admin2@example.com
Format: Comma-separated, no spaces around commas
Environments: Production ✅ Preview ✅
Type: Public
```

### 8. Turnstile Site Key
```
Key: NEXT_PUBLIC_TURNSTILE_SITE_KEY
Value: [Your Cloudflare Turnstile Site Key]
Environments: Production ✅ Preview ✅
Type: Public
```

### 9. Turnstile Secret Key
```
Key: TURNSTILE_SECRET_KEY
Value: [Your Cloudflare Turnstile Secret Key]
Environments: Production ✅ Preview ✅
Type: Secret (server-side only, no NEXT_PUBLIC_ prefix)
```

### 10. Production Site URL
```
Key: NEXT_PUBLIC_SITE_URL
Value: https://yourdomain.com
Important: 
- Use your actual production domain
- Include https:// protocol
- No trailing slash
- Update this AFTER domain is connected to Vercel
Environments: Production ✅ Preview ✅
Type: Public
```

---

## Quick Copy-Paste List (Keys Only)

Copy these keys one by one into Vercel:

1. `NEXT_PUBLIC_FIREBASE_API_KEY`
2. `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
3. `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
4. `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
5. `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
6. `NEXT_PUBLIC_FIREBASE_APP_ID`
7. `NEXT_PUBLIC_ADMIN_EMAILS`
8. `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
9. `TURNSTILE_SECRET_KEY`
10. `NEXT_PUBLIC_SITE_URL`

---

## Where to Find Values

### Firebase Values (Variables 1-6)
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Click ⚙️ **Project Settings** (gear icon)
4. Scroll to **"Your apps"** section
5. Click on your web app (or create one if needed)
6. Copy values from the config object

### Admin Emails (Variable 7)
- Format: `email1@example.com,email2@example.com`
- No spaces around commas
- Example: `muradkhanyan.levon@gmail.com,admin2@example.com`

### Turnstile Keys (Variables 8-9)
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Turnstile**
3. Create a site or use existing
4. Copy **Site Key** (public)
5. Copy **Secret Key** (keep private)

### Site URL (Variable 10)
- Use your production domain
- Example: `https://edutestglobal.com`
- **Update this AFTER connecting domain to Vercel**

---

## Verification Checklist

After adding all variables:

- [ ] All 10 variables added
- [ ] Each variable has **Production** ✅ selected
- [ ] Each variable has **Preview** ✅ selected
- [ ] `TURNSTILE_SECRET_KEY` does NOT have `NEXT_PUBLIC_` prefix
- [ ] All other variables have `NEXT_PUBLIC_` prefix
- [ ] `NEXT_PUBLIC_SITE_URL` will be updated after domain setup
- [ ] All Firebase values are correct
- [ ] Admin emails match Firestore rules

---

## After Adding Variables

1. **Redeploy** your project:
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**

2. **Verify build succeeds:**
   - Check build logs
   - Should complete without errors

3. **Test the deployment:**
   - Visit your Vercel preview URL
   - Test admin login
   - Test contact form

---

**Note:** Remember to update `NEXT_PUBLIC_SITE_URL` to your actual production domain after connecting the domain in Vercel.

