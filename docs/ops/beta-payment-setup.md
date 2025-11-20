# Beta Payment Processing Setup Guide

This document outlines the setup required for Task 1.5: Beta Payment Processing with Stripe Payment Links.

## Overview

The beta payment system implements a **simple two-phase flow** using Stripe Payment Links:

1. **Application Submission**: Users apply to the beta program
2. **Manual Review & Payment**: Admins review applications, accept qualified applicants, and send Stripe Payment Link

## Why Payment Links?

**Simplified from original complex implementation:**

- ❌ **Removed**: Custom payment page (347 lines of React/Stripe Elements code)
- ❌ **Removed**: PaymentIntent creation function (238 lines of backend code)
- ✅ **Kept**: Simple webhook handler (~150 lines)
- ✅ **Result**: 90% less code, 5-minute setup, zero frontend payment logic

**Payment Links are perfect for this use case because:**

- Fixed $1,500 price (not dynamic pricing)
- One-time payment (not subscription)
- No need for custom embedded UI
- Stripe handles all payment UX and security

## Architecture

```
User fills form → Netlify Function → Supabase (pending) → Email to Chris
                                            ↓
Chris reviews → Update status to 'accepted' → Email Stripe Payment Link
                                            ↓
User clicks link → Stripe-hosted checkout → Payment Success
                                            ↓
Webhook → Supabase (paid) → Confirmation emails sent
```

## Required Environment Variables

### 1. Stripe (Payment Processing)

Add these to Netlify Dashboard (Site Settings → Environment Variables):

```bash
# Stripe Secret Key (for backend/webhook operations)
STRIPE_SECRET_KEY=sk_test_... # Test mode
# OR
STRIPE_SECRET_KEY=sk_live_... # Production mode

# Stripe Publishable Key (NOT NEEDED for Payment Links, but required for test keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... # Test mode
# OR
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... # Production mode

# Stripe Webhook Secret (for webhook signature verification)
STRIPE_WEBHOOK_SECRET=whsec_...
```

**How to get these:**

1. **Create Stripe Account** (5 minutes, no business verification needed for test mode)
   - Go to [Stripe Dashboard](https://dashboard.stripe.com/)
   - Sign up with email
   - Verify email
   - ✅ You can test immediately in test mode

2. **Get API Keys**
   - Navigate to **Developers → API keys**
   - Toggle "Test mode" (top-right corner)
   - Copy `Secret key` (sk*test*...) and `Publishable key` (pk*test*...)

3. **Create Payment Link** (Dashboard only, no code!)
   - Toggle to "Test mode"
   - Go to **Products → Add Product**
   - Name: "StartupAI Private Beta Lifetime Deal"
   - Price: $1,500 USD (one-time)
   - Click "Add product"
   - Go to **Payment Links → New**
   - Select your product
   - Configure:
     - Success URL: `https://startupai.site/beta/payment/success`
     - Collect customer name and email
   - Click "Create link"
   - Copy the Payment Link URL: `https://buy.stripe.com/test_XXXXX`

4. **Create Webhook**
   - Go to **Developers → Webhooks**
   - Click "Add endpoint"
   - URL: `https://startupai.site/.netlify/functions/stripe-webhook`
   - Events to listen for: `checkout.session.completed`
   - Copy the `Signing secret` (whsec\_...) after creating

### 2. Supabase (Already Configured)

These should already exist:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ... # For serverless functions
```

### 3. Resend (Email Notifications - Already Configured)

These should already exist:

```bash
RESEND_API_KEY=re_...
RESEND_FROM=beta@startupai.site # Or your verified domain
```

## Local Development Setup

Create `.env.local` file (already gitignored):

```bash
# Stripe Test Keys
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... # Not actively used but good to have
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase (copy from production)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Resend (copy from production)
RESEND_API_KEY=...
RESEND_FROM=beta@startupai.site
```

## Testing the Payment Flow

### 1. Test Application Submission

```bash
# Start local dev server
pnpm dev

# Navigate to /beta page
# Fill out the form
# Submit application
# Check Supabase beta_applications table for new row with status='pending'
```

### 2. Create Test Payment Link

In Stripe Dashboard (test mode):

1. Products → Add Product → "StartupAI Beta Test" - $1,500
2. Payment Links → New → Select product
3. Configure success URL
4. Copy test link: `https://buy.stripe.com/test_XXXXX`

### 3. Test Payment with Application ID

**Payment Link Format:**

```
https://buy.stripe.com/test_XXXXX?client_reference_id=APPLICATION_UUID
```

Replace `APPLICATION_UUID` with actual UUID from Supabase.

**Test with Stripe test card:**

- Card: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., 12/34)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

