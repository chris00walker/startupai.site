---
purpose: "Public-friendly index for StartupAI marketing documentation"
status: "active"
last_reviewed: "2025-11-20"
---

# StartupAI Marketing Documentation

Use this index to navigate documentation for the StartupAI marketing site. Each section cross-links to the application repo where deeper technical detail lives.

## Document Currency

> **Source of Truth**: The codebase is the single source of truth. Documentation should reflect what is implemented.

### Recently Updated (November 2025)
These documents reflect the current beta launch implementation:
- **[`work/implementation-plan.md`](work/implementation-plan.md)** – Master plan for beta launch (Phases 1-4)
- **[`overview/positioning-analysis.md`](overview/positioning-analysis.md)** – Strategic positioning decisions
- **[`work/done.md`](work/done.md)** – Completed Phase 1-3 work
- **[`work/in-progress.md`](work/in-progress.md)** – Phase 4 tasks
- **[`work/backlog.md`](work/backlog.md)** – Prioritized remaining work
- **[`overview/ai-founders-personas.md`](overview/ai-founders-personas.md)** – AI Founders Team (Guardian, Sage, Forge, Pulse, Compass)

### Deprecated
- **[`work/phases.md`](work/phases.md)** – Old phase system from October 2025. See `implementation-plan.md` instead.

### May Need Updates
Documents from October 2025 that may reference outdated information:
- `overview/messaging-matrix.md` – May reference old "strategy co-pilot" positioning
- `specs/auth.md`, `specs/api-onboarding.md` – Technical specs may be accurate but dates are old

## Quick Start

- **What we promise** – [`overview/value-proposition.md`](overview/value-proposition.md)
- **Beta launch plan** – [`work/implementation-plan.md`](work/implementation-plan.md)
- **How the services connect** – [`overview/ai-founders-architecture.md`](overview/ai-founders-architecture.md)
- **Current roadmap snapshot** – [`overview/roadmap-public.md`](overview/roadmap-public.md) and internal view at [`work/roadmap.md`](work/roadmap.md)
- **Operations runbooks** – [`ops/`](ops/)
- **Developer guides** – [`dev/`](dev/)
- **Service contracts** – [`service-contracts/`](service-contracts/)
- **Work tracking** – [`work/`](work/)

## Directory Guide

| Folder | Summary |
| --- | --- |
| [`overview/`](overview/) | Value proposition, messaging matrix, AI Founders personas, architecture, and public roadmap. |
| [`specs/`](specs/) | Feature specs, API contracts, data schema, and integrations. |
| [`dev/`](dev/) | Local dev, accessibility, analytics, performance, and security guides. |
| [`ops/`](ops/) | Deploy, monitoring, incident response, lead handling, and PostHog runbooks. |
| [`incidents/`](incidents/) | Historical incident reports with timelines, root cause, and follow-up actions. |
| [`work/`](work/) | Backlog, in-progress items, delivered work, phases, and roadmap themes. |
| [`adrs/`](adrs/) | Architecture Decision Records. |
| [`service-contracts/`](service-contracts/) | API contracts between AI Founders core, marketing site, and product app. |
| [`schema/`](schema/) | Supabase plans for marketing-owned data (current + roadmap). |
| [`archive/`](archive/) | Legacy references preserved for historical context. |

## Related Resources

- Application implementation docs: [`app.startupai.site/docs`](https://github.com/chris00walker/app.startupai.site/tree/main/docs)
- Completion reports & release history: `app.startupai.site/docs/archive/completion-reports/`
- Issue tracking (public view): [GitHub Issues](https://github.com/chris00walker/startupai.site/issues)

For questions about sensitive operations (credentials, CRM automation, financial data), consult the internal operations handbook or contact the product ops team.
