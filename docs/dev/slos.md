---
purpose: "Private technical source of truth for SLOs and non-functional targets"
status: "active"
last_reviewed: "2025-10-27"
---

# SLOs & Non-Functionals

| Service | SLO | Notes |
| --- | --- | --- |
| Auth redirects | 99.9% success / 30d | Monitor via Supabase + PostHog events |
| Onboarding API | p95 < 2s | Investigate if queue backlog > 5% |
| CrewAI workflow | 95% complete < 5 min | Alert if queue overflow |
| Dashboard SSR | p95 < 400ms | Track via Next.js instrumentation hooks |

- Error budgets tracked monthly; breaches require postmortem.
- Performance targets align with Core Web Vitals (LCP < 2.2s, INP < 200ms, CLS < 0.1).
- Privacy: PII stays within Supabase; CrewAI receives masked inputs unless opt-in flag set.

Operational runbooks: [`ops/runbook-posthog.md`](../ops/runbook-posthog.md), [`ops/deployment.md`](../ops/deployment.md).
