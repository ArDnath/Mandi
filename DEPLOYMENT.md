# Deploying to Vercel - Step-by-Step Guide

This guide will help you successfully deploy your e-commerce application to Vercel.

## Prerequisites

- [ ] PostgreSQL database (recommended: Supabase, Neon, or Railway)
- [ ] Vercel account
- [ ] GitHub repository with your code
- [ ] Google OAuth credentials (if using Google sign-in)

## Step 1: Prepare Your Database

### Option A: Using Supabase (Recommended)

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Project Settings** → **Database**
4. Copy the **Connection String** (Transaction mode for pooling)
5. Your `DATABASE_URL` will look like:
   ```
   postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```

### Option B: Using Neon

1. Create account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string with pooling enabled
4. Format: `postgresql://[user]:[password]@[host]/[database]?sslmode=require`

### Option C: Using Railway

1. Create account at [railway.app](https://railway.app)
2. Create new PostgreSQL database
3. Copy the `DATABASE_URL` from the Connect tab

## Step 2: Run Database Migrations Locally

Before deploying, ensure your database schema is set up:

```bash
# Set your DATABASE_URL in .env.local
echo "DATABASE_URL=your-database-url-here" >> .env.local

# Run migrations
npx prisma migrate deploy

# Verify the schema
npx prisma studio
```

## Step 3: Generate AUTH_SECRET

Generate a secure secret for NextAuth:

```bash
openssl rand -base64 32
```

Copy the output - you'll need this for Vercel environment variables.

## Step 4: Set Up Google OAuth (Optional)

If using Google sign-in:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Add authorized redirect URIs:
   - `https://your-domain.vercel.app/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (for local testing)
6. Copy **Client ID** and **Client Secret**

## Step 5: Deploy to Vercel

### Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js - click **Deploy**
5. **Wait for initial deployment** (it may fail - that's okay, we'll fix it)

### Via Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

## Step 6: Configure Environment Variables

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables for **Production**, **Preview**, and **Development**:

| Variable Name          | Value                           | Example                                |
| ---------------------- | ------------------------------- | -------------------------------------- |
| `DATABASE_URL`         | Your database connection string | `postgresql://user:pass@host:5432/db`  |
| `AUTH_SECRET`          | Generated secret from Step 3    | `abc123...`                            |
| `AUTH_URL`             | Your Vercel deployment URL      | `https://your-app.vercel.app`          |
| `NEXTAUTH_URL`         | Same as AUTH_URL                | `https://your-app.vercel.app`          |
| `GOOGLE_CLIENT_ID`     | From Google Cloud Console       | `123456789.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console       | `GOCSPX-...`                           |

> [!IMPORTANT]
> Make sure to add variables to **all three environments** (Production, Preview, Development)

## Step 7: Redeploy

After adding environment variables:

1. Go to **Deployments** tab
2. Click the **⋯** menu on the latest deployment
3. Select **Redeploy**
4. Check **Use existing Build Cache** is OFF
5. Click **Redeploy**

## Step 8: Verify Deployment

Once deployment completes:

1. Visit your deployment URL
2. Test user registration: Try creating a new account
3. Test Google OAuth: Try signing in with Google
4. Check Vercel function logs for any errors:
   - Go to **Deployments** → Click your deployment → **Functions** tab

## Troubleshooting

### Build Error: "Module '@prisma/client' has no exported member 'PrismaClient'"

**Solution:** This should be fixed by the changes we made. If it persists:

```bash
# Locally, verify Prisma generates correctly
npm run postinstall
npm run build
```

### 403 Forbidden Error

**Possible causes:**

1. **Missing AUTH_SECRET**: Add it in environment variables
2. **Wrong AUTH_URL**: Must match your actual Vercel URL (no trailing slash)
3. **Database connection**: Verify DATABASE_URL is correct
4. **IP Whitelisting**: Some databases require whitelisting Vercel IPs

**Check function logs:**

1. Vercel Dashboard → Your Project → Deployments
2. Click latest deployment → Functions tab
3. Look for error messages

### Database Connection Errors

**Error: "Too many connections"**

- Use a connection pooler (Supabase Transaction mode, PgBouncer, etc.)
- Add connection limits to DATABASE_URL: `?connection_limit=5&pool_timeout=10`

**Error: "Connection timeout"**

- Check database is publicly accessible
- Verify firewall rules allow Vercel connections
- Some providers require whitelisting `0.0.0.0/0` for Vercel

### Google OAuth Not Working

1. Verify redirect URIs in Google Cloud Console match exactly
2. Check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set correctly
3. Ensure `AUTH_URL` and `NEXTAUTH_URL` match your deployment URL

## Monitoring Your Deployment

### View Logs

```bash
# Install Vercel CLI
npm i -g vercel

# View real-time logs
vercel logs your-project-name --follow
```

### Check Database

```bash
# Connect to your production database
DATABASE_URL="your-production-url" npx prisma studio
```

## Post-Deployment Checklist

- [ ] Application loads without errors
- [ ] User registration works
- [ ] User login works
- [ ] Google OAuth works (if configured)
- [ ] Database operations complete successfully
- [ ] No errors in Vercel function logs
- [ ] Custom domain configured (optional)

## Next Steps

1. **Set up custom domain** (optional):

   - Vercel Dashboard → Your Project → Settings → Domains
   - Add your domain and follow DNS configuration steps

2. **Enable monitoring**:

   - Consider integrating error tracking (Sentry, LogRocket)
   - Set up uptime monitoring

3. **Performance optimization**:
   - Review Vercel Analytics
   - Optimize images and assets
   - Consider enabling Vercel Edge Network

## Need Help?

- **Vercel Logs**: Check function logs in Vercel Dashboard
- **Database Logs**: Check your database provider's logs
- **Local Testing**: Always test `npm run build` locally first
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)

---

**Remember:** After any code changes, you must redeploy to Vercel for changes to take effect!
