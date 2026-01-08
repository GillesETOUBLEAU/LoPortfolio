#!/usr/bin/env node

/**
 * Password Hash Generator for Portfolio Authentication
 *
 * This script generates a bcrypt hash for a given password.
 * The hash should be set as the NETLIFY_PASSWORD_HASH environment variable.
 *
 * Usage:
 *   node scripts/generate-password-hash.js <password>
 *
 * Example:
 *   node scripts/generate-password-hash.js "MySecurePassword123!"
 */

const bcrypt = require('bcryptjs');

// Get password from command line argument
const password = process.argv[2];

if (!password) {
  console.error('Error: No password provided');
  console.log('\nUsage:');
  console.log('  node scripts/generate-password-hash.js <password>');
  console.log('\nExample:');
  console.log('  node scripts/generate-password-hash.js "MySecurePassword123!"');
  process.exit(1);
}

// Generate hash with 10 salt rounds
bcrypt.hash(password, 10)
  .then(hash => {
    console.log('\n✅ Password hash generated successfully!\n');
    console.log('Hash:', hash);
    console.log('\n📋 Next steps:');
    console.log('1. Go to your Netlify dashboard');
    console.log('2. Navigate to: Site settings > Environment variables');
    console.log('3. Add or update the variable:');
    console.log('   Name: NETLIFY_PASSWORD_HASH');
    console.log('   Value:', hash);
    console.log('4. Redeploy your site for the changes to take effect\n');
  })
  .catch(error => {
    console.error('Error generating hash:', error);
    process.exit(1);
  });
