# Quick Fix: Vercel NOT_FOUND Error

## 🚨 Immediate Action (5 Minutes)

### Step 1: Check Vercel Dashboard (1 min)
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project → **Deployments**
3. Check latest deployment status:
   - ❌ **Error** → Go to Step 2
   - ✅ **Ready** → Go to Step 3
   - ⏳ **Building** → Wait, then check again

### Step 2: If Build Failed - Check Logs (2 min)
1. Click on the failed deployment
2. Click **"View Build Logs"**
3. Look for these errors:
   - `Environment variable X is not set`
   - `Firebase configuration is missing`
   - `TypeScript error`
   - `Module not found`

**Most Common:** Missing environment variables

### Step 3: Add Environment Variables (2 min)
1. Go to: **Project Settings** → **Environment Variables**
2. Add these 10 variables (copy from `env.template` or your local `.env.local`):

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

**Critical:** For each variable:
- ✅ Check **Production**
- ✅ Check **Preview**
- ✅ Verify value is correct (no typos)

**Important:** `TURNSTILE_SECRET_KEY` should **NOT** have `NEXT_PUBLIC_` prefix!

### Step 4: Redeploy (1 min)
1. Go to **Deployments**
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 1-3 minutes

### Step 5: Verify (1 min)
1. Visit your deployment URL
2. Should now load! ✅

---

## 📋 Why This Happens

**Root Cause:** Your Next.js app needs environment variables during the build process. If they're missing:
- Build might fail completely
- Build might succeed but generate incomplete routes
- Runtime errors occur when code tries to access undefined variables

**Your Specific Case:**
- Your code in `lib/firebase/client.ts` validates Firebase config at runtime
- But `NEXT_PUBLIC_*` variables are embedded at **build time**
- If missing during build, routes might not be generated correctly

---

## 🔍 Diagnostic Checklist

If the quick fix doesn't work, check:

- [ ] All 10 environment variables are set in Vercel
- [ ] Variables are set for **both** Production and Preview
- [ ] No typos in variable names
- [ ] `TURNSTILE_SECRET_KEY` doesn't have `NEXT_PUBLIC_` prefix
- [ ] Build logs show no errors
- [ ] Deployment status is "Ready"
- [ ] You're accessing the correct URL

---

## 📚 Learn More

See `VERCEL_NOT_FOUND_COMPREHENSIVE_GUIDE.md` for:
- Detailed explanation of root causes
- Mental models for understanding the error
- Warning signs to watch for
- Alternative approaches and trade-offs

---

**90% of NOT_FOUND errors are fixed by adding environment variables and redeploying.**


