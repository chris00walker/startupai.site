---
purpose: "Cross-repository dependency tracking for coordinated delivery"
status: "active"
last_reviewed: "2026-01-09"
last_synced: "2026-01-09 - MCP architecture designed in CrewAI"
---

# Cross-Repository Blockers

This document tracks dependencies between StartupAI repositories to ensure coordinated delivery.

> **MCP ARCHITECTURE READY (2026-01-09)**: CrewAI adopting Model Context Protocol for unified tool interface. 33 tools mapped to 45 agents. 60-hour, 4-week implementation. Marketing site unblocked - all APIs available.

## Ecosystem Status (2026-01-09)

**MCP architecture designed. CrewAI implementing tools over next 4 weeks. Marketing site fully operational.**

| Service | Status | Completion | Notes |
|---------|--------|------------|-------|
| CrewAI Backend | **MCP IMPLEMENTATION** | ~80% | 60h roadmap, starting Phase A |
| Product App | Modal integration complete | ~95% | Pointing to Modal endpoints |
| Marketing Site | Live API integration | ~95% | Activity Feed + Metrics connected |

**Production URLs**:
- Modal: `https://chris00walker--startupai-validation-fastapi-app.modal.run`
- Product App: `https://app-startupai-site.netlify.app`
- Marketing: `https://startupai.site`

**Canonical Architecture**: 5 Flows, 14 Crews, 45 Agents, 10 HITL checkpoints
**AMP (ARCHIVED)**: Legacy 3-repo workaround deprecated

**Source of Truth**: `startupai-crew/docs/master-architecture/09-status.md`

---

## This Repo Blocked By

### Product App (`app.startupai.site`)

| Blocker | Status | Description | Impact |
|---------|--------|-------------|--------|
| Activity Feed API | ✅ SHIPPED | `GET /api/v1/public/activity` | Can show real-time agent activity |
| Metrics API | ✅ SHIPPED | `GET /api/v1/public/metrics` | Can display trust metrics |
| Results Display UI | ✅ DONE | Dashboard + Report Viewer | Full UI ready |

**All Product App blockers resolved.** Marketing site has live components wired to APIs.

### CrewAI Backend (`startupai-crew`)

| Blocker | Status | Description | Impact |
|---------|--------|-------------|--------|
| Modal Infrastructure | ✅ DEPLOYED | Production endpoints live | Validation available |
| API Endpoints | ✅ WORKING | `/kickoff`, `/status`, `/hitl/approve`, `/health` | Full API operational |
| 14 Crews Implementation | ✅ COMPLETE | 45 agents across 14 crews | Structure complete |
| **MCP Tool Implementation** | 🔄 **IN PROGRESS** | 60h roadmap, 4 weeks | Evidence-based outputs |

**Modal infrastructure deployed. Crew structure complete. MCP implementation in progress.**

#### MCP Architecture (Unified Tool Interface)

CrewAI adopting Model Context Protocol for all agent tools:

| Category | Count | Implementation |
|----------|-------|----------------|
| EXISTS | 13 | Ready to wire (direct Python import) |
| MCP Custom | 10 | FastMCP on Modal (forum_search, analyze_reviews, etc.) |
| MCP External | 4 | Community servers (Meta Ads, Google Ads, Calendar, Fetch) |
| LLM-Based | 6 | Pydantic structured output |
| **TOTAL** | 33 | 45 agents mapped |

**Implementation Phases** (in progress in `startupai-crew`):
- Phase A (Week 1): Core MCP Server - 15h
- Phase B (Week 2): Advanced Tools - 14h
- Phase C (Week 3): External MCP + Analytics - 13h
- Phase D (Week 4): CrewAI Integration - 18h

---

## Remaining Work (Not Blockers - Internal)

