# Firestore Index Setup for CELTA Trainers

## Quick Fix: Create the Required Index

### Method 1: Click the Link (Fastest)
When you see the error message, it includes a direct link. **Click that link** - it will:
1. Take you to Firebase Console
2. Pre-fill all the index settings
3. You just need to click "Create Index"

### Method 2: Create Manually

1. **Go to Firebase Console**
   - https://console.firebase.google.com/
   - Select your project

2. **Navigate to Indexes**
   - Click **Firestore Database** in left sidebar
   - Click **Indexes** tab (next to Rules, Data, Usage)

3. **Create Index**
   - Click **Create Index** button
   - Collection ID: `celtaTrainers`
   - Add fields in this order:
     - Field: `order`, Order: **Ascending** ⬆️
     - Field: `name`, Order: **Ascending** ⬆️
   - Click **Create Index**

4. **Wait for Index to Build**
   - Status will show "Building..." 
   - Usually takes 2-5 minutes
   - When ready, status changes to "Enabled" ✅

5. **Refresh Your Page**
   - Go back to `/admin/celta-trainers`
   - Refresh the page
   - Trainers should now load!

## Why This Index is Needed

The query sorts trainers by:
1. `order` (ascending)
2. `name` (ascending)

Firestore requires a composite index when you use multiple `orderBy()` clauses.

## Index Status

You can check index status in Firebase Console → Firestore → Indexes:
- 🟡 **Building** = Still creating (wait a few minutes)
- 🟢 **Enabled** = Ready to use
- 🔴 **Error** = Something went wrong (try deleting and recreating)

## Troubleshooting

### Index Still Building After 10 Minutes?
- Check Firebase Console for any error messages
- Try deleting the index and recreating it
- Make sure field names match exactly: `order` and `name`

### Still Getting Index Error?
1. Verify the index is **Enabled** (not Building)
2. Hard refresh your browser (Ctrl+Shift+R)
3. Check that you're querying the right collection: `celtaTrainers`


