# 🔧 Two-Site Implementation Plan

**System:** StartupAI Cross-Site Architecture  
**Author:** AI Assistant  
**Date:** September 2025  
**Last Updated:** October 4, 2025  
**Status:** Phase 1 Complete (OAuth + Role Routing) | Phase 2 In Progress  

---

## Related Documentation & Runbooks

- `app.startupai.site/docs/operations/implementation-status.md` — weekly audit of delivery progress and open issues.
- `app.startupai.site/docs/operations/database-seeding.md` — operative Supabase seeding instructions and troubleshooting.
- `app.startupai.site/docs/operations/routing-consolidation-plan.md` — decision log for the dual-router clean-up options.
- `app.startupai.site/docs/engineering/30-data/supabase-setup.md` — system-level Supabase configuration steps.
- `app.startupai.site/docs/operations/implementation-status.md` — latest role-aware redirect or environment updates.

## 1. Implementation Overview

This document provides a detailed technical roadmap for implementing the StartupAI two-site architecture, where **startupai.site** (marketing) converts prospects to customers and **app.startupai.site** (product) delivers core value and creates advocates.

**📋 Related Documentation:**
- **Business Requirements:** [MVP Specification](../product/mvp-specification.md)
- **System Architecture:** [High-Level Architecture Specification](high_level_architectural_spec.md)
- **User Requirements:** [User Stories](../product/user-stories.md)
- **UX Design:** [User Experience Design](../design/user-experience.md)
- **Accessibility Standards:** [WCAG 2.0/2.1/2.2 Compliance](../design/accessibility-standards.md)
- **🤖 CrewAI Backend Implementation:** [Complete Guide](../../../app.startupai.site/backend/CREW_AI.md)

### Key Implementation Phases
1. **Phase 1:** Shared Authentication Infrastructure (Week 1-2)
2. **Phase 2:** Marketing Site Optimization (Week 3-4)
3. **Phase 3:** Product Platform Core Features (Week 5-8)
4. **Phase 4:** Cross-Site Integration & Handoff (Week 9-10)
5. **Phase 5:** Analytics & Optimization (Week 11-12)

---

## 2. Phase 1: Shared Authentication Infrastructure

### 2.1 Supabase Setup & Configuration

**Objective:** Establish shared authentication system for both sites

**Operational Runbooks:** Day-to-day instructions for provisioning, seeding, and verifying Supabase now live in `app.startupai.site/docs/operations/database-seeding.md` and `app.startupai.site/docs/engineering/30-data/supabase-setup.md`. This section keeps the architectural intent only.

**Tasks:**
- [x] Create Supabase project with shared database ✅ **Complete (Oct 1, 2025)** - Project: StartupAI (`eqxropalhxjeyvfcoyxg`)
- [x] Install and configure Supabase CLI ✅ **Complete**
- [x] Environment configuration ✅ **Complete** - backend/.env, frontend/.env.local
- [ ] Enable required database extensions (vector, uuid-ossp, pg_net, hstore) ⚠️ **Pending manual enable**
- [ ] Configure authentication providers (Google, GitHub, Azure, Email)
- [ ] Set up magic link authentication for passwordless login
- [ ] Configure connection pooling (Supavisor in transaction mode)
- [ ] Set up Row Level Security (RLS) policies
- [ ] Create user management tables and functions
- [ ] Implement JWT token signing and validation
- [ ] Configure Drizzle ORM for type-safe database operations

**Implementation Notes:**
- Authoritative SQL now ships via `app.startupai.site/supabase/migrations/` (versioned migrations). Consult those files instead of inline snippets.
- Storage and RLS policies are tracked in migrations and summarized in the weekly audit (`docs/operations/implementation-status.md`).
- Drizzle configuration lives alongside the codebase (`frontend/src/db/schema/*`).

