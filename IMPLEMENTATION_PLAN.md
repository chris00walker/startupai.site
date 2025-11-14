# StartupAI Marketing Site Implementation Plan
**Date**: November 14, 2025
**Status**: Ready for Execution
**Purpose**: Phased implementation plan to align marketing site with pre-launch beta strategy

---

## Overview

This document provides a comprehensive, checkable implementation plan to transform the marketing site from its current "strategy consulting" positioning to the correct "AI co-founding validation platform" with Lifetime Deal beta launch.

**Source Document:** `POSITIONING_ANALYSIS.md` (Strategic decisions and positioning)
**This Document:** Step-by-step implementation tasks organized by phase

---

## Implementation Phases

- **Phase 1: Foundation** (Week 1-2) - Critical positioning fixes, beta offer setup
- **Phase 2: Content** (Week 3-4) - New sections, proof elements, beta program page
- **Phase 3: Polish** (Week 5-6) - Refinements, testing, launch prep
- **Phase 4: Launch** (Week 7+) - Beta cohort onboarding, iteration

---

## Phase 1: Foundation (Week 1-2) - CRITICAL

**Goal:** Fix core positioning conflicts and set up beta infrastructure

### Week 1: Hero & Pricing Fixes

#### Task 1.1: Update Hero Section
**File:** `/src/components/sections/Hero.tsx`
**Priority:** 🔴 CRITICAL

- [ ] **Update headline**
  - Current: "From Idea to Production in Days, Not Months"
  - New: "The AI Co-Founder That Validates Your Startup Idea"
  - Line reference: ~45-50

- [ ] **Update subheadline**
  - Current: "Transform startup idea into validated business model and technical architecture"
  - New: "We build your MVP, test it with real customers, and tell you if your idea works—or how to pivot. Join our private beta."
  - Line reference: ~51-55

- [ ] **Update primary CTA**
  - Current: "Get Started" or "Start Free Trial"
  - New: "Apply for Beta Access"
  - Link to: `/beta` (to be created)

- [ ] **Add beta badge**
  - Add visual indicator: "Private Beta - Only 50 Spots"
  - Style: Small chip/badge above or near headline

- [ ] **Remove "Chris Walker" personal branding**
  - Check metadata, ensure it says "StartupAI" not "Chris Walker Consulting"

**Acceptance Criteria:**
- Hero clearly communicates: Build + Test + Validate (not just "plan")
- Beta positioning front and center
- CTA drives to beta application, not general signup

---

#### Task 1.2: Update Pricing Page - LTD Offer
**File:** `/src/app/pricing/page.tsx`
**Priority:** 🔴 CRITICAL

- [ ] **Feature LTD as primary offer**
  - Add prominent section at top: "Limited Lifetime Deal - Private Beta"
  - Badge: "Only 50 Spots in Phase 1"

- [ ] **Update Sprint tier (or replace)**
  - Current name: "Strategy Sprint"
  - New name: "Beta Lifetime Deal" or "Validation Cycle Bundle"
  - Price: "$1,500 one-time"

- [ ] **List what's included in LTD**
  - ✅ 3 full validation cycles
  - ✅ Each cycle: Strategy + Build + Deploy + Test + Pivot analysis
  - ✅ Real ad spend (~$450-525 included)
  - ✅ Deployed MVP at live URL
  - ✅ User analytics and hypothesis testing
  - ✅ Fixed token credits
  - ✅ After credits: Pay only inference costs (no monthly fees, ever)

- [ ] **Add comparison table**
  - Create comparison: "LTD vs. Alternatives"
  - Rows: Freelancer ($8-15K, 2-3 months), Dev Shop ($25-50K, 4-6 months), No-Code (limited), DIY (slow)
  - Highlight: Speed (2 weeks vs months), Cost (6-30x cheaper), Validation (included vs DIY)

- [ ] **De-emphasize or hide monthly tiers temporarily**
  - Option A: Gray out "Coming after beta" on Founder ($199/mo) and Agency ($499/mo) tiers
  - Option B: Remove them entirely until post-beta launch
  - Recommendation: Keep visible but add "Available Q2 2026" label

- [ ] **Add FAQ section**
  - Q: "What's a validation cycle?"
  - Q: "Can I test 3 different ideas or pivot 3 times?"
  - Q: "What happens after I use my 3 cycles?"
  - Q: "What are inference costs?"
  - Q: "When does beta start?"

