# Architecture Analysis & Implementation Roadmap

**Date**: November 8, 2025
**Status**: Implementation Ready
**Version**: 2.0 (Based on Actual Code Review)

---

## EXECUTIVE SUMMARY

The 3-repository architecture is **working well**. The CrewAI deployment on AMP platform is a strength. The actual issues are **user flow and role-based routing**, not architecture. This document outlines the specific fixes needed to deliver the right experience to each customer segment.

---

## CURRENT STATE ANALYSIS

### What's Working Well

```yaml
architecture:
  marketing_site:
    repo: "startupai.site"
    tech: "Next.js 15 static export"
    purpose: "Promise - sell the value proposition"
    status: "✅ Working well"

  product_app:
    repo: "app.startupai.site"
    tech: "Next.js with Vercel AI SDK + CrewAI integration"
    purpose: "Product - deliver the value"
    auth: "Supabase (working)"
    dashboards:
      - "Founder dashboard exists"
      - "Consultant dashboard exists"
      - "Role-based navigation implemented"
    status: "✅ Core features working"

  crewai_service:
    repo: "startupai-crew"
    deployment: "CrewAI AMP Platform"
    api: "https://startupai-[uuid].crewai.com"
    integration: "✅ Called from app via CrewAIAMPClient"
    workflow: "6-agent strategic analysis"
    status: "✅ Deployed and functioning"

assessment: "Architecture is sound. Issues are in routing logic, not structure."
```

### Identified Problems

```yaml
problem_1_confusing_landing_page:
  file: "app.startupai.site/frontend/src/pages/index.tsx"
  issue: "Marketing-style landing page in product app"
  impact: "Users sign up, get redirected to confusing page with Founder/Consultant buttons"
  severity: HIGH
  solution: "DELETE this file"

problem_2_missing_role_capture:
  location: "Marketing site pricing page"
  issue: "Pricing sends ?plan= but not ?role="
  impact: "App doesn't know if user is founder or consultant"
  severity: CRITICAL
  solution: "Add role selection on marketing site homepage"

problem_3_single_onboarding_flow:
  file: "app.startupai.site/frontend/src/app/onboarding/page.tsx"
  issue: "Everyone goes to /onboarding regardless of role"
  impact: "Consultants see founder-focused 'validate your idea' flow"
  severity: HIGH
  solution: "Route to /onboarding/founder or /onboarding/consultant"

problem_4_wrong_redirects:
  file: "app.startupai.site/frontend/src/lib/auth/roles.ts"
  issue: "All roles redirect to /onboarding after auth"
  impact: "After onboarding, everyone goes to /dashboard"
  severity: HIGH
  current_code:
    admin: "/onboarding"
    consultant: "/onboarding"
    founder: "/onboarding"
    trial: "/onboarding"
  solution: "Route based on role to correct dashboard"

problem_5_no_consultant_onboarding:
  issue: "Consultant onboarding flow doesn't exist"
  impact: "Can't gather consultant-specific information"
  severity: MEDIUM
  solution: "Create consultant onboarding with CrewAI workflow"

problem_6_no_conversion_tracking:
  issue: "Strategy Sprint → Platform conversion not tracked"
  impact: "Users don't see 'first month free' bonus offer"
  severity: MEDIUM
  solution: "Add notification system with conversion offer"
```

---

## REQUIRED USER FLOWS

### Founder Flow

```mermaid
graph TD
    A[Marketing Homepage] -->|Click: For Founders| B[Pricing Page role=founder]
    B -->|Select Plan| C[Signup role=founder&plan=X]
    C -->|Supabase Auth| D[Auth Callback]
    D -->|Store role=founder| E[/onboarding/founder]
    E -->|Complete| F[/founder-dashboard]

    G[Strategy Sprint User] -->|After completion| H[Bell Icon Notification]
    H -->|Click| I[Convert to Platform offer]
    I -->|Accept| J[Update to Platform + free month]
```

### Consultant Flow

