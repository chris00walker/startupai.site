---
purpose: "Document marketing → application contracts for public consumption"
status: "active"
last_reviewed: "2025-10-27"
---

# Marketing ↔ Application Contracts

The two sites share authentication, analytics, and plan metadata. This document captures the agreed contracts so neither side breaks the cross-site flow.

## Plan & CTA Mapping

| Marketing Plan (query param) | Product Plan Type | Notes |
| --- | --- | --- |
| `trial` | `trial` | Free tier. No billing. |
| `strategy-sprint` | `sprint` | Maps to one-time engagement. |
| `founder-platform` | `founder` | Subscription plan. |
| `agency-co-pilot` | `enterprise` | Multi-seat plan with pooled usage. |

- Marketing constructs CTAs: `${NEXT_PUBLIC_APP_URL}/signup?plan=<id>` (see `src/app/pricing/page.tsx`).
- Product stores selection in Supabase via `frontend/src/app/auth/callback/route.ts`.
- If plan IDs change, update both repos in the same release and document in `docs/work/in-progress.md`.

## Authentication Redirect

1. Marketing CTA or login form redirects to `app.startupai.site`.
2. Product handles Supabase PKCE exchange and sets cookies.
3. Product returns users to onboarding or dashboard based on role (`frontend/src/lib/auth/roles.ts`).

Marketing must not attempt to set Supabase cookies; all auth logic lives in the product repo.

## Analytics

- Shared event taxonomy (see `docs/dev/analytics-seo.md` and `app.startupai.site/docs/dev/analytics.md`).
- Marketing fires `signup_started` before redirect. Product confirms `signup_completed`.
- Any new acquisition event requires updates in both helper files.

## Status & Trust Signals

- Public status: `https://status.startupai.site` (owned by SRE). Marketing references this URL; product keeps content current.
- Privacy / security copy: maintained in marketing repo (`/privacy`). Product notifies marketing if data handling changes.
- Roadmap: expose a read-only status JSON feed (`docs/public-interfaces/status-export.json`) once product publishes it. Until then marketing uses manual banners.

## Data Sharing

- Waitlist leads are exported from Supabase and shared with product weekly.
- No direct database writes from marketing except waitlist emails. Product handles conversions, subscriptions, and billing data.

## Change Management Checklist

1. Discuss proposed change in shared planning channel.
2. Update both documentation sets (`marketing` + `app` repos).
3. Add validation steps to `docs/ops/deploy.md` (marketing) and equivalent product runbook.
4. Smoke test cross-site flow in preview environments before releasing.
