# 🚀 StartupAI MVP Specification

**Product:** Evidence-Led Strategy Platform  
**Version:** 1.0 MVP  
**Date:** September 2025  
**Reference:** Synthesized from business analysis and technical architecture  

---

## MVP Scope & Objectives

### Primary Goal
Create a working prototype that demonstrates the **non-linear, hard-gated** Customer Discovery → Customer Development lifecycle with evidence-backed decisions, validating our core value proposition with real users.

### Success Criteria
- **User Validation:** 5+ beta users successfully create complete business models
- **Quality Benchmark:** External evaluators rate outputs ≥8/10 without knowing AI origin  
- **Time Savings:** 50%+ reduction vs manual business model creation
- **Evidence Integration:** Users can trace strategy decisions back to supporting evidence

---

## In-Scope Features (MVP)

### 0. Two-Site Architecture: Marketing → Product Flow

#### 0.1 Marketing Site (startupai.site) - "The Promise"
**Purpose:** Convert prospects to customers through optimized conversion experience

**Core Focus:**
- Marketing content and value proposition communication
- Free trial signup with minimal friction
- Cryptocurrency payment processing
- Conversion rate optimization
- Lead qualification and nurturing

**Components:**
- Landing page with clear value proposition
- "Try Free" call-to-action with social proof
- Streamlined registration (email + basic info only)
- Crypto wallet integration (MetaMask, WalletConnect)
- Payment processing (Bitcoin, Ethereum, USDC)
- Trial limitations and upgrade messaging
- **Secure authentication token generation for handoff**

**User Story:** *"As a potential customer, I want to understand the value and try the platform risk-free, then seamlessly transition to the full product experience."*

**Acceptance Criteria:**
- Landing page converts at >3% visitor-to-trial rate
- Registration completes in <90 seconds
- Payment processing completes in <10 minutes
- Trial limitations clearly communicated upfront
- Secure token handoff maintains user session
- Conversion tracking across entire funnel

#### 0.2 Product Platform (app.startupai.site) - "The Product"
**Purpose:** Deliver core value and create customer advocates through exceptional UX

**Core Focus:**
- Evidence-led strategy platform functionality
- User onboarding and value realization
- Feature adoption and engagement
- Customer satisfaction and retention
- Advocacy generation through results

**Components:**
- Secure token-based authentication receiver
- Guided onboarding flow for new users
- Complete hypothesis management system
- Evidence collection and analysis tools
- AI-powered insights and report generation
- Progress tracking and milestone celebrations

**User Story:** *"As an authenticated user, I want immediate access to powerful validation tools that help me build evidence-backed business strategies."*

**Acceptance Criteria:**
- Token handoff completes seamlessly (<3 seconds)
- New users reach first value within 10 minutes
- Core features have >80% adoption rate
- User satisfaction score >4.5/5
- Monthly active user retention >70%

