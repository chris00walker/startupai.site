---
purpose: "Private technical source of truth for the authentication stack"
status: "active"
last_reviewed: "2025-10-27"
---

# Authentication Specification

Supabase Auth underpins both marketing and product sites. This spec captures the canonical implementation for `app.startupai.site`.

## End-to-End Flow

```
CTA (/signup?plan={id})        marketing (Next.js)
        ↓
Auth form (/signup,/login)    product (Next.js App Router)
        ↓
Supabase OAuth (PKCE)         GitHub primary (Google/Azure staged)
        ↓
/auth/callback                Exchanges code → session cookie, persists plan metadata
        ↓
Role redirect                 getRedirectForRole → dashboard/onboarding
```

## Components & Files

| Concern | File(s) | Notes |
| --- | --- | --- |
| Supabase clients | `frontend/src/lib/supabase/server.ts`, `frontend/src/lib/supabase/client.ts` | Server client used in RSC/actions; browser client for interactive flows. |
| OAuth actions | `frontend/src/lib/auth/actions.ts` | `signInWithOAuth`, `signUp`, `signIn`, `signOut`. GitHub live; Google/Azure behind feature flag. |
| Callback handler | `frontend/src/app/auth/callback/route.ts` | Exchanges PKCE code, sets cookies, updates `user_profiles.plan_status`, logs metrics. |
| Middleware | `frontend/src/middleware.ts` | Refreshes tokens, enforces protected routes, handles static asset bypass. |
| Role routing | `frontend/src/lib/auth/roles.ts` | Maps role/plan status to destination (`/onboarding`, `/dashboard`, `/admin`). |
| Trial guard | `frontend/src/lib/auth/trial-limits.ts`, `frontend/src/lib/auth/trial-guard.ts` | Enforces per-plan session limits and read-only behaviour. |
| Tests | `frontend/src/__tests__/auth/*.test.ts`, `frontend/src/__tests__/trial-guard.test.ts` | Specification-driven tests covering OAuth + trial modes. |

## OAuth Providers

| Provider | Status | Notes |
| --- | --- | --- |
| GitHub | ✅ Live | Redirect URL: `${NEXT_PUBLIC_APP_URL}/auth/callback`. Scopes: `read:user`, `user:email`. |
| Google | 🟡 Staged | Client configured in Supabase; waiting on consent copy + QA. |
| Microsoft (Azure) | 🟡 Staged | Requires tenant approval + documentation updates. |

Environment variables (Netlify / `.env.local`):

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (never exposed client-side)
- `NEXT_PUBLIC_APP_URL` (used for redirectTo)
- Provider secrets (`GITHUB_CLIENT_ID`, etc.) configured via Supabase dashboard.

## Session Management

- PKCE enforced (`flowType: 'pkce'`, `detectSessionInUrl: false`).
- Cookies set in callback; marketing site never touches tokens.
- Session refresh handled by middleware and Supabase helpers.
- Trial expiry tracked via `trial_usage_counters` (updated after onboarding sessions complete).

## Error Handling & Logging

- `signInWithOAuth` returns structured errors; UI surfaces friendly messages.
- Callback route logs failures and triggers PostHog events (`signup_failed`).
- Supabase log drain (Grafana) monitors auth errors; tie-ins documented in ops runbooks.

## Security Notes

- RLS on `user_profiles` ensures only owners/service role can read sensitive metadata.
- Rate limiting via Supabase + Netlify (further limits planned for brute-force protection).
- Ensure marketing CTAs only pass allowed plan IDs (`trial`, `sprint`, `founder`, `enterprise`). See [`docs/product-handshake/marketing-to-app-contracts.md`](../product-handshake/marketing-to-app-contracts.md).

## TODO / Roadmap

- Enable secondary OAuth providers once QA/legal complete.
- Automate cross-site signup smoke tests (`marketing#162` counterpart tracked as `app#286`).
- Document service-role usage for CrewAI jobs when they start issuing Supabase writes.

Refer to marketing-facing summary in `startupai.site/docs/specs/auth.md` for high-level messaging alignment.
