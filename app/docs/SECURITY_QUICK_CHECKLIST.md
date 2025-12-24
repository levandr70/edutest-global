# 🔒 Security Quick Checklist

## ⚠️ CRITICAL - Do These First!

### 1. Rotate Exposed Keys
- [ ] **Firebase API Key:** Regenerate in Firebase Console → Update Vercel → Update `.env.local`
- [ ] **Turnstile Secret Key:** Regenerate in Cloudflare → Update Vercel → Update `.env.local`
- [ ] **Redeploy** on Vercel after updating keys

### 2. Restrict Firebase API Key
- [ ] Go to Google Cloud Console → APIs & Services → Credentials
- [ ] Find Firebase API Key → Click "Restrict key"
- [ ] Set API restrictions: Firebase APIs only
- [ ] Set Application restrictions: HTTP referrers
- [ ] Add domains: `edutestglobal.org`, `www.edutestglobal.org`, `*.vercel.app`

### 3. Verify Firebase Rules
- [ ] Firestore rules deployed (Firebase Console → Firestore → Rules)
- [ ] Storage rules deployed (Firebase Console → Storage → Rules)
- [ ] Admin email in rules matches `NEXT_PUBLIC_ADMIN_EMAILS`

---

## 🔐 GitHub Security

- [ ] Enable **Branch Protection** for `main` branch
- [ ] Enable **Dependabot** for security updates
- [ ] Review **Secret Scanning** alerts
- [ ] Dismiss old alerts after rotating keys

---

## 🚀 Vercel Security

- [ ] All environment variables set correctly
- [ ] Exposed keys rotated and updated
- [ ] Variables set for Production AND Preview
- [ ] Review who has access to project

---

## 💻 Code Security

- [ ] Enhanced security headers committed (already done ✅)
- [ ] Test site after security header changes
- [ ] Verify admin authentication works
- [ ] Verify contact form spam protection works

---

## 📊 Security Status

**Current Score:** 7/10
**After Critical Actions:** 9/10

**See `SECURITY_AUDIT_COMPREHENSIVE.md` for full details!**