**📋 Related Documentation:**
- **Authentication Implementation:** [Phase 4: Cross-Site Integration](../technical/two-site-implementation-plan.md#5-phase-4-cross-site-integration--handoff)
- **User Stories:** [Epic 0: Cross-Site Authentication](user-stories.md#epic-0-cross-site-authentication--handoff)
- **UX Design:** [Phase 2: Onboarding & First Value](../design/user-experience.md#phase-2-onboarding--first-value-app.startupai.site---10-20-minutes)

#### 0.3 Cross-Site Integration Requirements
**Authentication Handoff:**
- Shared Supabase authentication system
- JWT token generation on startupai.site
- Secure token validation on app.startupai.site
- Session persistence across domains
- Automatic user provisioning

**Data Synchronization:**
- User profile and subscription status
- Trial usage limits and upgrade triggers
- Conversion tracking and analytics
- Payment history and billing information

**Technical Implementation:**
```
startupai.site (Marketing)
    ↓ User Registration/Payment
    ↓ Generate Auth Token
    ↓ Redirect with Token
app.startupai.site (Product)
    ↓ Validate Token
    ↓ Create/Update User Session
    ↓ Begin Onboarding Flow
```

**📋 Implementation References:**
- **Detailed Technical Roadmap:** See [Two-Site Implementation Plan](../technical/two-site-implementation-plan.md)
- **System Architecture:** See [High-Level Architecture Specification](../technical/high_level_architectural_spec.md)
- **User Experience Design:** See [User Experience Design](../design/user-experience.md)
- **User Stories:** See [User Stories](user-stories.md)

### 1. Guided Intake Flow
**Purpose:** Transform raw startup ideas into structured project foundations

**Components:**
- Landing page with clear value proposition
- Project creation wizard
- Customer segment selector (ICP definition)
- Initial assumption capture (3+ key hypotheses)
- Business context questionnaire

**User Story:** *"As an entrepreneur with a rough idea, I want to quickly structure my concept so I can begin systematic validation."*

**Acceptance Criteria:**
- New project created in <5 minutes
- 3+ initial assumptions captured and categorized
- Customer segment clearly defined
- Project appears in user dashboard

### 2. Hypothesis Management Hub
**Purpose:** Central command for managing and tracking all business assumptions

**Components:**
- Hypothesis table with sortable columns
- Risk assessment chips (High/Medium/Low)
- Stage tracking (Discovery/Development)
- Assumption categorization (Desirability/Feasibility/Viability)
- Bulk editing and linking capabilities

**User Story:** *"As a founder, I want to see all my assumptions in one place so I can prioritize which ones to test first."*

**Acceptance Criteria:**
- Hypotheses sortable by risk, stage, and category
- Risk budget calculation and display
- Status reflected in Gate Scorecard
- Easy hypothesis creation and editing

### 3. Evidence Collection System
**Purpose:** Systematic ingestion and organization of validation evidence

**Components:**
- Multi-format evidence input (URLs, files, notes, interview transcripts)
- Auto-citation with source metadata
- Evidence quality scoring
- Hypothesis linking interface
- Evidence timeline and audit trail

**User Story:** *"As a researcher, I want to easily capture and organize evidence so it automatically connects to relevant hypotheses."*

**Acceptance Criteria:**
- Evidence linked to specific hypotheses
- Auto-extraction of metadata from URLs
- Confidence scores calculated and displayed
- Evidence searchable and filterable

### 4. Experiment Planning & Tracking
**Purpose:** Design and monitor validation experiments with clear outcomes

**Components:**
- Experiment designer with templates
- Strength classification (Weak/Medium/Strong)
- Success metrics definition
- Outcome recording and analysis
- Experiment-to-hypothesis mapping

**User Story:** *"As a startup founder, I want to design rigorous tests for my assumptions so I can make evidence-based decisions."*

**Acceptance Criteria:**
- Experiments mapped to hypotheses
- Clear success/failure criteria defined
- Outcomes drive gate pass/fail logic
- Experiment templates for common scenarios

### 5. Gate Scorecard System
**Purpose:** Enforce evidence thresholds before allowing progression

**Components:**
- Three-gate system (Desirability/Feasibility/Viability)
- Evidence requirement matrix
- Pass/fail logic with clear criteria
- Override capability with justification
- Progress blocking until requirements met

**User Story:** *"As a program manager, I want to ensure teams don't progress without sufficient evidence so we avoid building the wrong thing."*

**Acceptance Criteria:**
- Cannot progress without meeting evidence thresholds
- Clear visibility into what's needed to pass each gate
- Override trail maintained for audit
- Visual progress indicators

### 6. AI-Powered Report Generation
**Purpose:** Create professional, evidence-backed business documents

**Components:**
- Business Model Canvas generation
- Value Proposition Canvas creation
- Validation roadmap with experiment suggestions
- Executive summary with key insights
- Evidence citations and confidence indicators

**User Story:** *"As an entrepreneur, I want professional reports I can share with investors that show my thinking is evidence-based."*

**Acceptance Criteria:**
- Reports generated in <30 seconds
- All claims backed by evidence or marked as assumptions
- Professional formatting suitable for stakeholders
- Exportable to PDF and editable formats

### 7. Cryptocurrency Payment Integration
**Purpose:** Enable secure payments without traditional banking requirements

**Components:**
- Crypto wallet connection (MetaMask, WalletConnect)
- Multi-currency support (Bitcoin, Ethereum, USDC)
- Payment verification and confirmation
- Subscription management for recurring payments
- Transaction history and receipts

**User Story:** *"As a user ready to upgrade, I want to pay with cryptocurrency so I can access premium features without traditional payment barriers."*

**Acceptance Criteria:**
- Supports major crypto wallets
- Payment confirmation within 10 minutes
- Clear pricing in USD with crypto conversion
- Automatic access upgrade after payment
- Transaction receipts and history

---

## Out-of-Scope (MVP)

**Deferred to Later Phases:**
- Advanced authentication and user management
- Payment processing and subscription billing
- Real-time collaboration features
- Advanced AI model training
- Third-party integrations (Slack, Notion, etc.)
- Mobile native applications
- Advanced analytics and reporting
- White-label deployment options
- API for third-party developers

---

## Technical Implementation

### Architecture Overview
```
Two-Site Architecture:

startupai.site (Marketing)
├── Next.js Frontend
├── Crypto Payment Integration
├── Supabase Auth (Shared)
└── Token Generation
    ↓ Secure Handoff
app.startupai.site (Product)
├── Next.js Frontend
├── Netlify Functions (CrewAI)
├── Supabase (Data + Auth)
├── Vercel AI SDK (Models)
└── Token Validation

Shared Services:
├── Supabase Authentication
├── User Management Database
├── Payment Processing
└── Analytics Tracking
```

### Core Data Models

**Projects**
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  customer_segment JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Hypotheses**
```sql
CREATE TABLE hypotheses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  statement TEXT NOT NULL,
  category TEXT CHECK (category IN ('desirability', 'feasibility', 'viability')),
  risk_level TEXT CHECK (risk_level IN ('high', 'medium', 'low')),
  stage TEXT CHECK (stage IN ('discovery', 'development')),
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Evidence**
```sql
CREATE TABLE evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  source_type TEXT NOT NULL,
  source_url TEXT,
  content TEXT,
  confidence_score INTEGER CHECK (confidence_score BETWEEN 1 AND 10),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### AI Integration Points

**CrewAI Agents (Netlify Functions):**
1. **Onboarding Agent** - Structures initial project setup
2. **Research Agent** - Analyzes evidence and suggests insights  
3. **Validation Agent** - Recommends experiments and tests
4. **Report Agent** - Generates professional outputs
5. **QA Agent** - Reviews and improves all outputs

**Vercel AI SDK Models:**
- **GPT-4** for general reasoning and content generation
- **Claude** for analytical tasks and evidence synthesis
- **Gemini** for creative ideation and alternative perspectives

---

## User Experience Design

### Information Architecture
```
Dashboard
├── Projects Overview
├── Active Project
│   ├── Hypothesis Hub
│   ├── Evidence Inbox  
│   ├── Experiment Planner
│   ├── Gate Scorecard
│   └── Reports
└── Settings
```

### Key User Flows

**New User Onboarding:**
1. Sign up → Welcome tour → Create first project → Guided intake → First hypothesis created

**Daily Usage Pattern:**
1. Check dashboard → Review active experiments → Add new evidence → Update hypotheses → Generate reports

**Gate Progression:**
1. Review scorecard → Identify missing evidence → Run experiments → Collect results → Pass gate or iterate

---

## Success Metrics & KPIs

### User Engagement
- **Activation Rate:** % of users who complete first project setup
- **Time to Value:** Minutes from signup to first generated report
- **Session Duration:** Average time spent per session
- **Feature Adoption:** % of users using each core feature

### Product Quality
- **Evidence Quality Score:** Average confidence rating of collected evidence
- **Hypothesis Validation Rate:** % of hypotheses that get tested
- **Gate Pass Rate:** % of projects that successfully pass each gate
- **User Satisfaction:** NPS score and qualitative feedback

### Business Impact
- **User Retention:** % of users active after 7, 30, 90 days
- **Upgrade Intent:** % of MVP users interested in paid tiers
- **Referral Rate:** % of users who refer others
- **Time Savings:** Measured reduction vs manual process

---

## Testing Strategy

### Alpha Testing (Internal)
- **Duration:** 2 weeks
- **Participants:** Internal team + 2-3 friendly users
- **Focus:** Core functionality, major bugs, user flow validation

### Beta Testing (External)
- **Duration:** 4 weeks  
- **Participants:** 10-15 target users across personas
- **Focus:** User experience, value validation, feature completeness

### Success Criteria for Launch
- **Functionality:** All core features working without critical bugs
- **Performance:** <3 second response times for AI generation
- **User Feedback:** Average rating ≥4/5 from beta users
- **Business Validation:** Clear intent to pay from ≥30% of beta users

---

## Launch Plan

### Pre-Launch (Week -2)
- Final bug fixes and performance optimization
- User documentation and help content
- Analytics and monitoring setup
- Beta user feedback incorporation

### Launch Week
- Soft launch to waitlist
- Product Hunt submission
- Social media announcement
- Founder community outreach

### Post-Launch (Week +2)
- User feedback collection and analysis
- Performance monitoring and optimization
- Feature usage analysis
- Planning for next iteration

---

This MVP specification provides the detailed roadmap for building and validating the core StartupAI concept, ensuring we can test our key hypotheses with real users while maintaining focus on essential features.
