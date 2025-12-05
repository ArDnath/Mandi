# Debug Logging Added - Quick Reference

## What Was Added

Comprehensive console.log statements throughout the application to help debug the 403 error.

## Where to Check Logs

### Vercel Dashboard

1. Go to your project → Deployments
2. Click latest deployment → **Functions** tab
3. Look for logs with these prefixes:
   - `[ENV]` - Environment variable validation
   - `[API]` - Fake Store API calls
   - `[PAGE]` - Page rendering

### What Each Log Shows

#### Environment Validation (`lib/config/env.ts`)

```
[ENV] Validating environment variables...
[ENV] DATABASE_URL present: true/false
[ENV] AUTH_SECRET present: true/false
[ENV] GOOGLE_CLIENT_ID present: true/false
[ENV] GOOGLE_CLIENT_SECRET present: true/false
[ENV] Environment validation successful
```

**If you see `[ENV] Environment validation FAILED`** - This is your 403 error cause!

#### API Calls (`lib/api/fakestore.ts`)

```
[API] getAllProducts() called
[API] Starting fetch from: https://fakestoreapi.com/products
[API] Response status: 200 OK
[API] Successfully fetched data from https://fakestoreapi.com/products
```

#### Page Rendering (`app/page.tsx`)

```
[PAGE] Home page rendering - fetching products...
[PAGE] Home page - fetched 20 products
```

## Most Likely Issue

Based on your error logs, the 403 is happening **before** any API calls. This means:

**The environment validation is failing!**

Check Vercel logs for:

```
[ENV] DATABASE_URL present: false  ← Missing!
[ENV] AUTH_SECRET present: false   ← Missing!
```

## Fix

1. **Push the code changes to GitHub:**

   ```bash
   git add .
   git commit -m "fix: Add debug logging and fix environment validation"
   git push
   ```

2. **Set environment variables in Vercel:**

   - `DATABASE_URL`
   - `AUTH_SECRET`

3. **Redeploy and check logs**

The logs will now tell you exactly where the error is occurring!