```mermaid
graph TD
    A[Marketing Homepage] -->|Click: For Consultants| B[Pricing Page role=consultant]
    B -->|Select Plan| C[Signup role=consultant&plan=X]
    C -->|Supabase Auth| D[Auth Callback]
    D -->|Store role=consultant| E[/onboarding/consultant]
    E -->|CrewAI gathers info| F[Consultant Profile Created]
    F -->|Complete| G[/dashboard consultant view]
```

### Trial User Flow

```mermaid
graph TD
    A[Either Homepage Path] -->|Click: Free Trial| B[Pricing Page role=X]
    B -->|Free Trial Button| C[Signup role=X&plan=trial]
    C -->|Supabase Auth| D[Auth Callback]
    D -->|Route by role| E{Role?}
    E -->|Founder| F[/onboarding/founder]
    E -->|Consultant| G[/onboarding/consultant]
    F -->|Complete| H[/founder-dashboard trial mode]
    G -->|Complete| I[/dashboard consultant trial mode]
```

---

## IMPLEMENTATION ROADMAP

### Phase 1: App Routing Fixes (Priority 1)

**Goal**: Fix the product app so users land in the right place based on role.

#### 1.1 Delete Confusing Landing Page

```yaml
task: "Remove product app landing page"
file_to_delete: "app.startupai.site/frontend/src/pages/index.tsx"
reason: "Authenticated users should never see this marketing page"
effort: "5 minutes"
risk: "None - it's causing confusion"
```

#### 1.2 Update Auth Callback Role Routing

```yaml
task: "Route users by role after authentication"
file: "app.startupai.site/frontend/src/app/auth/callback/route.ts"
changes:
  - line_21: "Extract role from searchParams"
  - line_104-114: "Add role-based routing logic"

implementation:
  1_extract_role:
    code: |
      const role = searchParams.get('role');
      const plan = searchParams.get('plan');

  2_store_in_profile:
    code: |
      if (role && data.session?.user) {
        await supabase.auth.updateUser({
          data: {
            role: role === 'consultant' ? 'consultant' : 'founder',
            plan_type: plan,
          }
        });
      }

  3_route_to_onboarding:
    code: |
      const onboardingPath = role === 'consultant'
        ? '/onboarding/consultant'
        : '/onboarding/founder';

      return NextResponse.redirect(`${origin}${onboardingPath}`);

effort: "30 minutes"
risk: "Low - straightforward routing logic"
```

#### 1.3 Update Signup to Capture Role

```yaml
task: "Capture role parameter during signup"
files:
  - "app.startupai.site/frontend/src/app/signup/page.tsx"
  - "app.startupai.site/frontend/src/components/signup-form.tsx"

changes:
  signup_page:
    - "Extract role from searchParams alongside plan"
    - "Pass role to SignupForm component"

  signup_form:
    - "Accept role prop"
    - "Include role in emailRedirectTo URL"
    - "Store role in user metadata"

code_change:
  emailRedirectTo: |
    `/auth/callback?role=${role}&plan=${plan}&next=/onboarding/${role === 'consultant' ? 'consultant' : 'founder'}`

effort: "45 minutes"
risk: "Low - additive changes"
```

#### 1.4 Create Separate Onboarding Routes

```yaml
task: "Split onboarding into role-specific paths"

new_files:
  founder_onboarding:
    path: "app.startupai.site/frontend/src/app/onboarding/founder/page.tsx"
    implementation: "Use existing OnboardingWizardV2 component"
    effort: "15 minutes"
    code: |
      import { OnboardingWizard } from '@/components/onboarding/OnboardingWizardV2';

      export default async function FounderOnboarding() {
        // Auth check
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) redirect('/login?returnUrl=/onboarding/founder');

        return <OnboardingWizard userId={user.id} planType="founder" />;
      }

  consultant_onboarding:
    path: "app.startupai.site/frontend/src/app/onboarding/consultant/page.tsx"
    implementation: "New ConsultantOnboardingWizard component"
    effort: "2-3 hours (Phase 2)"
    temporary_solution: "Redirect to /dashboard with welcome message"

existing_file:
  path: "app.startupai.site/frontend/src/app/onboarding/page.tsx"
  action: "Update to redirect based on user role"
  code: |
    // Check user role from profile
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role === 'consultant') {
      redirect('/onboarding/consultant');
    } else {
      redirect('/onboarding/founder');
    }
```

