# Fix: "Permission denied" for celtaTrainers

## Quick Fix - Copy & Paste These Exact Rules

### Step 1: Open Firebase Console
1. Go to: **https://console.firebase.google.com/**
2. Select your project

### Step 2: Go to Firestore Rules
1. Click **Firestore Database** in left sidebar
2. Click **Rules** tab (at the top)

### Step 3: DELETE Everything and Paste This

**IMPORTANT:** Select ALL text in the editor (Ctrl+A) and DELETE it first, then paste this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /celtaCourses/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /celtaTrainers/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Step 4: Publish
1. Click **Publish** button (top right, blue button)
2. Wait for green checkmark or "Published" message

### Step 5: Verify Rules Are There
After publishing, you should see in the editor:
- ✅ `match /celtaCourses/{docId}`
- ✅ `match /celtaTrainers/{docId}`

Both collections must be present!

### Step 6: Hard Refresh Your Admin Page
1. Go to `/admin/celta-trainers`
2. Press **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
3. Or close and reopen the browser tab

## Still Not Working? Check These:

### 1. Are You Logged In?
- Go to `/admin/login`
- Sign in with your admin email/password
- You should see the dashboard
- Then try `/admin/celta-trainers` again

### 2. Check What's Actually in Firebase Console
In Firebase Console → Firestore → Rules, you should see:
```
match /celtaTrainers/{docId} {
  allow read: if true;
  allow write: if request.auth != null;
}
```

If you DON'T see `celtaTrainers`, the rules weren't applied correctly.

### 3. Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for the exact error message
4. It should say which collection is missing

### 4. Try Creating a Test Document
In Firebase Console:
1. Go to Firestore → Data
2. Click "Start collection"
3. Collection ID: `celtaTrainers`
4. Document ID: (auto-generate)
5. Add a field: `test` = `test`
6. Click Save

If this works, rules are correct. If it fails, you're not logged into Firebase Console with the right account.

## Common Mistakes:

❌ **Wrong:** Only `celtaCourses` in rules (missing `celtaTrainers`)
❌ **Wrong:** Typo like `celtaTrainer` (missing the 's')
❌ **Wrong:** Rules not published (forgot to click Publish)
❌ **Wrong:** Not logged in as admin in your app

✅ **Correct:** Both collections in rules AND published

## Still Stuck?

1. Take a screenshot of your Firebase Console → Firestore → Rules page
2. Check browser console for exact error
3. Verify you're logged in at `/admin/login`