### 4. Test Webhook Locally

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local Netlify function
stripe listen --forward-to localhost:8888/.netlify/functions/stripe-webhook

# Copy the webhook signing secret and add to .env.local
STRIPE_WEBHOOK_SECRET=whsec_...

# Start Netlify dev server
pnpm dev:staging

# Complete a test payment using the payment link
# Check console for webhook events
# Verify Supabase updated to status='paid'
```

## Production Deployment Checklist

- [ ] Create Stripe account (if not already done)
- [ ] Switch to "Live mode" in Stripe Dashboard
- [ ] Create production product and Payment Link
- [ ] Add live environment variables to Netlify Dashboard
- [ ] Create production webhook endpoint
- [ ] Update webhook secret in Netlify environment variables
- [ ] Test end-to-end flow in production
- [ ] Verify email notifications are sent
- [ ] Check Supabase database updates correctly

## Manual Review Workflow

### 1. Application Received

- Email notification sent to `cw@chriswalker.consulting`
- Review application in Supabase dashboard

### 2. Accept Applicant

Update in Supabase:

```sql
UPDATE beta_applications
SET status = 'accepted'
WHERE id = 'application-id';
```

### 3. Send Payment Link Email

Email template:

```
Subject: Your StartupAI Beta Application - Accepted! 🎉

Hi [Name],

Great news! Your application for the StartupAI Private Beta has been accepted.

To secure your spot, please complete your payment ($1,500):
[PAYMENT_LINK]?client_reference_id=[APPLICATION_ID]

This lifetime deal includes:
• 3 full validation cycles
• Real ad spend (~$450-525)
• FREE lifetime Founder Tier access ($199/mo value)
• $10,440+ value over 5 years

Questions? Reply to this email.

