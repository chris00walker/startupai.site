---
purpose: "Cross-repository dependency tracking for coordinated delivery"
status: "active"
last_reviewed: "2025-11-21"
---

# Cross-Repository Blockers

This document tracks dependencies between StartupAI repositories to ensure coordinated delivery.

## This Repo Blocked By

### CrewAI Backend (`startupai-crew`)

| Blocker | Status | Description | Impact |
|---------|--------|-------------|--------|
| Activity Feed API | Not Started | `GET /api/v1/public/activity` endpoint | Cannot show real-time agent activity on AI Founders page |
| Metrics API | Not Started | `GET /api/v1/public/metrics` endpoint | Cannot display trust metrics (analyses completed, etc.) |

### Product App (`app.startupai.site`)

| Blocker | Status | Description | Impact |
|---------|--------|-------------|--------|
| Results Display UI | Not Started | Dashboard showing analysis results | Phase 4 validation cycles require users to see results |

## This Repo Blocks

| Blocked Repo | Item | Status | Description |
|--------------|------|--------|-------------|
| None currently | — | — | Marketing site is downstream |

## Phase 4 Dependencies

Phase 4 (Launch & Iteration) requires:
1. **Users can complete E2E flow** → Product app results UI → CrewAI Phase 1
2. **Transparency features** → Activity Feed API → CrewAI
3. **Trust metrics** → Metrics API → CrewAI

### Current Workaround
Task 4.2 "First Validation Cycles" planned as manual delivery while E2E flow is incomplete.

## Coordination Notes

- Marketing Phase 4 is **ready to start** but waiting on upstream dependencies
- Activity Feed and Metrics APIs are documented as hypotheses in CrewAI backlog
- Manual validation cycles can proceed independently

## Cross-Repo Links

- CrewAI blockers: `startupai-crew/docs/work/cross-repo-blockers.md`
- Product app blockers: `app.startupai.site/docs/work/cross-repo-blockers.md`
- Master architecture: `startupai-crew/docs/master-architecture/ecosystem.md`
