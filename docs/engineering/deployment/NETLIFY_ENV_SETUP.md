# Netlify Environment Variables Setup

**Date:** October 5, 2025  
**Task:** Add PostHog environment variables to production

---

## PostHog Environment Variables

Add these to **both** Netlify sites:

```
NEXT_PUBLIC_POSTHOG_KEY=phc_u4wa3BdaAvJZEoifVxYuTTXtRa79MOWL42n2NOW9C5Y
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

---

## Option 1: Web Interface (Recommended)

### Marketing Site (startupai-site)

1. **Go to:** https://app.netlify.com/sites/startupai-site/settings/env
2. **Click:** "Add a variable" (or "Add")
3. **Add variable 1:**
   - Key: `NEXT_PUBLIC_POSTHOG_KEY`
   - Value: `phc_u4wa3BdaAvJZEoifVxYuTTXtRa79MOWL42n2NOW9C5Y`
   - Scope: All deploys (default)
4. **Add variable 2:**
   - Key: `NEXT_PUBLIC_POSTHOG_HOST`
   - Value: `https://us.i.posthog.com`
   - Scope: All deploys (default)
5. **Click:** "Save"
6. **Trigger deployment:** Site > Deploys > "Trigger deploy" > "Clear cache and deploy site"

### Product Site (app-startupai-site)

1. **Go to:** https://app.netlify.com/sites/app-startupai-site/settings/env
2. **Repeat steps 2-6** from above (same variables)

---

## Option 2: Netlify CLI (Alternative)

If you prefer to use the CLI, first set up authentication:

### Step 1: Get Netlify Personal Access Token

1. Go to: https://app.netlify.com/user/applications
2. Click: "New access token"
3. Name: "PostHog Setup CLI"
4. Click: "Generate token"
5. Copy the token (starts with `nfp_`)

### Step 2: Update Secrets File

```bash
# Edit the secrets file
nano ~/.secrets/startupai

# Replace this line:
export NETLIFY_AUTH_TOKEN="${NETLIFY_AUTH_TOKEN:-nfp_your-netlify-token}"

# With your actual token:
export NETLIFY_AUTH_TOKEN="nfp_YOUR_ACTUAL_TOKEN_HERE"

# Save and reload direnv
direnv allow
```

### Step 3: Add Variables via CLI

```bash
# Marketing site
cd /home/chris/startupai.site
netlify env:set NEXT_PUBLIC_POSTHOG_KEY "phc_u4wa3BdaAvJZEoifVxYuTTXtRa79MOWL42n2NOW9C5Y"
netlify env:set NEXT_PUBLIC_POSTHOG_HOST "https://us.i.posthog.com"

# Product site
cd /home/chris/app.startupai.site
netlify env:set NEXT_PUBLIC_POSTHOG_KEY "phc_u4wa3BdaAvJZEoifVxYuTTXtRa79MOWL42n2NOW9C5Y"
netlify env:set NEXT_PUBLIC_POSTHOG_HOST "https://us.i.posthog.com"

# Trigger new deployments
cd /home/chris/startupai.site
netlify deploy --prod

cd /home/chris/app.startupai.site
netlify deploy --prod --dir=frontend/out
```

---

## Verification

After adding variables and deploying:

### 1. Check Environment Variables

**Marketing site:**
- https://app.netlify.com/sites/startupai-site/settings/env
- Should see: `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`

**Product site:**
- https://app.netlify.com/sites/app-startupai-site/settings/env
- Should see: `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`

### 2. Check Deployment Logs

**Marketing site:**
- https://app.netlify.com/sites/startupai-site/deploys
- Look for successful build with new env vars

**Product site:**
- https://app.netlify.com/sites/app-startupai-site/deploys
- Look for successful build with new env vars

### 3. Test PostHog Tracking

**Marketing site test:**
```bash
# Visit the site
open https://startupai-site.netlify.app

# Open browser console
# Should see PostHog initialization messages
# PostHog will capture pageview event
```

**Product site test:**
```bash
# Visit the site
open https://app-startupai-site.netlify.app

# Open browser console
# Should see PostHog initialization messages
# PostHog will capture pageview event
```

### 4. Verify in PostHog Dashboard

1. Go to: https://us.i.posthog.com
2. Click: "Events" or "Live events"
3. Should see events from both domains:
   - `startupai-site.netlify.app`
   - `app-startupai-site.netlify.app`
4. Events should include:
   - `$pageview`
   - `$pageleave`
   - `$autocapture` (clicks)

---

## Troubleshooting

### PostHog not loading?

**Check browser console:**
```javascript
// Open DevTools console (F12)
// Type:
window.posthog
// Should show PostHog object, not undefined
```

**Check network tab:**
- Look for requests to `https://us.i.posthog.com`
- Status should be 200 (success)

### Events not appearing in PostHog?

**Wait 5-10 seconds:**
- PostHog has a slight delay for event ingestion
- Refresh the PostHog dashboard

**Check filters:**
- Ensure no date/time filters are too restrictive
- Check that "All events" is selected

**Verify environment variables:**
- Netlify Dashboard > Site > Settings > Environment variables
- Ensure `NEXT_PUBLIC_POSTHOG_KEY` is set correctly
- Ensure `NEXT_PUBLIC_POSTHOG_HOST` is `https://us.i.posthog.com`

### Build failing after adding env vars?

**Check build logs:**
- Netlify Dashboard > Site > Deploys > (latest deploy) > Deploy log
- Look for errors related to PostHog or env variables

**Common issues:**
- Missing `NEXT_PUBLIC_` prefix (won't be accessible client-side)
- Typo in variable name
- Missing quote marks in CLI commands

---

## Security Note

The PostHog API key in this document is:
- ✅ Safe to expose client-side (it's a public analytics key)
- ✅ Intended to be embedded in client-side JavaScript
- ✅ Not a secret like API tokens or database passwords
- ⚠️  Still stored in `~/.secrets/startupai` for consistency

**Why it's safe:**
PostHog public API keys are designed to be exposed in client-side code. They only allow:
- Sending events to your PostHog project
- Cannot read or modify existing data
- Cannot access other PostHog projects
- Rate-limited to prevent abuse

**What's NOT safe to expose:**
- Database credentials
- API tokens with write access
- Private API keys
- Service role keys
- OAuth secrets

---

## Next Steps

After completing this setup:

1. ✅ Verify tracking in PostHog dashboard
2. ⏳ Implement custom event tracking with analytics helpers
3. ⏳ Set up funnels in PostHog
4. ⏳ Configure cohorts for user segmentation
5. ⏳ Enable session recordings for debugging
6. ⏳ Set up dashboard widgets for key metrics

---

## Summary

**Required Actions:**
1. Add 2 environment variables to startupai-site on Netlify
2. Add 2 environment variables to app-startupai-site on Netlify
3. Trigger new deployment on both sites
4. Verify tracking in PostHog dashboard

**Estimated Time:** 5-10 minutes (web interface method)

**Status after completion:** PostHog fully operational in production ✅