**Acceptance Criteria:**
- LTD offer is impossible to miss
- Value is crystal clear ($1,500 = 3 full cycles)
- Comparison shows massive savings vs alternatives
- FAQ addresses common objections

---

#### Task 1.3: Remove Personal Brand References
**Files:** Multiple
**Priority:** 🔴 CRITICAL

- [ ] **Update page metadata** (`/src/app/page.tsx`)
  - Check `<title>` and `<meta name="description">`
  - Remove: "Chris Walker" or "Chris Walker Consulting"
  - Use: "StartupAI - AI Co-Founder for Non-Technical Founders"

- [ ] **Update ContactForm** (`/src/components/ContactForm.tsx` or similar)
  - Line ~213: Remove "Get updates on eCommerce trends"
  - Replace with: "Get updates on beta launch and startup validation tips"

- [ ] **Check Services pages** (`/src/app/services/**/*.tsx`)
  - Search for: "Chris Walker Consulting"
  - Replace with: "StartupAI" or remove reference
  - May decide to delete/replace services pages entirely (see Task 2.3)

- [ ] **Update footer** (`/src/components/Footer.tsx` or similar)
  - Check copyright: "© 2025 StartupAI" (not Chris Walker)
  - Check company name consistency

- [ ] **Update About page if exists** (`/src/app/about/page.tsx`)
  - If exists: Add section "About the Founder" (Chris Walker bio)
  - Clearly separate: Chris = founder, StartupAI = product

**Acceptance Criteria:**
- Zero mentions of "Chris Walker Consulting" in site copy
- Metadata consistently says "StartupAI"
- Personal brand only appears in founder bio context

---

### Week 2: Beta Infrastructure

#### Task 1.4: Create Beta Application Page
**File:** `/src/app/beta/page.tsx` (NEW)
**Priority:** 🔴 CRITICAL

- [ ] **Create new page route** at `/beta`

- [ ] **Hero section**
  - Headline: "Join the StartupAI Private Beta"
  - Subhead: "Limited Lifetime Deal - Only 200 Spots Total (Rolling in Phases of 50)"
  - Countdown or spots remaining indicator (if feasible)

- [ ] **What You Get section**
  - Repeat LTD offer details from pricing page
  - Visual breakdown of 3 validation cycles
  - Timeline: 2 weeks per cycle

- [ ] **How It Works - Visual Flow**
  - Week 1: Strategy + Build + Deploy
  - Week 2: Test + Analyze + Pivot Decision
  - Repeat up to 3x

- [ ] **Application Form**
  - Fields to collect:
    - Name
    - Email
    - Startup idea (1-2 sentences)
    - Industry/category
    - Timeline (when do you want to start?)
    - Budget confirmation (can you invest $1,500?)
    - How did you hear about us?
  - CTA button: "Apply for Beta Access"
  - Submit to: Email (Formspree) or backend API (if available)

- [ ] **Social Proof section**
  - Placeholder testimonials or quotes
  - "Join founders who are validating their ideas 10x faster"

- [ ] **FAQ section** (reuse from pricing page)

**Acceptance Criteria:**
- Clear value proposition for beta
- Application form captures key qualification info
- Easy to navigate from homepage hero CTA

---

#### Task 1.5: Set Up Payment Processing
**Tool:** Stripe (recommended)
**Priority:** 🔴 CRITICAL

- [ ] **Create Stripe product**
  - Product name: "StartupAI Beta Lifetime Deal"
  - Price: $1,500 one-time
  - Description: "3 full validation cycles, lifetime access"

- [ ] **Decide payment flow**
  - Option A: Pay on application (automatic acceptance if payment succeeds)
  - Option B: Apply first, then pay if accepted (manual review)
  - Recommendation: Option B for beta (hand-select best fits)

- [ ] **Create payment link or checkout page**
  - If Option A: Embed Stripe checkout on `/beta` page
  - If Option B: Send payment link via email after acceptance

- [ ] **Set up Stripe webhook** (if needed)
  - Notify on successful payment
  - Add to beta user list (email, Notion, Airtable, etc.)

- [ ] **Test payment flow**
  - Use Stripe test mode
  - Complete full purchase flow
  - Verify email confirmation sent

**Acceptance Criteria:**
- Payment processing works end-to-end
- User receives confirmation email
- You're notified of new beta signups

