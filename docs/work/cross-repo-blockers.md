---
purpose: "Cross-repository dependency tracking for coordinated delivery"
status: "active"
last_reviewed: "2026-01-10"
last_synced: "2026-01-10 - Tool integration complete, asset generation specs done"
---

# Cross-Repository Blockers

This document tracks dependencies between StartupAI repositories to ensure coordinated delivery.

> **TOOLS COMPLETE (2026-01-10)**: 15 tools wired to 35+ agents, 681 tests. Phase 0-2 live testing verified. Asset generation specs complete (Blueprint Pattern + Ad Platform Library).

## Ecosystem Status (2026-01-10)

**Phase 0-2 validated. Phase 3-4 live testing next. Marketing site fully operational.**

| Service | Status | Completion | Notes |
|---------|--------|------------|-------|
| CrewAI Backend | **PHASE 0-2 VALIDATED** | ~92% | Phase 3-4 live testing next |
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
| Tool Integration | ✅ COMPLETE | 15 tools, 35+ agents, 681 tests | Evidence-based outputs |
| Phase 0-2 Live Testing | ✅ COMPLETE | Pivot workflow verified | Desirability gate working |
| Asset Generation Specs | ✅ COMPLETE | Blueprint Pattern + Ad Platform Library | Ready for implementation |
| **Phase 3-4 Live Testing** | ⏳ **NEXT** | Feasibility + Viability gates | Final validation phases |

**Tool integration complete. Phase 0-2 validated. Phase 3-4 live testing next.**

#### Tool Architecture (Complete)

| Category | Count | Status |
|----------|-------|--------|
| Customer Research | 4 | ✅ Complete |
| Advanced Analysis | 4 | ✅ Complete |
| Analytics & Privacy | 4 | ✅ Complete |
| LLM-Based Tools | 3 | ✅ Complete |
| **TOTAL** | 15 | **✅ 35+ agents** |

#### Asset Generation Specs (New)

| Spec | Status | Description |
|------|--------|-------------|
| `LandingPageGeneratorTool` | ✅ Spec Complete | Blueprint Pattern, 9 components, Progressive Images |
| `AdCreativeGeneratorTool` | ✅ Spec Complete | Copy + Visuals, Progressive Resolution |
| Ad Platform Library | ✅ Created | Meta, Google, LinkedIn, TikTok specs |

**Reference**: `startupai-crew/docs/master-architecture/reference/`

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
| "Build your MVP" | /product, /pricing | ⚠️ LandingPageGeneratorTool SPEC COMPLETE; implementation pending |
| "Real ad spend ($450-525)" | /pricing | ⚠️ AdCreativeGeneratorTool SPEC COMPLETE; API integration pending |
| "Real user testing" | /product | ⚠️ Progressive Image Resolution spec ready; implementation pending |
| "Unit economics (CAC/LTV)" | /pricing | ✅ 10 UnitEconomicsModels with industry benchmarks |
| "2-week validation cycles" | /pricing | ⚠️ Tools exist; quality depends on data |
| "Evidence-based validation" | /product | ✅ TavilySearchTool provides real web research |
| "6 AI Founders team" | /product | ✅ 45 agents across 14 crews |

**Primary gaps**:
- Ad platform integration (Meta/Google APIs) - explicitly deferred
- Asset generation implementation - specs complete, waiting on F2/F3 content quality fix

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

**Last Updated**: 2026-01-10 22:00

**Changes (2026-01-10 - Upstream Tool Integration & Asset Specs Complete)**:
- ✅ **TOOLS COMPLETE**: 15 tools wired to 35+ agents, 681 tests passing
- ✅ **PHASE 0-2 VALIDATED**: Live testing with pivot workflow verified
- ✅ **ASSET GENERATION SPECS**: Blueprint Pattern, Progressive Images, Ad Platform Library
- ✅ **NEW REFERENCE DOCS**: `ad-platform-specifications.md`, `observability-architecture.md`
- ⏳ **NEXT**: Phase 3-4 live testing (Feasibility + Viability gates)

**Changes (2026-01-10 - Upstream Schema Alignment Complete)**:
- ✅ Product App deployed Modal tables (`validation_runs`, `validation_progress`, `hitl_requests`)
- ✅ Product App applied 9 security/performance migrations (views, functions, RLS, indexes)
- No action required for Marketing site - upstream work complete

**Previous (2026-01-09 - MCP Architecture Designed)**:
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
