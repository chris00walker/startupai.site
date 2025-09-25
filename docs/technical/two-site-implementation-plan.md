# 🔧 Two-Site Implementation Plan

**System:** StartupAI Cross-Site Architecture  
**Author:** AI Assistant  
**Date:** September 2025  
**Status:** Implementation Ready  

---

## 1. Implementation Overview

This document provides a detailed technical roadmap for implementing the StartupAI two-site architecture, where **startupai.site** (marketing) converts prospects to customers and **app.startupai.site** (product) delivers core value and creates advocates.

**📋 Related Documentation:**
- **Business Requirements:** [MVP Specification](../product/mvp-specification.md)
- **System Architecture:** [High-Level Architecture Specification](high_level_architectural_spec.md)
- **User Requirements:** [User Stories](../product/user-stories.md)
- **UX Design:** [User Experience Design](../design/user-experience.md)

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

**Tasks:**
- [ ] Create Supabase project with shared database
- [ ] Configure authentication providers (Google, GitHub, Email)
- [ ] Set up Row Level Security (RLS) policies
- [ ] Create user management tables and functions
- [ ] Implement JWT token signing and validation

**Database Schema:**
```sql
-- Enhanced user profiles for cross-site usage
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  company TEXT,
  role TEXT,
  subscription_status TEXT DEFAULT 'trial',
  subscription_tier TEXT DEFAULT 'free',
  trial_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Cross-site session tracking
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  site TEXT NOT NULL, -- 'marketing' or 'product'
  session_token TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Handoff tracking for analytics
CREATE TABLE site_handoffs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  source_site TEXT NOT NULL,
  target_site TEXT NOT NULL,
  handoff_token TEXT NOT NULL,
  success BOOLEAN DEFAULT FALSE,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Security Configuration:**
```sql
-- RLS Policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_handoffs ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);
```

**Deliverables:**
- Supabase project configured and deployed
- Authentication flows tested on both domains
- JWT token generation and validation functions
- Security audit completed

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
// Next.js 14 with App Router
// Tailwind CSS for styling
// Framer Motion for animations
// React Hook Form for forms
// Supabase client for auth
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
```typescript
// AI workflow orchestration
interface CrewAIConfig {
  agents: [
    'onboarding-agent',
    'research-agent', 
    'validation-agent',
    'report-agent',
    'qa-agent'
  ];
  models: {
    primary: 'gpt-4',
    fallback: 'claude-3',
    creative: 'gemini-pro'
  };
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
- **startupai.site:** Vercel deployment with custom domain
- **app.startupai.site:** Vercel deployment with custom domain
- **Shared Services:** Supabase (database, auth, storage)
- **AI Services:** Netlify Functions for CrewAI workflows

**Environment Configuration:**
```bash
# Marketing Site (.env.local)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
JWT_SECRET=your-jwt-secret
PRODUCT_PLATFORM_URL=https://platform.startupai.site

# Product Platform (.env.local)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
JWT_SECRET=your-jwt-secret
MARKETING_SITE_URL=https://startupai.site
CREWAI_API_URL=https://your-netlify-functions.netlify.app
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
1. Set up Supabase project and configure authentication
2. Create development environments for both sites
3. Implement basic JWT token generation and validation
4. Set up cross-site analytics tracking

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
