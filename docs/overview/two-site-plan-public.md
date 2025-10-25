---
purpose: "High-level overview of the two-site architecture and shared goals"
status: "active"
last_reviewed: "2025-10-27"
---

# Two-Site Plan (Public Overview)

StartupAI operates as a coordinated pair of Next.js applications:

- **`startupai.site` (marketing)** – Owns positioning, lead capture, and the cross-site handshake. Source: this repo (`src/app/**/*`).
- **`app.startupai.site` (product)** – Hosts authentication, guided onboarding, evidence ledger, and CrewAI workflows. Source: `app.startupai.site/frontend/src/app/**/*`.

Both properties share Supabase authentication, PostHog analytics, and design primitives (Shadcn UI with synchronized tokens).

## Architecture at a Glance

```
Visitor → startupai.site (Next.js App Router)
          ├─ Pricing CTA (plan query param, /pricing)
          ├─ Demo / Product storytelling (static + MDX content)
          └─ Waitlist/Lead capture (Netlify form → Supabase via webhook)
                    │
                    ▼
          Redirect: /signup?plan={id}
                    │ (Supabase PKCE auth handled in marketing `src/app/login/page.tsx`)
                    ▼
Authenticated → app.startupai.site
          ├─ /auth/callback (Supabase session exchange)
          ├─ /onboarding (guided wizard + entrepreneur brief)
          └─ CrewAI queue + evidence ledger (post-onboarding experience)
```

### Shared Services

| Concern | Marketing Implementation | Product Implementation |
| --- | --- | --- |
| Authentication | `src/lib/supabase/client.ts` (browser client with PKCE) | `frontend/src/lib/supabase/server.ts` (server client for SSR/actions) |
| Plan metadata | Hard-coded tiers in `src/app/pricing/page.tsx` (`trial`, `strategy-sprint`, `founder-platform`, `agency-co-pilot`) | Canonical identifiers (`trial`, `sprint`, `founder`, `enterprise`) validated in `frontend/src/app/api/onboarding/start/route.ts` and applied during callback (`frontend/src/app/auth/callback/route.ts`). |
| Analytics | PostHog client in `instrumentation-client.ts` with marketing event contracts | PostHog server/client helpers driving onboarding + retention dashboards |
| Design system | Tokens + components under `src/components/ui` | Mirrored Shadcn setup in `frontend/components/ui` (kept in sync via generators) |

## Journey Walkthrough (What’s Live Today)

1. **Start at marketing** – Pricing cards append `plan` to CTA links; see `src/app/pricing/page.tsx`.
2. **Auth redirect** – `/login` route triggers Supabase OAuth (GitHub) or email flow. Environment keys validated by `docs/dev/local-dev.md`.
3. **Callback** – `app.startupai.site/frontend/src/app/auth/callback/route.ts` exchanges the PKCE code, sets cookies, and forwards to onboarding.
4. **Onboarding** – Multi-stage chat-like wizard at `frontend/src/app/onboarding/page.tsx` collects strategy inputs, stores them in Supabase (`onboarding_sessions` table), and emits PostHog events.
5. **Outputs** – Current production experience delivers generated canvases, Fit Report, and evidence ledger previews. CrewAI runs are mocked while final orchestration ships (see `frontend/src/app/projects/[id]/gate` for hard gating).

## Current Status (25 Oct 2025 Snapshot)

| Area | Status | Evidence |
| --- | --- | --- |
| Authentication bridge | ✅ | Integration tests under `frontend/src/tests/auth/*.test.ts` pass; manual walkthrough documented in `docs/specs/auth.md`. |
| Onboarding wizard | ✅ | API routes in `docs/specs/api-onboarding.md`; PostHog funnel `Marketing → Onboarding` shows full completion path. |
| CrewAI workflow | 🟡 | Backend spec implemented to 70%; awaiting agent orchestration completion (see `docs/specs/crewai-integration.md`). |
| Evidence dashboard | 🟡 | UI complete, awaiting live agent data; tracked in `docs/work/in-progress.md`. |
| Marketing analytics | ✅ | `docs/dev/analytics-seo.md` + PostHog dashboards configured; incident runbook in `docs/ops/monitoring.md`. |
| CMS migration | 🟡 | Content still sourced from in-repo MDX; evaluation issue `marketing#142` in backlog. |

## Coordination Rituals

| Topic | Notes | Cadence |
| --- | --- | --- |
| Plan identifiers & pricing | Canonical list maintained in `docs/product-handshake/marketing-to-app-contracts.md`. Both teams review before changes. | Monthly |
| Onboarding copy | Marketing drafts in `src/app/ai-strategy/page.tsx`; product mirrors prompts in `frontend/src/app/onboarding/prompts.ts`. | Bi-weekly |
| Analytics QA | Shared PostHog dashboards; regression checks run post-deploy (`docs/ops/monitoring.md`). | Weekly |
| Incident management | Netlify rollback + status messaging flow documented in `docs/ops/incident-playbook.md`. | As needed |

## Near-Term Roadmap

1. **CrewAI back-propagation** – Feed agent summaries into Fit Dashboard and marketing demo (`docs/work/phases.md#phase-3`).
2. **Dynamic testimonials** – Pull sanitized quotes from Supabase `marketing_testimonials` view to power `/case-studies`.
3. **Self-serve trials** – Expand trial tier to allow limited project creation from marketing CTA without human approval.

Each item carries cross-repo checklist entries in `docs/work/roadmap.md` (marketing) and `app.startupai.site/docs/work/roadmap.md` (product).

## Related Reading

- Product-facing detail: [`app.startupai.site/docs/overview/platform-overview.md`](https://github.com/chris00walker/app.startupai.site/blob/main/docs/overview/platform-overview.md)
- Authentication spec: [`docs/dev/local-dev.md`](../dev/local-dev.md) · [`docs/specs/auth.md`](../specs/auth.md)
- Contracts: [`docs/product-handshake/marketing-to-app-contracts.md`](../product-handshake/marketing-to-app-contracts.md) · [`docs/product-handshake/public-status-links.md`](../product-handshake/public-status-links.md)