#### 1.5 Fix Post-Onboarding Redirects

```yaml
task: "Route to correct dashboard after onboarding"
file: "app.startupai.site/frontend/src/lib/auth/roles.ts"

current_redirects:
  admin: "/onboarding"
  consultant: "/onboarding"
  founder: "/onboarding"
  trial: "/onboarding"

new_redirects:
  admin: "/dashboard"
  consultant: "/dashboard"           # Consultant dashboard
  founder: "/founder-dashboard"      # Founder dashboard
  trial: "/founder-dashboard"        # Trial gets founder experience

code_change:
  file: "roles.ts"
  lines: "11-16"
  new_code: |
    const ROLE_REDIRECTS: Record<UserRole, string> = {
      admin: '/dashboard',
      consultant: '/dashboard',
      founder: '/founder-dashboard',
      trial: '/founder-dashboard'
    };

effort: "5 minutes"
risk: "None - simple constant change"
```

#### 1.6 Update Onboarding Complete Route

```yaml
task: "Redirect to correct dashboard after onboarding completion"
file: "app.startupai.site/frontend/src/app/api/onboarding/complete/route.ts"

current_behavior: "Returns dashboardRedirect: '/dashboard' for everyone"
new_behavior: "Return role-specific dashboard"

implementation:
  line_42: "Update dashboardRedirect field"
  code: |
    // Get user role
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', userId)
      .single();

    const dashboardRedirect = profile?.role === 'consultant'
      ? '/dashboard'
      : '/founder-dashboard';

effort: "15 minutes"
risk: "Low"
```

### Phase 2: Marketing Site Updates (Priority 2)

**Goal**: Enable role self-selection on marketing site.

#### 2.1 Homepage Redesign

```yaml
task: "Add two clear paths on homepage"
file: "startupai.site/src/app/page.tsx"

design:
  hero_section:
    - "Two primary CTAs side by side"
    - "For Founders: Validate Your Idea → /pricing?role=founder"
    - "For Consultants: Scale Your Practice → /pricing?role=consultant"

implementation:
  replace_current_cta:
    with: |
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="p-8 hover:shadow-lg transition-shadow">
          <Target className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-2xl font-bold mb-2">For Founders</h3>
          <p className="text-muted-foreground mb-6">
            Validate your startup idea with AI-powered strategic analysis
          </p>
          <Button size="lg" asChild className="w-full">
            <Link href="/pricing?role=founder">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Card>

        <Card className="p-8 hover:shadow-lg transition-shadow">
          <Users className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-2xl font-bold mb-2">For Consultants</h3>
          <p className="text-muted-foreground mb-6">
            Scale your consulting practice with AI co-pilot
          </p>
          <Button size="lg" asChild className="w-full">
            <Link href="/pricing?role=consultant">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Card>
      </div>

effort: "1-2 hours"
risk: "Low - presentational change"
```

#### 2.2 Pricing Page Role Filtering

```yaml
task: "Show role-specific pricing options"
file: "startupai.site/src/app/pricing/page.tsx"

implementation:
  1_extract_role:
    code: |
      const searchParams = useSearchParams();
      const role = searchParams.get('role') || 'founder';

  2_filter_tiers:
    code: |
      const visibleTiers = pricingTiers.filter(tier => {
        if (role === 'consultant') {
          return ['trial', 'agency-co-pilot'].includes(tier.plan);
        } else {
          return ['trial', 'strategy-sprint', 'founder-platform'].includes(tier.plan);
        }
      });

  3_update_links:
    current: |
      href={`${NEXT_PUBLIC_APP_URL}/signup?plan=${tier.plan}`}

    new: |
      href={`${NEXT_PUBLIC_APP_URL}/signup?role=${role}&plan=${tier.plan}`}

effort: "45 minutes"
risk: "Low - filtering logic"
```

### Phase 3: Consultant Features (Priority 3)

