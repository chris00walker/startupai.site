---
purpose: "Cross-repository dependency tracking for coordinated delivery"
status: "active"
last_reviewed: "2025-11-26"
---

# Cross-Repository Blockers

This document tracks dependencies between StartupAI repositories to ensure coordinated delivery.

## Marketing Promise Gap (Critical)

The marketing site makes promises that the technical platform cannot currently deliver. This represents **capabilities to build**, not promises to reduce.

| Promise | Page | Technical Gap |
|---------|------|---------------|
| "Build your MVP" | /product, /pricing | No code generation capability |
| "Real ad spend ($450-525)" | /pricing | No Meta/Google Ads API integrated |
| "Real user testing" | /product | No analytics/experiment framework |
| "Unit economics (CAC/LTV)" | /pricing | Finance Crew outputs are synthetic |
| "2-week validation cycles" | /pricing | Flow runs fast but outputs fiction |
| "Evidence-based validation" | /product | All evidence is LLM-generated |
| "6 AI Founders team" | /product | Agents exist but are LLM stubs |

### Capabilities Required to Deliver on Promises

1. **MVP Generation**: Code scaffolding, template deployment, GitHub integration
2. **Ad Platform Integration**: Meta Business API, Google Ads API for real campaigns
3. **Analytics Integration**: Real user tracking, conversion measurement
4. **Financial Modeling**: Connect to real cost/revenue data, not LLM generation
5. **Web Research Tools**: Competitor research APIs, market data sources
6. **Results Persistence**: Store outputs to Supabase for frontend display

### Honest Timeline Impact

Even when CrewAI Phase 1 "completes", the outputs will be LLM-generated synthetic data. Marketing claims of "real validation" require building the capabilities listed above.

---

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

## Flywheel Learning (Competitive Moat)

The CrewAI backend includes a Flywheel Learning System that makes all 6 AI Founders smarter over time. This is a key differentiator for marketing messaging.

**Marketing Angles:**
- "AI that learns from every validation"
- "Shared intelligence across all clients (anonymized)"
- "Fortune 500-quality insights that improve with usage"

**Technical Spec**: See `startupai-crew/docs/master-architecture/reference/flywheel-learning.md`

**Privacy Safeguards**: All learnings are anonymized before storage - no client data is ever exposed.

## Coordination Notes

- Marketing Phase 4 is **ready to start** but waiting on upstream dependencies
- Activity Feed and Metrics APIs are documented as hypotheses in CrewAI backlog
- Manual validation cycles can proceed independently

## Cross-Repo Links

- CrewAI blockers: `startupai-crew/docs/work/cross-repo-blockers.md`
- Product app blockers: `app.startupai.site/docs/work/cross-repo-blockers.md`
- Master architecture: `startupai-crew/docs/master-architecture/ecosystem.md`
