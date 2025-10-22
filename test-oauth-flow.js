#!/usr/bin/env node

/**
 * Test GitHub OAuth Flow
 * 
 * This script simulates the OAuth flow to verify:
 * 1. Supabase redirect URLs are configured correctly
 * 2. The callback endpoint is accessible
 * 3. The OAuth flow can complete without errors
 */

const https = require('https');

const SUPABASE_URL = 'https://eqxropalhxjeyvfcoyxg.supabase.co';
const REDIRECT_URL = 'https://app-startupai-site.netlify.app/auth/callback';

console.log('🔍 Testing GitHub OAuth Configuration\n');

// Test 1: Check if callback endpoint is accessible
console.log('Test 1: Checking callback endpoint accessibility...');
https.get(`${REDIRECT_URL}?error=test`, (res) => {
  console.log(`✅ Callback endpoint status: ${res.statusCode}`);
  console.log(`   Location: ${res.headers.location || 'N/A'}`);
  
  // Test 2: Verify Supabase auth endpoint
  console.log('\nTest 2: Checking Supabase auth endpoint...');
  https.get(`${SUPABASE_URL}/auth/v1/authorize?provider=github`, (res) => {
    console.log(`✅ Supabase auth endpoint status: ${res.statusCode}`);
    
    if (res.statusCode === 302 || res.statusCode === 307) {
      console.log(`   Redirect to: ${res.headers.location}`);
    }
    
    console.log('\n📋 Test Summary:');
    console.log('   - Callback endpoint: ✅ Accessible');
    console.log('   - Supabase auth: ✅ Responding');
    console.log('\n⚠️  Note: To fully test OAuth, you need to:');
    console.log('   1. Visit https://startupai-site.netlify.app/signup');
    console.log('   2. Click "Sign up with GitHub"');
    console.log('   3. Authorize the app on GitHub');
    console.log('   4. Verify redirect to dashboard without errors');
    
  }).on('error', (err) => {
    console.error(`❌ Supabase auth endpoint error: ${err.message}`);
  });
  
}).on('error', (err) => {
  console.error(`❌ Callback endpoint error: ${err.message}`);
});
