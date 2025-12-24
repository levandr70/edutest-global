# Vercel NOT_FOUND Error: Comprehensive Guide

## 1. 🔧 Suggest the Fix

### Immediate Action Steps

**Step 1: Verify Deployment Status**
1. Go to **Vercel Dashboard** → Your Project → **Deployments**
2. Check the latest deployment status:
   - ✅ **Ready** = Build succeeded (but may still need env vars for runtime)
   - ❌ **Error** = Build failed (this is likely your issue)
   - ⏳ **Building** = Wait for completion

**Step 2: Check Build Logs**
1. Click on the latest deployment
2. Click **"View Build Logs"** or **"Logs"**
3. Look for specific errors:
   - `Environment variable X is not set`
   - `Firebase configuration is missing`
   - `TypeScript compilation errors`
   - `Module not found` errors

**Step 3: Add All Required Environment Variables**

This is **the most common fix**. Your Next.js app requires 10 environment variables:

#### Firebase Configuration (6 variables):
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

#### Application Configuration (4 variables):
```
NEXT_PUBLIC_ADMIN_EMAILS=email1@example.com,email2@example.com
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key
TURNSTILE_SECRET_KEY=your_secret_key
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

**Critical Configuration:**
- Go to: **Project Settings** → **Environment Variables**
- For **EACH** variable:
  - ✅ Select **Production**
  - ✅ Select **Preview**
  - ✅ Ensure value is correct (no typos, no placeholders)
- **Important:** `TURNSTILE_SECRET_KEY` should **NOT** have `NEXT_PUBLIC_` prefix
- All other variables **MUST** have `NEXT_PUBLIC_` prefix

**Step 4: Redeploy**
1. After adding variables, go to **Deployments**
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**
4. Wait 1-3 minutes for build to complete

**Step 5: Verify Fix**
1. Visit your deployment URL: `https://your-project.vercel.app`
2. Should now load the home page
3. Check browser console (F12) for any runtime errors

### Alternative Fixes (If Environment Variables Are Set)

**Fix A: Check `next.config.ts`**
Your current config looks correct, but verify:
```typescript
// next.config.ts should have:
const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
};
```

**Fix B: Verify `vercel.json`**
Your `vercel.json` is minimal but correct for Next.js. If you need custom rewrites:
```json
{
  "framework": "nextjs",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```
*Note: Usually not needed for Next.js App Router*

**Fix C: Check API Route Structure**
Your API route at `app/api/contact/route.ts` is correctly structured. Ensure:
- File is named `route.ts` (not `route.js` or `index.ts`)
- Exports `POST`, `GET`, etc. functions
- Uses `NextRequest` and `NextResponse`

---

## 2. 🔍 Explain the Root Cause

### What Was the Code Actually Doing vs. What It Needed to Do?

**What Your Code Was Doing:**
1. **During Build Time:**
   - Next.js tried to compile your TypeScript/React code
   - It attempted to generate static pages and API routes
   - It processed environment variables referenced in your code
   - It created the `.next` output directory with optimized bundles

2. **During Runtime (on Vercel):**
   - Vercel's serverless functions tried to execute your app
   - When a request came in, it looked for:
     - A matching page route (`app/page.tsx`, `app/about/page.tsx`, etc.)
     - A matching API route (`app/api/contact/route.ts`)
     - Or a fallback to `app/not-found.tsx`

**What It Needed to Do:**
1. **Build Successfully:**
   - All environment variables referenced in code must be available
   - TypeScript compilation must succeed
   - All imports must resolve correctly
   - Output files must be generated in `.next/`

2. **Serve Requests Correctly:**
   - Match incoming URLs to your route structure
   - Execute server components and API routes
   - Return proper responses (HTML, JSON, etc.)

### What Conditions Triggered This Specific Error?

**Scenario 1: Missing Environment Variables (Most Likely)**
- **Trigger:** Build process tried to access `process.env.NEXT_PUBLIC_FIREBASE_API_KEY` but it wasn't set
- **Result:** Build may have:
  - Failed completely (deployment shows "Error")
  - Succeeded but with warnings (deployment shows "Ready" but runtime fails)
  - Generated incomplete output (missing chunks, broken routes)

**Scenario 2: Build Output Issues**
- **Trigger:** Build succeeded but `.next` directory is incomplete or corrupted
- **Result:** Vercel can't find the route handlers, returns NOT_FOUND

**Scenario 3: Route Mismatch**
- **Trigger:** Request to `/some-route` but no matching file exists
- **Result:** Next.js should show `not-found.tsx`, but if build failed, even that might not exist

