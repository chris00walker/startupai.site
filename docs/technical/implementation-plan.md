# 🛠️ StartupAI Implementation Plan

**Product:** Evidence-Led Strategy Platform  
**Stack:** Netlify + Supabase + Vercel AI SDK  
**Date:** September 2025  
**Last Updated:** October 4, 2025 (post-audit refresh)  

---

## Development Roadmap

### Phase 1: Foundation (Weeks 1-4)
**Goal:** Core infrastructure and secure handoff between marketing site and product application

**Status Snapshot (Oct 4, 2025):**
- ✅ Dual-site deployment live on Netlify with pnpm-based pipelines
- ✅ Supabase project, schema, RLS, and read-side Drizzle queries in place
- ✅ Marketing login/signup using Supabase email/password + GitHub OAuth
- ⚠️ Secure token handoff + cross-site QA still pending
- ❌ CrewAI backend not yet implemented (blocks AI workflows)

**Architecture Note:** 
- **startupai.site** = Marketing, conversion, payments (The Promise)
- **app.startupai.site** = Product functionality (The Product)
- Secure authentication handoff between sites

#### Week 1: Dual-Site Setup
- [x] Supabase project creation and configuration (shared between sites) ✅ **Complete Oct 1, 2025** - Project: StartupAI (`eqxropalhxjeyvfcoyxg`)
- [x] startupai.site Next.js setup (marketing/conversion focus) ✅ **Complete**
- [x] app.startupai.site Next.js setup (product functionality) ✅ **Complete**
- [x] Netlify deployment pipeline configuration ✅ **Complete**

**📋 Supabase Deliverables (Oct 4, 2025):** [Setup Documentation](../../../app.startupai.site/docs/engineering/30-data/supabase-setup.md)
- ✅ Shared Supabase authentication (email/password + GitHub) across both codebases
- ⚠️ Secure token-based handoff mechanism awaiting end-to-end validation and regression testing
- ✅ Database schema creation and migrations (7 Drizzle migrations deployed)
- ✅ Row Level Security (RLS) policies active on core tables
- ⚠️ Database extensions (pgvector, pg_net, hstore) pending manual enable; uuid-ossp active
- ❌ Storage buckets migration (`00003_storage_buckets.sql`) not yet applied

#### Week 2: Core Data Models
- [x] Projects table and read-side queries (`useProjects`) ✅
- [x] Hypotheses/evidence/experiments schema deployed ✅ (Supabase migrations 00001-00005)
- ⚠️ Evidence + experiments CRUD endpoints still use mock data (replace with Drizzle mutations)
- ✅ User profiles and role metadata stored in Supabase
- ❌ Netlify Functions APIs (CrewAI, CRUD mutations) not implemented (pending backend work)

#### Week 3: Frontend Foundation
- [x] Dashboard layout, navigation, and metrics ✅
- ⚠️ Project creation flow wired to mock data (needs mutation hookup)
- ⚠️ Hypothesis/Evidence/Experiment interfaces built but rely on mock fixtures
- ✅ Responsive design + ShadCN component system delivered

#### Week 4: AI Integration & Freemium Setup
- ❌ Vercel AI SDK integration (pending backend completion)
- ❌ CrewAI agent framework setup (spec ready, code missing)
- ❌ Prompt/response handling, rate limiting, freemium instrumentation – all pending backend implementation

### Phase 2: Core Features (Weeks 5-8)
**Goal:** Complete MVP user flows once backend + data integration unblockers resolved

#### Week 5: Hypothesis & Evidence System
- ⚠️ Advanced hypothesis categorization & linking UI ready; persistence/backend logic pending
- ❌ Confidence scoring, risk budgets, and timelines remain on roadmap

#### Week 6: Experiment Planning
- ⚠️ Experiment UI shell exists; requires Supabase mutations + analytics
- ❌ Outcome analytics & statistical tooling not started

#### Week 7: Gate Management System
- ⚠️ UI scaffolding in place (stage indicators, dashboards)
- ❌ Gate logic, overrides, and historical persistence outstanding

#### Week 8: Crypto Payment Integration
- 🛈 Deferred — crypto payments remain planned but not in current sprint scope; update roadmap post-backend delivery

### Phase 3: Polish & Testing (Weeks 9-12)
**Goal:** Production-ready MVP (dependent on completion of backend + storage tasks)

#### Week 9: Report Generation
- [ ] Professional report templates
- [ ] PDF export functionality
- [ ] Evidence citation system
- [ ] Confidence indicators
- [ ] Sharing and collaboration features

#### Week 10: Performance & Security
- ⚠️ Monitoring/error handling partially covered by Supabase + Netlify defaults; dedicated instrumentation pending

