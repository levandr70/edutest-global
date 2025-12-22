# Firestore Security Rules Setup

## Quick Setup Instructions

### Step 1: Open Firebase Console
1. Go to https://console.firebase.google.com/
2. Select your project: **edutest-global**

### Step 2: Navigate to Firestore Rules
1. In the left sidebar, click **Firestore Database**
2. Click on the **Rules** tab at the top

### Step 3: Apply the Security Rules
Copy and paste the following rules into the Rules editor:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // CELTA Courses collection
    match /celtaCourses/{docId} {
      // Allow public read access
      allow read: if true;
      
      // Allow write access only for authenticated users (admin)
      allow write: if request.auth != null;
    }
    
    // CELTA Trainers collection
    match /celtaTrainers/{docId} {
      // Allow public read access
      allow read: if true;
      
      // Allow write access only for authenticated users (admin)
      allow write: if request.auth != null;
    }
  }
}
```

### Step 4: Publish the Rules
1. Click **Publish** button
2. Wait for confirmation that rules have been published

### Step 5: Verify
- The rules allow:
  - **Read**: Anyone can read CELTA courses and trainers (for public page)
  - **Write**: Only authenticated users (admins) can create/update/delete courses and trainers

## Troubleshooting

### If you still get "Missing or insufficient permissions":

1. **Check Authentication Status**
   - Make sure you're logged in as admin
   - Go to `/admin/login` and sign in
   - Verify you can see the admin dashboard

2. **Check Firestore Rules**
   - Go back to Firestore > Rules
   - Verify the rules match exactly what's shown above
   - Make sure you clicked "Publish"

3. **Check Firebase Authentication**
   - Go to Firebase Console > Authentication > Users
   - Verify your admin user exists
   - If not, create a user manually or sign up through the login page

4. **Test in Firebase Console**
   - Go to Firestore > Data
   - Try to manually create a document in `celtaCourses` collection
   - If that works, the rules are correct

## Alternative: Temporary Development Rules (NOT for production)

If you need to test quickly, you can temporarily use these rules (REMOVE IN PRODUCTION):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **WARNING**: These rules allow anyone to read/write everything. Only use for development testing!