---

#### Task 1.6: Create Waitlist for Overflow
**File:** `/src/app/waitlist/page.tsx` or component
**Priority:** 🟡 HIGH

- [ ] **Create waitlist form**
  - For users who miss the 200 LTD cap
  - Fields: Name, Email, "Notify me at public launch"

- [ ] **Integrate with email tool**
  - Formspree, ConvertKit, Mailchimp, etc.
  - Tag as "Public Launch Waitlist"

- [ ] **Add to beta page**
  - Show waitlist CTA if beta is full
  - "Beta spots filled. Join waitlist for public launch."

**Acceptance Criteria:**
- Captures leads who miss beta
- Tagged separately from beta applicants
- Can nurture for Q2 2026 public launch

---

## Phase 2: Content (Week 3-4) - HIGH PRIORITY

**Goal:** Add new sections explaining full value prop and validation engine

### Week 3: New Homepage Sections

#### Task 2.1: Create "How It Works" Section
**File:** `/src/app/page.tsx` or `/src/components/sections/HowItWorks.tsx` (NEW)
**Priority:** 🟡 HIGH

- [ ] **Create new component** `HowItWorks.tsx`

- [ ] **Design 4-step visual flow**
  - **Step 1: Strategy Foundation** (Days 1-3)
    - Icon: Lightbulb or document
    - "Tell us your idea, we validate your business model"
    - Output: Business Model Canvas, Value Prop Design

  - **Step 2: Build & Deploy** (Days 4-7)
    - Icon: Code or rocket
    - "We build and deploy your MVP"
    - Output: Live URL, functional application

  - **Step 3: Test with Real Users** (Week 2, Days 1-5)
    - Icon: Users or analytics chart
    - "We drive real traffic and collect data"
    - Output: User behavior, analytics, feedback

  - **Step 4: Pivot or Proceed** (Week 2, Days 6-7)
    - Icon: Decision tree or signpost
    - "We analyze results and recommend next steps"
    - Output: Data-driven pivot recommendation

- [ ] **Add timeline visual**
  - Show "2 weeks" prominently
  - Indicate cycles can repeat (up to 3x)

- [ ] **Add to homepage**
  - Location: After hero, before existing services or product section

**Acceptance Criteria:**
- Non-technical founders understand the process
- Clear that it's not just "build" but "build + test + analyze"
- Visual is engaging and easy to scan

---

#### Task 2.2: Create "Why StartupAI?" / Differentiation Section
**File:** `/src/app/page.tsx` or new component
**Priority:** 🟡 HIGH

- [ ] **Create comparison table or cards**
  - **vs. Freelancers**
    - Them: $8-15K, 2-3 months, variable quality
    - Us: $1,500, 2 weeks, consistent quality

  - **vs. Dev Shops**
    - Them: $25-50K, 4-6 months, overkill for MVP
    - Us: $1,500, 2 weeks, right-sized for validation

  - **vs. No-Code Tools**
    - Them: DIY, technical limits, vendor lock-in
    - Us: Real code, full ownership, no ceiling

  - **vs. ChatGPT/Claude DIY**
    - Them: Code snippets, manual assembly, no deployment
    - Us: End-to-end, deployed product, validation included

  - **vs. Cursor/Bolt (solo)**
    - Them: Tool, requires expertise, you orchestrate
    - Us: Team, we orchestrate for you, strategy included

- [ ] **Highlight key differentiators**
  - Speed: 2 weeks (not months)
  - Validation: Real user testing (not assumptions)
  - Fixed price: $1,500 (not hourly scope creep)
  - Full ownership: Code export, no lock-in

**Acceptance Criteria:**
- Clear positioning vs. all alternatives
- Highlights speed + validation as unique combo
- Addresses "Why not just use Cursor?" objection

---

#### Task 2.3: Replace or Update Services Pages
**Files:** `/src/app/services/**/*.tsx`
**Priority:** 🟡 HIGH

**Decision Point:** Services pages currently imply consulting phases (Discovery → Validation → Scaling). This conflicts with platform positioning.

