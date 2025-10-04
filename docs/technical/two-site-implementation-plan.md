# 🔧 StartupAI Implementation Guide
## Two-Site Architecture - Master Reference

**System:** StartupAI Evidence-Led Strategy Platform  
**Author:** AI Assistant  
**Created:** September 2025  
**Last Updated:** October 4, 2025, 17:00  
**Status:** Phase 1 Complete (95%) | Phase 2 In Progress (40%) | Phase 3 Pending Backend  

---

## 📋 Document Purpose

**This is the SINGLE SOURCE OF TRUTH for StartupAI development.**

All implementation details, architecture decisions, status tracking, and next steps are documented here. No other technical documents should duplicate this content.

### Related Operational Documents
- `app.startupai.site/docs/operations/implementation-status.md` — Weekly progress audit
- `app.startupai.site/docs/engineering/50-testing/README.md` — Testing infrastructure
- `app.startupai.site/docs/engineering/30-data/supabase-setup.md` — Database setup
- `app.startupai.site/docs/operations/database-seeding.md` — Database seeding guide
- `app.startupai.site/backend/CREW_AI.md` — CrewAI implementation spec

---

## 1. System Overview

### 1.1 Architecture Philosophy

StartupAI uses a **two-site architecture** with clear separation of concerns:

**startupai.site (The Promise)**
- Purpose: Convert prospects to customers
- Focus: Marketing, pricing, signup, payment processing
- Success Metric: Conversion rate optimization
- Status: ✅ 95% Complete

**app.startupai.site (The Product)**
- Purpose: Satisfy customers and create advocates
- Focus: Core platform functionality, value delivery
- Success Metric: User satisfaction, retention, advocacy
- Status: ⚠️ 50-55% Complete (UI strong, backend missing)

**Key Benefits:**
- Each site excels at one thing
- Marketing optimized for conversion
- Product optimized for user experience
- Clean separation prevents feature creep
- Independent optimization and scaling

### 1.2 Service Tiers

The platform supports three service tiers:

1. **Strategy Sprint** — One-time run of 6-agent CrewAI workflow
2. **Founder Platform** — Subscription with multiple runs and historical tracking
3. **Agency Co-Pilot** — Multi-tenant white-label for agencies serving multiple clients

---

## 2. Current Implementation Status

### 2.1 Infrastructure (✅ 95% Complete)

#### Deployment
- ✅ Both sites live on Netlify with GitHub auto-deployment
- ✅ startupai-site: https://startupai-site.netlify.app
- ✅ app-startupai-site: https://app-startupai-site.netlify.app
- ✅ CI/CD pipeline working (tested Oct 4, 2025)

#### Package Management
- ✅ Migrated from npm to pnpm (Sept 26, 2025)
- ✅ Package manager pinned: pnpm@9.12.1
- ✅ Workspace configuration for app.startupai.site
- ✅ All scripts updated (dev, build, test)

#### Secrets Management (✅ Complete Oct 4, 2025)
- ✅ Centralized secrets: `~/.secrets/startupai`
- ✅ direnv auto-loading via `.envrc` files
- ✅ 50+ environment variables configured
- ✅ `.env.example` templates in both repos
- ✅ Git security verified (no secrets committed)
- ✅ Secure permissions (700/600) applied

#### Testing Infrastructure (✅ Complete Oct 4, 2025)
- ✅ Jest: 162 tests passing across 12 suites
- ✅ Playwright: 45 E2E tests (15 scenarios × 3 browsers)
- ✅ `playwright.config.ts` configured
- ✅ Test separation: `*.test.*` (Jest) vs `*.spec.ts` (Playwright)
- ✅ Documentation: `docs/engineering/50-testing/README.md`

#### Build Verification (✅ Complete Oct 4, 2025)
- ✅ Marketing site: All 21 routes building successfully
- ✅ Product site: All pages and API routes building
- ✅ TypeScript compilation clean
- ✅ No build errors or warnings

### 2.2 Database (✅ 100% Complete)

#### Supabase Project
- ✅ Project created: StartupAI (`eqxropalhxjeyvfcoyxg`)
- ✅ Region: East US (North Virginia)
- ✅ Connection pooling: Supavisor configured
- ✅ Extensions enabled: uuid-ossp v1.1, pgvector v0.8.0, pg_net v0.19.5, hstore v1.8

