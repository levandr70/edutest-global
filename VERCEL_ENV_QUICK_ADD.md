# Quick Add: Environment Variables to Vercel

**Your deployment is ready!** Now add these environment variables.

## 🚀 Steps to Add Variables

1. **Click "Add"** when Vercel asks about environment variables
2. **OR** Go to: **Project Settings** → **Environment Variables**
3. **For each variable below:**
   - Click **"Add New"**
   - Paste the **Key** (variable name)
   - Paste the **Value** (from your .env.local)
   - Select **✅ Production** AND **✅ Preview**
   - Click **"Save"**

---

## 📋 Copy-Paste Ready Variables

### 1. Firebase API Key
```
Key: NEXT_PUBLIC_FIREBASE_API_KEY
Value: AIzaSyAkJaV4OArITN4_g6YUZPbcCMXxcwD8Bh4
Environments: Production ✅ Preview ✅
```

### 2. Firebase Auth Domain
```
Key: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
Value: edutest-global.firebaseapp.com
Environments: Production ✅ Preview ✅
```

### 3. Firebase Project ID
```
Key: NEXT_PUBLIC_FIREBASE_PROJECT_ID
Value: edutest-global
Environments: Production ✅ Preview ✅
```

### 4. Firebase Storage Bucket
```
Key: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
Value: edutest-global.firebasestorage.app
Environments: Production ✅ Preview ✅
```

### 5. Firebase Messaging Sender ID
```
Key: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
Value: 1833963372
Environments: Production ✅ Preview ✅
```

### 6. Firebase App ID
```
Key: NEXT_PUBLIC_FIREBASE_APP_ID
Value: 1:1833963372:web:52a2f650ba7db6c9f46d49
Environments: Production ✅ Preview ✅
```

### 7. Admin Emails
```
Key: NEXT_PUBLIC_ADMIN_EMAILS
Value: muradkhanyan.levon@gmail.com,admin2@example.com
Environments: Production ✅ Preview ✅
```

### 8. Turnstile Site Key
```
Key: NEXT_PUBLIC_TURNSTILE_SITE_KEY
Value: 0x4AAAAAACHJqtWXAret01gb
Environments: Production ✅ Preview ✅
```

### 9. Turnstile Secret Key ⚠️ IMPORTANT
```
Key: TURNSTILE_SECRET_KEY
Value: 0x4AAAAAACHJqkRwaGpYWPGv1eV-rjAqzbg
Environments: Production ✅ Preview ✅
⚠️ DO NOT add NEXT_PUBLIC_ prefix to this one!
```

### 10. Site URL
```
Key: NEXT_PUBLIC_SITE_URL
Value: https://edutestglobal.org
Environments: Production ✅ Preview ✅
```

---

## ✅ After Adding All Variables

1. **Redeploy:**
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**
   - Wait for build to complete

2. **Verify:**
   - Build should succeed
   - Check build logs for any errors
   - Test the site at: `https://edutest-global-xllr.vercel.app`

---

## 🌐 Next: Connect Your Domain

After variables are added and site works:

1. Go to: **Project Settings** → **Domains**
2. Add: `edutestglobal.org`
3. Add: `www.edutestglobal.org` (redirects to apex)
4. Configure DNS records at your registrar
5. Wait for DNS propagation (1-24 hours)
6. SSL certificate will be issued automatically

---

## 📝 Quick Checklist

- [ ] All 10 variables added
- [ ] Each variable has **Production ✅** selected
- [ ] Each variable has **Preview ✅** selected
- [ ] `TURNSTILE_SECRET_KEY` does NOT have `NEXT_PUBLIC_` prefix
- [ ] All other variables have `NEXT_PUBLIC_` prefix
- [ ] Redeployed after adding variables
- [ ] Build succeeded
- [ ] Site loads correctly

---

**Need help?** See `ENV_CHECKLIST.md` for detailed verification steps.