**📋 Cross-References:**
- **Business Context:** [MVP Spec - Cross-Site Integration Requirements](../product/mvp-specification.md#03-cross-site-integration-requirements)
- **Architecture Details:** [High-Level Architecture - Security Architecture](high_level_architectural_spec.md#6-security-architecture)
- **User Stories:** [Epic 0: Cross-Site Authentication](../product/user-stories.md#epic-0-cross-site-authentication--handoff)

---

## 3. Phase 2: Marketing Site Optimization (startupai.site)

### 3.1 Conversion-Focused Frontend

**Objective:** Build high-converting marketing site with seamless handoff capability

**Key Components:**
- [ ] Landing page with A/B testing capability
- [ ] Streamlined signup flow (email + basic info only)
- [ ] Cryptocurrency payment integration
- [ ] Social proof and testimonials system
- [ ] JWT token generation for handoff

**Technology Stack:**
```typescript
// Next.js 15 with App Router
// Tailwind CSS for styling
// Framer Motion for animations
// React Hook Form for forms
// Supabase client for auth
// Drizzle ORM for database operations
// pnpm for package management (✅ Migrated)
```

**Critical Features:**
```typescript
// Crypto payment integration
interface PaymentConfig {
  supportedCurrencies: ['BTC', 'ETH', 'USDC'];
  walletProviders: ['MetaMask', 'WalletConnect'];
  paymentProcessor: 'custom'; // or third-party service
}

// Token generation for handoff
async function generateHandoffToken(userId: string): Promise<string> {
  const payload = {
    userId,
    subscriptionStatus: await getUserSubscription(userId),
    permissions: await getUserPermissions(userId),
    exp: Math.floor(Date.now() / 1000) + (5 * 60), // 5 minutes
    iat: Math.floor(Date.now() / 1000),
    iss: 'startupai.site',
    aud: 'app.startupai.site'
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET);
}
```

**Performance Requirements:**
- Landing page load time: <2 seconds
- Signup completion: <90 seconds
- Payment processing: <10 minutes
- Token generation: <1 second

### 3.2 Analytics & Conversion Tracking

**Implementation:**
```typescript
// Cross-site analytics setup
interface AnalyticsEvent {
  event: string;
  userId?: string;
  sessionId: string;
  site: 'marketing' | 'product';
  properties: Record<string, any>;
  timestamp: Date;
}

// Track conversion funnel
const trackConversionEvent = (event: string, properties: any) => {
  analytics.track({
    event,
    userId: user?.id,
    sessionId: getSessionId(),
    site: 'marketing',
    properties,
    timestamp: new Date()
  });
};
```

---

## 4. Phase 3: Product Platform Core Features (app.startupai.site)

### 4.1 Authentication Receiver & User Onboarding

**Objective:** Seamlessly receive users from marketing site and deliver immediate value

**Key Components:**
- [ ] JWT token validation endpoint
- [ ] User session creation and management
- [ ] Guided onboarding flow
- [ ] Project creation wizard
- [ ] First-time user experience optimization

**Token Validation Implementation:**
```typescript
// API route: /api/auth/handoff
export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    
    // Validate JWT token
    const payload = jwt.verify(token, process.env.JWT_SECRET) as HandoffPayload;
    
    // Verify token audience and issuer
    if (payload.aud !== 'app.startupai.site' || payload.iss !== 'startupai.site') {
      throw new Error('Invalid token audience or issuer');
    }
    
    // Create or update user session
    const session = await createUserSession(payload.userId, payload);
    
    // Track successful handoff
    await trackHandoffSuccess(payload.userId, token);
    
    return NextResponse.json({ 
      success: true, 
      sessionId: session.id,
      redirectTo: '/onboarding'
    });
    
  } catch (error) {
    await trackHandoffError(error, token);
    return NextResponse.json({ 
      success: false, 
      error: 'Authentication failed' 
    }, { status: 401 });
  }
}
```

### 4.2 Core Platform Features

**Evidence-Led Strategy Tools:**
- [ ] Hypothesis management system
- [ ] Evidence collection and analysis
- [ ] AI-powered insights generation
- [ ] Gate progression tracking
- [ ] Professional report generation

**CrewAI Integration:**

**📖 Complete Implementation Guide:** [CREW_AI.md](../../../app.startupai.site/backend/CREW_AI.md)

```typescript
// AI workflow orchestration (frontend integration)
interface CrewAIConfig {
  agents: [
    'onboarding-agent',      // → Entrepreneur Brief
    'customer-researcher',   // → Customer Profile
    'competitor-analyst',    // → Positioning Map
    'value-designer',        // → Value Proposition Canvas
    'validation-agent',      // → Validation Roadmap
    'qa-agent'              // → Quality Audit
  ];
  models: {
    primary: 'gpt-4',
    fallback: 'claude-3',
    creative: 'gemini-pro'
  };
  process: 'sequential';  // v1.0 (concurrent planned for v1.1)
}

// Vercel AI SDK integration for hot-swappable models
const aiService = new AIService({
  providers: ['openai', 'anthropic', 'google'],
  fallbackStrategy: 'round-robin',
  responseTimeout: 30000
});
```

---

## 5. Phase 4: Cross-Site Integration & Handoff

### 5.1 Seamless User Transition

**Implementation Steps:**
1. **Marketing Site Handoff Trigger:**
   ```typescript
   // After successful payment/signup
   const handleSuccessfulConversion = async (userId: string) => {
     // Generate secure handoff token
     const token = await generateHandoffToken(userId);
     
     // Preload product platform assets
     await preloadPlatformAssets();
     
     // Redirect with token
     window.location.href = `${PRODUCT_PLATFORM_URL}/auth/handoff?token=${token}`;
   };
   ```

2. **Product Platform Token Reception:**
   ```typescript
   // /auth/handoff page component
   export default function HandoffPage() {
     const [status, setStatus] = useState('validating');
     
     useEffect(() => {
       const validateAndRedirect = async () => {
         try {
           const token = new URLSearchParams(window.location.search).get('token');
           const result = await fetch('/api/auth/handoff', {
             method: 'POST',
             body: JSON.stringify({ token })
           });
           
           if (result.ok) {
             setStatus('success');
             router.push('/onboarding');
           } else {
             setStatus('error');
           }
         } catch (error) {
           setStatus('error');
         }
       };
       
       validateAndRedirect();
     }, []);
     
     return <HandoffStatusComponent status={status} />;
   }
   ```

### 5.2 Error Handling & Recovery

**Robust Error Handling:**
```typescript
// Comprehensive error recovery
const handleHandoffError = (error: HandoffError) => {
  switch (error.type) {
    case 'TOKEN_EXPIRED':
      return {
        message: 'Your session has expired. Redirecting you back to sign in.',
        action: 'redirect',
        url: `${MARKETING_SITE_URL}/login?reason=expired`
      };
      
    case 'TOKEN_INVALID':
      logSecurityIncident(error);
      return {
        message: 'Authentication failed. Please try signing in again.',
        action: 'redirect',
        url: `${MARKETING_SITE_URL}/login?reason=invalid`
      };
      
    case 'USER_NOT_FOUND':
      return {
        message: 'Setting up your account...',
        action: 'create_user',
        data: error.tokenPayload
      };
      
    default:
      return {
        message: 'Something went wrong. Our team has been notified.',
        action: 'show_support',
        supportEmail: 'support@startupai.site'
      };
  }
};
```

---

## 6. Phase 5: Analytics & Optimization

### 6.1 Cross-Site Analytics Implementation

**Unified Analytics Pipeline:**
```typescript
// Shared analytics service
class CrossSiteAnalytics {
  private analytics: Analytics;
  
  constructor() {
    this.analytics = new Analytics({
      writeKey: process.env.SEGMENT_WRITE_KEY,
      plugins: [
        new CrossSiteTrackingPlugin(),
        new ConversionAttributionPlugin()
      ]
    });
  }
  
  trackUserJourney(event: AnalyticsEvent) {
    // Add cross-site context
    const enrichedEvent = {
      ...event,
      context: {
        site: getCurrentSite(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        sessionId: getSessionId(),
        userId: getCurrentUserId()
      }
    };
    
    this.analytics.track(enrichedEvent);
  }
  
  trackConversion(conversionData: ConversionEvent) {
    // Attribution across sites
    this.analytics.track('Conversion', {
      ...conversionData,
      attribution: {
        firstTouch: getFirstTouchAttribution(),
        lastTouch: getLastTouchAttribution(),
        journey: getUserJourneySteps()
      }
    });
  }
}
```

### 6.2 Performance Monitoring

**Real-Time Performance Tracking:**
```typescript
// Performance monitoring setup
const performanceMonitor = {
  // Marketing site metrics
  trackLandingPageLoad: () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    analytics.track('Landing Page Load', { loadTime });
  },
  
  // Handoff performance
  trackHandoffDuration: (startTime: number) => {
    const duration = Date.now() - startTime;
    analytics.track('Handoff Duration', { duration });
  },
  
  // Product platform metrics
  trackTimeToFirstValue: (userId: string, startTime: number) => {
    const timeToValue = Date.now() - startTime;
    analytics.track('Time to First Value', { userId, timeToValue });
  }
};
```

---

## 7. Deployment Strategy

### 7.1 Infrastructure Setup

**Site Deployments:**
- **startupai.site:** Netlify deployment (✅ Live at https://startupai-site.netlify.app)
- **app.startupai.site:** Netlify deployment (✅ Live at https://app-startupai-site.netlify.app)
- **Shared Services:** Supabase (database, auth, storage, vector search)
- **AI Services:** Netlify Functions for CrewAI workflows
- **Package Management:** pnpm across all repositories (✅ Migrated)

**Environment Configuration:**
```bash
# Marketing Site (.env.local)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:6543/postgres?workaround=supabase-pooler.vercel
JWT_SECRET=your-jwt-secret
PRODUCT_PLATFORM_URL=https://app-startupai-site.netlify.app

# Product Platform (.env.local)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:6543/postgres?workaround=supabase-pooler.vercel
JWT_SECRET=your-jwt-secret
MARKETING_SITE_URL=https://startupai-site.netlify.app
CREWAI_API_URL=https://your-netlify-functions.netlify.app
OPENAI_API_KEY=your-openai-key
```

### 7.2 Testing Strategy

**Cross-Site Testing:**
```typescript
// E2E testing with Playwright
describe('Cross-Site User Journey', () => {
  test('complete signup to platform flow', async ({ page }) => {
    // Start on marketing site
    await page.goto('https://startupai.site');
    
    // Complete signup
    await page.click('[data-testid="signup-button"]');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.click('[data-testid="submit-signup"]');
    
    // Verify handoff to product platform
    await expect(page).toHaveURL(/platform\.startupai\.site/);
    await expect(page.locator('[data-testid="welcome-message"]')).toBeVisible();
    
    // Verify user session is active
    const userProfile = await page.locator('[data-testid="user-profile"]');
    await expect(userProfile).toContainText('test@example.com');
  });
});
```

---

## 8. Success Metrics & KPIs

### 8.1 Technical Metrics
- **Handoff Success Rate:** >99.5%
- **Token Validation Time:** <2 seconds
- **Cross-Site Load Time:** <3 seconds total
- **Error Recovery Rate:** >95%

### 8.2 Business Metrics
- **Conversion Rate:** Marketing site to platform >15%
- **Time to First Value:** <10 minutes
- **User Retention:** >70% at 30 days
- **Support Ticket Reduction:** >50% through better UX

### 8.3 User Experience Metrics
- **Handoff Satisfaction:** >4.5/5
- **Onboarding Completion:** >90%
- **Feature Adoption:** >80% for core features
- **Net Promoter Score:** >50

---

## 9. Risk Mitigation

### 9.1 Technical Risks
- **Token Security:** Regular security audits, short expiration times
- **Site Availability:** Multi-region deployment, CDN distribution
- **Data Consistency:** Real-time sync monitoring, conflict resolution
- **Performance Degradation:** Load testing, performance budgets

### 9.2 Business Risks
- **Conversion Drop:** A/B testing, gradual rollout
- **User Confusion:** Clear messaging, comprehensive testing
- **Support Overhead:** Self-service options, detailed error messages

---

## 10. Next Steps

### Immediate Actions (Week 1)
1. ✅ Install Supabase CLI and configure development environment **Complete**
2. ✅ Set up Supabase project (StartupAI - `eqxropalhxjeyvfcoyxg`) **Complete**
3. ⚠️ Enable database extensions (vector, uuid-ossp, pg_net, hstore) **Manual step required**
4. 🔄 Configure Drizzle ORM with type-safe schemas **Next task**
5. Implement basic JWT token generation and validation

**Current Progress:** Tasks 1-2 complete, Task 3 pending manual Dashboard action
6. Set up vector search functions and storage buckets
7. Set up cross-site analytics tracking

### Short-term Goals (Month 1)
1. Complete Phase 1-3 implementation
2. Conduct security audit of handoff mechanism
3. Implement comprehensive error handling
4. Begin user testing with beta group

### Long-term Vision (Quarter 1)
1. Achieve target conversion and retention metrics
2. Optimize based on user feedback and analytics
3. Scale infrastructure for increased traffic
4. Plan additional features and integrations

---

This implementation plan provides a comprehensive roadmap for building the StartupAI two-site architecture, ensuring seamless user experience while maintaining security, performance, and scalability.
