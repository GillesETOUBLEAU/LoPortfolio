# 🔐 Authentication Setup Instructions

This document contains the configuration needed to set up password authentication for your portfolio.

## Current Password Configuration

**Password:** `Denon230770!`

**Bcrypt Hash:**
```
$2a$10$iWwPb1jzdH354vD8xQmboufPT2zxEbNp.xQsQm3fslCk8a445zs1W
```

## Netlify Environment Variables Setup

Follow these steps to configure authentication in Netlify:

### 1. Access Netlify Dashboard

1. Log in to your [Netlify Dashboard](https://app.netlify.com)
2. Select your portfolio site
3. Go to **Site settings** > **Environment variables**

### 2. Add Required Environment Variables

#### Variable 1: NETLIFY_PASSWORD_HASH

- **Name:** `NETLIFY_PASSWORD_HASH`
- **Value:** `$2a$10$iWwPb1jzdH354vD8xQmboufPT2zxEbNp.xQsQm3fslCk8a445zs1W`
- **Scope:** All scopes (Production, Deploy Previews, Branch deploys)

#### Variable 2: JWT_SECRET

- **Name:** `JWT_SECRET`
- **Value:** Generate a secure random string (minimum 32 characters)

  You can generate one using:
  ```bash
  openssl rand -base64 32
  ```

  Or use any strong random string like:
  ```
  your-super-secret-jwt-key-min-32-chars-long-random-string
  ```

### 3. Configure CORS Origins (Optional)

If you have a custom domain, update the `ALLOWED_ORIGINS` in `/netlify/functions/auth.ts`:

```typescript
const ALLOWED_ORIGINS = [
  'https://your-actual-domain.netlify.app',  // Replace with your domain
  'http://localhost:3000',
  'http://localhost:5173',
];
```

### 4. Deploy

After adding the environment variables:
1. Save the changes in Netlify
2. Trigger a new deployment (or wait for the next automatic deploy)
3. The authentication will be active with the password `Denon230770!`

## Testing the Authentication

1. Visit your deployed site
2. You should see a login screen
3. Enter the password: `Denon230770!`
4. You should be authenticated and see the portfolio

## Security Notes

- ✅ Password is hashed with bcrypt (10 rounds)
- ✅ JWT tokens expire after 7 days
- ✅ Rate limiting: 5 login attempts per 15 minutes per IP
- ✅ No password stored in plain text
- ⚠️ This is a shared password system (one password for all users)
- ⚠️ Keep your JWT_SECRET private and never commit it to git

## Changing the Password

To change the password in the future:

1. Run the password generator script:
   ```bash
   node scripts/generate-password-hash.js "your-new-password"
   ```

2. Update the `NETLIFY_PASSWORD_HASH` environment variable with the new hash

3. Redeploy your site

## Troubleshooting

### "Invalid password" error
- Verify the `NETLIFY_PASSWORD_HASH` is set correctly in Netlify
- Check for any extra spaces or characters when copying the hash

### "Server configuration error"
- Ensure both `NETLIFY_PASSWORD_HASH` and `JWT_SECRET` are set
- Redeploy the site after adding environment variables

### Rate limiting issues
- Wait 15 minutes after 5 failed attempts
- Rate limiting is per IP address

## Development Mode

When running locally with `npm run dev`, authentication is **bypassed** for easier development. The authentication only works in production (Netlify deployment).