Best,
Chris
```

Replace `[PAYMENT_LINK]` with your Stripe Payment Link URL and `[APPLICATION_ID]` with the Supabase UUID.

### 4. Payment Completed (Automatic)

- Webhook fires `checkout.session.completed`
- Database automatically updates to status='paid'
- Confirmation emails sent to applicant and admin

## Database Schema

The `beta_applications` table schema:

```sql
CREATE TABLE beta_applications (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  startup_idea TEXT NOT NULL,
  industry TEXT NOT NULL,
  timeline TEXT NOT NULL,
  referral_source TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'rejected', 'paid'
  stripe_payment_intent_id TEXT UNIQUE, -- Not used with Payment Links
  stripe_customer_id TEXT,
  payment_amount INTEGER DEFAULT 150000, -- $1,500 in cents
  payment_status TEXT, -- 'pending', 'processing', 'succeeded', 'failed'
  paid_at TIMESTAMPTZ,
  cohort_phase TEXT, -- 'phase_1', 'phase_2', 'phase_3', 'phase_4'
  user_agent TEXT,
  ip_address TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Note:** `stripe_payment_intent_id` is not used with Payment Links (Checkout Sessions don't use PaymentIntents directly).

## Troubleshooting

### Webhook Not Triggering

- Verify `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard
- Check webhook endpoint URL is correct
- Ensure event type is `checkout.session.completed` (not `payment_intent.succeeded`)
- Test with Stripe CLI: `stripe trigger checkout.session.completed`
- Check Netlify function logs

### Email Not Sending

- Verify `RESEND_API_KEY` is set
- Check Resend dashboard for delivery status
- Verify sender email domain is verified in Resend

### Payment Link Not Working

- Verify you're using the correct link (test vs live mode)
- Check that `client_reference_id` parameter is included
- Ensure success URL is configured in Payment Link settings

### Application ID Not Captured

- Verify payment link includes `?client_reference_id=UUID`
- Check webhook logs for `session.client_reference_id`
- Ensure webhook handler extracts correct field

### Local Development Issues

#### Beta Page Shows 404 on Port 8888

**Problem:** Accessing `http://localhost:8888/beta` returns 404 with multiple "Rewrote URL to /index.html" messages in logs.

**Cause:** Netlify dev proxy has redirect rules in `netlify.toml` that catch all routes and redirect to `/index.html` (designed for production static export, not dev server).

**Solution:** Access Next.js dev server directly on **port 3000** instead:

- Beta page: `http://localhost:3000/beta`
- Home page: `http://localhost:3000`
- Other pages: `http://localhost:3000/[route]`

**Note:** Netlify functions still work on port 8888. The beta form will submit to `http://localhost:8888/.netlify/functions/beta-application` automatically.

#### PostHog Console Errors in Development

**Problem:** Console shows multiple "Failed to fetch" errors from PostHog when running locally:

```
TypeError: Failed to fetch
at instrumentation-client.ts:3:9
[PostHog.js] [RemoteConfig] "Failed to fetch remote config from PostHog."
```

**Cause:** PostHog is trying to connect to its API in local development, but the endpoint is not accessible or configured for localhost.

**Solution:** Disable PostHog in local development by wrapping the initialization:

```typescript
// instrumentation-client.ts
import posthog from 'posthog-js';

// Only initialize PostHog in production/staging to avoid local dev errors
if (
  process.env.NODE_ENV !== 'development' &&
  process.env.NEXT_PUBLIC_POSTHOG_KEY
) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    // ... rest of config
  });
}
```

**Result:** Clean console in local development, PostHog still works in production/staging.

#### Stripe CLI Installation on WSL

**Problem:** `brew install stripe/stripe-cli/stripe` fails with "command not found" on WSL.

**Solution:** Install directly to user directory:

```bash
# Get direct download URL for Linux AMD64
curl -s https://api.github.com/repos/stripe/stripe-cli/releases/latest | grep "browser_download_url.*linux_x86_64.tar.gz" | cut -d '"' -f 4

# Download and extract
cd /tmp
curl -L -o stripe_linux.tar.gz [URL_FROM_ABOVE]
tar -xzf stripe_linux.tar.gz

# Move to user bin directory (no sudo required)
mkdir -p ~/.local/bin
mv stripe ~/.local/bin/

# Add to PATH in ~/.bashrc or ~/.zshrc
export PATH="$HOME/.local/bin:$PATH"

# Verify installation
stripe --version
```

**Alternative:** Use apt with official Stripe repository (requires sudo):

```bash
sudo apt-get update
sudo apt-get install stripe
```

## Files in This Implementation

### Created/Modified:

- `supabase/migrations/00012_beta_applications.sql` - Database schema
- `netlify/functions/beta-application.ts` - Application submission handler
- `netlify/functions/stripe-webhook.ts` - Webhook event handler (simplified)
- `src/app/beta/page.tsx` - Beta application form (updated)

### Deleted (Simplified):

- ❌ `src/app/beta/payment/page.tsx` - Complex payment page (not needed)
- ❌ `src/app/beta/payment/PaymentClient.tsx` - Stripe Elements integration (not needed)
- ❌ `netlify/functions/create-payment-intent.ts` - PaymentIntent creation (not needed)

### Code Reduction:

- **Before**: ~850 lines
- **After**: ~100 lines
- **Savings**: ~750 lines (90% reduction)

## Stripe Test Mode Benefits

✅ **No business verification required**
✅ **Test immediately after signup**
✅ **Unlimited testing**
✅ **All features available**
✅ **Same API as production**
✅ **Test cards work identically to real cards**
✅ **Webhooks fully functional**

You can develop and test the entire payment flow without ever submitting business verification documents. Only switch to live mode when ready to accept real payments.

## Payment Link vs Stripe Elements Comparison

| Feature              | Payment Links (Current)    | Stripe Elements (Previous) |
| -------------------- | -------------------------- | -------------------------- |
| **Code Complexity**  | Very Low (1/10)            | High (8/10)                |
| **Setup Time**       | 5 minutes                  | Hours                      |
| **Frontend Code**    | 0 lines                    | 347 lines                  |
| **Backend Code**     | 0 lines (webhook only)     | 238 lines                  |
| **Total Code**       | ~100 lines                 | ~850 lines                 |
| **Maintenance**      | Very Low                   | High                       |
| **UI Customization** | Limited (Stripe theme)     | Full control               |
| **Security**         | Automatic (Stripe-hosted)  | Manual implementation      |
| **PCI Compliance**   | Automatic                  | Manual                     |
| **Best For**         | Fixed pricing, simple flow | Custom UX, complex flows   |

**For your beta program with a fixed $1,500 price, Payment Links are the clear winner.**

## Next Steps

1. ✅ Code simplification complete
2. Create Stripe account (if not done)
3. Set up test Payment Link
4. Add environment variables to Netlify
5. Create webhook endpoint
6. Test complete flow in staging
7. Deploy to production
8. Switch to live mode Payment Link
9. Start accepting beta applications!

## Support Resources

- Stripe Payment Links Docs: `https://docs.stripe.com/payment-links`
- Stripe Webhooks: `https://docs.stripe.com/webhooks`
- Stripe Test Cards: `https://docs.stripe.com/testing`
- Stripe CLI: `https://docs.stripe.com/stripe-cli`
