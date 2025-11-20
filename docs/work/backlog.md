---
purpose: "Reference marketing backlog for beta launch and beyond"
status: "active"
last_reviewed: "2025-11-20"
---

# Backlog

Prioritized but unscheduled work for the marketing site. Items are organized by theme and priority.

## Beta Launch (Before First Users)

| Theme | Item | Priority | Notes |
|-------|------|----------|-------|
| Operations | Set up beta tracking system (Notion/spreadsheet) | 🔴 Critical | Track: Name, Email, Application Date, Payment Status, Start Date, Cycle Status |
| Operations | Create Slack community | 🔴 Critical | Channels: #announcements, #support, #feedback, #wins |
| Operations | Prepare acceptance email template with payment link | 🔴 Critical | Stripe payment link integration |
| QA | Manual device testing (iPhone, Android, iPad) | 🟡 High | Verify mobile experience before launch |

## Optional Enhancements

| Theme | Item | Priority | Notes |
|-------|------|----------|-------|
| Lead Capture | Task 1.6: Create waitlist for overflow | 🟡 Optional | For users who miss 200 LTD cap. Formspree integration, tag as "Public Launch Waitlist" |
| Analytics | Create PostHog funnels | 🟢 Medium | Homepage → Beta → Application → Payment funnel |
| Analytics | Set up PostHog goals | 🟢 Medium | 50 applications, 30 payments, 20% About page views |
| UI | Update favicons and logos | 🟢 Low | Ensure all branding is "StartupAI" not personal |
| Content | Add footer tagline "Built by AI founders" | 🟢 Low | Optional AI-first branding element |

## AI Founders Architecture Implementation

These items implement the three-service architecture documented in `docs/overview/architecture.md`.

| Theme | Item | Priority | Notes |
|-------|------|----------|-------|
| Integration | Implement Activity Feed API integration | 🔴 Critical | Connect About page to CrewAI `GET /api/v1/public/activity` |
| Integration | Implement Trust Metrics API integration | 🔴 Critical | Display live metrics on homepage trust ribbon |
| Backend | Deploy CrewAI core service | 🔴 Critical | Move from stub to production (Railway/Render/AWS) |
| Backend | Build Activity Feed endpoint in startupai-crew | 🟡 High | Return agent status, current tasks, progress |
| Backend | Build Trust Metrics endpoint in startupai-crew | 🟡 High | Return validation counts, uptime, success rate |
| UI | Add real-time activity updates to About page | 🟡 High | Replace mock data with WebSocket/polling |
| Content | Update marketing copy for AI Founders story | 🟢 Medium | Ensure all content reflects three-service architecture |
| Docs | Create startupai-crew deployment runbook | 🟢 Medium | Document production deployment process |

## Post-Beta (Q1-Q2 2026)

| Theme | Item | Priority | Notes |
|-------|------|----------|-------|
| Content | Real case studies from beta users | 🟡 High | Task 4.4: Document first 5 success stories |
| Content | Video testimonials | 🟢 Medium | Record 5+ video testimonials from beta users |
| Product | Transition from LTD to monthly pricing | 🟡 High | Prepare for public launch |
| Content | Reactivate services pages | 🟢 Low | Post-beta consulting services if demand exists |
| Localization | EU-focused copy variant | 🟢 Low | i18n infrastructure needed |
| Integration | ~~Real agent activity data~~ | ✅ Moved | Now in AI Founders Architecture section above |

## Technical Debt

| Theme | Item | Priority | Notes |
|-------|------|----------|-------|
| Documentation | Update value-proposition.md for beta positioning | 🟡 High | Currently references "evidence-led strategy co-pilot" |
| Documentation | Update frontend-components.md | 🟢 Medium | Add About page components |
| Documentation | Update docs/README.md links | 🟢 Medium | Reflect renamed files (service-contracts, ai-founders-architecture) |
| QA | Automate Lighthouse checks in CI | 🟢 Low | Target: LCP < 2.5s, FID < 100ms, CLS < 0.1 |
| QA | Add cross-site signup smoke test | 🟢 Low | Covers marketing → product redirect path |
| QA | Add three-service integration tests | 🟢 Low | Verify API contracts between services |

## Pending Decisions

These items require decisions before they can be scheduled:

- [ ] Exact ad spend allocation (30-35% = $450-525?)
- [ ] Token credit amount per LTD user
- [ ] Beta launch target date
- [ ] Application review process: First-come or hand-picked?

---

For the complete implementation plan with task details, see [implementation-plan.md](implementation-plan.md).

Previous backlog items from October 2025 (CrewAI demo, sitemap automation, etc.) have been superseded by the beta launch focus. See `docs/archive/` for historical context.
