---
purpose: "Private technical source of truth for AI Founders Architecture"
status: "active"
last_reviewed: "2025-11-20"
---

# AI Founders Architecture

## Three-Service Hub Model

```
                AI Founders Team
                (startupai-crew)
              [Core Intelligence]
                    ↙    ↘
        startupai.site   app.startupai.site
        [Transparency]     [Delivery]
         Public View      Customer Portal


Detail Flow:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Visitor → startupai.site (Next.js, Netlify)
          ├─ About/Team → Show AI Founders activity (from CrewAI)
          ├─ Pricing/CTA → redirect with plan → app.startupai.site/signup
          ├─ Waitlist → Formspree/Resend
          └─ Content/demos (static export)
                    ↓
          startupai-crew (CrewAI Python)
          ├─ 5 AI Founders (Sage, Forge, Pulse, Compass, Guardian)
          ├─ Market analysis & validation
          ├─ Activity feed for transparency
          └─ Results for customer delivery
                    ↓
          app.startupai.site (Next.js, Netlify)
          ├─ Supabase Auth (PKCE)
          ├─ Onboarding → CrewAI analysis trigger
          ├─ Dashboard/Fit Report display
          └─ Evidence ledger from AI analysis
```

## Core Services

| Service | Role | Technology | Repository |
|---------|------|------------|------------|
| **AI Founders Core** | Brain of StartupAI - market analysis, idea validation, strategy generation | CrewAI (Python), LangChain | `startupai-crew` |
| **Marketing Interface** | Public transparency, lead capture, AI team visibility | Next.js 15 (static), Netlify | `startupai.site` |
| **Product Interface** | Customer portal, validation delivery, results dashboard | Next.js App Router, Supabase | `app.startupai.site` |

## AI Founders Team (CrewAI Agents)

The five AI agents that run StartupAI:

1. **Sage (CEO)** - Strategic vision and market positioning
2. **Forge (CTO)** - Technical architecture and feasibility
3. **Pulse (CMO)** - Market analysis and go-to-market strategy
4. **Compass (COO)** - Operations and execution planning
5. **Guardian (Chief of Staff)** - Meta-governance and quality assurance

## Data Flow

### 1. Lead Capture Flow
```
Visitor → Marketing Site → Formspree/Waitlist → Notification
                       ↘
                         Supabase Auth → Product App
```

### 2. AI Analysis Flow
```
Customer Request → Product App → CrewAI Orchestration
                                    ↓
                              AI Founders Analysis
                                    ↓
                            Results & Recommendations
                                    ↓
                    Product Dashboard ← Marketing Transparency
```

### 3. Transparency Flow
```
CrewAI Activity → Activity Feed API
                    ↙          ↘
        Marketing Site        Product App
        (Public View)      (Customer View)
```

## Integration Points

### Marketing ↔ CrewAI
- **Activity Feed**: Real-time AI agent activity for About page
- **Case Studies**: Success stories from AI analysis
- **Trust Signals**: Live metrics and validation counts

### Marketing ↔ Product
- **Plan Routing**: Query params (`?plan=professional`)
- **Auth Handoff**: Supabase PKCE flow
- **Shared Design**: Shadcn UI components

### Product ↔ CrewAI
- **Analysis Triggers**: Onboarding → validation request
- **Result Delivery**: AI insights → customer dashboard
- **Progress Updates**: Real-time analysis status

## Technical Stack

### Shared Infrastructure
- **Database**: Supabase PostgreSQL with RLS
- **Authentication**: Supabase Auth (OAuth, JWT)
- **Analytics**: PostHog (events, funnels, cohorts)
- **Monitoring**: Supabase logs, Netlify deploys

### Service-Specific
- **CrewAI**: Python, LangChain, GPT-4, async task queues
- **Marketing**: Static Next.js, Formspree, edge functions
- **Product**: Next.js App Router, server components, API routes

## Service Contracts

Key contracts between services are documented in:
- [`service-contracts/marketing-to-app-contracts.md`](../service-contracts/marketing-to-app-contracts.md) - Plan IDs, auth flow
- [`service-contracts/crewai-api-contracts.md`](../service-contracts/crewai-api-contracts.md) - Activity feed, analysis API
- [`specs/api-contracts.md`](../specs/api-contracts.md) - Detailed API specifications

## Security Model

```
Public Layer (Marketing)
├─ No auth required
├─ Static content only
└─ Form submissions validated

AI Core (CrewAI)
├─ Service-to-service auth
├─ Rate limiting
└─ Sanitized outputs only

Authenticated Layer (Product)
├─ Supabase RLS policies
├─ Plan-based access control
└─ Session management
```

## Deployment Architecture

```
Production:
- startupai.site → Netlify CDN (static)
- app.startupai.site → Netlify (SSR + API)
- startupai-crew → [TBD: Railway/Render/AWS]
- Supabase → Hosted (shared database)

Development:
- localhost:3000 → Marketing dev
- localhost:3001 → Product dev
- localhost:8000 → CrewAI dev
- Supabase → Local or staging project
```

## Evolution Path

### Current State (Phase 3)
- CrewAI integration in progress
- Marketing transparency features building
- Three services loosely coupled

### Next Quarter
- Full CrewAI production deployment
- Real-time activity streaming
- Advanced agent collaboration features

### Future Vision
- Additional interfaces (mobile, API, plugins)
- Agent marketplace for specialized analysis
- White-label AI Founders Teams

## Key Decisions

1. **Hub-and-spoke over monolith**: Allows independent scaling and deployment
2. **AI-first architecture**: CrewAI is the core, not an add-on
3. **Transparency as differentiator**: Show the AI team's work publicly
4. **Static where possible**: Marketing site fully static for performance
5. **Service contracts over tight coupling**: Clean boundaries between services

For implementation details, see:
- [`ai-founders-architecture.md`](./ai-founders-architecture.md) - Implementation plan
- [`ai-founders-personas.md`](./ai-founders-personas.md) - Agent details
- [`../specs/crewai-integration.md`](../specs/crewai-integration.md) - Technical integration