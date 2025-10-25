---
purpose: "Describe the public APIs the marketing site owns or consumes"
status: "active"
last_reviewed: "2025-10-27"
---

# API Contracts

The marketing site exposes a single Netlify-friendly API route and otherwise defers to the application platform for authenticated flows. This document replaces the legacy multi-endpoint contract with an accurate, code-backed summary.

## Marketing-Owned Endpoints

| Route | Method | Handler | Purpose | Notes |
| --- | --- | --- | --- | --- |
| `/api/waitlist` | `POST` | `src/app/api/waitlist/route.ts` | Accepts `{ email }`, validates with Zod, and optionally notifies the team via Resend. | Returns `{ ok: true, delivered: boolean }`. Rate-limiting delegated to Netlify. |

### Request / Response

```http
POST /api/waitlist
Content-Type: application/json

{ "email": "founder@example.com" }
```

- **201** `{ ok: true, delivered: true }` – Email accepted and forwarded to Resend.
- **201** `{ ok: true, delivered: false }` – No API key; address logged to Netlify console for manual follow-up.
- **400** `{ ok: false, error: "Invalid payload" }` – Zod validation failed.
- **500** `{ ok: false, error: "Server error" }` – Resend failure or unexpected exception.

Consumer: `src/components/waitlist-form.tsx`. PostHog instrumentation is planned but not yet wired; see backlog item `marketing#151`.

## Contracts with the Application Platform

Marketing hands users off to `app.startupai.site` instead of proxying sensitive APIs. The contract lives in `docs/product-handshake/marketing-to-app-contracts.md`; key points:

| Concern | Marketing Input | Product Expectation | Source |
| --- | --- | --- | --- |
| **Plan identifiers** | Links append `plan=` (`trial`, `strategy-sprint`, `founder-platform`, `agency-co-pilot`). | Callback maps to canonical plan types (`trial`, `sprint`, `founder`, `enterprise`). | `src/app/pricing/page.tsx`, `app.frontend/src/app/auth/callback/route.ts` |
| **Auth redirect** | `/login` page posts credentials to `NEXT_PUBLIC_APP_URL` Supabase instance. | Product handles OAuth + PKCE exchange. | `src/app/login/page.tsx` |
| **Status ribbon** | Fetches `https://status.startupai.site` and `public-status-links.md` targets. | Product keeps status JSON up-to-date during incidents. | `docs/product-handshake/public-status-links.md` |
| **Testimonials** | Marketing curates sanitized quotes. | Product exposes read-only testimonial API when CMS work completes (in progress). | `docs/work/roadmap.md#q2-2026-content-expansion` |

## External Services

- **Resend** – Optional transactional email. Controlled via `RESEND_API_KEY`; failure falls back to console logs.
- **Netlify Forms** – Additional lead capture (e.g., `/contact`). Submitted payloads trigger Zapier automation defined outside this repo; see `docs/ops/forms-and-leads.md`.

## Change Management

1. Update this document and `docs/product-handshake/marketing-to-app-contracts.md`.
2. Coordinate with the application team; ensure Supabase triggers or metadata updates (plan mapping, throttles) are deployed.
3. Validate PostHog events to confirm the analytics taxonomy still matches.
4. Notify ops so incident runbooks stay in sync.

For deeper technical details (full onboarding APIs, CrewAI hooks), refer to the product repo specs under `app.startupai.site/docs/specs/`.
