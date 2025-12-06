---
purpose: "Track marketing work actively in flight"
status: "active"
last_reviewed: "2025-12-05"
last_synced: "2025-12-05 - CrewAI migrated to 3-Crew architecture"
---

# In Progress

## Upstream Architecture Change (2025-12-05)

**CrewAI has migrated from Flow to 3-Crew architecture.**

- Code complete: 19 agents, 32 tasks, 7 HITL checkpoints
- Deployment pending
- Activity Feed and Metrics APIs remain available (no change)

See `cross-repo-blockers.md` for details.

---

## Priority Order

Work these items in order. Items marked "Ready" can start immediately.

### P0: Pre-Launch Setup (Work First)

| Priority | Item | Status | Owner | Notes |
|----------|------|--------|-------|-------|
| 1 | Beta tracking system | **Ready** | @growth | Notion/spreadsheet: Name, Email, Application Date, Payment Status, Start Date, Cycle Status |
| 2 | Slack community setup | **Ready** | @growth | Channels: #announcements, #support, #feedback, #wins |
| 3 | Acceptance email template | **Ready** | @growth | Include Stripe payment link |
| 4 | Device QA testing | **Ready** | @qa | Test on various devices and browsers |

### P1: Soft Launch

| Priority | Item | Status | Owner | Notes |
|----------|------|--------|-------|-------|
| 5 | Announce to inner circle | Ready after P0 | @growth | Email, LinkedIn, Twitter/X |
| 6 | Accept first 10 applicants | Ready after P0 | @growth | Use beta tracking system |
| 7 | First validation cycles | Manual delivery | @ops | Week 1 (strategy + build), Week 2 (test + analyze) |

### P2: API Integration (Updated 2025-12-05)

| Priority | Item | Status | Blocked By | Notes |
|----------|------|--------|------------|-------|
| 8 | Activity Feed API integration | **Ready** | - | API available at Product App |
| 9 | Trust Metrics API integration | **Ready** | - | API available at Product App |
| 10 | Phase 2 expansion (Next 50) | **Waiting** | First cohort feedback | After validation cycles complete |

**CrewAI Status (2025-12-05):** Migrated to 3-Crew architecture. Code complete, deployment pending. Public APIs (Activity Feed, Metrics) remain available through Product App.

---

## Cross-Repo Dependencies - UPDATED 2025-12-05

```
⚠️ startupai-crew (3-Crew Architecture - Deployment Pending)
    ↓ Code complete, deployment pending
    ↓ 19 agents, 32 tasks, 7 HITL checkpoints
✅ app.startupai.site (Product App)
    ↓ Results display ready, Activity Feed + Metrics APIs available
✅ startupai.site (This repo)
    ↓ APIs available, P0 work can proceed
```

**Note**: Marketing is NOT blocked by the architecture change. Public APIs are already available.

---

## Pre-Launch Checklist

Before accepting first beta users:

- [x] Hero updated with beta positioning
- [x] Pricing page features LTD offer
- [x] Beta application page created
- [x] Payment processing works
- [ ] Beta tracking system set up (Notion/spreadsheet)
- [ ] Slack community created
- [ ] Acceptance email template ready
- [x] Personal brand references removed
- [x] "How It Works" section added
- [x] Mobile responsive
- [x] Analytics tracking set up

---

## Deferred Items

| Task | Description | Status | Notes |
|------|-------------|--------|-------|
| Task 1.6 | Waitlist for overflow | Optional | For users who miss 200 LTD cap |
| Task 3.2 | AI Agent Mapping docs | Skipped | User decided not to reveal stack |

---

## Immediate Actions (Updated 2025-11-26)

1. **Set up beta tracking system** - Critical for managing applicants
2. **Create Slack community** - Support channel for beta users
3. **Prepare acceptance email** - With payment link
4. **Manual validation cycles can proceed** - CrewAI core engine is ready

**Good News:** CrewAI core engine is complete (~85%). E2E validation flow is ready for testing. Marketing transparency features (Activity Feed, Metrics APIs) are the only remaining blockers.

---

## How to Use This Document

1. **Pick highest priority "Ready" item** from the table
2. **Update status** when you start work
3. **Move to done.md** when complete
4. **Check cross-repo-blockers.md** for upstream status

---

**Last Updated**: 2025-12-05

**Changes (2025-12-05):**
- Added Upstream Architecture Change notice
- Updated CrewAI status: Flow → 3-Crew migration
- Activity Feed + Metrics APIs now marked as Ready (available at Product App)
