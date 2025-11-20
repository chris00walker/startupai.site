---
purpose: "Private technical source of truth for the application platform overview"
status: "active"
last_reviewed: "2025-10-26"
---

# Platform Overview

This private overview complements the public marketing plan and details how the product platform operates.

### Source of Truth

- Master reference: `docs/overview/two-site-implementation-plan.md`. Update that plan first when flows, blockers, or ownership change, then mirror the distilled takeaways across this overview and status docs.
- Many historical documents cited in the plan now live under `docs/archive/legacy/`. Keep them for provenance while ensuring all current statements stay aligned with the live plan.
- Sprint ritual: review the plan at the start of each cycle, confirm navigation coverage, blockers, and readiness, then propagate any deltas here and in `docs/status/implementation-status.md`.

## Domains & Ownership

| Domain | Owner | Notes |
| --- | --- | --- |
| Marketing site (`startupai.site`) | Growth Engineering | Next.js static site deployed separately. CTAs include plan hints consumed by `/signup`. |
| Auth and Identity | Platform Engineering | Supabase Auth (GitHub OAuth, email) with profile trigger (`handle_new_user`) keeping `user_profiles` in sync. |
| Application site (`app.startupai.site`) | Platform Engineering | Next.js App Router. Onboarding wizard, dashboards, and automation live here. |
| Database and Storage | Platform Engineering | Supabase Postgres + pgvector. Migrations in `supabase/migrations`. Storage buckets currently paused. |
| AI Workflows | AI Platform | Python CrewAI backend under `backend/src/startupai` plus Netlify wrappers. Not live yet. |
| Analytics | Shared (Growth + Platform) | PostHog instrumentation via `frontend/src/lib/analytics`. Product and marketing share dashboards with segmented properties. |
| Ops and Incident Response | Platform (primary), Ops (secondary) | Pager coverage when Netlify or Supabase incidents occur. Runbooks tracked in private ops docs. |

## Navigation Snapshot

- **Marketing site coverage:** Landing, product, services, pricing, process, AI strategy, blog index, case studies index, contact, CTA flows, and utility pages (`/demo/dashboard`, `/preview`, `/design-system-test`) are live. Individual blog and case-study detail pages remain outstanding (plan section 1.1).
- **Product platform coverage:** Role routing (`/founder-dashboard`, `/dashboard`, `/login`) works. Project creation, canvas tools, and the onboarding wizard ship. Missing detail routes for project, hypothesis, evidence, experiment, and report entities, plus CrewAI-backed dashboards, are tracked in the plan under "Priority Gaps."
- **Cross-site handoff:** `/signup` on marketing pushes into Supabase OAuth and returns to App Router routes. Keep that flow aligned with the authentication diagram in the plan.

## User Journey

1. **Marketing engagement** - Visitor lands on marketing site, selects plan, and is redirected to `/signup?plan=trial|sprint|founder|enterprise`.
2. **Authentication** - Supabase OAuth flow completes (GitHub primary, email fallback). Post-auth redirect lands on `app.startupai.site` (App Router entry point).
3. **Session hydration** - `frontend/src/app/(authenticated)/layout.tsx` fetches the Supabase session; lacking auth triggers a redirect to `/login` with the original return URL.
4. **Onboarding wizard** - `/onboarding` loads `OnboardingWizard`. The page fetches `user_profiles.subscription_tier` to determine plan limits and then calls `POST /api/onboarding/start` to seed a session.
5. **Conversation loop** - Messages flow through `POST /api/onboarding/message`, storing state in `onboarding_sessions`. Progress and follow-ups render via `ConversationInterface`.
6. **Completion and project creation** - `POST /api/onboarding/complete` persists `entrepreneur_briefs`, creates a `projects` row, and redirects to `/projects/{id}`. CrewAI deliverables are still mock data pending backend integration.
7. **Dashboards and follow-up** - Projects feed future dashboards (currently under construction). Analytics hooks capture completion, drop-off, and feedback to PostHog for funnel tracking.

## Contracts with Marketing

- Shared copy lives in the marketing repo, referenced here via `docs/public-interfaces`. Product must maintain parity with marketing promises tracked in specification-driven tests (see `frontend/src/components/onboarding/__tests__/OnboardingWizard.specification.test.tsx`).
- CTAs guarantee "AI-guided strategic brief and validation plan." Until CrewAI is live we continue shipping the deterministic fallback but call out TODO items in release notes.
- Accessibility and performance budgets mirror marketing targets (LCP < 2.2s, INP < 200 ms). `frontend/src/lib/analytics` records Core Web Vitals to PostHog for monitoring.

## Ownership Checklist

- Supabase migrations require platform sign-off. Notify AI platform when schema changes touch CrewAI tables so Python clients stay in sync.
- Marketing changes to plan tiers must be reflected in `frontend/src/app/api/onboarding/start/route.ts` (`PLAN_LIMITS`) and in the trial usage counters table.
- Feature flags for CrewAI rollout will live in Supabase config or LaunchDarkly (decision pending). Update this doc when the rollout plan is finalised.
- During sprint kick-off, confirm the navigation and blocker sections in `docs/overview/two-site-implementation-plan.md` before adjusting this overview or the implementation status report.

For deeper technical detail see [`overview/architecture.md`](architecture.md) and the specs under `docs/specs/`.
