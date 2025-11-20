---
purpose: "Instructions for running the marketing site locally"
status: "active"
last_reviewed: "2025-11-20"
---

# Local Development

The marketing site is a standalone Next.js (App Router) project that consumes shared services from the product platform. Follow this runbook when onboarding new contributors or verifying changes.

## Prerequisites

- Node.js ≥ 18 (see `.nvmrc`).
- pnpm 9 (workspace root ships with `pnpm-workspace.yaml`).
- Netlify CLI (`npm i -g netlify-cli`) if you need to test form submissions locally.
- Supabase anon + PostHog public keys (request via #infra-ops).

## Setup Steps

1. **Install dependencies**
   ```bash
   pnpm install
   ```
2. **Seed environment variables**  
   Copy `.env.example` → `.env.local` and provide:
   - `NEXT_PUBLIC_APP_URL` – e.g. `https://app-startupai-site.netlify.app`
   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_HOST`
   - Optional: `RESEND_API_KEY` for waitlist notifications (otherwise logs to console).
3. **Run the dev server**
   ```bash
   pnpm dev
   ```
   Next.js listens on `http://localhost:3000`. HMR is enabled via Turbopack.
4. **Lint & type-check before PR**
   ```bash
   pnpm lint
   pnpm type-check
   ```
   (No unit tests today; visual/axe coverage handled in the app repo.)

## Staging Environment (Netlify Dev)

For production-like testing with Netlify Functions and cross-site auth:

```bash
pnpm dev:staging    # Runs on http://localhost:8888
```

**What happens:**
- Runs `netlify dev` which proxies through Netlify's server
- Loads environment from `[context.dev.environment]` in `netlify.toml`
- Simulates Netlify infrastructure (redirects, headers, functions)
- Tests cross-site authentication with product app on port 8889

**Use staging when:** Testing Netlify Functions, validating env vars, checking cross-site auth flows.

### Cross-Site Testing

```bash
# Terminal 1: Start staging marketing site
pnpm dev:staging              # http://localhost:8888

# Terminal 2: Start staging app platform
cd ~/app.startupai.site/frontend
pnpm dev:staging              # http://localhost:8889

# Test flow: Marketing → Auth → App redirect
```

## Secret Management (direnv)

Secrets load from a centralized location via `.envrc`:

```bash
# Setup
brew install direnv            # macOS
eval "$(direnv hook zsh)"      # Add to shell
direnv allow .                 # Enable for this repo

# Secrets stored in ~/.secrets/startupai
export OPENAI_API_KEY=sk-...
export RESEND_API_KEY=re_...
```

Secrets never committed to git and shared across all repos.

## Cross-Repo Dependencies

| Concern | Marketing reference | Product reference |
| --- | --- | --- |
| CTA routing | `src/components/signup-form.tsx` | `frontend/src/app/auth/callback/route.ts` |
| Supabase schema | `docs/schema/marketing-db.md` | `frontend/src/db/schema/users.ts` |
| Analytics events | `src/lib/analytics.ts` | `frontend/src/lib/analytics/index.ts` |

When schemas or event names change in the product repo, update the marketing equivalents in the same PR.

## Local Form & Email Testing

- `netlify dev` proxies Netlify form submissions; see `docs/ops/forms-and-leads.md` for payload structure.
- Without a `RESEND_API_KEY`, waitlist submissions log to the terminal so you can verify payloads safely.

## Common Issues

| Symptom | Likely Cause | Fix |
| --- | --- | --- |
| Supabase client throws “env vars not set” | Missing `NEXT_PUBLIC_SUPABASE_*` values. | Add to `.env.local` or export in shell. |
| CTA links point to `localhost:3001` | `NEXT_PUBLIC_APP_URL` still defaulting. | Set to deployed app URL. |
| PostHog errors in dev | Running without keys produces 401 warnings. | Allow warnings locally or set test keys. |
| Netlify dev fails | CLI not authenticated. | Run `netlify login` or use team access token. |

For deeper environment switching (e.g., pointing marketing at staging Supabase), refer to the archived `docs/ENVIRONMENT_SWITCHING.md` in Git history.
