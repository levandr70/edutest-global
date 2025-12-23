# 🔍 How to Check if CNAME Record for www Exists

## Method 1: Check at Your Domain Registrar

### Step 1: Identify Your Registrar

Your domain `edutestglobal.org` is registered with a registrar. Common ones:
- **Namecheap**
- **GoDaddy**
- **Google Domains / Google Workspace**
- **Cloudflare**
- **Name.com**
- **Domain.com**
- **Others**

### Step 2: Log into Your Registrar

1. Go to your registrar's website
2. Log in to your account
3. Find your domain: `edutestglobal.org`

### Step 3: Find DNS Management

Look for one of these sections:
- **"DNS Management"**
- **"Advanced DNS"**
- **"DNS Settings"**
- **"DNS Records"**
- **"Name Servers"** (if using custom nameservers)

### Step 4: Look for CNAME Record

In the DNS records list, look for:

**What you should see:**
- **Type:** CNAME
- **Name/Host:** `www`
- **Value/Target:** Something like `cname.vercel-dns.com` or similar

**If you see this record:** ✅ CNAME is added
**If you DON'T see this record:** ❌ CNAME needs to be added

---

## Method 2: Registrar-Specific Instructions

### Namecheap

1. Go to **Domain List**
2. Click **"Manage"** next to `edutestglobal.org`
3. Go to **"Advanced DNS"** tab
4. Look in the records list for:
   - **Type:** CNAME Record
   - **Host:** `www`
   - **Value:** Should show a Vercel CNAME value

**If you see it:** ✅ Added
**If not:** ❌ Need to add it

### GoDaddy

1. Go to **My Products**
2. Click **"DNS"** next to `edutestglobal.org`
3. Look in the Records section for:
   - **Type:** CNAME
   - **Name:** `www`
   - **Value:** Should show a Vercel CNAME value

**If you see it:** ✅ Added
**If not:** ❌ Need to add it

### Google Domains / Google Workspace

1. Go to **DNS** → **Custom Records**
2. Look for:
   - **Type:** CNAME
   - **Name:** `www`
   - **Data:** Should show a Vercel CNAME value

**If you see it:** ✅ Added
**If not:** ❌ Need to add it

### Cloudflare

1. Go to **DNS** → **Records**
2. Look for:
   - **Type:** CNAME
   - **Name:** `www`
   - **Target:** Should show a Vercel CNAME value

**If you see it:** ✅ Added
**If not:** ❌ Need to add it

---

## Method 3: Check Using Command Line

### Windows PowerShell:

```powershell
nslookup -type=CNAME www.edutestglobal.org
```

**What to look for:**
- ✅ **If it shows a CNAME value:** Record exists (may still be propagating)
- ❌ **If it shows "Non-existent domain":** Record doesn't exist or hasn't propagated

### What the Output Means:

**Good (Record exists):**
```
www.edutestglobal.org
    canonical name = cname.vercel-dns.com
```

**Not Found (Record missing or not propagated):**
```
*** esort1.esolarm can't find www.edutestglobal.org: Non-existent domain
```

---

## Method 4: Check Using Online Tools

### Option 1: whatsmydns.net

Visit: [whatsmydns.net/#CNAME/www.edutestglobal.org](https://www.whatsmydns.net/#CNAME/www.edutestglobal.org)

**What to look for:**
- ✅ **Good:** Multiple locations show the same CNAME value
- ❌ **Not found:** Shows "not found" or different values
- ⏳ **Propagating:** Some locations show it, others don't

### Option 2: dnschecker.org

Visit: [dnschecker.org/#CNAME/www.edutestglobal.org](https://dnschecker.org/#CNAME/www.edutestglobal.org)

Shows DNS propagation status globally.

---

## 📋 Quick Checklist

To check if CNAME is added:

- [ ] Logged into domain registrar
- [ ] Found DNS Management section
- [ ] Looked for CNAME record with Name `www`
- [ ] Checked if Value matches Vercel's CNAME

**OR**

- [ ] Ran `nslookup -type=CNAME www.edutestglobal.org`
- [ ] Checked whatsmydns.net for CNAME propagation

---

## 🎯 What to Do Based on Results

### If CNAME Record EXISTS at Registrar:
- ✅ Record is added
- ⏳ Wait 1-24 hours for DNS propagation
- Check propagation status periodically

### If CNAME Record DOES NOT EXIST at Registrar:
- ❌ Need to add it
- Get CNAME value from Vercel (Settings → Domains → www.edutestglobal.org)
- Add CNAME record at registrar:
  - Type: CNAME
  - Name: `www`
  - Value: [Vercel CNAME value]
- Save and wait for propagation

---

## 🆘 Still Not Sure?

**Tell me:**
1. What registrar are you using? (Namecheap, GoDaddy, Google, Cloudflare, etc.)
2. Can you see a DNS Management section?
3. What records do you see listed?

**I can give you specific step-by-step instructions for your registrar!**

---

## 💡 Quick Test

**Run this command in PowerShell:**
```powershell
nslookup -type=CNAME www.edutestglobal.org
```

**If it shows "Non-existent domain":**
- The CNAME record is NOT added at your registrar
- You need to add it

**If it shows a CNAME value:**
- The record exists
- May still be propagating (wait 1-24 hours)

