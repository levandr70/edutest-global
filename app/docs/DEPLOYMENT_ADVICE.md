# 🎯 Deployment Advice & Best Practices

## ⚡ Quick Start: Deploy in 5 Steps

1. **Run pre-deployment check:**
   ```bash
   npm run pre-deploy
   ```

2. **Verify local build:**
   ```bash
   npm run build
   ```

3. **Set environment variables in Vercel** (see `FINAL_DEPLOYMENT_CHECKLIST.md`)

4. **Deploy to Vercel** (via dashboard or Git push)

5. **Test your deployment** (see checklist)

---

## 🎓 Key Advice for Successful Deployment

### 1. Environment Variables Are Critical

**Why:** Your Next.js app needs environment variables at **build time**, not just runtime.

**What to do:**
- ✅ Set ALL 10 variables in Vercel before first deployment
- ✅ Set for BOTH Production and Preview environments
- ✅ Double-check variable names (case-sensitive!)
- ✅ Never commit `.env.local` to Git (it's in `.gitignore`)

**Common mistake:** Setting variables only for Production, then Preview deployments fail.

---

### 2. Test Locally First

**Why:** Catch errors before deploying.

**What to do:**
```bash
# Install dependencies
npm install

# Run pre-deployment checks
npm run pre-deploy

# Build locally
npm run build

# Test production build locally
npm start
```

**If local build fails, Vercel build will also fail!**

---

### 3. Monitor Build Logs

**Why:** Build logs tell you exactly what's wrong.

**What to do:**
- Always check Vercel build logs after deployment
- Look for:
  - Missing environment variables
  - TypeScript errors
  - Import errors
  - Module not found errors

**Don't just check deployment status - read the logs!**

---

### 4. Deploy in Stages

**Recommended approach:**

1. **First:** Deploy to Vercel with preview URL
   - Test everything works
   - Fix any issues

2. **Second:** Set up custom domain
   - Only after preview URL works perfectly
   - Update `NEXT_PUBLIC_SITE_URL` after domain is live

3. **Third:** Optimize and monitor
   - Check performance
   - Monitor error logs
   - Review analytics

---

### 5. Security Best Practices

**Firebase Security:**
- ✅ Deploy Firestore rules before going live
- ✅ Verify admin emails in rules match environment variable
- ✅ Test that non-admin users cannot write to Firestore

**Environment Variables:**
- ✅ Never expose `TURNSTILE_SECRET_KEY` (no `NEXT_PUBLIC_` prefix)
- ✅ Keep sensitive keys server-side only
- ✅ Use `NEXT_PUBLIC_` only for client-accessible variables

**Admin Access:**
- ✅ Test admin login works
- ✅ Test non-admin users are blocked
- ✅ Verify Firestore rules enforce access control

---

### 6. Performance Optimization

**Already configured:**
- ✅ Image optimization (Next.js Image component)
- ✅ Compression enabled
- ✅ Security headers configured
- ✅ Static generation where possible

**Monitor:**
- Page load times
- Vercel function execution times
- Firebase query performance
- Image loading times

---

### 7. Error Handling

**What's already in place:**
- ✅ Custom 404 page (`app/not-found.tsx`)
- ✅ Error boundaries in components
- ✅ Firebase error handling
- ✅ API route error handling

**What to monitor:**
- Browser console errors (F12)
- Vercel function logs
- Firebase error logs
- User-reported issues

---

### 8. SEO & Metadata

**Already configured:**
- ✅ Sitemap (`app/sitemap.ts`)
- ✅ Robots.txt (`app/robots.ts`)
- ✅ Meta tags in layout
- ✅ Open Graph tags
- ✅ Admin routes blocked from search engines

**After deployment, verify:**
- Sitemap is accessible: `https://yourdomain.com/sitemap.xml`
- Robots.txt is correct: `https://yourdomain.com/robots.txt`
- Meta tags appear in page source
- Open Graph preview works (test with [opengraph.xyz](https://www.opengraph.xyz))

---

### 9. Testing Checklist

**Before going live, test:**

**Public Pages:**
- [ ] All pages load without errors
- [ ] Navigation works
- [ ] Mobile menu works
- [ ] Forms work
- [ ] Calendar displays data

**Admin Features:**
- [ ] Login works
- [ ] Admin dashboard loads
- [ ] Can create/edit content
- [ ] Non-admin users are blocked

**Integration:**
- [ ] Firebase data loads
- [ ] Contact form submits
- [ ] Turnstile verification works
- [ ] No console errors

---

### 10. Post-Deployment Monitoring

**First 24 hours:**
- Monitor Vercel dashboard for errors
- Check browser console on different devices
- Test all major user flows
- Verify Firebase queries are working

**Ongoing:**
- Review Vercel analytics weekly
- Check error logs regularly
- Monitor performance metrics
- Keep dependencies updated

---

## 🚨 Common Pitfalls to Avoid

### ❌ Pitfall 1: Deploying Without Environment Variables
**Problem:** Build fails or site shows 404
**Solution:** Always set all environment variables first

### ❌ Pitfall 2: Only Setting Variables for Production
**Problem:** Preview deployments fail
**Solution:** Set variables for Production AND Preview

### ❌ Pitfall 3: Typo in Variable Name
**Problem:** Variable not found, build fails
**Solution:** Copy-paste variable names from `env.template`

### ❌ Pitfall 4: Adding `NEXT_PUBLIC_` to Secret Keys
**Problem:** Secret keys exposed to client
**Solution:** Only `TURNSTILE_SECRET_KEY` should NOT have prefix

### ❌ Pitfall 5: Not Redeploying After Adding Variables
**Problem:** Variables added but site still broken
**Solution:** Always redeploy after adding/changing variables

### ❌ Pitfall 6: Not Testing Locally First
**Problem:** Deploy fails, waste time debugging on Vercel
**Solution:** Always run `npm run build` locally first

### ❌ Pitfall 7: Forgetting to Deploy Firestore Rules
**Problem:** Security rules not enforced
**Solution:** Deploy rules before going live

---

## 📋 Pre-Deployment Checklist

Run this before every deployment:

```bash
# 1. Check code quality
npm run lint

# 2. Run pre-deployment checks
npm run pre-deploy

# 3. Verify environment variables (local)
npm run verify-env

# 4. Build locally
npm run build

# 5. Test production build
npm start
# Visit http://localhost:3000 and test

# 6. Verify Vercel environment variables are set
# (Check Vercel dashboard)

# 7. Deploy
# (Push to Git or deploy via Vercel dashboard)
```

---

## 🎯 Success Metrics

Your deployment is successful when:

✅ **Build:** Completes without errors
✅ **Pages:** All pages load correctly
✅ **Forms:** Contact form works
✅ **Admin:** Admin login works
✅ **Firebase:** Data loads correctly
✅ **Performance:** Page load < 3 seconds
✅ **Errors:** No console errors
✅ **SEO:** Sitemap and robots.txt work

---

## 📚 Resources

- **Complete Checklist:** `FINAL_DEPLOYMENT_CHECKLIST.md`
- **Quick Fix Guide:** `QUICK_FIX_NOT_FOUND.md`
- **Comprehensive Guide:** `VERCEL_NOT_FOUND_COMPREHENSIVE_GUIDE.md`
- **Environment Variables:** `ENV_CHECKLIST.md`
- **DNS Setup:** `DNS_CONFIGURATION.md`

---

## 🆘 Getting Help

If something goes wrong:

1. **Check build logs** in Vercel Dashboard
2. **Check browser console** (F12) for client errors
3. **Check Vercel function logs** for API errors
4. **Review documentation** files
5. **Verify environment variables** are correct

---

## 💡 Pro Tips

1. **Use Vercel CLI** for easier environment variable management:
   ```bash
   npm i -g vercel
   vercel env pull .env.local
   ```

2. **Set up preview deployments** to test before production

3. **Use Vercel's environment variable UI** - it's easier than CLI for one-off changes

4. **Bookmark your Vercel dashboard** - you'll check it often

5. **Test on mobile** - many users will be on mobile devices

6. **Monitor analytics** - understand how users interact with your site

---

**🎉 You're ready to deploy! Follow `FINAL_DEPLOYMENT_CHECKLIST.md` step by step.**


