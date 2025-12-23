# Environment Variables Explained

## ❌ CLIENT_KEY - NOT NEEDED

**You do NOT need `CLIENT_KEY` for this project.**

You can safely:
- **Delete it** from your `.env.local` file
- **Ignore it** if you see it anywhere
- **Don't add it** to Vercel

---

## ✅ Required Environment Variables (10 Total)

Your project only needs these 10 variables:

### Firebase Configuration (6 variables):
1. `NEXT_PUBLIC_FIREBASE_API_KEY`
2. `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
3. `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
4. `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
5. `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
6. `NEXT_PUBLIC_FIREBASE_APP_ID`

### Application Configuration (4 variables):
7. `NEXT_PUBLIC_ADMIN_EMAILS`
8. `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
9. `TURNSTILE_SECRET_KEY` (NO `NEXT_PUBLIC_` prefix!)
10. `NEXT_PUBLIC_SITE_URL`

---

## 📝 Your .env.local File Should Look Like:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123

# Admin Access
NEXT_PUBLIC_ADMIN_EMAILS=muradkhanyan.levon@gmail.com

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key
TURNSTILE_SECRET_KEY=your_secret_key

# Site URL
NEXT_PUBLIC_SITE_URL=https://edutest-global-xllr.vercel.app
```

**That's it! No CLIENT_KEY needed.**

---

## 🔍 Where Did CLIENT_KEY Come From?

`CLIENT_KEY` might be:
- A leftover from a template or example
- Something you added by mistake
- From another project you're looking at

**It's not used anywhere in this codebase.**

---

## ✅ Action: Remove CLIENT_KEY

**From your `.env.local` file:**
1. Find the line with `CLIENT_KEY`
2. Delete that entire line
3. Save the file

**You don't need to do anything else!**

---

## 📚 Reference

See `env.template` for the complete list of required variables.

See `ENV_CHECKLIST.md` for detailed instructions on each variable.

---

**Summary: CLIENT_KEY is not needed - you can safely delete it!** ✅