#### Week 11: User Experience
- [ ] UI/UX refinement
- [ ] Mobile responsiveness
- [ ] Accessibility compliance
- [ ] User onboarding flow
- [ ] Help documentation

#### Week 12: Testing & Launch Prep
- ⚠️ Jest + Playwright suites configured; require new CI run post-feature integration
- ❌ Beta testing, analytics instrumentation, launch checklists queued after backend delivery

---

## Technical Architecture

### Database Schema (Supabase PostgreSQL)

```sql
-- Core Tables
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  customer_segment JSONB,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE hypotheses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  statement TEXT NOT NULL,
  category TEXT CHECK (category IN ('desirability', 'feasibility', 'viability')),
  risk_level TEXT CHECK (risk_level IN ('high', 'medium', 'low')),
  stage TEXT CHECK (stage IN ('discovery', 'development')),
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  source_type TEXT NOT NULL,
  source_url TEXT,
  content TEXT,
  metadata JSONB,
  confidence_score INTEGER CHECK (confidence_score BETWEEN 1 AND 10),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE evidence_hypotheses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evidence_id UUID REFERENCES evidence(id),
  hypothesis_id UUID REFERENCES hypotheses(id),
  relevance_score INTEGER CHECK (relevance_score BETWEEN 1 AND 10),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE experiments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hypothesis_id UUID REFERENCES hypotheses(id),
  name TEXT NOT NULL,
  description TEXT,
  strength TEXT CHECK (strength IN ('weak', 'medium', 'strong')),
  success_metric TEXT,
  expected_effect TEXT,
  status TEXT DEFAULT 'planned',
  results JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE gates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  gate_type TEXT CHECK (gate_type IN ('desirability', 'feasibility', 'viability')),
  status TEXT DEFAULT 'pending',
  evidence_threshold INTEGER DEFAULT 3,
  passed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User subscriptions and payments
CREATE TABLE user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  tier TEXT CHECK (tier IN ('free', 'sprint', 'pro', 'enterprise')),
  status TEXT CHECK (status IN ('active', 'expired', 'cancelled')),
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE crypto_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  subscription_id UUID REFERENCES user_subscriptions(id),
  transaction_hash TEXT UNIQUE NOT NULL,
  currency TEXT NOT NULL, -- BTC, ETH, USDC
  amount_crypto DECIMAL NOT NULL,
  amount_usd DECIMAL NOT NULL,
  wallet_address TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'failed')),
  confirmations INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  confirmed_at TIMESTAMP
);

-- Usage tracking for freemium limits
CREATE TABLE user_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  resource_type TEXT NOT NULL, -- 'projects', 'hypotheses', 'ai_generations'
  count INTEGER DEFAULT 0,
  period_start TIMESTAMP DEFAULT NOW(),
  period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE hypotheses ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE gates ENABLE ROW LEVEL SECURITY;

-- Users can only access their own projects
CREATE POLICY "Users can view own projects" ON projects
  FOR ALL USING (auth.uid() = user_id);

-- Cascade permissions for related tables
CREATE POLICY "Users can view own hypotheses" ON hypotheses
  FOR ALL USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );
```

### Cross-Site Authentication Handoff

```typescript
// startupai.site - After successful payment/signup
export async function redirectToProduct(userId: string, tier: string) {
  // Generate secure handoff token
  const handoffToken = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email: user.email,
    options: {
      redirectTo: `https://app.startupai.site.netlify.app/auth/callback?tier=${tier}`
    }
  });
  
  // Redirect with secure token
  window.location.href = handoffToken.properties.action_link;
}

// app.startupai.site - Auth callback handler
export async function handleAuthCallback(token: string, tier: string) {
  // Verify token and authenticate user
  const { user, session } = await supabase.auth.verifyOtp({
    token_hash: token,
    type: 'magiclink'
  });
  
  // Set user tier and redirect to dashboard
  await updateUserTier(user.id, tier);
  router.push('/dashboard');
}
```

### API Structure (Netlify Functions)

```typescript
// netlify/functions/projects.ts (app.startupai.site)
export const handler = async (event, context) => {
  const { httpMethod, path, body } = event;
  
  switch (httpMethod) {
    case 'GET':
      return getProjects();
    case 'POST':
      return createProject(JSON.parse(body));
    case 'PUT':
      return updateProject(JSON.parse(body));
    case 'DELETE':
      return deleteProject(path);
    default:
      return { statusCode: 405, body: 'Method Not Allowed' };
  }
};

// netlify/functions/ai-generate.ts
export const handler = async (event, context) => {
  const { type, data } = JSON.parse(event.body);
  
  switch (type) {
    case 'business-model-canvas':
      return generateBMC(data);
    case 'validation-roadmap':
      return generateRoadmap(data);
    case 'insights':
      return generateInsights(data);
    default:
      return { statusCode: 400, body: 'Invalid generation type' };
  }
};
```

### Frontend Architecture (Next.js)

```typescript
// src/app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <Navigation />
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

