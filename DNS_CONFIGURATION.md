# DNS Configuration for edutestglobal.org

**Domain:** edutestglobal.org  
**Status:** Configure DNS records at your domain registrar

---

## 📋 DNS Records to Add

### Record 1: Apex Domain (edutestglobal.org)

**Type:** `A`  
**Name/Host:** `@` (or leave blank, depending on your registrar)  
**Value/Target:** `216.198.79.1`  
**TTL:** `3600` (or default/automatic)  
**Proxy/CDN:** `Disabled` (DNS only)

**What this does:** Points your root domain (edutestglobal.org) to Vercel

---

### Record 2: WWW Subdomain (www.edutestglobal.org)

**Type:** `CNAME`  
**Name/Host:** `www`  
**Value/Target:** `cname.vercel-dns.com` (or the CNAME value Vercel shows)  
**TTL:** `3600` (or default/automatic)  
**Proxy/CDN:** `Disabled` (DNS only)

**What this does:** Points www.edutestglobal.org to Vercel (will redirect to apex)

**Note:** Vercel should show you the exact CNAME value. If you see a different value in Vercel, use that instead.

---

## 🔧 How to Add DNS Records

### Step 1: Log into Your Domain Registrar

Common registrars:
- **Namecheap**
- **GoDaddy**
- **Google Domains / Google Workspace**
- **Cloudflare**
- **Name.com**
- **Domain.com**
- **Others**

### Step 2: Find DNS Management

Look for:
- "DNS Management"
- "DNS Settings"
- "Advanced DNS"
- "DNS Records"
- "Name Servers" (if using custom nameservers)

### Step 3: Add the A Record

1. Click **"Add Record"** or **"Add DNS Record"**
2. Select **Type:** `A`
3. **Name/Host:** Enter `@` or leave blank (depends on registrar)
4. **Value/Target/Points to:** Enter `216.198.79.1`
5. **TTL:** `3600` or leave as default
6. **Save**

### Step 4: Add the CNAME Record