**Goal**: Build consultant-specific onboarding and CrewAI workflow.

#### 3.1 Consultant Onboarding Component

```yaml
task: "Create consultant onboarding wizard"
file: "app.startupai.site/frontend/src/components/onboarding/ConsultantOnboardingWizard.tsx"

approach: "Similar to founder onboarding but consultant-focused questions"

questions_to_gather:
  - company_name: "What's your consulting firm/agency name?"
  - practice_size: "Solo consultant / 2-10 people / 11-50 people / 51+ people"
  - current_clients: "How many active clients do you currently serve?"
  - industries: "What industries do you primarily work with?"
  - services: "What services do you offer? (Strategy, Product, Marketing, etc.)"
  - tools_used: "What tools do you currently use for client work?"
  - pain_points: "What's your biggest challenge in serving clients?"
  - white_label_interest: "Would you like to white-label this platform for clients?"

integration:
  - "Use Vercel AI SDK for real-time chat (same as founder)"
  - "Call CrewAI consultant workflow for analysis (new)"
  - "Store in consultant_profiles table (new)"

effort: "4-6 hours"
risk: "Medium - new component but following existing pattern"
```

#### 3.2 Consultant CrewAI Workflow

```yaml
task: "Create consultant onboarding workflow in CrewAI"
repo: "startupai-crew"
deployment: "CrewAI AMP Platform"

new_workflow:
  name: "consultant_onboarding"
  input: |
    {
      "consultant_input": {
        "company_name": "...",
        "practice_size": "...",
        "current_clients": 5,
        "industries": ["SaaS", "E-commerce"],
        "services": ["Strategy", "Product"],
        "tools_used": ["Notion", "Figma"],
        "pain_points": "...",
        "white_label_interest": true
      }
    }

  agents:
    - "Consultant Practice Analyst"
    - "Client Portfolio Strategist"
    - "Workspace Configuration Expert"

  output: |
    {
      "practice_analysis": "...",
      "recommended_setup": {
        "workspace_structure": "...",
        "client_templates": "...",
        "automation_opportunities": "..."
      },
      "onboarding_checklist": [
        "Set up first client workspace",
        "Configure white-label settings",
        "Import existing client data"
      ]
    }

implementation:
  location: "startupai-crew/src/startupai/crews/"
  new_files:
    - "consultant_onboarding_crew.py"
    - "config/consultant_agents.yaml"
    - "config/consultant_tasks.yaml"

effort: "6-8 hours"
risk: "Medium - new crew but following existing patterns"
deployment: "crewai deploy push --uuid b4d5c1dd-27e2-4163-b9fb-a18ca06ca13b"
```

#### 3.3 Consultant Profile Database

```yaml
task: "Create consultant_profiles table in Supabase"
repo: "app.startupai.site"
migration: "new migration file"

schema:
  table_name: "consultant_profiles"
  columns:
    - id: "UUID PRIMARY KEY REFERENCES user_profiles(id)"
    - company_name: "TEXT"
    - practice_size: "TEXT"
    - current_clients: "INTEGER"
    - industries: "TEXT[]"
    - services: "TEXT[]"
    - tools_used: "TEXT[]"
    - pain_points: "TEXT"
    - white_label_enabled: "BOOLEAN DEFAULT false"
    - white_label_config: "JSONB"
    - onboarding_completed: "BOOLEAN DEFAULT false"
    - created_at: "TIMESTAMPTZ DEFAULT NOW()"
    - updated_at: "TIMESTAMPTZ DEFAULT NOW()"

effort: "30 minutes"
risk: "Low - standard migration"
```

### Phase 4: Conversion Tracking (Priority 4)

**Goal**: Track Strategy Sprint → Platform conversions and show offers.

#### 4.1 Conversion Notification System

