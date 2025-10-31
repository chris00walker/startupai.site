# Multi-Environment Setup Guide

**StartupAI Marketing Site** - Complete environment management across Local, Staging, and Production

---

## 🎯 Overview

This repository supports **three distinct environments** with automated configuration:

| Environment | Purpose | Port | URLs | Config File |
|------------|---------|------|------|-------------|
| **Local** | Fast development iteration | 3000 | localhost:3000 | `.env.local` |
| **Staging** | Pre-production testing | 8888 | localhost:8888 | `.env.staging` |
| **Production** | Live deployment | — | startupai-site.netlify.app | Netlify Dashboard |

---

## 🚀 Quick Start Commands

### Local Development (Fastest)
```bash
# Standard Next.js development
pnpm dev

# Or explicitly specify local mode
pnpm dev:local

# Access at: http://localhost:3000
```

**Use for:** Fast iteration, component development, debugging

---

### Staging (Production-Like Testing with Netlify Dev)
```bash
# Run with Netlify Dev to simulate production environment
pnpm dev:staging

# Access at: http://localhost:8888
```

**What happens:**
- Runs `netlify dev` which starts a production-like local server
- Loads environment variables from `[context.dev.environment]` in netlify.toml
- Simulates Netlify's production infrastructure (redirects, headers, functions)
- Tests cross-site authentication with app platform on port 8889

**Use for:** Testing production builds, Netlify Functions, environment variable validation, cross-site flows

**Important:** Staging does NOT use `.env.staging` file - it uses environment variables defined in `[context.dev.environment]` section of netlify.toml!

---

### Production (Automatic)
```bash
# Commit and push to GitHub
git add .
git commit -m "feat: your changes"
git push origin main

# Auto-deploys to: https://startupai-site.netlify.app
```

**Use for:** Live deployment, end-user access

---

## 📁 Environment File Structure

```
startupai.site/
├── .env.example          # Template with all required variables
├── .env.local            # Local development (gitignored)
├── .env.staging          # NOT USED BY NETLIFY DEV (reference only)
├── .env.production       # Production reference (non-secret values)
├── .envrc                # direnv integration (loads ~/.secrets/startupai)
└── netlify.toml          # ⭐ Contains staging env vars in [context.dev.environment]
```

**Important Note about .env.staging:**
The `.env.staging` file is NOT used by `netlify dev`. When you run `netlify dev`, environment variables come from:
1. `[context.dev.environment]` in netlify.toml (staging-specific vars)
2. `.env.local` file (local overrides)
3. Netlify project settings (from dashboard)

The `.env.staging` file exists only as a reference/documentation of what staging variables should be.

---

## 🔧 Environment Configuration Details

### Local Development (.env.local)

**Purpose:** Fast development with hot reload

**Key Settings:**
```bash
NODE_ENV=development
NEXT_PUBLIC_MARKETING_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3001
LOG_LEVEL=debug
ENABLE_DEBUG=true
```

**Runs:** `next dev --turbopack` (port 3000)

---

### Staging (Netlify Dev)

**Purpose:** Production-like testing without affecting live users using Netlify's local dev server

**Configuration Location:** `netlify.toml` file (NOT .env.staging)

**Key Settings in netlify.toml:**
```toml
# Environment variables for staging (netlify dev)
[context.dev.environment]
  NODE_ENV = "development"
  NEXT_PUBLIC_MARKETING_URL = "http://localhost:8888"
  NEXT_PUBLIC_APP_URL = "http://localhost:8889"

# Dev server configuration
[dev]
  command = "pnpm dev"
  port = 8888
  targetPort = 3000
  autoLaunch = false
```

**Runs:** `netlify dev` which:
1. Starts your framework dev server on port 3000 (`targetPort`)
2. Proxies it through Netlify's server on port 8888 (`port`)
3. Injects environment variables from `[context.dev.environment]`
4. Simulates production infrastructure (functions, redirects, headers)

**Features:**
- ✅ Simulates Netlify Functions
- ✅ Tests redirects and headers from netlify.toml
- ✅ Validates environment variable loading
- ✅ Tests cross-site flows with app platform
- ✅ Production-like behavior without deploying

---

### Production (Netlify Dashboard)

**Purpose:** Live deployment

**Key Settings:**
```bash
NODE_ENV=production
NEXT_PUBLIC_MARKETING_URL=https://startupai-site.netlify.app
NEXT_PUBLIC_APP_URL=https://app-startupai-site.netlify.app
```

**Configured in:** Netlify Dashboard → Site settings → Environment variables

**Build:** Automatic on `git push` to `main` branch

---

## 🔐 Secret Management

### Using direnv (Recommended)

All repos use `.envrc` files that load secrets from a centralized location:

```bash
# .envrc content
source_env ~/.secrets/startupai
```

