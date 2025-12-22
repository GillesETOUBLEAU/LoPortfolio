<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Portfolio Application - Laurence Etoubleau

Interactive portfolio presentation built with React, TypeScript, and Vite.

## Features

- 🔐 Password-protected access with JWT authentication
- 📱 Responsive full-screen presentation slides
- 🎨 Glassmorphism design with smooth animations
- 🚀 Lazy-loaded detail pages for optimal performance
- 🛡️ Rate limiting and CORS protection
- ✅ Comprehensive test coverage with Vitest
- 🎯 Error boundaries for graceful error handling

## Run Locally

**Prerequisites:** Node.js 18+

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Run tests:
   ```bash
   npm test
   ```

## Authentication Setup

This portfolio is protected by password authentication using Netlify serverless functions with rate limiting (5 attempts per 15 minutes).

### Setting up the password:

1. Generate a bcrypt hash for your password:
   ```bash
   node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('your-password', 10).then(hash => console.log(hash));"
   ```

2. In Netlify Dashboard:
   - Go to **Site settings** > **Environment variables**
   - Add `NETLIFY_PASSWORD_HASH` with the generated hash
   - Add `JWT_SECRET` with a strong random secret string (**REQUIRED** - no default for security)

3. Update `ALLOWED_ORIGINS` in `/netlify/functions/auth.ts` with your production domain

4. The password will be validated server-side, and a JWT token will be stored in localStorage for 7 days.

## Architecture

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS (CDN)
- **State Management:** Custom hooks with useReducer
- **Routing:** Custom detail page router with lazy loading
- **Backend:** Netlify Functions (serverless)
- **Authentication:** bcrypt + JWT
- **Testing:** Vitest + React Testing Library

## Security Features

- ✅ Required environment variables (no fallback secrets)
- ✅ Rate limiting on authentication endpoint
- ✅ CORS restrictions (configurable origins)
- ✅ JWT token with 7-day expiration
- ✅ bcrypt password hashing
- ✅ Input validation

## Development Notes

In development mode (`npm run dev`), authentication is bypassed for easier testing.
