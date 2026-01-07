---
purpose: "Cross-repository dependency tracking for coordinated delivery"
status: "active"
last_reviewed: "2026-01-07"
last_synced: "2026-01-07 - Full ecosystem status sync from startupai-crew"
---

# Cross-Repository Blockers

This document tracks dependencies between StartupAI repositories to ensure coordinated delivery.

## Ecosystem Status (2026-01-07)

**All services deployed and functional.** Primary work is connecting mock data to real APIs.

| Service | Status | Completion |
|---------|--------|------------|
| CrewAI Backend | ✅ Canonical: 5 Flows/14 Crews/45 Agents; Deployed: 3 Crews/19 Agents | ~85% |
| Product App | ✅ Phase Alpha complete | ~85% |
| Marketing Site | ✅ Production, static export | ~90% |

**Architecture Note**: Canonical architecture (5 Flows, 14 Crews, 45 Agents, 10 HITL) is fully specified. AMP deployment (3 Crews, 19 Agents, 7 HITL) is a platform workaround.

**Source of Truth**: `startupai-crew/docs/master-architecture/09-status.md`

---

## This Repo Blocked By

### Product App (`app.startupai.site`)

| Blocker | Status | Description | Impact |
|---------|--------|-------------|--------|
| Activity Feed API | ✅ SHIPPED | `GET /api/v1/public/activity` | Can show real-time agent activity |
| Metrics API | ✅ SHIPPED | `GET /api/v1/public/metrics` | Can display trust metrics |
| Results Display UI | ✅ DONE | Dashboard + Report Viewer | Full UI ready |

**All Product App blockers resolved.** Marketing just needs to connect to APIs.

### CrewAI Backend (`startupai-crew`)

| Blocker | Status | Description | Impact |
|---------|--------|-------------|--------|
| Architecture Docs | ✅ ALIGNED | Canonical: 5 Flows/14 Crews/45 Agents/10 HITL | Pattern clarity |
| AMP Deployment | ✅ DEPLOYED | 3 Crews/19 Agents/7 HITL (platform workaround) | E2E flow works |

**All CrewAI blockers resolved.**

---

## Remaining Work (Not Blockers - Internal)

| Item | Status | Owner | Notes |
|------|--------|-------|-------|
| Connect Activity Feed | ⚠️ Ready | Marketing | Wire components to Product App API |
| Connect Metrics | ⚠️ Ready | Marketing | Wire components to Product App API |
| Contact form backend | ⚠️ Not started | Marketing | Currently frontend-only |

**Note:** Activity Feed and Metrics components are built with mock data. APIs are available at Product App. Just needs connection.

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
| "6 AI Founders team" | /product | ✅ 45 agents (canonical) / 19 agents (deployed) across 14/3 crews |

**Primary gap**: Ad platform integration (Meta/Google APIs) - explicitly deferred.

---

## Guardian Showcase (Implemented)

The marketing site now features:
- ✅ 6 AI Founders showcase (Guardian + 5 operational founders)
- ✅ Two-layer governance architecture diagram
- ✅ Activity Feed component (mock data, ready for API)
- ✅ Metrics Dashboard component (mock data, ready for API)
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

- **Marketing site FULLY UNBLOCKED** - All upstream dependencies resolved
- **APIs available** - Activity Feed + Metrics at Product App
- **Components ready** - Built with mock data, need API connection
- **Primary work**: Connect to real APIs, replace mock data

---

## Cross-Repo Links

- CrewAI blockers: `startupai-crew/docs/work/cross-repo-blockers.md`
- Product app blockers: `app.startupai.site/docs/work/cross-repo-blockers.md`
- Master architecture: `startupai-crew/docs/master-architecture/09-status.md`

---

**Last Updated**: 2026-01-07

**Changes (2026-01-07 - Architecture Alignment Sync)**:
- Synced with CrewAI architecture pattern alignment (canonical vs deployed)
- Canonical architecture: 5 Flows, 14 Crews, 45 Agents, 10 HITL
- AMP deployment: 3 Crews, 19 Agents, 7 HITL (platform workaround)
- Updated AI Founders team count to reflect canonical architecture

**Changes (2026-01-07 - Full Ecosystem Sync)**:
- Synced with `startupai-crew/docs/master-architecture/09-status.md` cross-repo rewrite
- Updated all upstream blockers from "Pending" to "DEPLOYED/SHIPPED"
- All 3 crews now deployed and online on AMP
- Activity Feed + Metrics APIs confirmed shipped
- Added Guardian Showcase section
- Primary work is now API connection, not waiting for upstream
