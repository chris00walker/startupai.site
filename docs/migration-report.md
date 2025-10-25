---
purpose: "Record the documentation migration and subsequent restorations"
status: "active"
last_reviewed: "2025-10-27"
---

# Documentation Migration & Restoration

## 2025-10-27 — Restoration Pass

- Restored depth across marketing docs while preserving new structure and frontmatter.
- Reconciled content with live code (Next.js pages, Supabase usage, PostHog events).
- Added backlog references and alignment with product documentation for cross-site contracts.
- Outstanding work: implement Supabase marketing tables, automate Lighthouse, wire PostHog waitlist events.

### Key Updates

| Area | Files | Notes |
| --- | --- | --- |
| Value prop & messaging | `overview/value-proposition.md`, `overview/messaging-matrix.md` | Reintroduced research-backed positioning tied to current product features. |
| Two-site architecture | `overview/two-site-plan-public.md` | Curated summary linking to actual auth/onboarding code paths. |
| Dev runbooks | `dev/a11y-i18n.md`, `dev/analytics-seo.md`, `dev/local-dev.md`, `dev/performance.md`, `dev/security.md`, `dev/stack.md` | Modernized with implementation detail, gaps, and backlog references. |
| Ops playbooks | `ops/deploy.md`, `ops/forms-and-leads.md`, `ops/incident-playbook.md`, `ops/monitoring.md`, `ops/runbook-posthog.md` | Documented real workflows, clarified pending automation. |
| Work tracking | `docs/work/*` | Defined phases, roadmap, backlog, and in-progress items aligned with product counterparts. |
| Contracts & schema | `product-handshake/marketing-to-app-contracts.md`, `schema/marketing-db.md` | Clarified plan mapping and future Supabase work. |

## 2025-10-25 — Initial Migration

### Summary

- Replaced ad-hoc marketing docs with the new public-friendly structure.
- Condensed business research and technical notes into sanitized summaries.
- Removed private prompts/runbooks from this repo; pointed to the application repository where appropriate.

## Mapping (Old → New)

| Old Path | Action | New Path / Reference |
| --- | --- | --- |
| `technical/two-site-implementation-plan.md` | Rewritten | `overview/two-site-plan-public.md` |
| `business/{1-6}.md` | Summarized | `overview/value-proposition.md` (details now in product repo) |
| `business/7-overview.md` | Summarized | `overview/messaging-matrix.md` |
| `operations/*` | Restructured | `ops/{deploy,forms-and-leads,monitoring,incident-playbook}.md` |
| `technical/{next.js,netlify}.md` | Merged | `dev/stack.md` |
| `technical/PostHog.md`, `technical/posthog-installation.md` | Merged | `dev/analytics-seo.md` |
| `design/accessibility-standards.md` | Rewritten | `dev/a11y-i18n.md` |
| `ENVIRONMENT_SWITCHING.md` | Replaced | `dev/local-dev.md` |

## Deprecated Files

| File | Replacement or Pointer |
| --- | --- |
| `AGENT_HANDOFF_2025-10-06.md` | Historical artifact; reference Git history or application repo prompts. |
| `NEXT_AGENT_PROMPT.md` | Same as above. |
| `technical/AI_*` prompt docs | Superseded by CrewAI docs in application repo. |
| `design/user-experience.md`, `design/design-system.md`, `design/shadcn-tasks.md` | Covered by `dev/a11y-i18n.md` and product repo design system documentation. |

See [`archive/legacy-public-docs.md`](archive/legacy-public-docs.md) for a human-friendly index.

## Links Updated

- Internal markdown links updated: **18** (README index, cross-doc references inside overview/dev/ops/product-handshake/work sections).

## Follow-ups

1. Create first `docs/work/features/` entry after upcoming campaign ships.
2. Implement Supabase marketing schema + CRM automation (`marketing#155`–`#161`).
3. Automate Lighthouse/link checks (`marketing#150`, `#157`) and restore sitemap/robots (`marketing#149`).
