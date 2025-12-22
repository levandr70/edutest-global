# Complete Firebase Setup Guide

This guide will help you set up all Firebase services needed for the CELTA admin panel.

## Prerequisites

1. Firebase project created at https://console.firebase.google.com/
2. Environment variables set in `.env.local` (see `.env.local.example`)

## Step 1: Enable Firestore Database

1. Go to Firebase Console → **Firestore Database**
2. Click **Create database** (if not already created)
3. Choose **Start in test mode** (we'll apply proper rules next)
4. Select a location for your database

## Step 2: Apply Firestore Security Rules

1. In Firebase Console, go to **Firestore Database** → **Rules** tab
2. Copy the **entire contents** of `docs/firestore.rules.txt`
3. Paste into the Rules editor
4. Click **Publish**

**Important:** The rules must include both `celtaCourses` and `celtaTrainers` collections:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // CELTA Courses collection
    match /celtaCourses/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // CELTA Trainers collection
    match /celtaTrainers/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 3: Enable Firebase Storage

1. Go to Firebase Console → **Storage**
2. Click **Get started** (if not already enabled)
3. Choose **Start in test mode** (we'll apply proper rules next)
4. Select a location for your storage bucket

## Step 4: Apply Storage Security Rules

1. In Firebase Console, go to **Storage** → **Rules** tab
2. Copy the **entire contents** of `docs/storage.rules.txt`
3. Paste into the Rules editor
4. Click **Publish**

The rules should be:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /celtaTrainers/{trainerId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 5: Enable Firebase Authentication

1. Go to Firebase Console → **Authentication**
2. Click **Get started** (if not already enabled)
3. Go to **Sign-in method** tab
4. Enable **Email/Password** provider
5. Click **Save**

## Step 6: Create Admin User

### Option A: Create via Admin Login Page
1. Go to your site: `/admin/login`
2. Enter email and password
3. Click "Sign in" (will create user if doesn't exist, or sign in if exists)

### Option B: Create via Firebase Console
1. Go to Firebase Console → **Authentication** → **Users**
2. Click **Add user**
3. Enter email and password
4. Click **Add user**

## Step 7: Create Firestore Indexes (REQUIRED)

**You MUST create this index for trainers to load!**

### Option A: Use the Direct Link (Easiest)
When you see the error, click the link provided in the error message. It will take you directly to create the index.

### Option B: Create Manually
1. Go to Firebase Console → **Firestore Database** → **Indexes** tab
2. Click **Create Index**
3. Collection ID: `celtaTrainers`
4. Add fields (in this exact order):
   - Field: `order`, Order: **Ascending**
   - Field: `name`, Order: **Ascending**
5. Click **Create Index**
6. Wait 2-5 minutes for the index to build

**Note:** The index is required because we query trainers with `orderBy("order")` and `orderBy("name")` together.

## Step 8: Verify Setup

1. **Test Authentication:**
   - Go to `/admin/login`
   - Sign in with your admin credentials
   - You should be redirected to `/admin`

2. **Test Firestore:**
   - Go to `/admin/celta`
   - Try creating a course
   - Check Firebase Console → Firestore → Data to see the document

3. **Test Storage:**
   - Go to `/admin/celta-trainers`
   - Try creating a trainer with a photo
   - Check Firebase Console → Storage to see the uploaded file

## Troubleshooting

### "Missing or insufficient permissions" Error

**For Firestore:**
1. Verify Firestore rules are published (Step 2)
2. Check that rules include `celtaTrainers` collection
3. Make sure you're logged in as admin
4. Refresh the page after publishing rules

**For Storage:**
1. Verify Storage rules are published (Step 4)
2. Check that Storage is enabled
3. Make sure you're logged in as admin

### Admin Panel Not Showing Forms

1. Check browser console for errors
2. Verify you're logged in (go to `/admin/login` first)
3. Check that Firestore rules are correct
4. Try refreshing the page

### Photos Not Uploading

1. Verify Storage is enabled
2. Check Storage rules are published
3. Verify you're logged in as admin
4. Check browser console for specific error messages

## Quick Checklist

- [ ] Firestore Database enabled
- [ ] Firestore rules published (includes `celtaTrainers`)
- [ ] Storage enabled
- [ ] Storage rules published
- [ ] Authentication enabled (Email/Password)
- [ ] Admin user created
- [ ] Can log in at `/admin/login`
- [ ] Can see admin dashboard
- [ ] Can create courses at `/admin/celta`
- [ ] Can create trainers at `/admin/celta-trainers`

## Need Help?

If you're still having issues:
1. Check browser console for specific error messages
2. Check Firebase Console → Firestore → Rules (verify they're published)
3. Check Firebase Console → Storage → Rules (verify they're published)
4. Verify all environment variables are set in `.env.local`

