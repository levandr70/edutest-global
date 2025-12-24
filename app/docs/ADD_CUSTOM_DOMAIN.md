# 🌐 Add Custom Domain: edutestglobal.org

## Step-by-Step Guide

---

## Step 1: Add Domain in Vercel

1. **Go to Vercel Dashboard:**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click on your project: `edutest-global` (or your project name)

2. **Navigate to Domains:**
   - Click **"Settings"** tab
   - Click **"Domains"** in the left sidebar
   - Click **"Add Domain"** button

3. **Add Apex Domain (Primary):**
   - Enter: `edutestglobal.org`
   - Click **"Add"**
   - Vercel will show you DNS configuration instructions

4. **Add WWW Subdomain:**
   - Click **"Add Domain"** again
   - Enter: `www.edutestglobal.org`
   - Click **"Add"**
   - Vercel will automatically configure redirect to apex

---

## Step 2: Get DNS Values from Vercel

**Important:** Vercel will show you the EXACT values to use. These may differ from examples.

After adding the domain, Vercel will display:

### For Apex Domain (edutestglobal.org):
- **Type:** A Record
- **Name:** `@` (or leave blank)
- **Value:** Vercel will show an IP address (e.g., `76.76.21.21` or `216.198.79.1`)
- **TTL:** 3600 (or default)

### For WWW Subdomain (www.edutestglobal.org):
- **Type:** CNAME Record
- **Name:** `www`
- **Value:** Vercel will show a CNAME (e.g., `cname.vercel-dns.com`)
- **TTL:** 3600 (or default)

**📝 Write down these exact values from Vercel!**

---

## Step 3: Configure DNS at Your Domain Registrar

### Find Your Domain Registrar

Your domain `edutestglobal.org` is registered with a registrar. Common ones:
- Namecheap
- GoDaddy
- Google Domains
- Cloudflare
- Name.com
- Others

### Log into Your Registrar

1. Go to your registrar's website
2. Log in to your account
3. Find your domain: `edutestglobal.org`

### Add DNS Records

#### Record 1: A Record (Apex Domain)

1. Go to **DNS Management** or **Advanced DNS** section
2. Click **"Add Record"** or **"Add DNS Record"**
3. Configure:
   - **Type:** `A`
   - **Name/Host:** `@` (or leave blank - depends on registrar)
   - **Value/Target/Points to:** [Use the IP address Vercel showed you]
   - **TTL:** `3600` or default
4. Click **"Save"**

#### Record 2: CNAME Record (WWW)

1. Click **"Add Record"** again
2. Configure:
   - **Type:** `CNAME`
   - **Name/Host:** `www`
   - **Value/Target/Points to:** [Use the CNAME value Vercel showed you]
   - **TTL:** `3600` or default
3. Click **"Save"**

---

## Step 4: Registrar-Specific Instructions

### Namecheap

1. Go to **Domain List** → Click **"Manage"** next to `edutestglobal.org`
2. Go to **"Advanced DNS"** tab
3. **For Apex:**
   - Click **"Add New Record"**
   - Type: **A Record**
   - Host: `@`
   - Value: [Vercel IP address]
   - TTL: Automatic
   - Click **✓** to save
4. **For WWW:**
   - Click **"Add New Record"**
   - Type: **CNAME Record**
   - Host: `www`
   - Value: [Vercel CNAME value]
   - TTL: Automatic
   - Click **✓** to save

### GoDaddy

1. Go to **My Products** → Click **"DNS"** next to your domain
2. **For Apex:**
   - Click **"Add"** in Records section
   - Type: **A**
   - Name: `@`
   - Value: [Vercel IP address]
   - TTL: `600`
   - Click **"Save"**
3. **For WWW:**
   - Click **"Add"**
   - Type: **CNAME**
   - Name: `www`
   - Value: [Vercel CNAME value]
   - TTL: `600`
   - Click **"Save"**

### Google Domains / Google Workspace

1. Go to **DNS** → **Custom Records**
2. **For Apex:**
   - Click **"Add custom record"**
   - Type: **A**
   - Name: `@`
   - Data: [Vercel IP address]
   - TTL: `3600`
   - Click **"Add"**
3. **For WWW:**
   - Click **"Add custom record"**
   - Type: **CNAME**
   - Name: `www`
   - Data: [Vercel CNAME value]
   - TTL: `3600`
   - Click **"Add"**

### Cloudflare

**Important:** If using Cloudflare, set Proxy to **DNS only** (gray cloud, not orange)

1. Go to **DNS** → **Records**
2. **For Apex:**
   - Click **"Add record"**
   - Type: **A**
   - Name: `@`
   - IPv4 address: [Vercel IP address]
   - **Proxy status: DNS only** (gray cloud icon - click to toggle)
   - TTL: Auto
   - Click **"Save"**
