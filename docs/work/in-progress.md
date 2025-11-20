---
purpose: "Track marketing work actively in flight"
status: "active"
last_reviewed: "2025-11-20"
---

# In Progress

Current work items from the beta launch implementation plan. For full task details, see [implementation-plan.md](implementation-plan.md).

## Phase 4: Launch & Iteration

| Task | Description | Status | Notes |
|------|-------------|--------|-------|
| Task 4.1 | Soft Launch to Inner Circle | 🟡 Ready to start | Announce to personal network, set up beta tracking, accept first 10 applicants |
| Task 4.2 | First Validation Cycles | 🟠 Waiting | Manual delivery of Week 1 (strategy + build) and Week 2 (test + analyze) |
| Task 4.3 | Open Phase 2 (Next 50 Spots) | 🟠 Queued | After first cohort feedback |
| Task 4.4 | Case Study Development | 🟠 Queued | Document first 5 success stories |
| Task 4.5 | Continuous Iteration | 🟢 Ongoing | Weekly reviews, A/B testing, prepare for Q2 2026 public launch |

## Deferred from Earlier Phases

| Task | Description | Status | Notes |
|------|-------------|--------|-------|
| Task 1.6 | Create Waitlist for Overflow | 🟡 Optional | For users who miss the 200 LTD cap. Waitlist form and Formspree integration. |
| Task 3.2 | Define & Document AI Agent Mapping | ⏭️ Skipped | User decided not to reveal underlying technology stack |

## Pre-Launch Checklist

Before accepting first beta users:

- [x] Hero updated with beta positioning
- [x] Pricing page features LTD offer
- [x] Beta application page created
- [x] Payment processing works
- [ ] Beta tracking system set up (spreadsheet/Notion)
- [ ] Slack community created
- [x] Personal brand references removed
- [x] "How It Works" section added
- [x] Mobile responsive
- [x] Analytics tracking set up

## AI Founders Architecture - Service Integration

The documentation has been updated to the AI Founders Architecture model. Next step is implementing the live integrations:

| Task | Description | Status | Notes |
|------|-------------|--------|-------|
| Activity Feed API | Build endpoint in startupai-crew | 🟠 Queued | `GET /api/v1/public/activity` |
| Trust Metrics API | Build endpoint in startupai-crew | 🟠 Queued | `GET /api/v1/public/metrics` |
| Marketing Integration | Connect About page to live APIs | 🟠 Queued | Replace mock data |
| CrewAI Deployment | Deploy core service to production | 🟠 Queued | Railway/Render/AWS decision needed |

**Reference**: See `docs/service-contracts/marketing-to-app-contracts.md` for API specifications.

## Next Actions

### Pre-Launch (Critical)
1. **Set up beta tracking system** - Create Notion/spreadsheet to track: Name, Email, Application Date, Payment Status, Start Date, Cycle Status
2. **Create Slack community** - Channels: #announcements, #support, #feedback, #wins
3. **Prepare acceptance email template** - With payment link (Stripe)
4. **Announce to inner circle** - Email, LinkedIn, Twitter/X

### AI Founders Architecture (High Priority)
5. **Deploy CrewAI core service** - Choose platform (Railway/Render/AWS)
6. **Implement Activity Feed endpoint** - Agent status and current tasks
7. **Connect marketing to live APIs** - Replace mock data on About page

Update this table whenever scope shifts or items complete. Move completed items to [done.md](done.md).