**Option A: Delete services pages entirely**
- Remove `/services` route and all sub-pages
- Redirect to homepage or `/beta`
- Simplifies messaging (beta launch doesn't need service tiers)

**Option B: Replace with platform-centric language**
- Keep structure but reframe
- "Discovery" → "Strategy Foundation"
- "Validation" → "Build & Test"
- "Scaling" → "Iterate & Optimize"
- Update copy to be platform-delivered, not consulting-led

**Option C: Keep but mark as "Post-Beta"**
- Add banner: "These services available after beta in Q2 2026"
- De-emphasize in navigation

**Recommendation for Beta:** Option A (delete) or Option C (hide)

- [ ] **Choose option** (Chris to decide)
- [ ] **Implement chosen option**
- [ ] **Update navigation** to remove or gray out Services link

**Acceptance Criteria:**
- No consulting-style language visible during beta
- Clear that beta is platform-only (no service tiers yet)

---

### Week 4: Proof & Credibility

#### Task 2.4: Add Tool Orchestration Section
**File:** `/src/app/page.tsx` or new component
**Priority:** 🟡 HIGH

- [ ] **Create "Powered By" section**
  - Headline: "We Orchestrate the Best AI Tools (So You Don't Have To)"
  - Subhead: "Like Stripe hides payment rails, we hide the complexity of building software"

- [ ] **Show tool logos** (if licensing allows)
  - Claude Code
  - Cursor
  - Bolt
  - Windsurf
  - v0
  - Replit
  - (Or use generic "AI Development Tools" if logos not available)

- [ ] **Explain the value**
  - "You don't choose which tool—we orchestrate them intelligently"
  - "Each tool is best for specific tasks; we route automatically"
  - "Power users: Export to any IDE (GitHub, Cursor, VS Code)"

- [ ] **Add "For Developers" expandable**
  - Collapsed by default (95% of users don't care)
  - Expands to show: Technical architecture, code ownership, export options
  - Keeps non-technical users from being intimidated

**Acceptance Criteria:**
- Clear that StartupAI is orchestrator, not competitor to these tools
- Differentiates from "just use Cursor yourself"
- Technical details available but not prominent

---

#### Task 2.5: Add Framework Credibility Section
**File:** `/src/app/page.tsx` or new component
**Priority:** 🟢 MEDIUM

- [ ] **Create "Built on Proven Frameworks" section**
  - Show book covers or logos (if allowed):
    - Value Proposition Design (Strategyzer)
    - Business Model Generation (Strategyzer)
    - Testing Business Ideas (Strategyzer)

- [ ] **Explain the foundation**
  - "Not generic AI prompts—systematic application of validated methodologies"
  - "We combine Strategyzer frameworks with AI speed"
  - "Strategy rigor + execution velocity"

- [ ] **Add credibility stats** (when available)
  - "Based on frameworks used by 1M+ entrepreneurs"
  - "Validated by [X] beta users" (after beta starts)

**Acceptance Criteria:**
- Borrows credibility from established methodology
- Differentiates from "ChatGPT for startups"

---

#### Task 2.6: Update Product Page
**File:** `/src/app/product/page.tsx`
**Priority:** 🟡 HIGH

- [ ] **Replace "canvases" language with "validated products"**
  - Search for: "business canvases", "strategic frameworks", "MVP plans"
  - Replace with: "working MVPs", "deployed products", "validated startups"

- [ ] **Add validation promise**
  - Current focus: Strategy artifacts
  - New focus: Strategy + Working Product + Real User Data

- [ ] **Add mock screenshots** (if available)
  - Screenshot of deployed MVP
  - Analytics dashboard showing user data
  - Pivot recommendation interface

- [ ] **Add "What You Get" list**
  - Strategy foundation: BMC, VPD, domain model
  - Working software: Deployed MVP, live URL
  - Validation data: User analytics, hypothesis tests
  - Pivot guidance: Recommendations based on evidence

**Acceptance Criteria:**
- Clear that deliverable is working software + validation
- Visual proof elements (screenshots/demos)
- Aligns with beta LTD offer

---

## Phase 3: Polish (Week 5-6) - MEDIUM PRIORITY

**Goal:** Refinements, testing, and final prep before beta launch

### Week 5: Refinements

#### Task 3.1: Create About Page
**File:** `/src/app/about/page.tsx` (NEW)
**Priority:** 🟢 MEDIUM

- [ ] **Create new page** at `/about`

- [ ] **Company section**
  - "StartupAI is the AI co-founding platform..."
  - Mission, vision, why we exist

- [ ] **Founder section**
  - "About Chris Walker" (founder bio)
  - Headshot, background, credentials
  - Clearly separate: Chris = person, StartupAI = product

- [ ] **How We Build section** (optional)
  - "We practice what we preach: StartupAI is built using StartupAI"
  - Meta credibility play
  - Show public roadmap or GitHub activity (if applicable)

**Acceptance Criteria:**
- Provides founder credibility without making it a personal brand
- Clear separation: founder story vs product story

---

#### Task 3.2: Add Evidence Ledger / Learning Engine Section
**File:** `/src/app/page.tsx` or new component
**Priority:** 🟢 MEDIUM

- [ ] **Create "The Learning Engine" section**
  - Headline: "Your Startup Benefits from Collective Intelligence"
  - Subhead: "Every validation cycle teaches our system. Recommendations improve with each project."

- [ ] **Explain network effects**
  - "We learn from thousands of startups (anonymized)"
  - "Your pivot recommendations are informed by what worked for others"
  - "Evidence accumulation is our competitive moat"

- [ ] **Add stats** (when available)
  - "Trained on [X] startup experiments"
  - "Analyzed [Y] pivot decisions"
  - "Success rate: [Z]% of recommended pivots led to better outcomes"

- [ ] **Privacy note**
  - "All data is anonymized and aggregated"
  - "Your idea stays private"

**Acceptance Criteria:**
- Communicates long-term moat (evidence network effects)
- Reassures on privacy
- Differentiates from one-off services

---

#### Task 3.3: Global Search and Replace
**Files:** All
**Priority:** 🟢 MEDIUM

- [ ] **Search for "plans" and replace with "products"**
  - "MVP plans" → "MVPs" or "working products"
  - "production-ready plans" → "production-ready applications"

- [ ] **Search for "days" and update to "2 weeks" or "weeks"**
  - Be consistent with realistic timelines
  - "Days, Not Months" → "Weeks, Not Months" (still compelling)

- [ ] **Search for technical jargon and simplify**
  - Remove or hide: DDD, TBI, RLS, PKCE, bounded contexts (unless in "For Developers" section)
  - Use consumer-friendly language for 95% of users

- [ ] **Check all CTAs are consistent**
  - Primary CTA: "Apply for Beta Access"
  - Secondary: "See How It Works" or "Learn More"

**Acceptance Criteria:**
- Language is consistent across all pages
- Jargon removed from main copy
- CTAs all point to beta application

---

### Week 6: Testing & Prep

#### Task 3.4: SEO & Metadata Updates
**Files:** All pages
**Priority:** 🟢 MEDIUM

- [ ] **Update all page titles**
  - Format: "[Page Name] | StartupAI - AI Co-Founder for Founders"
  - Examples:
    - "Private Beta | StartupAI - AI Co-Founder for Founders"
    - "How It Works | StartupAI - AI Co-Founder for Founders"

- [ ] **Update meta descriptions**
  - Homepage: "StartupAI builds, tests, and validates your startup idea with real customers in 2 weeks. Join our private beta - $1,500 lifetime deal, only 200 spots."
  - Beta page: "Join the StartupAI private beta. Get 3 full validation cycles (build + test + pivot analysis) for $1,500 one-time. Limited to 200 spots."
  - Pricing: "Beta lifetime deal: 3 validation cycles for $1,500. Test your startup idea with real users, not assumptions."

- [ ] **Add Open Graph tags**
  - `og:title`, `og:description`, `og:image`
  - Use beta offer messaging

- [ ] **Update favicons and logos** (if needed)
  - Ensure branding is "StartupAI" not personal

**Acceptance Criteria:**
- All metadata reflects beta positioning
- SEO-friendly for "startup validation", "AI co-founder", "MVP testing"
- Social sharing cards look correct

---

#### Task 3.5: Analytics Setup
**Tool:** PostHog (or existing)
**Priority:** 🟢 MEDIUM

- [ ] **Set up key events**
  - `beta_application_started`
  - `beta_application_submitted`
  - `beta_payment_completed`
  - `waitlist_joined`
  - `hero_cta_clicked`
  - `how_it_works_viewed`
  - `pricing_page_viewed`

- [ ] **Create funnels**
  - Homepage → Beta Page → Application → Payment
  - Track drop-off at each stage

- [ ] **Set up goals**
  - Goal 1: 50 beta applications submitted (Phase 1)
  - Goal 2: 30 beta payments completed (60% conversion)

**Acceptance Criteria:**
- Can track beta signup flow end-to-end
- Identify where users drop off
- Measure conversion rate

---

#### Task 3.6: Mobile Responsiveness Check
**Files:** All components
**Priority:** 🟢 MEDIUM

- [ ] **Test on mobile devices**
  - iPhone (Safari)
  - Android (Chrome)
  - iPad (tablet view)

- [ ] **Check responsive issues**
  - Hero CTA visible above fold
  - Forms usable on mobile
  - Timeline visualizations don't break
  - Navigation works on small screens

- [ ] **Performance check**
  - Run Lighthouse audit
  - Target: LCP < 2.5s, FID < 100ms, CLS < 0.1

**Acceptance Criteria:**
- Site fully usable on mobile
- No layout breaks
- Performance meets targets

---

## Phase 4: Launch & Iteration (Week 7+) - ONGOING

**Goal:** Beta cohort onboarding, feedback collection, continuous improvement

### Week 7: Soft Launch

#### Task 4.1: Soft Launch to Inner Circle
**Priority:** 🔴 CRITICAL

- [ ] **Announce to personal network**
  - Email to friends, colleagues, advisors
  - LinkedIn post
  - Twitter/X announcement
  - "Private beta now open - limited spots"

- [ ] **Set up beta tracking**
  - Spreadsheet or Notion database
  - Track: Name, Email, Application Date, Payment Status, Start Date, Cycle Status

- [ ] **First 10 applicants**
  - Review applications manually
  - Accept best fits (clear idea, ready to start, has budget)
  - Send acceptance email with payment link (if Option B)

- [ ] **Create Slack community**
  - Invite accepted beta users
  - Channels: #announcements, #support, #feedback, #wins

**Acceptance Criteria:**
- First 10 beta users onboarded
- Payment collected
- Slack community active

---

#### Task 4.2: First Validation Cycles (Manual Delivery)
**Priority:** 🔴 CRITICAL

- [ ] **Onboard first beta user**
  - Intake call: Understand their startup idea
  - Collect: Business model details, target customer, key assumptions

- [ ] **Deliver Week 1** (manually orchestrated)
  - Days 1-3: Strategy foundation (BMC, VPD, domain model)
  - Days 4-7: Build MVP (using Claude Code, Cursor, etc.)
  - Day 7: Deploy to live URL

- [ ] **Deliver Week 2** (manually orchestrated)
  - Set up ad campaigns (Facebook/Google)
  - Drive traffic to MVP
  - Collect analytics data
  - Analyze hypothesis tests
  - Provide pivot recommendation

- [ ] **Collect feedback**
  - NPS survey after each cycle
  - "What went well? What could be better?"
  - Document case study notes

**Acceptance Criteria:**
- First beta user completes full 2-week cycle
- Feedback collected
- Iterate on process based on learnings

---

### Week 8+: Scale Beta

#### Task 4.3: Open Phase 2 (Next 50 Spots)
**Priority:** 🟡 HIGH

- [ ] **Announce Phase 2 opening**
  - Update beta page: "Phase 1 Full - Phase 2 Now Open"
  - Email waitlist
  - Social media announcement

- [ ] **Process applications**
  - Review and accept in batches of 5-10
  - Onboard at pace you can handle

- [ ] **Increase automation** (as product develops)
  - Reduce manual orchestration
  - Build workflow automation
  - Still QA each deliverable before sending to user

#### Task 4.4: Case Study Development
**Priority:** 🟡 HIGH

- [ ] **Document first 5 success stories**
  - Founder name (with permission)
  - Industry
  - Problem they were solving
  - Results: MVP built, users tested, pivot decision
  - Testimonial quote

- [ ] **Create case study pages**
  - `/case-studies/[slug]` routes
  - Write up detailed stories

- [ ] **Add to homepage**
  - Social proof section: "See how founders validated their ideas"

#### Task 4.5: Continuous Iteration
**Priority:** 🟢 ONGOING

- [ ] **Weekly reviews**
  - Review beta user feedback
  - Identify common pain points
  - Update messaging or process

- [ ] **A/B testing** (if traffic allows)
  - Test headline variations
  - Test CTA button copy
  - Test pricing page layout

- [ ] **Prepare for public launch** (Q2 2026)
  - Transition from LTD to monthly pricing
  - Open all features
  - Scale marketing

---

## Quick Reference Checklist

### Pre-Launch Must-Haves (Before accepting beta users)

- [ ] Hero updated with beta positioning
- [ ] Pricing page features LTD offer
- [ ] Beta application page created
- [ ] Payment processing works
- [ ] Beta tracking system set up (spreadsheet/Notion)
- [ ] Slack community created
- [ ] Personal brand references removed
- [ ] "How It Works" section added
- [ ] Mobile responsive
- [ ] Analytics tracking set up

### Nice-to-Haves (Can iterate on)

- [ ] Tool orchestration section
- [ ] Framework credibility section
- [ ] Evidence ledger section
- [ ] About page
- [ ] Case studies (after beta starts)
- [ ] Waitlist for overflow
- [ ] All metadata updated
- [ ] Services pages replaced/removed

---

## File Reference: What Needs Updating

### Critical Files (Phase 1)
1. `/src/components/sections/Hero.tsx` - Hero headline, subhead, CTA
2. `/src/app/pricing/page.tsx` - LTD offer, comparison table
3. `/src/app/page.tsx` - Metadata, add new sections
4. `/src/components/ContactForm.tsx` - Remove eCommerce reference
5. `/src/app/beta/page.tsx` - **NEW** beta program page

### High Priority Files (Phase 2)
6. `/src/components/sections/HowItWorks.tsx` - **NEW** visual flow
7. `/src/app/product/page.tsx` - Replace "canvases" with "products"
8. `/src/app/services/**/*.tsx` - Remove or update (TBD)
9. `/src/app/page.tsx` - Add differentiation section

### Medium Priority Files (Phase 3)
10. `/src/app/about/page.tsx` - **NEW** about page
11. `/docs/overview/value-proposition.md` - Update positioning docs
12. `/docs/overview/messaging-matrix.md` - Update message grid
13. All page metadata (titles, descriptions)

---

## Success Metrics

### Phase 1 Success (Week 2)
- [ ] Hero clearly communicates validation promise
- [ ] LTD offer impossible to miss on pricing page
- [ ] Beta application page live and functional
- [ ] Payment processing tested and working
- [ ] Zero "Chris Walker Consulting" references remain

### Phase 2 Success (Week 4)
- [ ] "How It Works" section published
- [ ] Comparison table shows competitive advantage
- [ ] Product page explains full validation engine
- [ ] Services pages removed or updated (no consulting language)

### Phase 3 Success (Week 6)
- [ ] All pages mobile-responsive
- [ ] SEO metadata updated
- [ ] Analytics tracking all key events
- [ ] About page published
- [ ] Global language cleanup complete

### Phase 4 Success (Week 7+)
- [ ] 10 beta users onboarded
- [ ] First validation cycles completed
- [ ] 3+ testimonials collected
- [ ] 60%+ NPS from beta users
- [ ] Phase 2 (next 50 spots) opened

---

## Notes & Decisions Log

### Decision Log

**Date**: November 14, 2025
- Confirmed: StartupAI is SaaS product, not consulting
- Confirmed: Full validation engine (not just strategy)
- Confirmed: 2-week cycles (not days)
- Confirmed: LTD at $1,500 for 3 cycles, max 200 spots
- Confirmed: Beta rollout in phases of 50

**Pending Decisions:**
- [ ] Exact ad spend allocation (30-35% = $450-525?)
- [ ] Token credit amount per LTD user
- [ ] Services pages: Delete, update, or hide?
- [ ] Beta launch target date
- [ ] Application review: First-come or hand-picked?

---

## Related Documents

- **`POSITIONING_ANALYSIS.md`** - Strategic positioning and beta strategy (source of truth)
- **`PERSONA_INDEPENDENT_FOUNDERS.md`** - Primary audience deep-dive
- **`JTBD_INDEPENDENT_FOUNDERS.md`** - Jobs-to-be-done framework
- **`PERSONA_CONSULTANTS_AGENCIES.md`** - Secondary audience (post-beta)
- **`JTBD_CONSULTANTS_AGENCIES.md`** - Consultant jobs framework

---

**Document Status**: ✅ Ready for execution
**Last Updated**: November 14, 2025
**Maintained By**: Chris Walker + Development Team
**Review Cadence**: Weekly during implementation, then monthly post-launch