// src/app/dashboard/page.tsx
export default function Dashboard() {
  const { projects, loading } = useProjects();
  
  return (
    <div className="dashboard">
      <ProjectOverview projects={projects} />
      <RecentActivity />
      <QuickActions />
    </div>
  );
}

// src/components/HypothesisHub.tsx
export function HypothesisHub({ projectId }: { projectId: string }) {
  const { hypotheses, addHypothesis, updateHypothesis } = useHypotheses(projectId);
  
  return (
    <div className="hypothesis-hub">
      <HypothesisTable hypotheses={hypotheses} onUpdate={updateHypothesis} />
      <AddHypothesisModal onAdd={addHypothesis} />
    </div>
  );
}
```

---

## Development Standards

### Code Quality
- **TypeScript** for type safety
- **ESLint + Prettier** for code formatting
- **Husky** for pre-commit hooks
- **Jest + Testing Library** for testing
- **Storybook** for component documentation

### Git Workflow
- **Feature branches** for all development
- **Pull requests** required for main branch
- **Conventional commits** for clear history
- **Automated testing** on all PRs
- **Deployment** only from main branch

### Performance Standards
- **Core Web Vitals** compliance
- **<3 second** AI response times
- **<2 second** page load times
- **99.9%** uptime target
- **Mobile-first** responsive design

---

## Testing Strategy

### Unit Testing
```typescript
// src/lib/evidence.test.ts
describe('Evidence Processing', () => {
  it('should calculate confidence score correctly', () => {
    const evidence = {
      sourceType: 'interview',
      content: 'Customer confirmed willingness to pay',
      metadata: { interviewDate: '2025-01-15' }
    };
    
    expect(calculateConfidence(evidence)).toBeGreaterThan(7);
  });
});
```

### Integration Testing
```typescript
// tests/api/projects.test.ts
describe('Projects API', () => {
  it('should create project with valid data', async () => {
    const response = await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify(validProjectData)
    });
    
    expect(response.status).toBe(201);
    expect(await response.json()).toHaveProperty('id');
  });
});
```

### E2E Testing (Playwright)
```typescript
// tests/e2e/project-creation.spec.ts
test('user can create complete project', async ({ page }) => {
  await page.goto('/dashboard');
  await page.click('[data-testid="new-project"]');
  await page.fill('[data-testid="project-name"]', 'Test Project');
  await page.click('[data-testid="create-project"]');
  
  await expect(page.locator('[data-testid="project-created"]')).toBeVisible();
});
```

---

## Deployment Pipeline

### Development Environment
```yaml
# netlify.toml
[build]
  command = "pnpm run build"
  functions = "netlify/functions"
  publish = "out"

[build.environment]
  NODE_VERSION = "18"

[functions]
  node_bundler = "esbuild"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
```

### CI/CD Pipeline (GitHub Actions)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Netlify
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: corepack enable pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm test
      - run: pnpm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## Monitoring & Analytics

### Application Monitoring
- **Sentry** for error tracking
- **Vercel Analytics** for performance monitoring
- **Supabase Dashboard** for database monitoring
- **Netlify Analytics** for deployment and function monitoring

### User Analytics
- **PostHog** for product analytics
- **Custom events** for feature usage tracking
- **Conversion funnels** for user journey analysis
- **A/B testing** framework for optimization

### Key Metrics Dashboard
```typescript
// src/components/MetricsDashboard.tsx
export function MetricsDashboard() {
  const metrics = useMetrics();
  
  return (
    <div className="metrics-grid">
      <MetricCard title="Active Users" value={metrics.activeUsers} />
      <MetricCard title="Projects Created" value={metrics.projectsCreated} />
      <MetricCard title="AI Generations" value={metrics.aiGenerations} />
      <MetricCard title="Gate Passes" value={metrics.gatePasses} />
    </div>
  );
}
```

---

## Security Considerations

### Data Protection
- **Encryption at rest** via Supabase
- **Encryption in transit** via HTTPS
- **API key management** via environment variables
- **Input validation** on all user inputs
- **SQL injection prevention** via parameterized queries

### Authentication & Authorization
- **Supabase Auth** for user management
- **JWT tokens** for API authentication
- **Row Level Security** for data isolation
- **Rate limiting** on API endpoints
- **CORS configuration** for frontend security

### Privacy Compliance
- **GDPR compliance** with data deletion
- **Privacy policy** and terms of service
- **Data retention policies**
- **User consent management**
- **Audit logging** for compliance

---

This implementation plan provides a comprehensive roadmap for building the StartupAI MVP, ensuring we deliver a high-quality, scalable, and secure platform that meets our validated user needs.