1. Click **"Add Record"** or **"Add DNS Record"**
2. Select **Type:** `CNAME`
3. **Name/Host:** Enter `www`
4. **Value/Target/Points to:** Enter `cname.vercel-dns.com` (or Vercel's exact value)
5. **TTL:** `3600` or leave as default
6. **Save**

---

## 📝 Registrar-Specific Instructions

### Namecheap

1. Go to **Domain List** → Click **"Manage"** next to your domain
2. Go to **"Advanced DNS"** tab
3. **For Apex:**
   - Click **"Add New Record"**
   - Type: **A Record**
   - Host: `@`
   - Value: `216.198.79.1`
   - TTL: Automatic
   - Click **✓** to save
4. **For WWW:**
   - Click **"Add New Record"**
   - Type: **CNAME Record**
   - Host: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: Automatic
   - Click **✓** to save

### GoDaddy

1. Go to **My Products** → Click **"DNS"** next to your domain
2. **For Apex:**
   - Click **"Add"** in the Records section
   - Type: **A**
   - Name: `@`
   - Value: `216.198.79.1`
   - TTL: `600` (1 hour)
   - Click **"Save"**
3. **For WWW:**
   - Click **"Add"**
   - Type: **CNAME**
   - Name: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: `600`
   - Click **"Save"**

### Google Domains / Google Workspace

1. Go to **DNS** → **Custom Records**
2. **For Apex:**
   - Click **"Add custom record"**
   - Type: **A**
   - Name: `@`
   - Data: `216.198.79.1`
   - TTL: `3600`
   - Click **"Add"**
3. **For WWW:**
   - Click **"Add custom record"**
   - Type: **CNAME**
   - Name: `www`
   - Data: `cname.vercel-dns.com`
   - TTL: `3600`
   - Click **"Add"**

### Cloudflare

**Important:** If using Cloudflare, set Proxy to **DNS only** (gray cloud, not orange)

1. Go to **DNS** → **Records**
2. **For Apex:**
   - Click **"Add record"**
   - Type: **A**
   - Name: `@`
   - IPv4 address: `216.198.79.1`
   - Proxy status: **DNS only** (gray cloud icon)
   - TTL: Auto
   - Click **"Save"**
3. **For WWW:**
   - Click **"Add record"**
   - Type: **CNAME**
   - Name: `www`
   - Target: `cname.vercel-dns.com`
   - Proxy status: **DNS only** (gray cloud icon)
   - TTL: Auto
   - Click **"Save"**

### Other Registrars

Follow the same pattern:
- **A Record:** Name `@`, Value `216.198.79.1`
- **CNAME Record:** Name `www`, Value `cname.vercel-dns.com`

---

## ⏱️ DNS Propagation

After adding DNS records:

1. **Wait 1-24 hours** for DNS propagation
2. **Check propagation:**
   - Use: [whatsmydns.net](https://www.whatsmydns.net/#A/edutestglobal.org)
   - Or: `nslookup edutestglobal.org` in terminal
3. **Vercel will automatically:**
   - Verify the domain
   - Issue SSL certificate (can take up to 24 hours)
   - Enable HTTPS

---

## ✅ Verification Checklist

- [ ] A Record added for `@` (apex domain)
- [ ] A Record value is: `216.198.79.1`
- [ ] CNAME Record added for `www`
- [ ] CNAME value is: `cname.vercel-dns.com` (or Vercel's exact value)
- [ ] Both records saved at registrar
- [ ] Waiting for DNS propagation (1-24 hours)
- [ ] Checked DNS propagation status
- [ ] Vercel shows domain as "Valid" (after propagation)

---

## 🔍 How to Check DNS Propagation

### Method 1: Online Tool
Visit: [whatsmydns.net](https://www.whatsmydns.net/#A/edutestglobal.org)

### Method 2: Command Line
```bash
# Windows PowerShell
nslookup edutestglobal.org

# Should show: 216.198.79.1
```

### Method 3: Vercel Dashboard
- Go to **Project Settings** → **Domains**
- Check status of `edutestglobal.org`
- Should show "Valid" when DNS is configured correctly

---

## 🚨 Common Issues

### Issue: Domain shows "Invalid Configuration"
**Solution:**
- Verify DNS records are exactly as shown above
- Check that A record points to `216.198.79.1`
- Wait for DNS propagation (can take up to 24 hours)
- Make sure no conflicting records exist

### Issue: SSL Certificate not issued
**Solution:**
- DNS must be fully propagated first
- Can take up to 24 hours after DNS is correct
- Check Vercel Domains page for SSL status

### Issue: Site not loading
**Solution:**
- Verify DNS records are correct
- Check DNS propagation status
- Make sure you've added environment variables
- Redeploy after adding environment variables

---

## 📞 Need Help?

1. **Check Vercel Dashboard:**
   - Project Settings → Domains
   - Look for any error messages

2. **Verify DNS Records:**
   - Use whatsmydns.net to check propagation
   - Compare with Vercel's required values

3. **Contact Support:**
   - Vercel Support: [vercel.com/support](https://vercel.com/support)
   - Your domain registrar support

---

## 🎯 Next Steps After DNS is Configured

1. ✅ Wait for DNS propagation (1-24 hours)
2. ✅ Verify domain shows "Valid" in Vercel
3. ✅ Wait for SSL certificate (automatic, up to 24 hours)
4. ✅ Test site at: `https://edutestglobal.org`
5. ✅ Test www redirect: `https://www.edutestglobal.org` → should redirect to `https://edutestglobal.org`

---

**Domain:** edutestglobal.org  
**A Record:** `@` → `216.198.79.1`  
**CNAME Record:** `www` → `cname.vercel-dns.com`  
**Status:** Configure these at your registrar

