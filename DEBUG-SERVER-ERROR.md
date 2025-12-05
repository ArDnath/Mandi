# Debugging Server Components Error on Vercel

## The Error

```
Uncaught Error: An error occurred in the Server Components render.
The specific message is omitted in production builds to avoid leaking sensitive details.
```

This is a **generic production error** that hides the real error message. We need to find the actual error.

## Step 1: Check Vercel Logs (MOST IMPORTANT)

### Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click your project
3. Go to **Deployments** → Click latest deployment
4. Click **Functions** tab
5. Look for errors with red indicators
6. Click to expand and see the full error message

### Via Vercel CLI

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# View logs in real-time
vercel logs mandi --follow
```

**The logs will show the REAL error message.** Look for it there first!

## Common Causes & Solutions

### ❌ Cause 1: Database Not Migrated

**Error in logs might say:**

- "Table does not exist"
- "relation 'User' does not exist"
- "Invalid prisma schema"

**Solution:**

```bash
# Run migrations on your production database
DATABASE_URL="your-production-database-url" npx prisma migrate deploy

# Verify schema
DATABASE_URL="your-production-database-url" npx prisma db pull
```

---

### ❌ Cause 2: Missing Environment Variables

**Error in logs might say:**

- "DATABASE_URL is not defined"
- "AUTH_SECRET is required"
- Environment validation error

**Solution:**

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Verify these are set:
   - `DATABASE_URL`
   - `AUTH_SECRET`
3. Make sure they're set for **Production** environment
4. Redeploy after adding variables

---

### ❌ Cause 3: Database Connection Failed

**Error in logs might say:**

- "Connection timeout"
- "ECONNREFUSED"
- "Authentication failed"

**Solution:**

- Verify `DATABASE_URL` is correct
- Check if database allows connections from `0.0.0.0/0` (Vercel IPs)
- Use connection pooling URL if available (Supabase Transaction mode, Neon pooled connection)

---

### ❌ Cause 4: Prisma Client Not Generated

**Error in logs might say:**

- "PrismaClient is not a constructor"
- "Cannot find module '@prisma/client'"

**Solution:**
This should be fixed by our `postinstall` script, but verify:

1. Check build logs show "prisma generate" running
2. If not, check `package.json` has: `"postinstall": "prisma generate"`
3. Redeploy with build cache disabled

---

### ❌ Cause 5: Environment Variable Validation Error

**Error in logs might say:**

- "Zod validation error"
- "Expected string, received undefined"

**Solution:**
Check `lib/config/env.ts` - we already fixed this, but verify:

```typescript
const zodEnv = z.object({
  DATABASE_URL: z.string(),
  AUTH_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string().optional(), // ✅ Should be optional
  GOOGLE_CLIENT_SECRET: z.string().optional(), // ✅ Should be optional
});
```

## Step 2: Enable Development Mode Temporarily

To see detailed errors, temporarily set this in Vercel:

1. Add environment variable: `NODE_ENV=development`
2. Redeploy
3. Visit your site - you'll see detailed error messages
4. **IMPORTANT:** Remove this and redeploy after debugging!

## Step 3: Test Locally with Production Build

```bash
# Build for production
npm run build

# Start production server
npm start

# Visit http://localhost:3000
```

If it works locally but fails on Vercel, it's likely an environment variable or database connection issue.

## Step 4: Check Database Connection

Test your production database connection:

```bash
# Set your production DATABASE_URL
export DATABASE_URL="your-production-url"

# Try to connect
npx prisma db pull

# If successful, check if tables exist
npx prisma studio
```

## Quick Checklist

Run through this checklist:

- [ ] Checked Vercel function logs for actual error
- [ ] Verified `DATABASE_URL` is set in Vercel
- [ ] Verified `AUTH_SECRET` is set in Vercel
- [ ] Ran `prisma migrate deploy` on production database
- [ ] Database allows connections from Vercel (0.0.0.0/0)
- [ ] Using connection pooling URL (if applicable)
- [ ] Build logs show "prisma generate" running
- [ ] Tested production build locally (`npm run build && npm start`)

## Most Likely Fix

Based on your setup, **you probably need to run database migrations**:

```bash
# Get your DATABASE_URL from Vercel dashboard
# Then run:
DATABASE_URL="postgresql://user:pass@host:5432/db" npx prisma migrate deploy
```

After running migrations, your app should work!

## Still Stuck?

If none of this works:

1. **Share the Vercel function logs** - that's where the real error is
2. Check if you can connect to your database from your local machine
3. Verify your database provider (Supabase/Neon/Railway) is running and accessible

---

**Remember:** The actual error message is in the Vercel logs. Check there first! 🔍
