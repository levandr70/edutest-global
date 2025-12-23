# 🔍 DNS Troubleshooting: DNS_PROBE_FINISHED_NXDOMAIN

## Error Meaning

`DNS_PROBE_FINISHED_NXDOMAIN` means:
- DNS records haven't been configured yet, OR
- DNS records haven't propagated yet, OR
- DNS records are incorrect

---

## 🔍 Step 1: Check if Domain is Added in Vercel

1. Go to **Vercel Dashboard** → **Your Project** → **Settings** → **Domains**
2. Check if `edutestglobal.org` is listed
3. Check if `www.edutestglobal.org` is listed

**If domains are NOT in Vercel:**
- Add them first (see `ADD_CUSTOM_DOMAIN.md`)
- Vercel will show you the DNS values to use

**If domains ARE in Vercel:**
- Check the status (should show DNS configuration instructions)
- Note the exact DNS values Vercel shows

---

## 🔍 Step 2: Check if DNS Records are Added at Registrar

### Find Your Domain Registrar

Your domain `edutestglobal.org` is registered somewhere. Common registrars:
- Namecheap
- GoDaddy
- Google Domains
- Cloudflare
- Name.com
- Others

### Check DNS Records

1. Log into your registrar
2. Go to **DNS Management** or **Advanced DNS**
3. Look for these records:

**Should have:**
- **A Record:** Name `@`, pointing to Vercel IP (e.g., `76.76.21.21` or `216.198.79.1`)
- **CNAME Record:** Name `www`, pointing to Vercel CNAME (e.g., `cname.vercel-dns.com`)

**If records are missing:**
- Add them using the values Vercel shows
- See `ADD_CUSTOM_DOMAIN.md` for step-by-step instructions

**If records exist:**
- Verify they match exactly what Vercel shows
- Check for typos in the values

---

## 🔍 Step 3: Verify DNS Propagation

### Check DNS Propagation Status