**Scenario 4: API Route Not Found**
- **Trigger:** Request to `/api/contact` but `app/api/contact/route.ts` wasn't built correctly
- **Result:** Vercel returns NOT_FOUND instead of executing the route

### What Misconception or Oversight Led to This?

**Misconception 1: "Environment Variables Are Optional"**
- **Reality:** In Next.js, `NEXT_PUBLIC_*` variables are embedded at **build time**, not runtime
- **Why This Matters:** If a variable is missing during build, the code that references it may fail or produce incomplete output
- **Your Code Example:** 
  ```typescript
  // app/layout.tsx line 9
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  ```
  This has a fallback, but other code might not, and the build process might optimize away code paths

**Misconception 2: "Vercel Auto-Detects Everything"**
- **Reality:** Vercel auto-detects Next.js framework, but you must manually configure environment variables
- **Why This Matters:** Your local `.env.local` file doesn't automatically sync to Vercel
- **Your Setup:** You have `env.template` but Vercel needs variables set in the dashboard

**Misconception 3: "Build Success = Everything Works"**
- **Reality:** A build can "succeed" with warnings, but runtime can still fail
- **Why This Matters:** Missing env vars might cause:
  - Build to complete but generate broken routes
  - Runtime errors when code tries to access undefined variables
  - API routes failing silently

**Oversight: Not Checking Build Logs**
- **What Happened:** Deployment might show "Ready" but logs contain warnings about missing variables
- **What Should Happen:** Always check build logs, not just deployment status

---

## 3. 📚 Teach the Concept

### Why Does This Error Exist and What Is It Protecting Me From?

**The NOT_FOUND Error is a Safety Mechanism:**

1. **Prevents Information Leakage:**
   - If Vercel returned a generic error or stack trace, it could reveal:
     - Internal file structure
     - Server configuration
     - Database connection strings (if leaked)
   - NOT_FOUND is a safe, generic response

2. **Indicates Resource Doesn't Exist:**
   - The requested URL doesn't match any route in your application
   - This could mean:
     - The route was never created
     - The route wasn't built correctly
     - The route was deleted or moved
     - The build failed and routes weren't generated

3. **Standard HTTP Behavior:**
   - HTTP 404 (NOT_FOUND) is a standard response code
   - Browsers, search engines, and APIs expect this for non-existent resources
   - It's part of the HTTP specification (RFC 7231)

### What's the Correct Mental Model for This Concept?

**Think of Vercel Deployment as a 3-Stage Process:**

```
┌─────────────────┐
│  1. BUILD TIME  │  ← Code compiles, env vars embedded, routes generated
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  2. DEPLOYMENT  │  ← Build output uploaded to Vercel's CDN/edge
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  3. RUNTIME      │  ← User requests come in, routes are matched and executed
└─────────────────┘
```

**Your Error Likely Happened At:**

**Stage 1 (Build Time):**
- Missing environment variables → Build fails or produces incomplete output
- Result: Routes aren't generated correctly
- When user requests come in (Stage 3), routes don't exist → NOT_FOUND

**Stage 3 (Runtime):**
- Even if build succeeded, missing runtime env vars can cause:
  - API routes to fail
  - Server components to error
  - Fallback to NOT_FOUND

**Mental Model for Next.js App Router:**

```
Request: GET /testing/toefl
         │
         ▼
┌─────────────────────────────┐
│  Vercel Edge/Serverless     │
│  Looks for route handler:   │
│  app/testing/toefl/page.tsx │
└────────┬────────────────────┘
         │
    ┌────┴────┐
    │ Found?  │
    └────┬────┘
         │
    ┌────┴────┐
    │   YES   │ → Execute page.tsx → Return HTML
    │   NO    │ → Check app/not-found.tsx → Return 404
    └─────────┘
```

**If Build Failed:**
- `app/testing/toefl/page.tsx` might not exist in build output
- `app/not-found.tsx` might also not exist
- Vercel returns generic NOT_FOUND

### How Does This Fit Into the Broader Framework/Language Design?

**Next.js App Router Architecture:**

1. **File-Based Routing:**
   - `app/page.tsx` → `/`
   - `app/about/page.tsx` → `/about`
   - `app/api/contact/route.ts` → `/api/contact`
   - This is **convention over configuration**

2. **Build-Time vs Runtime:**
   - **Build-Time:** Static pages are pre-rendered, routes are discovered
   - **Runtime:** Dynamic routes, API routes, server components execute on-demand
   - **Edge:** Some routes can run on Vercel's edge network

3. **Environment Variables:**
   - `NEXT_PUBLIC_*`: Embedded at build time, available in browser
   - Others: Only available at runtime, server-side only
   - **Critical:** `NEXT_PUBLIC_*` vars must exist during build

