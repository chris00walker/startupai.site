---
purpose: "High-level overview of the two-site architecture and shared goals"
status: "active"
last_reviewed: "2025-10-30"
---

# Two-Site Plan (Public Overview)

StartupAI operates as a coordinated pair of Next.js applications:

- **`startupai.site` (marketing)** – Owns positioning, lead capture, and the cross-site handshake. Source: this repo (`src/app/**/*`).
- **`app.startupai.site` (product)** – Hosts authentication, guided onboarding, evidence ledger, and AI-powered workflows. Source: `app.startupai.site/frontend/src/app/**/*`.

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
                    │ (`/login` redirects to product domain for Supabase PKCE)
                    ▼
Authenticated → app.startupai.site
          ├─ /auth/callback (Supabase session exchange)
          ├─ /onboarding (AI-powered 7-stage conversation via Vercel AI SDK)
          └─ Dashboard + evidence ledger (post-onboarding experience)
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
2. **Auth redirect** – `/login` route forwards visitors to the product domain so Supabase OAuth (GitHub/email) completes against the authoritative app instance. Environment keys validated by `docs/dev/local-dev.md`.
3. **Callback** – `app.startupai.site/frontend/src/app/auth/callback/route.ts` exchanges the PKCE code, sets cookies, and forwards to onboarding.
4. **Onboarding** – AI-powered 7-stage conversation at `frontend/src/app/onboarding/page.tsx` using Vercel AI SDK with OpenAI GPT-4.1-nano. Collects strategy inputs via streaming chat, stores them in Supabase (`onboarding_sessions`, `entrepreneur_briefs` tables), and emits PostHog events. Stage progression handled via AI tools (assessQuality, advanceStage, completeOnboarding).
5. **Outputs** – Current production experience delivers generated canvases, Fit Report, and evidence ledger previews.

## Current Status (30 Oct 2025 Snapshot)

| Area | Status | Evidence |
| --- | --- | --- |
| Authentication bridge | ✅ | Integration tests under `frontend/src/tests/auth/*.test.ts` pass; manual walkthrough documented in `docs/specs/auth.md`. |
| Onboarding wizard | ✅ | **Vercel AI SDK implementation complete** - 7-stage conversation with streaming chat, quality assessment, and AI-driven stage progression. See `frontend/src/app/api/chat/route.ts`. PostHog funnel `Marketing → Onboarding` shows full completion path. |
| AI Onboarding Backend | ✅ | **Migrated to Vercel AI SDK with OpenAI GPT-4.1-nano** (primary) + Anthropic Claude (fallback). Stage progression via AI tools. 12 database migrations deployed including `onboarding_sessions` and `entrepreneur_briefs` tables. |
| CrewAI Integration | 🟡 | **Deprecated for onboarding** (migrated to Vercel AI SDK). CrewAI crew available at CrewAI AMP for future batch analysis workflows if needed. See deprecation notice in `docs/specs/crewai-integration.md`. |
| Evidence dashboard | 🟡 | UI complete, awaiting post-onboarding workflow integration; tracked in `docs/work/in-progress.md`. |
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

1. **Post-onboarding integration** – Complete project creation wizard integration with entrepreneur briefs from AI onboarding.
2. **E2E test expansion** – Expand test coverage for AI onboarding flow and stage progression.
3. **Dynamic testimonials** – Pull sanitized quotes from Supabase `marketing_testimonials` view to power `/case-studies`.
4. **Self-serve trials** – Expand trial tier to allow limited project creation from marketing CTA without human approval.
5. **CrewAI batch workflows (Optional)** – Consider CrewAI integration for batch analysis workflows if needed in future.

Each item carries cross-repo checklist entries in `docs/work/roadmap.md` (marketing) and `app.startupai.site/docs/work/roadmap.md` (product).

## Related Reading

- Product-facing detail: [`app.startupai.site/docs/overview/platform-overview.md`](https://github.com/chris00walker/app.startupai.site/blob/main/docs/overview/platform-overview.md)
- Authentication spec: [`docs/dev/local-dev.md`](../dev/local-dev.md) · [`docs/specs/auth.md`](../specs/auth.md)
- Contracts: [`docs/product-handshake/marketing-to-app-contracts.md`](../product-handshake/marketing-to-app-contracts.md) · [`docs/product-handshake/public-status-links.md`](../product-handshake/public-status-links.md)
