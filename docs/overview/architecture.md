---
purpose: "Private technical source of truth for architecture diagrams"
status: "active"
last_reviewed: "2025-10-27"
---

# Architecture Overview

```
Visitor → startupai.site (Next.js, Netlify)
          ├─ Pricing / CTA → redirect with plan id → app.startupai.site/signup
          ├─ Waitlist form → Formspree / Resend (optional)
          └─ Content / demos (static export)

app.startupai.site (Next.js App Router, Netlify)
          ├─ Supabase Auth (PKCE)
          ├─ Onboarding API → Supabase → CrewAI (stub)
          └─ Dashboard / Fit Report / Evidence ledger

Shared services: Supabase Postgres • PostHog • CrewAI backend
```

## Key Components

| Layer | Responsibility | Repos |
| --- | --- | --- |
| Marketing Next.js | Public storytelling, CTA routing, lead capture. | `startupai.site/src/app/*` |
| Application Next.js | Authenticated experience, onboarding wizard, dashboards. | `app.startupai.site/frontend/src/app/*` |
| Supabase | Auth, data storage, RLS policies, plan limits. | `app.startupai.site/supabase/*` |
| CrewAI backend | Multi-agent analysis pipeline (Python). | `app.startupai.site/backend/*` |
| Observability | PostHog funnels, Supabase logs, Netlify deploy notifications. | Shared |

## Data Flow Highlights

1. **CTA** – Marketing appends `plan` query param and redirects to product signup.
2. **Auth** – Product handles Supabase OAuth, sets session cookies, updates plan metadata.
3. **Onboarding** – API (`/api/onboarding/*`) stores conversation state in Supabase.
4. **CrewAI** – Workflow runs (stubbed) to generate briefs and recommendations.
5. **Surfacing** – Dashboards/reports show outputs; marketing reuses screenshots/demos.

## Cross-Team Touchpoints

- Plan ID mapping: see [`product-handshake/marketing-to-app-contracts.md`](../product-handshake/marketing-to-app-contracts.md).
- Analytics taxonomy: coordinated via [`dev/analytics-seo.md`](../dev/analytics-seo.md) and product analytics spec.
- Accessibility/performance: tracked in [`dev/a11y-i18n.md`](../dev/a11y-i18n.md) + [`dev/performance.md`](../dev/performance.md).

## Open Risks

- CrewAI workflow not fully live → marketing copy must frame AI insights as rolling out.
- Marketing Supabase tables TBD → current waitlist/contact flow relies on external services.
- Status API pending → trust ribbon uses manual updates until product exposes JSON feed.

Refer to the product repo (`app.startupai.site/docs/overview/platform-overview.md`) for deeper technical diagrams and ADRs.