**Vercel's Serverless Architecture:**

1. **Function-Based:**
   - Each route becomes a serverless function
   - Functions are created during build
   - If build fails, functions aren't created → NOT_FOUND

2. **Edge Network:**
   - Static assets served from CDN
   - Dynamic routes execute in serverless functions
   - API routes are serverless functions

3. **Deployment Process:**
   ```
   Git Push → Vercel Detects → Build → Deploy → Functions Created
   ```
   If any step fails, the deployment is incomplete

---

## 4. ⚠️ Show Warning Signs

### What Should I Look Out For That Might Cause This Again?

**Warning Sign 1: Build Logs Show Warnings**
```
⚠️  Environment variable NEXT_PUBLIC_FIREBASE_API_KEY is not set
⚠️  Using default value for NEXT_PUBLIC_SITE_URL
```
- **Action:** Even if build "succeeds," fix these warnings
- **Prevention:** Always check build logs, not just deployment status

**Warning Sign 2: Local Build Works, Vercel Fails**
- **Cause:** Environment variables exist locally (`.env.local`) but not in Vercel
- **Prevention:** 
  - Use `scripts/verify-env.js` before deploying
  - Document all required variables in `env.template`
  - Set variables in Vercel before first deployment

**Warning Sign 3: Deployment Shows "Ready" But Site Doesn't Load**
- **Cause:** Build succeeded but runtime errors occur
- **Prevention:**
  - Check browser console for errors
  - Check Vercel Function Logs (Deployments → Functions tab)
  - Verify all `NEXT_PUBLIC_*` variables are set

**Warning Sign 4: Specific Routes Work, Others Don't**
- **Cause:** Partial build failure, some routes generated, others not
- **Prevention:**
  - Check if failing routes have syntax errors
  - Verify all imports resolve correctly
  - Check for TypeScript errors

**Warning Sign 5: API Routes Return 404**
- **Cause:** API route file structure incorrect or not built
- **Prevention:**
  - Ensure file is named `route.ts` (not `index.ts` or `route.js`)
  - Verify exports are correct (`export async function POST`)
  - Check that route is in `app/api/[route]/route.ts` structure

### Are There Similar Mistakes I Might Make in Related Scenarios?

**Mistake 1: Forgetting to Set Variables for Preview Environment**
- **Scenario:** Variables set for Production, but Preview deployments fail
- **Prevention:** Always set variables for **both** Production and Preview

**Mistake 2: Typo in Variable Name**
- **Scenario:** `NEXT_PUBLIC_FIREBASE_API_KEY` vs `NEXT_PUBLIC_FIREBASE_APIKEY`
- **Prevention:** Copy-paste variable names from `env.template`, don't type manually

**Mistake 3: Adding `NEXT_PUBLIC_` to Server-Only Variables**
- **Scenario:** `NEXT_PUBLIC_TURNSTILE_SECRET_KEY` (should be `TURNSTILE_SECRET_KEY`)
- **Prevention:** Understand which variables should be public vs private
- **Rule:** Only client-accessible variables need `NEXT_PUBLIC_` prefix

**Mistake 4: Using Placeholder Values**
- **Scenario:** `NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app` (placeholder)
- **Prevention:** Always use actual values, verify they're correct

**Mistake 5: Not Redeploying After Adding Variables**
- **Scenario:** Added variables but didn't redeploy, still getting 404
- **Prevention:** Always redeploy after adding/changing environment variables

### What Code Smells or Patterns Indicate This Issue?

**Code Smell 1: Hardcoded Fallbacks Everywhere**
```typescript
// ❌ Bad: Too many fallbacks suggest missing env vars
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "";
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
```
- **Better:** Validate env vars at startup, fail fast if missing
- **Your Code:** You have fallbacks, which is okay, but ensure vars are set in production

**Code Smell 2: Runtime Checks for Build-Time Variables**
```typescript
// ❌ Bad: Checking at runtime what should exist at build time
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  console.error("Missing API key");
}
```
- **Better:** Use build-time validation or TypeScript to ensure vars exist

**Code Smell 3: Inconsistent Variable Naming**
```typescript
// ❌ Bad: Mixing naming conventions
const apiKey = process.env.FIREBASE_API_KEY; // Missing NEXT_PUBLIC_
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL; // Correct
```
- **Better:** Consistent naming, document which vars need `NEXT_PUBLIC_`

**Code Smell 4: Missing Error Boundaries**
- If a route fails, it might return NOT_FOUND instead of a proper error page
- **Better:** Implement error boundaries and proper error handling