#### Schema & Migrations
- ✅ 6 Drizzle migrations deployed (00001-00006)
- ✅ Core tables: user_profiles, projects, evidence, reports
- ✅ Row Level Security (RLS) active on all tables
- ✅ Type-safe query layer complete (Drizzle ORM)
- ✅ Storage buckets created: user-uploads, generated-reports, project-assets, public-assets

#### Database Queries
- ✅ Read-side queries complete (`db/queries/*.ts`)
- ✅ `useProjects` hook working (dashboard connected)
- ⚠️ Write-side mutations pending (CRUD operations)
- ❌ Vector search functions not yet created

### 2.3 Authentication (✅ 90% Complete)

#### Marketing Site (startupai.site)
- ✅ Supabase Auth client configured
- ✅ Email/password authentication working
- ✅ GitHub OAuth working
- ⚠️ Login form temporarily bypassed for testing (Memory `e1108b2c`)
- ❌ JWT token generation for handoff not implemented

#### Product Site (app.startupai.site)
- ✅ OAuth callback route (`/auth/callback`) working
- ✅ GitHub OAuth operational
- ✅ Role-aware routing (founder vs consultant)
- ⚠️ JWT handoff endpoint not implemented
- ❌ Cross-site session bridging pending

### 2.4 Frontend UI (✅ 65% Complete)

#### Marketing Site (startupai.site)
- ✅ 19 pages deployed and functional
- ✅ 60+ ShadCN UI components
- ✅ Responsive design complete
- ✅ Forms with validation (React Hook Form + Zod)
- ❌ A/B testing framework not started
- ❌ Conversion analytics not implemented
- ❌ Crypto payment integration deferred

#### Product Site (app.startupai.site)
- ✅ 20 pages (16 Pages Router + 4 App Router)
- ✅ 50+ UI components
- ✅ 9 canvas tools (160KB code)
- ✅ Complete validation UI (hypothesis, evidence, experiments)
- ⚠️ Most components use mock data (need DB integration)
- ⚠️ Router consolidation recommended (App vs Pages Router)

### 2.5 Backend & AI (❌ 0% Complete - CRITICAL BLOCKER)

#### CrewAI Backend
- ✅ Complete specification (CREW_AI.md)
- ✅ Dependencies documented (requirements.txt)
- ✅ Virtual environment configured
- ❌ Implementation code not started (0%)
- ❌ No `agents.yaml` or `tasks.yaml`
- ❌ No `crew.py` or `main.py`
- ❌ Not deployed to Netlify Functions

**Impact:** Blocks all AI features, report generation, and core value delivery

---

## 3. Technical Architecture

### 3.1 Marketing Site Stack (startupai.site)

#### Frontend Framework
- **Next.js 15.5.3** with App Router
- **React 19.1.1** with Server Components
- **TypeScript 5.8.3** for type safety
- **Turbopack** for fast development builds

#### Styling & UI
- **Tailwind CSS 3.4.17** for styling
- **shadcn/ui** component library (Radix UI primitives)
- **Lucide React** for icons
- **Framer Motion** for animations

#### Forms & Validation
- **React Hook Form 7.62** for form management
- **Zod 4.0** for schema validation
- **Formspree** for contact forms

#### Database & Auth
- **Supabase PostgreSQL** (shared service)
- **Drizzle ORM** for type-safe operations
- **Supabase Auth** for JWT tokens
- **@supabase/ssr 0.7.0** for server-side auth

#### Development Tools
- **pnpm 9.12.1** package manager
- **ESLint + Prettier** for code quality
- **Supabase CLI 2.47.2** for DB management

