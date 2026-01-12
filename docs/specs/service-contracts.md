---
purpose: "Document service contracts between AI Core, Marketing, and Product interfaces"
status: "active"
last_reviewed: "2025-11-20"
---

# AI Founders Architecture Service Contracts

The three services (AI Core, Marketing Interface, Product Interface) share authentication, analytics, and data flows. This document captures the agreed contracts to ensure seamless service integration.

## Service Overview

- **AI Core (startupai-crew)**: CrewAI agents providing market analysis and validation
- **Marketing Interface (startupai.site)**: Public transparency and lead capture
- **Product Interface (app.startupai.site)**: Customer portal and delivery

## Plan & CTA Mapping

| Marketing Plan (query param) | Product Plan Type | AI Analysis Depth | Notes |
| --- | --- | --- | --- |
| `trial` | `trial` | Basic validation | Free tier. Limited AI analysis. |
| `strategy-sprint` | `sprint` | Full sprint analysis | One-time deep dive by all agents. |
| `founder-platform` | `founder` | Continuous analysis | Subscription with ongoing AI insights. |
| `agency-co-pilot` | `enterprise` | Custom workflows | Multi-seat with tailored AI agents. |

- Marketing constructs CTAs: `${NEXT_PUBLIC_APP_URL}/signup?plan=<id>` (see `src/app/pricing/page.tsx`)
- Product stores selection in Supabase via `frontend/src/app/auth/callback/route.ts`
- CrewAI receives plan tier to determine analysis depth via API

## AI Core ↔ Marketing Contracts

### Activity Feed API

**⚠️ STATUS: NOT IMPLEMENTED** - This is an aspirational contract. Implementation pending.

```
GET /api/v1/agents/activity
Response: {
  agents: [{
    name: "Sage" | "Forge" | "Pulse" | "Compass" | "Guardian",
    status: "analyzing" | "idle" | "reporting",
    currentTask: string,
    lastUpdate: timestamp
  }],
  totalAnalyses: number,
  activeProjects: number
}
```

### Trust Metrics API

**⚠️ STATUS: NOT IMPLEMENTED** - This is an aspirational contract. Implementation pending.

```
GET /api/v1/metrics/public
Response: {
  validationsCompleted: number,
  marketsAnalyzed: number,
  successStories: number,
  agentUptime: percentage
}
```

### Marketing Display Requirements
- Update AI team activity every 30 seconds on About page
- Show real-time agent status during demos
- Display aggregate metrics on homepage trust ribbon

## AI Core ↔ Product Contracts

### Analysis Request API

**⚠️ STATUS: NOT IMPLEMENTED** - This is an aspirational contract. Current implementation uses Modal endpoints directly.

```
POST /api/v1/analysis/start
Body: {
  userId: string,
  planTier: "trial" | "sprint" | "founder" | "enterprise",
  projectData: {
    idea: string,
    market: string,
    targetCustomers: string,
    // ... onboarding data
  }
}
Response: {
  analysisId: string,
  estimatedCompletion: timestamp,
  assignedAgents: string[]
}
```

### Results Delivery API

**⚠️ STATUS: NOT IMPLEMENTED** - This is an aspirational contract. Current implementation uses Modal endpoints directly.

```
GET /api/v1/analysis/{analysisId}/results
Response: {
  status: "pending" | "processing" | "complete",
  results: {
    marketAnalysis: object,     // From Pulse
    technicalFeasibility: object, // From Forge
    strategicRecommendations: object, // From Sage
    operationalPlan: object,    // From Compass
    qualityReport: object       // From Guardian
  }
}
```

### Progress Webhooks

**⚠️ STATUS: NOT IMPLEMENTED** - This is an aspirational contract. Current implementation uses Modal webhooks.

```
POST {PRODUCT_WEBHOOK_URL}/analysis/progress
Body: {
  analysisId: string,
  stage: string,
  percentComplete: number,
  currentAgent: string,
  message: string
}
```

## Marketing ↔ Product Contracts (Existing)

### Authentication Redirect
1. Marketing CTA or login form redirects to `app.startupai.site`
2. Product handles Supabase PKCE exchange and sets cookies
3. Product returns users to onboarding or dashboard based on role

Marketing must not attempt to set Supabase cookies; all auth logic lives in the product repo.

### Analytics Events
- Shared event taxonomy (see `docs/dev/analytics-seo.md`)
- Marketing fires `signup_started` before redirect
- Product confirms `signup_completed`
- CrewAI logs `analysis_started` and `analysis_completed`

## Three-Service Data Flow

```
1. Lead Capture (Marketing → Product)
   - Marketing captures lead
   - Redirects with plan selection
   - Product creates user account

2. Analysis Trigger (Product → AI Core)
   - Product completes onboarding
   - Sends analysis request to CrewAI
   - Receives analysis ID for tracking

3. Transparency (AI Core → Marketing)
   - CrewAI publishes activity feed
   - Marketing displays AI team status
   - Shows aggregate success metrics

4. Results Delivery (AI Core → Product)
   - CrewAI completes analysis
   - Product receives results via API
   - Displays in customer dashboard
```

## Status & Trust Signals

- **AI Status**: `https://api.startupai-crew.com/status` (CrewAI health)
- **Marketing Status**: `https://status.startupai.site` (Netlify status)
- **Product Status**: `https://app.startupai.site/api/status` (App health)
- **Unified Dashboard**: Marketing aggregates all three for public display

## Data Sharing Agreements

### Marketing → AI Core
- No direct data flow (all via Product)

### Marketing → Product
- Waitlist leads exported weekly from Supabase
- Plan selection via query parameters
- UTM parameters for attribution

### Product → AI Core
- User profile and plan tier
- Onboarding conversation data
- Project requirements for analysis

### AI Core → Marketing
- Public activity feed (sanitized, no PII)
- Aggregate metrics and success counts
- Agent status for transparency

### AI Core → Product
- Full analysis results (private)
- Progress updates via webhooks
- Evidence and recommendations

## Security Boundaries

- **AI Core**: Service-to-service auth only (API keys)
- **Marketing**: Public read-only APIs, no auth required
- **Product**: Full Supabase RLS, user-scoped data
- **Cross-service**: JWT tokens for service authentication

## Change Management Protocol

1. **Propose** in shared architecture channel
2. **Document** in all three service repos
3. **Version** APIs with backwards compatibility
4. **Test** in staging with all three services
5. **Deploy** in sequence: AI Core → Product → Marketing
6. **Monitor** cross-service health checks post-deploy

## API Versioning Strategy

- All APIs use `/api/v{n}/` versioning
- Breaking changes require new version
- Deprecation notice: 30 days minimum
- Sunset period: 90 days for major versions

## SLA Commitments

| Service | Uptime Target | Response Time | Rate Limits |
| --- | --- | --- | --- |
| AI Core APIs | 99.5% | < 2s (status), < 30s (analysis start) | 100 req/min |
| Marketing Site | 99.9% | < 100ms (static) | Unlimited |
| Product APIs | 99.5% | < 500ms | 1000 req/min per user |

## Contact Points

- **AI Core Team**: ai-platform@startupai.site
- **Marketing Team**: growth@startupai.site
- **Product Team**: platform@startupai.site
- **Incidents**: ops@startupai.site (all services)
