---
purpose: "Track marketing work actively in flight"
status: "active"
last_reviewed: "2025-11-26"
last_synced: "2025-11-26 - Synced with startupai-crew Phase 2D completion"
---

# In Progress

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

### P2: Waiting on Public APIs (Updated 2025-11-26)

| Priority | Item | Status | Blocked By | Notes |
|----------|------|--------|------------|-------|
| 8 | Activity Feed API integration | **Waiting** | Activity Feed API (not yet built) | Core CrewAI engine is complete; public API pending |
| 9 | Trust Metrics API integration | **Waiting** | Metrics API (not yet built) | Core CrewAI engine is complete; public API pending |
| 10 | Phase 2 expansion (Next 50) | **Waiting** | First cohort feedback | After validation cycles complete |

**CrewAI Status (2025-11-26):** Phase 2D complete (~85%). Core engine fully functional with 18 tools. Only the public APIs for marketing transparency are not yet built.

---

## Cross-Repo Dependencies - UPDATED 2025-11-26

```
✅ startupai-crew (CrewAI Phase 2D Complete - 85%)
    ↓ Core engine done; public APIs (Activity, Metrics) pending
✅ app.startupai.site (Product App)
    ↓ Results display ready, E2E testing in progress
startupai.site (This repo)
    ↓ Waiting on Activity Feed + Metrics APIs
```

**Blocking Chain**: Public APIs (Activity Feed, Metrics) → Marketing Transparency Features

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

**Last Updated**: 2025-11-26
