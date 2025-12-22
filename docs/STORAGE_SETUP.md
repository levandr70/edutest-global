# Firebase Storage Security Rules Setup

## Quick Setup Instructions

### Step 1: Open Firebase Console
1. Go to https://console.firebase.google.com/
2. Select your project: **edutest-global**

### Step 2: Navigate to Storage Rules
1. In the left sidebar, click **Storage**
2. Click on the **Rules** tab at the top

### Step 3: Apply the Security Rules
Copy and paste the following rules into the Rules editor:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // CELTA Trainer photos
    match /celtaTrainers/{trainerId}/{allPaths=**} {
      // Allow public read access for trainer photos
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
  - **Read**: Anyone can read trainer photos (for public page)
  - **Write**: Only authenticated users (admins) can upload/delete photos

## Troubleshooting

### If you still get "Missing or insufficient permissions":

1. **Check Authentication Status**
   - Make sure you're logged in as admin
   - Go to `/admin/login` and sign in
   - Verify you can see the admin dashboard

2. **Check Storage Rules**
   - Go back to Storage > Rules
   - Verify the rules match exactly what's shown above
   - Make sure you clicked "Publish"

3. **Check Firebase Authentication**
   - Go to Firebase Console > Authentication > Users
   - Verify your admin user exists
   - If not, create a user manually or sign up through the login page

4. **Verify Storage is Enabled**
   - Go to Storage in Firebase Console
   - Make sure Storage is enabled for your project
   - If not, click "Get started" to enable it