1. **Visit:** [whatsmydns.net/#A/edutestglobal.org](https://www.whatsmydns.net/#A/edutestglobal.org)
   - Should show the Vercel IP address you configured
   - If it shows different values or "not found", DNS hasn't propagated yet

2. **Check WWW:**
   - Visit: [whatsmydns.net/#CNAME/www.edutestglobal.org](https://www.whatsmydns.net/#CNAME/www.edutestglobal.org)
   - Should show the Vercel CNAME value

### What to Look For:

**✅ Good (Propagated):**
- Multiple locations show the same Vercel IP/CNAME
- Values match what you configured

**❌ Not Propagated Yet:**
- Different locations show different values
- Some locations show "not found"
- Values don't match Vercel's requirements

**⏱️ Wait Time:**
- Usually takes 1-2 hours
- Can take up to 24 hours in some cases
- Be patient - DNS propagation takes time!

---

## 🔍 Step 4: Common Issues & Fixes

### Issue 1: Domain Not Added to Vercel

**Symptom:** Domain doesn't appear in Vercel Domains list

**Fix:**
1. Go to Vercel Dashboard → Project Settings → Domains
2. Click "Add Domain"
3. Enter `edutestglobal.org`
4. Add `www.edutestglobal.org`
5. Follow DNS configuration instructions

### Issue 2: DNS Records Not Added at Registrar

**Symptom:** No A or CNAME records in registrar DNS settings

**Fix:**
1. Get DNS values from Vercel (shown after adding domain)
2. Log into your registrar
3. Add A record: `@` → [Vercel IP]
4. Add CNAME record: `www` → [Vercel CNAME]
5. Save and wait for propagation

### Issue 3: Wrong DNS Values

**Symptom:** Records exist but values don't match Vercel

**Fix:**
1. Check Vercel Domains page for exact values
2. Update DNS records at registrar to match exactly
3. Wait for propagation

### Issue 4: DNS Not Propagated Yet

**Symptom:** Records are correct but site still doesn't load

**Fix:**
- **Wait 1-24 hours** for DNS propagation
- Check propagation status at whatsmydns.net
- DNS propagation is not instant - be patient!

### Issue 5: Using Cloudflare Proxy

**Symptom:** Using Cloudflare with proxy enabled (orange cloud)

**Fix:**
1. Go to Cloudflare DNS settings
2. Click the orange cloud icon to turn it gray (DNS only)
3. Proxy must be OFF for Vercel to work correctly
4. Wait for propagation

---

## 📋 Quick Diagnostic Checklist

Run through these:

- [ ] Domain added in Vercel (`edutestglobal.org`)
- [ ] WWW subdomain added in Vercel (`www.edutestglobal.org`)
- [ ] Got DNS values from Vercel (IP and CNAME)
- [ ] A Record added at registrar (`@` → Vercel IP)
- [ ] CNAME Record added at registrar (`www` → Vercel CNAME)
- [ ] DNS records saved at registrar
- [ ] Waited at least 1 hour after adding records
- [ ] Checked DNS propagation (whatsmydns.net)
- [ ] DNS values match Vercel's requirements
- [ ] If using Cloudflare, proxy is OFF (gray cloud)

---

## 🎯 Most Likely Causes

### Cause 1: DNS Records Not Added Yet (Most Common)
**Solution:** Add DNS records at your registrar using Vercel's values

### Cause 2: DNS Not Propagated Yet
**Solution:** Wait 1-24 hours and check propagation status

### Cause 3: Wrong DNS Values
**Solution:** Verify values match exactly what Vercel shows

### Cause 4: Domain Not Added to Vercel
**Solution:** Add domain in Vercel first, then configure DNS

---

## 🆘 Step-by-Step: Start from Beginning

If you haven't started yet, follow these steps:

### Step 1: Add Domain in Vercel
1. Vercel Dashboard → Your Project → Settings → Domains
2. Click "Add Domain"
3. Enter: `edutestglobal.org`
4. Click "Add"
5. Add: `www.edutestglobal.org`
6. **Write down the DNS values Vercel shows!**

### Step 2: Add DNS Records at Registrar
1. Log into your domain registrar
2. Go to DNS Management
3. Add A Record: `@` → [Vercel IP]
4. Add CNAME Record: `www` → [Vercel CNAME]
5. Save

### Step 3: Wait and Check
1. Wait 1-2 hours
2. Check: [whatsmydns.net/#A/edutestglobal.org](https://www.whatsmydns.net/#A/edutestglobal.org)
3. Should show Vercel IP address
4. If not, wait longer (up to 24 hours)

### Step 4: Verify in Vercel
1. Go to Vercel → Domains
2. Status should change to "Valid" after DNS propagates
3. SSL certificate will be issued automatically

---

## 💡 Quick Test Commands

### Windows PowerShell:
```powershell
nslookup edutestglobal.org
# Should show Vercel IP address

nslookup www.edutestglobal.org
# Should show CNAME value
```

### Online Tools:
- [whatsmydns.net](https://www.whatsmydns.net) - Check DNS propagation
- [dnschecker.org](https://dnschecker.org) - Check DNS globally

---

## 📞 Need More Help?

1. **Check Vercel Dashboard:**
   - Project Settings → Domains
   - Look for status messages or errors

2. **Verify DNS Records:**
   - Use whatsmydns.net to check propagation
   - Compare with Vercel's required values

3. **Contact Support:**
   - Vercel Support: [vercel.com/support](https://vercel.com/support)
   - Your domain registrar support

---

## ✅ Summary

**The error means DNS isn't configured or hasn't propagated yet.**

**Most likely:** You need to:
1. Add domain to Vercel (if not done)
2. Add DNS records at your registrar
3. Wait 1-24 hours for DNS propagation

**Check:** Have you added the DNS records at your registrar yet? If not, that's the issue!

