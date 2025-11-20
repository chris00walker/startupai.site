---
purpose: "Private technical source of truth for the AI Founders Architecture platform"
status: "active"
last_reviewed: "2025-11-20"
---

# AI Founders Platform Overview

This private overview details how the AI Founders Architecture operates across three core services: the AI Founders Team (CrewAI), marketing transparency interface, and product delivery portal.

### Source of Truth

- Master reference: `docs/overview/ai-founders-architecture.md`. Update that plan first when service interactions, AI agent roles, or ownership change, then mirror the distilled takeaways across this overview and status docs.
- Historical documents now live under `docs/archive/legacy/`. Keep them for provenance while ensuring all current statements align with the AI Founders Architecture.
- Sprint ritual: review the architecture at the start of each cycle, confirm service integration points, AI agent readiness, and transparency features, then propagate any deltas here and in implementation status.

## Service Domains & Ownership

| Domain | Owner | Notes |
| --- | --- | --- |
| AI Founders Core (`startupai-crew`) | AI Platform | CrewAI Python agents (Sage, Forge, Pulse, Compass, Guardian). Central intelligence orchestrating both marketing transparency and product delivery. |
| Marketing Interface (`startupai.site`) | Growth Engineering | Next.js static site providing public transparency into AI team activity. Includes lead capture and trust-building through AI visibility. |
| Product Interface (`app.startupai.site`) | Platform Engineering | Next.js App Router for customer portal. Delivers AI-driven validation results and strategic insights from CrewAI analysis. |
| Database and Storage | Platform Engineering | Supabase Postgres + pgvector shared across services. Migrations in `supabase/migrations`. RLS policies enforce service boundaries. |
| Auth and Identity | Platform Engineering | Supabase Auth (GitHub OAuth, email) with profile trigger (`handle_new_user`) coordinating across marketing and product interfaces. |
| Analytics | Shared (Growth + Platform + AI) | PostHog instrumentation across all three services. AI agent activity metrics, marketing funnels, and product engagement tracked separately. |
| Ops and Incident Response | Platform (primary), Ops (secondary), AI (CrewAI) | Coverage for all three services. Runbooks for CrewAI orchestration, Netlify deployments, and Supabase operations. |

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
- During sprint kick-off, confirm the service integration points and AI agent readiness in `docs/overview/ai-founders-architecture.md` before adjusting this overview or the implementation status report.

For deeper technical detail see [`overview/architecture.md`](architecture.md) and the specs under `docs/specs/`.
