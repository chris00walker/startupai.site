---
purpose: "Cross-repository dependency tracking for coordinated delivery"
status: "active"
last_reviewed: "2025-11-26"
last_synced: "2025-11-26 - Synced with startupai-crew Phase 2D completion"
---

# Cross-Repository Blockers

This document tracks dependencies between StartupAI repositories to ensure coordinated delivery.

## Marketing Promise Gap - UPDATED 2025-11-26

The marketing site makes promises that require technical capabilities. **Status after code audit:**

| Promise | Page | Technical Status |
|---------|------|------------------|
| "Build your MVP" | /product, /pricing | ⚠️ LandingPageGeneratorTool + Netlify deploy exist; full app scaffold pending |
| "Real ad spend ($450-525)" | /pricing | ❌ No Meta/Google Ads API integrated |
| "Real user testing" | /product | ❌ No analytics/experiment framework |
| "Unit economics (CAC/LTV)" | /pricing | ⚠️ UnitEconomicsCalculatorTool exists; may need real data sources |
| "2-week validation cycles" | /pricing | ⚠️ Tools exist; quality depends on Tavily research data |
| "Evidence-based validation" | /product | ⚠️ TavilySearchTool provides real web research |
| "6 AI Founders team" | /product | ✅ 8 crews / 18 agents with 18 specialized tools |

### Capabilities Status (Updated 2025-11-26)

1. **MVP Generation**: ✅ LandingPageGeneratorTool exists; full app scaffolding pending
2. **Ad Platform Integration**: ❌ Meta Business API, Google Ads API not connected
3. **Analytics Integration**: ❌ Real user tracking, conversion measurement pending
4. **Financial Modeling**: ⚠️ UnitEconomicsCalculatorTool exists; may need real data sources
5. **Web Research Tools**: ✅ TavilySearchTool + 4 research tools implemented
6. **Results Persistence**: ✅ Webhook to Supabase implemented (`_persist_to_supabase()`)

### Remaining Gap

The primary gap is **ad platform integration** (Meta/Google APIs) which has been explicitly deferred. Core validation functionality with real web research is now available.

---

## This Repo Blocked By

### CrewAI Backend (`startupai-crew`) - Core Engine ✅ Complete

| Blocker | Status | Description | Impact |
|---------|--------|-------------|--------|
| Core Validation Engine | ✅ Complete | 8 crews, 18 agents, 18 tools | Ready for E2E validation |
| Activity Feed API | ❌ Not Started | `GET /api/v1/public/activity` endpoint | Cannot show real-time agent activity on AI Founders page |
| Metrics API | ❌ Not Started | `GET /api/v1/public/metrics` endpoint | Cannot display trust metrics (analyses completed, etc.) |

**Note:** The core CrewAI engine is ~85% complete. Only the public APIs for marketing transparency are missing.

### Product App (`app.startupai.site`)

| Blocker | Status | Description | Impact |
|---------|--------|-------------|--------|
| Results Display UI | ✅ Done | Dashboard showing analysis results | Ready to display CrewAI results |
| E2E Validation Flow | ⚠️ Ready to Test | Onboarding → CrewAI → Results | Needs E2E testing |

## This Repo Blocks

| Blocked Repo | Item | Status | Description |
|--------------|------|--------|-------------|
| None currently | — | — | Marketing site is downstream |

## Phase 4 Dependencies - UPDATED 2025-11-26

Phase 4 (Launch & Iteration) requires:
1. **Users can complete E2E flow** → ✅ Product app ready, ✅ CrewAI Phase 2D complete
2. **Transparency features** → ❌ Activity Feed API (not yet built in CrewAI)
3. **Trust metrics** → ❌ Metrics API (not yet built in CrewAI)

### Current Status
- **E2E flow is ready to test** - CrewAI webhook implemented, product app UI ready
- Transparency features (Activity Feed, Metrics) are the only remaining blockers for full marketing parity

## Flywheel Learning (Competitive Moat) - ✅ IMPLEMENTED

The CrewAI backend includes a fully implemented Flywheel Learning System:

**Implemented Tools:**
- `FlywheelInsightsTool` - Cross-validation pattern retrieval
- `OutcomeTrackerTool` - Prediction and outcome tracking
- `LearningCaptureTool` - Anonymized learning storage
- `LearningRetrievalTool` - Context-aware retrieval
- `PrivacyGuardTool` - GDPR/CCPA/HIPAA compliance (40 tests)

**Marketing Angles (now backed by real code):**
- "AI that learns from every validation" - ✅ FlywheelInsightsTool
- "Shared intelligence across all clients (anonymized)" - ✅ AnonymizerTool + PrivacyGuardTool
- "Fortune 500-quality insights that improve with usage" - ✅ OutcomeTrackerTool

**Technical Spec**: See `startupai-crew/docs/master-architecture/reference/flywheel-learning.md`

## Coordination Notes

- **CrewAI core engine is COMPLETE** (~85%) - not blocking marketing
- **Product App E2E flow ready to test** - webhook integration implemented
- **Marketing site waiting only on**: Activity Feed API and Metrics API
- Marketing Phase 4 can proceed with manual validation cycles while public APIs are built

## Cross-Repo Links

- CrewAI blockers: `startupai-crew/docs/work/cross-repo-blockers.md`
- Product app blockers: `app.startupai.site/docs/work/cross-repo-blockers.md`
- Master architecture: `startupai-crew/docs/master-architecture/ecosystem.md`