| Item | Status | Owner | Notes |
|------|--------|-------|-------|
| Activity Feed | ✅ CONNECTED | Marketing | `LiveAgentActivityFeed.tsx` via Netlify function |
| Metrics Dashboard | ✅ CONNECTED | Marketing | `LiveMetricsDashboard.tsx` via Netlify function |
| Contact form backend | ⚠️ Not started | Marketing | Currently frontend-only |
| Netlify deploy verification | ⏳ Pending | Marketing | TypeScript compiles, needs deploy test |

**Note:** Live components created. TypeScript compilation verified. Needs Netlify deploy to verify live data.

---

## This Repo Blocks

| Blocked Repo | Item | Status | Description |
|--------------|------|--------|-------------|
| None | — | — | Marketing site is fully downstream |

---

## Marketing Promise Gap

| Promise | Page | Technical Status |
|---------|------|------------------|
| "Build your MVP" | /product, /pricing | ⚠️ LandingPageGeneratorTool exists; full scaffold pending |
| "Real ad spend ($450-525)" | /pricing | ❌ No Meta/Google Ads API integrated |
| "Real user testing" | /product | ❌ No analytics/experiment framework |
| "Unit economics (CAC/LTV)" | /pricing | ✅ 10 UnitEconomicsModels with industry benchmarks |
| "2-week validation cycles" | /pricing | ⚠️ Tools exist; quality depends on data |
| "Evidence-based validation" | /product | ✅ TavilySearchTool provides real web research |
| "6 AI Founders team" | /product | ✅ 45 agents (canonical) across 14 crews |

**Primary gap**: Ad platform integration (Meta/Google APIs) - explicitly deferred.

---

## Guardian Showcase (Implemented)

The marketing site now features:
- ✅ 6 AI Founders showcase (Guardian + 5 operational founders)
- ✅ Two-layer governance architecture diagram
- ✅ Activity Feed component (live API via Netlify function)
- ✅ Metrics Dashboard component (live API via Netlify function)
- ✅ Founder avatars and stats

---

## Flywheel Learning (Marketing Angles)

Now backed by real code in CrewAI backend:

| Marketing Claim | Technical Backing |
|-----------------|-------------------|
| "AI that learns from every validation" | ✅ FlywheelInsightsTool |
| "Shared intelligence (anonymized)" | ✅ AnonymizerTool + PrivacyGuardTool |
| "Fortune 500-quality insights" | ✅ OutcomeTrackerTool |

**Technical Spec**: `startupai-crew/docs/master-architecture/reference/flywheel-learning.md`

---

## Coordination Notes

- **Modal infrastructure DEPLOYED** - Production endpoints verified (2026-01-08)
- **Product App UPDATED** - Pointing to Modal endpoints (not AMP)
- **Marketing site CONNECTED** - Live components created for Activity Feed + Metrics
- **AMP DEPRECATED** - Legacy repos being archived
- **Primary work**: Verify Netlify deploy shows live data

---

## Cross-Repo Links

- CrewAI blockers: `startupai-crew/docs/work/cross-repo-blockers.md`
- Product app blockers: `app.startupai.site/docs/work/cross-repo-blockers.md`
- Master architecture: `startupai-crew/docs/master-architecture/09-status.md`
- Migration plan: `~/.claude/plans/federated-prancing-lollipop.md`

---

**Last Updated**: 2026-01-09

**Changes (2026-01-09 - MCP Architecture Designed)**:
- 🚀 **MCP-FIRST**: CrewAI adopted Model Context Protocol as unified tool interface
- Architecture: 13 EXISTS + 10 MCP Custom + 4 MCP External + 6 LLM-Based = 33 tools
- Implementation roadmap: 60 hours over 4 weeks (~$5-10/month cost)
- Ready for Phase A: Core MCP Server setup
- Marketing site fully unblocked - all APIs available

**Previous (2026-01-09 - Agent Tool Wiring Gap Identified)**:
- Identified gap: crew structure complete but agents missing tools
- Now resolved with MCP architecture design

**Previous (2026-01-08 - Modal Production Deployment)**:
- Modal serverless deployed to production
- Marketing site live components created
- TypeScript compilation verified
- AMP marked as deprecated
