# Environment URL Switching - Engineering Best Practice

## Overview

This project uses **automatic environment detection** to switch between local development and production URLs based on `NODE_ENV`. No manual editing required!

## How It Works

### Automatic Detection in `~/.secrets/startupai`

```bash
if [[ "${NODE_ENV:-development}" == "production" ]]; then
  # Production URLs (used during build/deploy)
  export NEXT_PUBLIC_APP_URL="https://app-startupai-site.netlify.app"
  export NEXT_PUBLIC_MARKETING_URL="https://startupai-site.netlify.app"
else
  # Development URLs (default)
  export NEXT_PUBLIC_APP_URL="http://localhost:3001"
  export NEXT_PUBLIC_MARKETING_URL="http://localhost:3000"
fi
```

## Test Results ✅

| Scenario | NODE_ENV | Marketing URL | App URL | Status |
|----------|----------|---------------|---------|---------|
| Default (unset) | `development` | `http://localhost:3000` | `http://localhost:3001` | ✅ PASS |
| Explicit Dev | `development` | `http://localhost:3000` | `http://localhost:3001` | ✅ PASS |
| Production Build | `production` | `https://startupai-site.netlify.app` | `https://app-startupai-site.netlify.app` | ✅ PASS |

## Usage

### Local Development
```bash
# Just run dev - URLs automatically use localhost
cd ~/startupai.site
pnpm dev  # Runs on http://localhost:3000

cd ~/app.startupai.site
pnpm dev  # Runs on http://localhost:3001

# Login redirects: localhost:3000 → localhost:3001 ✅
```

### Production Build (Test Locally)
```bash
# Set NODE_ENV to test production URL configuration
NODE_ENV=production pnpm build

# Build will configure redirects for Netlify URLs
```

### Production Deployment
```bash
# Netlify automatically sets NODE_ENV=production
# No manual configuration needed! ✅
git push origin main
# GitHub → Netlify → Automatic deployment with production URLs
```

## Verification Commands

### Check Current Environment
```bash
echo "Environment: ${NODE_ENV:-development}"
echo "App URL: $NEXT_PUBLIC_APP_URL"
echo "Marketing URL: $NEXT_PUBLIC_MARKETING_URL"
```

### Test Production Mode
```bash
NODE_ENV=production bash -c 'source ~/.secrets/startupai && \
  echo "App URL: $NEXT_PUBLIC_APP_URL"'
# Output: https://app-startupai-site.netlify.app
```

### Test Development Mode
```bash
NODE_ENV=development bash -c 'source ~/.secrets/startupai && \
  echo "App URL: $NEXT_PUBLIC_APP_URL"'
# Output: http://localhost:3001
```

## Benefits

✅ **Zero Manual Intervention** - URLs switch automatically based on context  
✅ **CI/CD Friendly** - Works seamlessly with Netlify auto-deployment  
✅ **Developer Friendly** - Just `pnpm dev` for local development  
✅ **Safe** - No risk of committing wrong URLs  
✅ **DRY Principle** - Single source of truth in `~/.secrets/startupai`  
✅ **Environment Parity** - Same config structure for all environments  

## Architecture

```
Local Development:
startupai.site (localhost:3000)
    ↓ login
    ↓ auth redirect
app.startupai.site (localhost:3001)
    ↓ session created
    ↓ founder-dashboard

Production:
startupai-site.netlify.app
    ↓ login
    ↓ auth redirect
app-startupai-site.netlify.app
    ↓ session created
    ↓ founder-dashboard
```

## Troubleshooting

### URLs Not Switching?

1. **Check direnv is working:**
   ```bash
   echo $NEXT_PUBLIC_APP_URL
   ```

2. **Reload direnv:**
   ```bash
   cd ~/startupai.site
   direnv allow .
   ```

3. **Restart dev servers:**
   ```bash
   pkill -f "next dev"
   cd ~/startupai.site && pnpm dev &
   cd ~/app.startupai.site && pnpm dev &
   ```

### Still Redirecting to Production?

Check that `~/.secrets/startupai` has the conditional logic (not hardcoded URLs). 

**Backup available at:** `~/.secrets/startupai.backup`

## Migration History

- ❌ **Old:** Manual URL editing before each deploy
- ✅ **New:** Automatic switching based on NODE_ENV
- 📅 **Implemented:** 2025-10-05
- 📦 **Backup:** `~/.secrets/startupai.backup`

## Related Files

- `~/.secrets/startupai` - Central environment configuration (direnv)
- `.envrc` - Loads secrets (both repos)
- `.env.local` - Local overrides (gitignored)
- `src/components/login-form.tsx` - Uses NEXT_PUBLIC_APP_URL for redirects
