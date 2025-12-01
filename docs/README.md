---
purpose: "Public-friendly index for StartupAI marketing documentation"
status: "active"
last_reviewed: "2025-12-01"
---

# StartupAI Marketing Documentation

Use this index to navigate documentation for the StartupAI marketing site. Each section cross-links to the application repo where deeper technical detail lives.

## Document Currency

> **Source of Truth**: The codebase is the single source of truth. Documentation should reflect what is implemented.

### Recently Updated (November 2025)
These documents reflect the current beta launch implementation:
- **[`work/implementation-plan.md`](work/implementation-plan.md)** – Master plan for beta launch (Phases 1-4)
- **[`overview/messaging/positioning-analysis.md`](overview/messaging/positioning-analysis.md)** – Strategic positioning decisions
- **[`work/done.md`](work/done.md)** – Completed Phase 1-3 work
- **[`work/in-progress.md`](work/in-progress.md)** – Phase 4 tasks
- **[`work/backlog.md`](work/backlog.md)** – Prioritized remaining work
- **[`overview/ai-founders-personas.md`](overview/ai-founders-personas.md)** – AI Founders Team (Guardian, Sage, Forge, Pulse, Compass)

### Deprecated
- **[`archive/phases.md`](archive/phases.md)** – Old phase system from October 2025. See `implementation-plan.md` instead.

### Needs Review
These documents have older dates but may still be accurate - verify before relying on specifics:
- `overview/messaging/messaging-matrix.md` – Verify current positioning terminology
- `specs/auth.md`, `specs/api-onboarding.md` – Technical specs (verify implementation matches)

## Quick Start

- **What we promise** – [`overview/messaging/value-proposition.md`](overview/messaging/value-proposition.md)
- **Beta launch plan** – [`work/implementation-plan.md`](work/implementation-plan.md)
- **How the services connect** – [`startupai-crew/docs/master-architecture`](https://github.com/chris00walker/startupai-crew/tree/main/docs/master-architecture) (canonical)
- **Current roadmap snapshot** – [`overview/roadmap-public.md`](overview/roadmap-public.md) and internal view at [`work/roadmap.md`](work/roadmap.md)
- **Operations runbooks** – [`ops/`](ops/)
- **Developer guides** – [`dev/`](dev/)
- **Service contracts** – [`specs/service-contracts.md`](specs/service-contracts.md)
- **Work tracking** – [`work/`](work/)
- **Cross-repo blockers** – [`work/cross-repo-blockers.md`](work/cross-repo-blockers.md)

## Directory Guide

| Folder | Summary |
| --- | --- |
| [`overview/`](overview/) | AI Founders personas, platform overview, public roadmap. Subdirs: `personas/`, `jtbd/`, `messaging/`. |
| [`dev/`](dev/) | Local dev, accessibility, analytics, performance, security, data sources, and SLOs. |
| [`ops/`](ops/) | Deploy, monitoring, incident response, lead handling, and PostHog runbooks. |
| [`incidents/`](incidents/) | Historical incident reports with timelines, root cause, and follow-up actions. |
| [`work/`](work/) | Backlog, in-progress items, delivered work, cross-repo blockers, and roadmap themes. |
| [`adrs/`](adrs/) | Architecture Decision Records. |
| [`schema/`](schema/) | Supabase plans for marketing-owned data (current + roadmap). |
| [`specs/`](specs/) | Feature specs, API contracts, data schema, service contracts, and AI agent interactions. |
| [`archive/`](archive/) | Legacy references preserved for historical context. |

## Related Resources

- Application implementation docs: [`app.startupai.site/docs`](https://github.com/chris00walker/app.startupai.site/tree/main/docs)
- Completion reports & release history: `app.startupai.site/docs/archive/completion-reports/`
- Issue tracking (public view): [GitHub Issues](https://github.com/chris00walker/startupai.site/issues)

For questions about sensitive operations (credentials, CRM automation, financial data), consult the internal operations handbook or contact the product ops team.
