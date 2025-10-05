# PostHog Installation Guide

**Date:** October 5, 2025  
**Status:** ✅ Complete  
**Sites:** Both (Marketing + Product)

---

## Overview

PostHog is installed on **both sites** to track the complete user journey from marketing to product usage. This follows PostHog's recommendation to group multiple customer-facing products in one project for unified analytics.

## Architecture

```
PostHog Project (Single)
├── startupai.site (Marketing)
│   ├── Track: Conversions, signups, funnel
│   └── Goal: Optimize conversion rate
└── app.startupai.site (Product)
    ├── Track: User behavior, retention, features
    └── Goal: Measure satisfaction and advocacy
```

## Implementation Details

### Marketing Site (startupai.site)

**Package Installed:**
```bash
pnpm add posthog-js@1.270.1
```

**Configuration:**
- File: `instrumentation-client.ts` (root)
- Initialization: Next.js 15.3+ instrumentation pattern
- Features: Pageview tracking, session recording, autocapture

**Environment Variables:**

Configured in centralized secrets: `~/.secrets/startupai`
```env
NEXT_PUBLIC_POSTHOG_KEY=<from-secrets-file>
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

### Product Site (app.startupai.site)

**Package:**
- Already installed: `posthog-js@1.270.1`

**Configuration:**
- File: `frontend/instrumentation-client.ts`
- Initialization: Same pattern as marketing site
- Features: Same tracking + user identification

**Environment Variables:**
- Same as marketing site (shared PostHog project)

## Configuration Options

Both sites use these PostHog settings:

```typescript
posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  person_profiles: 'identified_only',      // Privacy-first
  capture_pageview: true,                  // Auto page tracking
  capture_pageleave: true,                 // Exit analytics
  autocapture: true,                       // Click/interaction tracking
  session_recording: {
    recordCrossOriginIframes: true,        // Cross-site tracking
  },
  loaded: (posthog) => {
    if (process.env.NODE_ENV === 'development') {
      posthog.debug()                      // Debug in dev mode
    }
  }
})
```

## Usage

### Client-Side Events

Use PostHog anywhere in your Next.js components:

```typescript
'use client'
import posthog from 'posthog-js'

export default function MyComponent() {
  const handleAction = () => {
    posthog.capture('button_clicked', {
      button_name: 'signup',
      location: 'hero'
    })
  }
  
  return <button onClick={handleAction}>Sign Up</button>
}
```

### User Identification

Identify users after authentication:

```typescript
import posthog from 'posthog-js'

// After successful login
posthog.identify(
  user.id,
  {
    email: user.email,
    name: user.full_name,
    role: user.role,
    plan: user.plan_status
  }
)
```

### Cross-Site Tracking

PostHog automatically tracks users across both sites when they're in the same session:

1. User visits `startupai.site` → anonymous tracking starts
2. User signs up → identified with user ID
3. User redirects to `app.startupai.site` → same session continues
4. Full journey tracked: marketing visit → signup → product usage

## Deployment

### Netlify Environment Variables

Add these to **both** Netlify sites:

**Get the PostHog API key from:** `~/.secrets/startupai` (look for `POSTHOG_API_KEY`)

**startupai-site:**
```
NEXT_PUBLIC_POSTHOG_KEY=<value-from-secrets-file>
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

**app-startupai-site:**
```
NEXT_PUBLIC_POSTHOG_KEY=<value-from-secrets-file>
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

**Security Note:** Never commit the actual PostHog key to version control. It's stored securely in `~/.secrets/startupai` and loaded via direnv.

### Production URLs

- Marketing: https://startupai-site.netlify.app
- Product: https://app-startupai-site.netlify.app
- PostHog: https://us.i.posthog.com

## Key Events to Track

### Marketing Site
- `page_view` - Automatic
- `signup_started` - User clicks signup
- `signup_completed` - Successful registration
- `pricing_viewed` - Pricing page visit
- `demo_requested` - Demo form submission
- `trial_started` - Free trial activation

### Product Site
- `page_view` - Automatic
- `project_created` - New project
- `hypothesis_added` - Evidence collection
- `experiment_planned` - Experiment design
- `report_generated` - AI report creation
- `canvas_completed` - Business model canvas
- `dashboard_viewed` - Dashboard access

## Testing

### Build Verification
```bash
# Marketing site
cd /home/chris/startupai.site
pnpm build
# ✅ Build successful

# Product site
cd /home/chris/app.startupai.site/frontend
pnpm build
# ✅ Build successful
```

### Development Testing
```bash
# Marketing site
cd /home/chris/startupai.site
pnpm dev
# Open browser console → should see PostHog debug logs

# Product site
cd /home/chris/app.startupai.site/frontend
pnpm dev
# Open browser console → should see PostHog debug logs
```

## Best Practices

1. **Privacy First:** Only identify users after explicit consent
2. **Meaningful Events:** Track business-critical actions, not every click
3. **Consistent Naming:** Use snake_case for event names
4. **Rich Properties:** Include context in event properties
5. **Test Before Deploy:** Verify tracking in dev mode first

## Troubleshooting

### PostHog not loading?
- Check environment variables are set
- Verify `NEXT_PUBLIC_` prefix (required for client-side)
- Check browser console for errors
- Ensure adblocker is disabled for testing

### Events not appearing?
- PostHog has ~5 second delay for event ingestion
- Check PostHog project key is correct
- Verify `posthog.capture()` is called after init
- Use debug mode: `posthog.debug()`

### Cross-site tracking broken?
- Ensure same PostHog key on both sites
- Check cookies are enabled
- Verify user ID is consistent across sites
- Test in incognito mode (no extensions)

## Resources

- [PostHog Docs](https://posthog.com/docs)
- [Next.js Integration](https://posthog.com/docs/libraries/next-js)
- [Event Tracking](https://posthog.com/docs/product-analytics/capture-events)
- [Session Recording](https://posthog.com/docs/session-replay)

---

## Next Steps

1. ✅ Add PostHog environment variables to Netlify
2. ⏳ Deploy both sites to production
3. ⏳ Verify tracking in PostHog dashboard
4. ⏳ Create custom events for key user actions
5. ⏳ Set up funnels and cohorts in PostHog
6. ⏳ Configure session replay for debugging