```yaml
task: "Add notification bell icon for conversion offers"
location: "app.startupai.site/frontend/src/components/layout/DashboardLayout.tsx"

implementation:
  1_notification_component:
    path: "components/notifications/NotificationBell.tsx"
    features:
      - "Bell icon in top right header"
      - "Red badge for unread notifications"
      - "Dropdown menu showing notifications"
      - "Mark as read functionality"

  2_conversion_offer_notification:
    trigger: "Strategy Sprint project status = 'completed'"
    message: |
      "Your Strategy Sprint is complete!
      Upgrade to Founder Platform and get your first month FREE ($199 value).
      Offer expires in 30 days."
    actions:
      - "View Offer"
      - "Dismiss"

  3_database_schema:
    table: "user_notifications"
    columns:
      - id: "UUID PRIMARY KEY"
      - user_id: "UUID REFERENCES user_profiles(id)"
      - type: "TEXT (conversion_offer, system, etc.)"
      - title: "TEXT"
      - message: "TEXT"
      - action_url: "TEXT"
      - read: "BOOLEAN DEFAULT false"
      - expires_at: "TIMESTAMPTZ"
      - created_at: "TIMESTAMPTZ DEFAULT NOW()"

effort: "4-5 hours"
risk: "Low - common pattern"
```

#### 4.2 Conversion Tracking Logic

```yaml
task: "Track Sprint → Platform conversions"
file: "app.startupai.site/frontend/src/app/api/convert-sprint/route.ts"

implementation:
  detect_sprint_completion:
    - "Listen for project status = 'completed'"
    - "Check if user plan = 'strategy-sprint'"
    - "Create notification for conversion offer"

  handle_conversion:
    endpoint: "POST /api/convert-sprint"
    logic: |
      1. Verify user has completed Strategy Sprint
      2. Update user plan to 'founder-platform'
      3. Add credit for first month ($199)
      4. Update billing: first_month_free = true
      5. Mark notification as completed
      6. Redirect to /founder-dashboard with success message

effort: "2-3 hours"
risk: "Low"
```

---

## IMPLEMENTATION PRIORITY ORDER

### Week 1: Core Routing (Must Have)

```yaml
priority_1_critical_fixes:
  day_1:
    - "Delete confusing landing page (5 min)"
    - "Update auth callback role routing (30 min)"
    - "Update signup to capture role (45 min)"
    - "Fix post-onboarding redirects (20 min)"

  day_2:
    - "Create /onboarding/founder route (15 min)"
    - "Create /onboarding/consultant placeholder (15 min)"
    - "Update onboarding complete redirect (15 min)"
    - "Test full founder flow"

  day_3:
    - "Marketing homepage two-path redesign (2 hours)"
    - "Pricing page role filtering (45 min)"
    - "End-to-end testing both flows"

total_effort: "3 days"
outcome: "Users land in correct experience based on role"
```

### Week 2: Consultant Features (Should Have)

```yaml
priority_2_consultant_experience:
  day_1_2:
    - "Build ConsultantOnboardingWizard component (6 hours)"
    - "Create consultant_profiles table migration (30 min)"

  day_3_4:
    - "Build consultant CrewAI workflow (8 hours)"
    - "Deploy to CrewAI AMP"
    - "Test consultant onboarding end-to-end"

  day_5:
    - "Polish consultant dashboard experience"
    - "Add welcome checklist for consultants"

total_effort: "5 days"
outcome: "Consultants have tailored onboarding and workspace"
```

### Week 3: Conversion Tracking (Nice to Have)

```yaml
priority_3_conversion_system:
  day_1:
    - "Build NotificationBell component (3 hours)"
    - "Create user_notifications table (30 min)"

  day_2:
    - "Implement conversion offer logic (3 hours)"
    - "Build conversion API endpoint (2 hours)"

  day_3:
    - "Add Sprint completion detection (2 hours)"
    - "Test conversion flow"

total_effort: "3 days"
outcome: "Strategy Sprint users see and can accept conversion offers"
```

---

## TESTING CHECKLIST

### Founder Flow Testing

