# Fixing Cloudflare Turnstile Error 110200

## What is Error 110200?

Error 110200 from Cloudflare Turnstile typically means:
- **Invalid site key** - The site key is incorrect or doesn't exist
- **Domain mismatch** - The site key is configured for a different domain
- **Environment mismatch** - Using a test key in production or vice versa

## How to Fix

### Step 1: Verify Your Site Key

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Turnstile** section
3. Find your site key and verify it matches `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in your environment variables

### Step 2: Check Domain Configuration

The site key must be configured for the exact domain where your site is running:

**For Production:**
- If your site is at `https://edutestglobal.org`, the site key must be configured for `edutestglobal.org`
- If your site is at `https://your-project.vercel.app`, the site key must be configured for that domain

**For Local Development:**
- Use a test site key configured for `localhost` or `127.0.0.1`
- Or disable Turnstile in development by not setting `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

### Step 3: Update Environment Variables

**In Vercel:**
1. Go to your project → Settings → Environment Variables
2. Check `NEXT_PUBLIC_TURNSTILE_SITE_KEY`:
   - Value should start with `0x4AAAAAA...` (Turnstile format)
   - Should match the site key from Cloudflare Dashboard
3. Check `TURNSTILE_SECRET_KEY`:
   - Should be the secret key (not site key)
   - Should NOT have `NEXT_PUBLIC_` prefix
4. Redeploy after updating

**In Local Development (.env.local):**
```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAA...your_site_key_here
TURNSTILE_SECRET_KEY=0x4AAAAAA...your_secret_key_here
```

### Step 4: Create a New Site Key (If Needed)

If your current site key doesn't match your domain:

1. Go to Cloudflare Dashboard → Turnstile
2. Click **Add Site**
3. Configure:
   - **Site name**: Your site name
   - **Domain**: Your actual domain (e.g., `edutestglobal.org`)
   - **Widget mode**: Managed (recommended)
4. Copy the **Site Key** and **Secret Key**
5. Update your environment variables
6. Redeploy

### Step 5: Verify the Fix

1. Clear your browser cache
2. Refresh the contact page
3. The Turnstile widget should load without errors
4. Complete the challenge and submit the form

## Temporary Workaround

If you need the form to work immediately while fixing Turnstile:

1. **Option 1**: Remove the site key temporarily
   - Remove `NEXT_PUBLIC_TURNSTILE_SITE_KEY` from environment variables
   - The form will work without verification (less secure)

2. **Option 2**: Use the improved error handling
   - The form now shows a warning if Turnstile fails
   - You can still submit, but verification may fail on the server

## Common Issues

### Issue: "Site key not found"
- **Solution**: Verify the site key exists in Cloudflare Dashboard
- **Solution**: Check for typos in the environment variable

### Issue: "Domain mismatch"
- **Solution**: Ensure the site key is configured for your exact domain
- **Solution**: Check if you're using `www.` vs non-`www.` version

### Issue: "Test key in production"
- **Solution**: Create a production site key in Cloudflare
- **Solution**: Use separate keys for development and production

## Verification Checklist

- [ ] Site key exists in Cloudflare Dashboard
- [ ] Site key matches `NEXT_PUBLIC_TURNSTILE_SITE_KEY` exactly
- [ ] Domain in Cloudflare matches your actual domain
- [ ] Secret key is set (without `NEXT_PUBLIC_` prefix)
- [ ] Environment variables are set in Vercel
- [ ] Site has been redeployed after updating variables
- [ ] Browser cache cleared
- [ ] No console errors when loading the contact page

## Need Help?

If the error persists:
1. Check Cloudflare Dashboard for any error messages
2. Verify your domain is correctly configured
3. Try creating a new site key
4. Check browser console for additional error details