---

## 5. 💡 Discuss Alternatives

### Alternative Approach 1: Environment Variable Validation at Build Time

**Current Approach:**
- Variables are optional (with fallbacks)
- Build might succeed even if vars are missing
- Runtime errors occur when code tries to use undefined vars

**Alternative:**
```typescript
// lib/env-validator.ts
export function validateEnvVars() {
  const required = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    // ... etc
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(', ')}`);
  }
}

// next.config.ts
import { validateEnvVars } from './lib/env-validator';

validateEnvVars(); // Fails build if vars missing

const nextConfig: NextConfig = {
  // ...
};
```

**Trade-offs:**
- ✅ **Pros:** Fails fast, catches issues early, no silent failures
- ❌ **Cons:** Less flexible, requires all vars even for development

**When to Use:** Production deployments where all vars must be present

---

### Alternative Approach 2: Runtime Environment Variable Injection

**Current Approach:**
- `NEXT_PUBLIC_*` vars embedded at build time
- Must redeploy to change values

**Alternative:**
- Use Vercel's Edge Config or environment variable updates
- Some vars can be changed without redeploying
- Use runtime API to fetch configuration

**Trade-offs:**
- ✅ **Pros:** Can update config without redeploying, more flexible
- ❌ **Cons:** More complex, requires additional service, potential latency

**When to Use:** When you need to change configuration frequently without redeploying

---

### Alternative Approach 3: Separate Build and Runtime Validation

**Current Approach:**
- Single validation (or none)
- Errors surface at different times

**Alternative:**
```typescript
// Build-time validation (next.config.ts)
if (process.env.NODE_ENV === 'production') {
  validateBuildTimeVars();
}

// Runtime validation (app/layout.tsx or middleware)
if (typeof window === 'undefined') {
  validateRuntimeVars();
}
```

**Trade-offs:**
- ✅ **Pros:** Catches issues at appropriate stages, more granular control
- ❌ **Cons:** More code to maintain, potential duplication

**When to Use:** When you have different requirements for build vs runtime

---

### Alternative Approach 4: Using Vercel's Environment Variable UI More Effectively

**Current Approach:**
- Manual entry in Vercel dashboard
- Easy to make typos or forget variables

**Alternative:**
- Use Vercel CLI to sync variables:
```bash
vercel env pull .env.local
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
```
- Or use Vercel's API to manage variables programmatically
- Create a deployment script that validates vars before deploying

**Trade-offs:**
- ✅ **Pros:** Less error-prone, can be automated, version-controlled
- ❌ **Cons:** Requires CLI setup, additional tooling

**When to Use:** When managing multiple projects or need automation

---

### Alternative Approach 5: Different Deployment Strategies

**Current Approach:**
- Single deployment, all routes in one build

**Alternative 1: Monorepo with Separate Deployments**
- Deploy API routes separately from pages
- Each can have different env var requirements

**Alternative 2: Incremental Static Regeneration (ISR)**
- Pre-render pages at build time
- Regenerate on-demand if needed
- Reduces dependency on runtime env vars for some pages

**Trade-offs:**
- ✅ **Pros:** More flexible, can optimize different parts differently
- ❌ **Cons:** More complex architecture, harder to manage

**When to Use:** Large applications with different requirements for different routes

---

## 📋 Summary Checklist

### Immediate Fix:
- [ ] Check Vercel deployment status and logs
- [ ] Add all 10 required environment variables
- [ ] Ensure variables are set for Production AND Preview
- [ ] Redeploy after adding variables
- [ ] Verify site loads correctly

### Prevention:
- [ ] Document all required env vars in `env.template`
- [ ] Use `scripts/verify-env.js` before deploying
- [ ] Always check build logs, not just deployment status
- [ ] Set up Vercel CLI for easier variable management
- [ ] Consider build-time validation for critical variables

### Understanding:
- [ ] Understand difference between build-time and runtime env vars
- [ ] Know when to use `NEXT_PUBLIC_` prefix
- [ ] Understand Next.js App Router file-based routing
- [ ] Know how Vercel serverless functions work

---

## 🎯 Key Takeaways

1. **NOT_FOUND usually means build failed or routes weren't generated**
2. **Missing environment variables are the #1 cause**
3. **Always check build logs, not just deployment status**
4. **Set variables for both Production and Preview environments**
5. **Redeploy after adding/changing environment variables**
6. **Understand the difference between build-time and runtime variables**

---

**Most Likely Solution for Your Case:**
Add all 10 environment variables in Vercel dashboard (Production + Preview), then redeploy. This fixes 90% of NOT_FOUND errors on Vercel.