**Setup:**
1. Install direnv: `brew install direnv` (macOS) or `apt install direnv` (Linux)
2. Add to shell: `eval "$(direnv hook bash)"` or `eval "$(direnv hook zsh)"`
3. Create secrets file: `~/.secrets/startupai`
4. Add API keys: `export OPENAI_API_KEY=sk-...`
5. Allow direnv: `direnv allow .`

**Benefits:**
- Secrets never committed to git
- Shared across all three repos
- Automatic loading when entering directory
- Environment-specific overrides possible

---

## 🧪 Testing Environment Configuration

### Check Current Environment
```bash
pnpm env:check
```

**Output:**
```
Environment: development
Marketing URL: http://localhost:3000
App URL: http://localhost:3001
```

### Test Staging Environment
```bash
# Terminal 1: Start staging marketing site
cd ~/startupai.site
pnpm dev:staging

# Terminal 2: Start staging app platform
cd ~/app.startupai.site/frontend
pnpm dev:staging

# Access:
# Marketing: http://localhost:8888
# App: http://localhost:8889
```

### Verify Cross-Site Integration
```bash
# 1. Open marketing site: http://localhost:8888
# 2. Click "Login" or "Sign Up"
# 3. Complete authentication
# 4. Should redirect to: http://localhost:8889
# 5. Verify JWT token handoff
```

---

## 🌐 Netlify Dev Features

When running `pnpm dev:staging` (netlify dev), you get:

### ✅ Production Simulation
- Exact same environment as production
- Tests Netlify-specific features
- Validates redirects and headers
- Simulates serverless functions

### ✅ Environment Detection
Netlify automatically sets `CONTEXT` variable:
- `dev` → Local development
- `branch-deploy` → Preview deployments
- `production` → Live deployment

### ✅ Build Validation
```bash
# Test production build locally
pnpm build:staging

# Verify output
ls -la out/
```

---

## 🔄 Switching Between Environments

### From IDE (VS Code, Cursor, etc.)

**Terminal Commands:**
```bash
# Local development
pnpm dev

# Staging testing
pnpm dev:staging

# Check environment
pnpm env:check
```

### From CLI

**Same commands work in any terminal:**
```bash
cd ~/startupai.site
pnpm dev:staging
```

### From Cloud (GitHub Actions)

**Automatic based on branch:**
- `main` branch → Production build
- Other branches → Preview builds (staging mode)

---

## 🎯 Environment Selection Guide

### Use **Local** when:
- ✅ Developing new features
- ✅ Quick UI iterations
- ✅ Component testing
- ✅ Debugging with hot reload

### Use **Staging** when:
- ✅ Testing before deployment
- ✅ Validating Netlify Functions
- ✅ Checking environment variables
- ✅ Testing cross-site authentication
- ✅ Verifying redirects and headers

### Use **Production** when:
- ✅ Deploying to users
- ✅ Final validation
- ✅ Performance testing at scale

---

## 📦 Required Environment Variables

### Public Variables (Safe to commit examples)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_MARKETING_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### Secret Variables (Never commit)
```bash
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret
NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
```

**See `.env.example` for complete list**

---

## 🔍 Troubleshooting

### Environment not loading?
```bash
# Check direnv status
direnv status

# Reload environment
direnv allow .

# Verify variables loaded
pnpm env:check
```

### Netlify Dev not starting?
```bash
# Install Netlify CLI globally
pnpm add -g netlify-cli

# Link to site (one-time)
netlify link

# Try again
pnpm dev:staging
```

### Wrong URLs in staging?
```bash
# Verify .env.staging exists
ls -la .env.staging

# Check content
cat .env.staging | grep URL

# Should show localhost:8888 and localhost:8889
```

### Cross-site auth not working?
```bash
# Ensure both sites running on correct ports:
# Marketing: localhost:8888
# App: localhost:8889

# Check JWT secrets match between sites
```

---

## 📚 Additional Resources

- **Netlify Dev Docs:** https://docs.netlify.com/cli/get-started/#run-a-local-development-environment
- **direnv Docs:** https://direnv.net/
- **Next.js Environment Variables:** https://nextjs.org/docs/basic-features/environment-variables

---

## ✅ Checklist: Environment Setup Complete

- [ ] `.env.local` created with local development URLs
- [ ] `.env.staging` created with staging URLs (8888/8889)
- [ ] `~/.secrets/startupai` contains API keys
- [ ] `direnv allow .` executed
- [ ] `pnpm dev` works on port 3000
- [ ] `pnpm dev:staging` works on port 8888
- [ ] `pnpm env:check` shows correct URLs
- [ ] Production environment variables set in Netlify Dashboard

---

**Last Updated:** October 30, 2025  
**Repository:** startupai.site  
**Environment Version:** 1.0.0
