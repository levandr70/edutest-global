# 🔑 How to Rotate Firebase API Key - Step by Step

## ⚠️ Important Note

**Firebase Console doesn't have a "Regenerate API Key" button!**

The API key is managed in **Google Cloud Console**, not Firebase Console. Here are two methods:

---

## Method 1: Create New Web App (Easiest) ✅

This creates a new API key while keeping your existing app.

### Step 1: Go to Firebase Console

1. Visit [console.firebase.google.com](https://console.firebase.google.com)
2. Select your project: `edutest-global`
3. Click the **⚙️ Settings icon** (gear icon) → **Project Settings**

### Step 2: Add a New Web App

1. Scroll down to **"Your apps"** section
2. You'll see your existing web app(s)
3. Click **"Add app"** button (or **"</>"** icon for Web)
4. Give it a nickname (e.g., "Web App 2" or "Production")
5. **DO NOT** check "Also set up Firebase Hosting"
6. Click **"Register app"**

### Step 3: Copy the New API Key

1. After registering, you'll see the config code
2. **Copy the `apiKey` value** (starts with `AIzaSy...`)
3. This is your **NEW API key** ✅

### Step 4: Update Everywhere

1. **Update in Vercel:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Find `NEXT_PUBLIC_FIREBASE_API_KEY`
   - Click **"Edit"** → Paste new API key → **Save**

2. **Update in local `.env.local`:**
   - Open `.env.local` file
   - Replace the old `NEXT_PUBLIC_FIREBASE_API_KEY` value
   - Save the file

3. **Redeploy on Vercel:**
   - Go to Vercel Dashboard → Deployments
   - Click **"..."** on latest deployment → **"Redeploy"**

### Step 5: (Optional) Delete Old Web App

After confirming everything works:
1. Go back to Firebase Console → Project Settings
2. Scroll to **"Your apps"** section
3. Find your old web app
4. Click **"Remove app"** (or keep it as backup)

---

## Method 2: Regenerate in Google Cloud Console (Advanced)

This regenerates the existing API key.

### Step 1: Go to Google Cloud Console

1. Visit [console.cloud.google.com](https://console.cloud.google.com)
2. **Select your project:** `edutest-global`
   - If you don't see it, click the project dropdown at the top
   - Search for "edutest-global"

### Step 2: Navigate to API Credentials

1. In the left sidebar, click **"APIs & Services"**
2. Click **"Credentials"**
3. You'll see a list of API keys

### Step 3: Find Your Firebase API Key

1. Look for an API key that starts with `AIzaSy...`
2. The name might be:
   - "Browser key (auto created by Firebase)"
   - "API Key 1"
   - Or your project name
3. **Click on the API key name** to open it

### Step 4: Regenerate the Key

1. In the API key details page
2. Click **"Regenerate key"** button (at the top)
3. Confirm by clicking **"Regenerate key"** in the popup
4. **Copy the new API key immediately** (you won't see it again!)

### Step 5: Update Everywhere

Same as Method 1, Step 4:
1. Update in Vercel
2. Update in `.env.local`
3. Redeploy on Vercel

---

## 🎯 Which Method Should You Use?

### Use Method 1 (Create New Web App) if:
- ✅ You want the easiest approach
- ✅ You want to keep the old app as backup
- ✅ You're not comfortable with Google Cloud Console

### Use Method 2 (Google Cloud Console) if:
- ✅ You want to regenerate the existing key
- ✅ You're comfortable with Google Cloud Console
- ✅ You want to manage API key restrictions

---

## 📋 Quick Checklist

After rotating the API key:

- [ ] New API key copied
- [ ] Updated in Vercel → Environment Variables
- [ ] Updated in local `.env.local` file
- [ ] Redeployed on Vercel
- [ ] Tested site loads correctly
- [ ] Tested contact form works
- [ ] Tested admin login works
- [ ] (Optional) Deleted old web app

---

## 🔍 Where to Find Your Current API Key

If you need to see your current API key:

1. **Firebase Console:**
   - Project Settings → General → Your apps
   - Click on your web app
   - You'll see the config with `apiKey`

2. **Google Cloud Console:**
   - APIs & Services → Credentials
   - Find the API key (starts with `AIzaSy...`)

---

## ⚠️ Important Notes

1. **After rotating, update immediately:**
   - The old key will stop working once you regenerate
   - Update Vercel and `.env.local` right away

2. **Test after updating:**
   - Make sure your site still loads
   - Test Firebase features (auth, Firestore, etc.)

3. **Keep the old key as backup:**
   - Don't delete the old web app immediately
   - Wait until you confirm everything works

---

## 🆘 Troubleshooting

### "I can't find the API key in Google Cloud Console"
- Make sure you selected the correct project
- Check if you have the right permissions
- Try Method 1 instead (create new web app)

### "I can't see 'Add app' button in Firebase"
- Make sure you're in Project Settings → General
- Scroll down to "Your apps" section
- Look for the **"</>"** icon or **"Add app"** button

### "The site stopped working after updating"
- Double-check you copied the entire API key
- Make sure there are no extra spaces
- Verify the key is updated in Vercel
- Check Vercel deployment logs for errors

---

**Recommended: Use Method 1 (Create New Web App) - it's the easiest!** ✅

