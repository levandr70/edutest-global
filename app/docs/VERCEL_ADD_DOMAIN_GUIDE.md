# 🌐 Vercel Add Domain - Step-by-Step Guide

## Current Screen: Add Domain Interface

You're in the Vercel "Add Domain" dialog. Here's what to do:

---

## Step 1: Enter Your Domain

### In the "example.com" field:

**Enter:** `edutestglobal.org`

**Important:**
- ✅ Enter just the domain: `edutestglobal.org`
- ❌ Don't include `https://` or `www.` here
- ❌ Don't include trailing slash

---

## Step 2: Connect to Environment

### Select: **Production** ✅

**Why Production:**
- This connects your domain to your production deployments
- Your site will be live at `edutestglobal.org`
- All production deployments will be accessible via this domain

**Other options:**
- Preview: Only for preview deployments (not what you want)
- Development: Only for development (not what you want)

---

## Step 3: Redirect Option

### Select: **No Redirect** ✅

**Why No Redirect:**
- You want `edutestglobal.org` to be your primary domain
- You'll add `www.edutestglobal.org` separately and configure it to redirect to the apex
- This keeps the apex domain as the main one

**What the options mean:**
- **307 Temporary Redirect:** Redirects this domain to another (not needed for apex)
- **No Redirect:** Domain serves your site directly (what you want for apex)

---

## Step 4: Click "Add"

After entering:
- Domain: `edutestglobal.org`
- Environment: **Production** ✅
- Redirect: **No Redirect** ✅

Click **"Add"** button.

---

## Step 5: Vercel Will Show DNS Instructions

After clicking "Add", Vercel will display:

### DNS Configuration Instructions

You'll see something like:

**For `edutestglobal.org`:**
- **Type:** A Record
- **Name:** `@` (or leave blank)
- **Value:** An IP address (e.g., `76.76.21.1` or `216.198.79.1`)
- **TTL:** 3600

**📝 Write down these exact values!**

---

## Step 6: Add WWW Subdomain

After adding the apex domain:

1. Click **"Add Domain"** again
2. Enter: `www.edutestglobal.org`
3. Select: **Production** ✅
4. Select: **307 Temporary Redirect** ✅
5. Redirect to: `edutestglobal.org`
6. Click **"Add"**

**Why redirect for www:**
- This makes `www.edutestglobal.org` redirect to `edutestglobal.org`
- Better for SEO (one canonical URL)
- Cleaner URLs

**Vercel will show DNS for www:**
- **Type:** CNAME Record
- **Name:** `www`
- **Value:** Something like `cname.vercel-dns.com`
- **TTL:** 3600

**📝 Write down these values too!**

---

## Step 7: Configure DNS at Your Registrar

Now you have DNS values from Vercel. Add them at your domain registrar:

### Record 1: A Record (Apex)
- **Type:** A
- **Name:** `@` (or leave blank)
- **Value:** [The IP address Vercel showed you]
- **TTL:** 3600

### Record 2: CNAME Record (WWW)
- **Type:** CNAME
- **Name:** `www`
- **Value:** [The CNAME value Vercel showed you]
- **TTL:** 3600

See `ADD_CUSTOM_DOMAIN.md` for registrar-specific instructions.

---

## ✅ Summary: What to Enter

### For Apex Domain (edutestglobal.org):
```
Domain: edutestglobal.org
Environment: Production ✅
Redirect: No Redirect ✅
```

### For WWW Subdomain (www.edutestglobal.org):
```
Domain: www.edutestglobal.org
Environment: Production ✅
Redirect: 307 Temporary Redirect ✅
Redirect to: edutestglobal.org
```

---

## 📋 After Adding Domains

1. **Get DNS values from Vercel** (shown after adding)
2. **Add DNS records at your registrar**
3. **Wait 1-24 hours** for DNS propagation
4. **Update `NEXT_PUBLIC_SITE_URL`** to `https://edutestglobal.org` (no trailing slash!)
5. **Redeploy** after updating environment variable

---

## ⚠️ Important Note

I noticed in your `.env.local` file:
```
NEXT_PUBLIC_SITE_URL=https://www.edutestglobal.org/
```

**This should be:**
```
NEXT_PUBLIC_SITE_URL=https://edutestglobal.org
```

**Changes needed:**
- Remove `www.` (use apex domain)
- Remove trailing slash `/`

**Update this in:**
1. Your local `.env.local` file
2. Vercel environment variables (after domain is connected)

---

## 🎯 Quick Action

**Right now, in the Vercel dialog:**

1. Enter: `edutestglobal.org`
2. Select: **Production** ✅
3. Select: **No Redirect** ✅
4. Click **"Add"**
5. Write down the DNS values Vercel shows
6. Then add `www.edutestglobal.org` with redirect

**That's it!** Then configure DNS at your registrar.


