# Quick Start: Deploy to Vercel

**Domain:** edutestglobal.org

---

## 🚀 Step 1: Import Project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Framework: **Next.js** (auto-detected)
5. Click **"Deploy"** (will fail initially - that's OK)

---

## 🔐 Step 2: Add Environment Variables

**Go to:** Project Settings → Environment Variables

**Add all 10 variables** (see `env.template` for reference):

### Firebase (6 variables):
1. `NEXT_PUBLIC_FIREBASE_API_KEY`
2. `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
3. `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
4. `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
5. `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
6. `NEXT_PUBLIC_FIREBASE_APP_ID`

### Other (4 variables):
7. `NEXT_PUBLIC_ADMIN_EMAILS` (e.g., `muradkhanyan.levon@gmail.com`)
8. `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
9. `TURNSTILE_SECRET_KEY` ⚠️ (NO `NEXT_PUBLIC_` prefix!)
10. `NEXT_PUBLIC_SITE_URL` = `https://edutestglobal.org`

**Important:**
- Select **✅ Production** AND **✅ Preview** for each variable
- `TURNSTILE_SECRET_KEY` should NOT have `NEXT_PUBLIC_` prefix

---

## 🌐 Step 3: Connect Domain

1. Go to: **Project Settings → Domains**
2. Add: `edutestglobal.org`
3. Add: `www.edutestglobal.org` (redirects to apex)
4. Configure DNS records at your registrar (Vercel will show exact values)
5. Wait for DNS propagation (1-24 hours)
6. SSL certificate will be issued automatically

---

## 🔄 Step 4: Redeploy

1. Go to: **Deployments**
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait for build to complete

---

## ✅ Step 5: Verify

- [ ] Site loads: `https://edutestglobal.org`
- [ ] HTTPS active (green lock)
- [ ] Contact form works
- [ ] Admin login works
- [ ] All pages load correctly

---

## 📚 Full Documentation

- **Complete Checklist:** See `DEPLOYMENT_CHECKLIST.md`
- **Environment Variables:** See `env.template` and `VERCEL_ENV_VARIABLES.md`
- **Detailed Guide:** See `VERCEL_DEPLOYMENT.md`

---

**Need Help?** Check the troubleshooting section in `DEPLOYMENT_CHECKLIST.md`

