---
purpose: "Explain how marketing work is organized and tracked"
status: "active"
last_reviewed: "2025-11-20"
---

# Working Model

Marketing work flows through a lightweight Kanban that mirrors the product team. Use this document as the source of truth for process expectations.

## Cadence

- **Monthly sync** – Align with product leads on roadmap themes and cross-site dependencies.
- **Weekly triage** – 30-minute stand-up to review blockers, analytics trends, and upcoming launches.
- **Async updates** – Post end-of-day summaries in `#marketing-ops` when touching high-impact assets (homepage, pricing, onboarding copy).

## Boards & Labels

- **GitHub Issues** – Primary tracker (`status:backlog`, `status:in-progress`, `status:ready`, `status:done`).
- **Labels** – `theme:<name>` for roadmap alignment, `a11y`, `perf`, `ops`, `analytics`, `content`.
- **Cross-repo** – When work requires product changes, reference both issue numbers in commit messages and docs.

## Documentation Expectations

- Active work summarized in [`in-progress.md`](in-progress.md).
- Completed launches captured in [`done.md`](done.md) with links to assets and metrics.
- Future candidates live in [`backlog.md`](backlog.md); roadmap framing in [`phases.md`](phases.md) and [`roadmap.md`](roadmap.md).

## PR Requirements

1. Reference a GitHub issue.
2. Include screenshots or GIFs for visual changes.
3. Update relevant docs (value proposition, contracts, analytics) when behavior shifts.
4. Coordinate with product counterpart if contracts or plan IDs change.

## Features Directory

- Each major campaign or launch gets a folder under `docs/work/features/` describing scope, audience, KPIs, and outcomes. See product repo for historical examples.

## Cross-Repo Coordination

- **Cross-Repo Blockers**: [cross-repo-blockers.md](cross-repo-blockers.md)
- **Product App Work Tracking**: `app.startupai.site/docs/work/`
- **CrewAI Work Tracking**: `startupai-crew/docs/work/`
- **Master Architecture**: `startupai-crew/docs/master-architecture/` (ecosystem source of truth)