```yaml
test_cases:
  - name: "Free trial founder signup"
    steps:
      - "Homepage → For Founders → Pricing"
      - "Click Free Trial"
      - "Complete signup with role=founder&plan=trial"
      - "Verify redirect to /onboarding/founder"
      - "Complete onboarding"
      - "Verify redirect to /founder-dashboard"
      - "Verify trial badge showing"

  - name: "Strategy Sprint founder signup"
    steps:
      - "Homepage → For Founders → Pricing"
      - "Click Strategy Sprint"
      - "Complete signup with role=founder&plan=strategy-sprint"
      - "Complete onboarding"
      - "Complete sprint project"
      - "Verify notification bell appears"
      - "Click notification"
      - "Verify conversion offer shows"

  - name: "Direct founder platform signup"
    steps:
      - "Pricing → Founder Platform"
      - "Complete signup"
      - "Complete onboarding"
      - "Verify redirect to /founder-dashboard"
      - "Verify subscription status showing"
```

### Consultant Flow Testing

```yaml
test_cases:
  - name: "Free trial consultant signup"
    steps:
      - "Homepage → For Consultants → Pricing"
      - "Click Free Trial"
      - "Complete signup with role=consultant&plan=trial"
      - "Verify redirect to /onboarding/consultant"
      - "Complete consultant onboarding questions"
      - "Verify CrewAI consultant workflow triggered"
      - "Verify consultant profile created"
      - "Verify redirect to /dashboard (consultant view)"

  - name: "Agency co-pilot signup"
    steps:
      - "Pricing → Agency Co-Pilot"
      - "Complete signup with role=consultant&plan=agency-co-pilot"
      - "Complete consultant onboarding"
      - "Verify workspace setup recommendations"
      - "Verify can add first client"
```

---

## SUCCESS METRICS

```yaml
phase_1_success:
  metric_1: "0% of users see confusing landing page"
  metric_2: "100% of founders land in /founder-dashboard"
  metric_3: "100% of consultants land in /dashboard"
  metric_4: "Users can self-select role on marketing site"

phase_2_success:
  metric_1: "Consultants complete tailored onboarding"
  metric_2: "CrewAI consultant workflow generates profile"
  metric_3: "Consultant workspace properly configured"

phase_3_success:
  metric_1: "Strategy Sprint users see conversion offer"
  metric_2: "First month free credit applied on conversion"
  metric_3: "Conversion rate tracked in analytics"
```

---

## RISKS & MITIGATION

```yaml
risk_1_breaking_existing_users:
  risk: "Current users have undefined roles"
  mitigation:
    - "Add migration to set default role=founder for existing users"
    - "Gracefully handle missing role with fallback to founder"

risk_2_crewai_workflow_complexity:
  risk: "Consultant workflow may be complex"
  mitigation:
    - "Start simple with basic profile gathering"
    - "Iterate on workflow based on feedback"
    - "Can always fall back to manual form if needed"

risk_3_conversion_tracking_accuracy:
  risk: "Might miss some conversion opportunities"
  mitigation:
    - "Log all conversion events"
    - "Manual audit capability in admin dashboard"
    - "Email notification backup"
```

---

## CONCLUSION

The architecture is **already correct**. The work needed is **user flow implementation**:

1. **Phase 1** (Week 1) - Fix routing so users land in right place
2. **Phase 2** (Week 2) - Build consultant-specific experience
3. **Phase 3** (Week 3) - Add conversion tracking and offers

No orchestration layer, no API gateway, no monorepo needed. Just clean implementation of role-based routing and onboarding flows.

**Recommended Start**: Phase 1, Day 1 - delete the landing page and fix auth callback routing. Everything builds from there.

---

## Document Control

**Status**: Ready for Implementation
**Version**: 2.0 (Corrected based on actual code review)
**Created**: November 8, 2025
**Next Steps**: Begin Phase 1, Day 1 implementation

**Key Files to Modify**:
1. Delete: `app.startupai.site/frontend/src/pages/index.tsx`
2. Update: `app.startupai.site/frontend/src/app/auth/callback/route.ts`
3. Update: `app.startupai.site/frontend/src/lib/auth/roles.ts`
4. Create: `app.startupai.site/frontend/src/app/onboarding/founder/page.tsx`
5. Create: `app.startupai.site/frontend/src/app/onboarding/consultant/page.tsx`