#### Deployment
- **Netlify** (https://startupai-site.netlify.app)
- **GitHub** auto-deployment on push
- **Node.js >=18.0.0** runtime

### 3.2 Product Site Stack (app.startupai.site)

#### Frontend Framework
- **Next.js 15.5.4** (hybrid App + Pages Router)
- **React 19.1.1** with hooks and context
- **TypeScript 5.8.3** with strict mode
- **@tanstack/react-query 5.83.0** for data fetching

#### UI Components
- **shadcn/ui** with Radix UI primitives
- **Tailwind CSS 3.4.17** for styling
- **Lucide React 0.534.0** for icons
- **date-fns 4.1.0** for date handling

#### Database & ORM
- **Supabase PostgreSQL** with connection pooling
- **Drizzle ORM** for type-safe queries
- **Drizzle Kit 0.31.5** for migrations
- **@supabase/supabase-js 2.58.0** client

#### Backend (Planned)
- **CrewAI 0.80+** multi-agent framework (NOT IMPLEMENTED)
- **Python 3.10+** runtime
- **FastAPI** for API endpoints
- **Netlify Functions** for serverless deployment

#### Testing
- **Jest 30.0.5** for unit/integration tests
- **Playwright 1.54.1** for E2E tests
- **Testing Library** for React components
- **MSW 2.0.0** for API mocking

#### Deployment
- **Netlify** (https://app-startupai-site.netlify.app)
- **Build:** `cd frontend && pnpm build`
- **Publish:** `frontend/out/`

### 3.3 Database Architecture

#### Core Tables

**user_profiles**
- `id` (uuid, PK)
- `email` (text, unique)
- `full_name` (text)
- `role` (enum: founder, consultant, trial)
- `plan_status` (enum: trial, active, cancelled)
- `subscription_status` (jsonb)
- RLS: Users can only access their own profile

**projects**
- `id` (uuid, PK)
- `user_id` (uuid, FK → user_profiles)
- `name` (text)
- `description` (text)
- `stage` (enum: idea, validation, scaling)
- `portfolio_metrics` (jsonb)
- `created_at`, `updated_at` (timestamp)
- RLS: Users can only access their own projects

**evidence**
- `id` (uuid, PK)
- `project_id` (uuid, FK → projects)
- `title` (text)
- `summary` (text)
- `full_text` (text)
- `fit_type` (enum: Desirability, Feasibility, Viability)
- `strength` (enum: strong, medium, weak)
- `embedding` (vector(1536)) for semantic search
- RLS: Access via project ownership

**reports**
- `id` (uuid, PK)
- `project_id` (uuid, FK → projects)
- `report_type` (text)
- `content` (jsonb)
- `generated_at` (timestamp)
- RLS: Access via project ownership

#### Extensions (Pending Manual Enable)
- **pgvector** - Vector similarity search
- **uuid-ossp** - UUID generation (✅ ENABLED)
- **pg_net** - HTTP requests from database
- **hstore** - Key-value storage

#### Vector Search
- **Function:** `match_evidence(query_embedding, match_threshold, match_count)`
- **Index:** HNSW on `evidence.embedding`
- **Dimensions:** 1536 (OpenAI text-embedding-ada-002)
- **Status:** ❌ Not yet implemented

### 3.4 CrewAI Architecture (Planned)

#### 6-Agent Pipeline

1. **Research Agent** - Market analysis and competitor research
2. **Strategy Agent** - Value proposition and positioning
3. **Validation Agent** - Hypothesis and evidence evaluation
4. **Experiment Agent** - Test design and success metrics
5. **Canvas Agent** - Business model canvas generation
6. **Report Agent** - Comprehensive report compilation

#### Agent Communication
- **Tools:** Web search, database queries, document analysis
- **Memory:** Shared context across agents
- **Orchestration:** Sequential task execution
- **Output:** Structured JSON for UI consumption

#### Integration Points
- **Input:** User project data, canvas inputs, evidence
- **Processing:** CrewAI agent workflow
- **Output:** Generated reports, recommendations, canvas updates
- **Storage:** Supabase (reports table, JSONB content)

**Status:** Specification complete, implementation 0%

---

## 4. Implementation Phases

### Phase 1: Foundation (✅ 98% Complete)

**Timeline:** Weeks 1-4  
**Goal:** Core infrastructure and secure handoff

#### Completed (Week 1-2)
- [x] Supabase project creation (`eqxropalhxjeyvfcoyxg`)
- [x] Dual-site Netlify deployment
- [x] pnpm migration complete
- [x] GitHub CI/CD pipeline
- [x] Basic authentication (email/password + GitHub)
- [x] Database schema and migrations (7 deployed)
- [x] Row Level Security policies
- [x] Type-safe query layer (Drizzle ORM)
- [x] Secrets management (direnv + ~/.secrets/startupai)
- [x] Testing infrastructure (Jest + Playwright)
- [x] Build verification (both sites)

#### Pending (Week 3-4)
- [x] Enable database extensions (pgvector, pg_net, hstore) ✅ **Complete (Oct 4, 2025)**
- [x] Apply storage buckets migration (`00003_storage_buckets.sql`) ✅ **Complete (Oct 3, 2025)**
- [ ] Implement JWT token generation for cross-site handoff
- [ ] Implement JWT validation endpoint `/api/auth/handoff`
- [ ] End-to-end QA of cross-site authentication flow
- [ ] Fix marketing login form (remove testing bypass)

### Phase 2: Marketing Site Optimization (⚠️ 40% Complete)

**Timeline:** Weeks 3-6  
**Goal:** High-converting marketing site with seamless handoff

#### Completed
- [x] 19 marketing pages deployed
- [x] 60+ ShadCN UI components
- [x] Responsive design
- [x] Forms with validation
- [x] Basic authentication flows

#### In Progress
- [ ] Landing page A/B testing framework
- [ ] Conversion analytics + funnel instrumentation
- [ ] JWT token generation + telemetry for handoff
- [ ] Social proof and testimonials CMS

#### Deferred
- [ ] Cryptocurrency payment integration (MetaMask, WalletConnect)
- [ ] Bitcoin, Ethereum, USDC support

### Phase 3: Product Platform Core (⚠️ 30% Complete)

**Timeline:** Weeks 5-8  
**Goal:** Complete MVP user flows

#### Completed
- [x] 20 pages UI (16 Pages + 4 App Router)
- [x] 50+ UI components
- [x] 9 canvas tools (160KB code)
- [x] Complete validation UI (hypothesis, evidence, experiments)
- [x] Dashboard connected to Supabase (`useProjects`)
- [x] OAuth callback and role-aware routing

#### Blocked by Backend (CrewAI)
- [ ] Project creation with persistence
- [ ] Hypothesis management CRUD
- [ ] Evidence collection and storage
- [ ] Experiment planning and tracking
- [ ] AI-powered report generation
- [ ] Canvas auto-completion with AI
- [ ] Gate progression logic

#### Blocked by Database
- [ ] Replace mock data with Drizzle mutations
- [ ] File upload and storage integration
- [ ] Vector search implementation
- [ ] Real-time collaboration features

### Phase 4: AI Integration (❌ 0% Complete - CRITICAL)

**Timeline:** Weeks 9-12  
**Goal:** CrewAI backend implementation

**Status:** **BLOCKS ALL CORE VALUE DELIVERY**

#### Required Steps
1. [ ] Configure multi-agent YAML (agents.yaml, tasks.yaml)
2. [ ] Implement crew.py orchestration module
3. [ ] Create FastAPI entrypoint (main.py)
4. [ ] Deploy to Netlify Functions
5. [ ] Integrate with Supabase auth
6. [ ] Hook frontend canvas/report UI to backend endpoints
7. [ ] Implement error handling and retry logic
8. [ ] Add rate limiting and freemium controls

**Estimated Time:** 15-20 hours  
**Priority:** CRITICAL - Phase 3 cannot complete without this

### Phase 5: Polish & Testing (⚠️ Planning)

**Timeline:** Weeks 13-16  
**Goal:** Production-ready MVP

#### Planned
- [ ] Comprehensive end-to-end testing
- [ ] Performance optimization
- [ ] Security audit
- [ ] Accessibility compliance verification
- [ ] User acceptance testing (UAT)
- [ ] Documentation completion
- [ ] Beta launch preparation

---

## 5. Critical Blockers

### 🚨 Priority 1: CrewAI Backend (Blocks Phase 3-5)

**Issue:** 0% implementation despite complete specification  
**Impact:** No AI features, no core value delivery, no MVP completion  
**Estimate:** 15-20 hours  
**Action:** Follow `app.startupai.site/backend/CREW_AI.md` Phase 1-5

### ⚠️ Priority 2: Database Integration (Blocks Phase 3)

**Issue:** Most UI components use mock data  
**Impact:** No data persistence, no real user functionality  
**Estimate:** 10-15 hours  
**Action:** Replace mock imports with Drizzle mutations

### ⚠️ Priority 3: Storage & Extensions (Blocks File Upload)

**Issue:** Extensions disabled, storage migration not applied  
**Impact:** No file uploads, no vector search, no attachments  
**Estimate:** 2-4 hours  
**Action:** Enable extensions in dashboard, apply migration 00003

### ⚠️ Priority 4: Cross-Site Handoff (Blocks Marketing → Product)

**Issue:** JWT handoff not implemented  
**Impact:** Users can't seamlessly transition from marketing to product  
**Estimate:** 4-6 hours  
**Action:** Implement `/api/auth/handoff` and token generation

---

## 6. Success Metrics

### Technical Metrics
- **Handoff Success Rate:** >99.5%
- **Token Validation Time:** <2 seconds
- **Cross-Site Load Time:** <3 seconds total
- **Test Coverage:** >90%
- **Build Success Rate:** 100% (✅ Currently achieved)

### Business Metrics
- **Conversion Rate:** Marketing → Product >15%
- **Time to First Value:** <10 minutes
- **User Retention:** >70% at 30 days
- **Net Promoter Score:** >50

### User Experience Metrics
- **Handoff Satisfaction:** >4.5/5
- **Onboarding Completion:** >90%
- **Feature Adoption:** >80% for core features

---

## 7. Risk Mitigation

### Technical Risks
- **Token Security:** Regular audits, short expiration (current: no JWT implementation)
- **Site Availability:** Multi-region deployment, CDN (✅ Netlify CDN active)
- **Data Consistency:** Real-time sync monitoring (pending backend)
- **Performance:** Load testing, performance budgets (✅ Build verification in place)

### Business Risks
- **Conversion Drop:** A/B testing framework (pending)
- **User Confusion:** Clear messaging, comprehensive testing (✅ E2E tests ready)
- **Support Overhead:** Self-service options, error messages (pending backend)

### Development Risks
- **Backend Delay:** CrewAI implementation critical path (CURRENT BLOCKER)
- **Technical Debt:** Router consolidation recommended (low priority)
- **Documentation Drift:** **SOLVED** - Single source of truth established (Oct 4, 2025)

---

## 8. Next Actions

### Immediate (This Week)
1. ✅ Consolidate documentation (COMPLETE Oct 4, 2025)
2. 🔄 Enable Supabase extensions (manual dashboard action)
3. 🔄 Apply storage buckets migration
4. 🚨 **START CrewAI backend implementation** (CRITICAL)

### Short-term (Next 2 Weeks)
1. Complete CrewAI Phase 1-3 (agents, tasks, orchestration)
2. Deploy backend to Netlify Functions
3. Replace mock data with database mutations
4. Implement cross-site JWT handoff
5. Fix marketing login form authentication

### Medium-term (Next Month)
1. Complete CrewAI Phase 4-5 (testing, optimization)
2. Full UI/DB integration
3. Vector search implementation
4. End-to-end testing suite
5. Beta launch preparation

---

## 9. Documentation Maintenance

### This Document
- **Update Frequency:** After every major milestone
- **Owner:** Development team
- **Review Cycle:** Weekly during active development
- **Last Review:** October 4, 2025

### Change Log
- **Oct 4, 2025:** Major consolidation - created single source of truth, archived 3 redundant docs
- **Oct 4, 2025:** Added testing infrastructure, secrets management, build verification status
- **Oct 2, 2025:** Updated database integration status, trial guardrails
- **Oct 1, 2025:** Supabase project creation, initial schema deployment
- **Sept 26, 2025:** pnpm migration completed

### Related Documents
- Operational guides: `app.startupai.site/docs/operations/`
- Engineering specs: `app.startupai.site/docs/engineering/`
- Backend spec: `app.startupai.site/backend/CREW_AI.md`

---

**END OF MASTER IMPLEMENTATION GUIDE**

*This is the definitive reference for StartupAI development. All other technical documents have been archived or deleted. For operational procedures, see cross-referenced documents above.*