3. **For WWW:**
   - Click **"Add record"**
   - Type: **CNAME**
   - Name: `www`
   - Target: [Vercel CNAME value]
   - **Proxy status: DNS only** (gray cloud icon)
   - TTL: Auto
   - Click **"Save"**

---

## Step 5: Wait for DNS Propagation

After adding DNS records:

1. **Wait 1-24 hours** for DNS propagation
   - Usually takes 1-2 hours
   - Can take up to 24 hours in some cases

2. **Check DNS Propagation:**
   - Visit: [whatsmydns.net/#A/edutestglobal.org](https://www.whatsmydns.net/#A/edutestglobal.org)
   - Should show the Vercel IP address you configured

3. **Check in Vercel:**
   - Go to **Project Settings** → **Domains**
   - Status should change from "Invalid Configuration" to "Valid"
   - This may take a few hours after DNS propagates

---

## Step 6: SSL Certificate (Automatic)

Vercel will automatically:
- ✅ Issue SSL certificate (can take up to 24 hours after DNS is valid)
- ✅ Enable HTTPS
- ✅ Force HTTPS redirects

**Check SSL Status:**
- Go to **Project Settings** → **Domains**
- Look for SSL certificate status
- Should show "Valid" when ready

---

## Step 7: Update NEXT_PUBLIC_SITE_URL

**After domain is connected and SSL is active:**

1. Go to **Vercel Dashboard** → **Your Project** → **Settings** → **Environment Variables**
2. Find: `NEXT_PUBLIC_SITE_URL`
3. Update value to: `https://edutestglobal.org`
   - ✅ Must include `https://` protocol
   - ✅ No trailing slash
4. Click **"Save"**
5. **Redeploy:**
   - Go to **Deployments**
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**
   - Wait for deployment to complete

---

## Step 8: Verify Domain is Working

### Test These URLs:

1. **Apex Domain:**
   ```
   https://edutestglobal.org
   ```
   - Should load your site
   - Should show green lock (HTTPS)

2. **WWW Subdomain:**
   ```
   https://www.edutestglobal.org
   ```
   - Should redirect to `https://edutestglobal.org`
   - Should show green lock (HTTPS)

3. **SEO Files:**
   - Sitemap: `https://edutestglobal.org/sitemap.xml`
   - Robots.txt: `https://edutestglobal.org/robots.txt`

---

## ✅ Checklist

- [ ] Domain added in Vercel (`edutestglobal.org`)
- [ ] WWW subdomain added in Vercel (`www.edutestglobal.org`)
- [ ] A Record added at registrar (apex domain)
- [ ] CNAME Record added at registrar (www subdomain)
- [ ] DNS records saved at registrar
- [ ] Waited for DNS propagation (1-24 hours)
- [ ] DNS propagation verified (whatsmydns.net)
- [ ] Domain shows "Valid" in Vercel
- [ ] SSL certificate issued (check Vercel Domains page)
- [ ] `NEXT_PUBLIC_SITE_URL` updated to `https://edutestglobal.org`
- [ ] Redeployed after updating `NEXT_PUBLIC_SITE_URL`
- [ ] Site loads at `https://edutestglobal.org`
- [ ] WWW redirects to apex domain
- [ ] HTTPS is active (green lock)

---

## 🚨 Common Issues

### Issue: Domain shows "Invalid Configuration"
**Solution:**
- Verify DNS records are exactly as Vercel specified
- Check that A record points to correct IP
- Wait for DNS propagation (can take up to 24 hours)
- Make sure no conflicting records exist

### Issue: SSL Certificate not issued
**Solution:**
- DNS must be fully propagated first
- Can take up to 24 hours after DNS is valid
- Check Vercel Domains page for SSL status
- Make sure domain shows "Valid" in Vercel

### Issue: Site not loading
**Solution:**
- Verify DNS records are correct
- Check DNS propagation status
- Make sure `NEXT_PUBLIC_SITE_URL` is updated
- Redeploy after updating environment variable

### Issue: WWW doesn't redirect
**Solution:**
- Check Vercel Domains settings
- Verify redirect is configured: `www.edutestglobal.org` → `edutestglobal.org`
- May need to wait for DNS propagation

---

## 📞 Need Help?

1. **Check Vercel Dashboard:**
   - Project Settings → Domains
   - Look for any error messages or status indicators

2. **Verify DNS Records:**
   - Use [whatsmydns.net](https://www.whatsmydns.net) to check propagation
   - Compare with Vercel's required values

3. **Contact Support:**
   - Vercel Support: [vercel.com/support](https://vercel.com/support)
   - Your domain registrar support

---

## 🎯 Quick Summary

1. Add domain in Vercel → Get DNS values
2. Add DNS records at registrar
3. Wait for DNS propagation (1-24 hours)
4. Update `NEXT_PUBLIC_SITE_URL` to `https://edutestglobal.org`
5. Redeploy
6. Test site at `https://edutestglobal.org`

**Your domain will be live once DNS propagates!** 🌐


