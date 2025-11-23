<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Df9xkWnPswx14RrOis-vKlCOzw5ML2_s

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Authentication Setup

This portfolio is protected by password authentication using Netlify serverless functions.

### Setting up the password:

1. Generate a bcrypt hash for your password:
   ```bash
   node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('your-password', 10).then(hash => console.log(hash));"
   ```

2. In Netlify Dashboard:
   - Go to **Site settings** > **Environment variables**
   - Add `NETLIFY_PASSWORD_HASH` with the generated hash
   - Add `JWT_SECRET` with a random secret string (optional, has default)

3. The password will be validated server-side, and a JWT token will be stored in localStorage for 30 days.
