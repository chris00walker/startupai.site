# 📐 High-Level Architecture Specification  

**System:** StartupAI – Value Proposition Design & Validation Platform  
**Author:** CrewAI Assistant  
**Date:** August 2025  

---

## 1. Purpose

This document specifies the **high-level architecture** of the StartupAI two-site platform. The system uses a **marketing-to-product architecture** where startupai.site converts prospects to customers, then securely hands them off to app.startupai.site for core value delivery. The platform enables entrepreneurs, founders, and agencies to generate and validate **Evidence-Led Business Strategies** using a CrewAI-powered workflow with Supabase authentication, deployed across two optimized sites.

**📋 Related Documentation:**
- **Business Context:** [MVP Specification](../product/mvp-specification.md)
- **Implementation Roadmap:** [Two-Site Implementation Plan](two-site-implementation-plan.md)
- **User Requirements:** [User Stories](../product/user-stories.md)
- **UX Design:** [User Experience Design](../design/user-experience.md)
- **Accessibility Standards:** [WCAG 2.0/2.1/2.2 Compliance](../design/accessibility-standards.md)
- **🤖 CrewAI Backend:** [Complete Implementation Guide](../../../app.startupai.site/backend/CREW_AI.md)
- **Backend README:** [Quick Start Guide](../../../app.startupai.site/backend/README.md)  

---

## 2. Service Tiers

The platform supports three service tiers:  

1. **Strategy Sprint** – one-time run of the 6-agent CrewAI workflow.  
2. **Founder Platform** – subscription model, multiple runs with historical tracking.  
3. **Agency Co-Pilot** – multi-tenant, white-label runs for agencies serving multiple clients.  

---

## 3. Two-Site System Architecture

### 3.1 Marketing Site: startupai.site ("The Promise")
**Purpose:** Convert prospects to customers through optimized conversion experience

**Core Responsibilities:**
- Landing page with value proposition and social proof
- Free trial signup with minimal friction
- Cryptocurrency payment processing (Bitcoin, Ethereum, USDC)
- User registration and basic profile creation
- **Secure authentication token generation for handoff**
- Conversion tracking and analytics

**Technical Stack:**

**Frontend Framework & UI:**
- Next.js 15 with TypeScript
- React 19.1 with Server Components
- Turbopack for fast development builds
- Tailwind CSS 3.4 for styling
- Framer Motion for animations
- shadcn/ui component library (Radix UI primitives)
- Lucide React for icons

**Forms & Validation:**
- React Hook Form 7.62 for form management
- Zod 4.0 for schema validation
- Formspree for contact forms

**Database & ORM:**
- Supabase PostgreSQL (shared service)
- Drizzle ORM for type-safe database operations
- Supabase Auth for authentication (JWT tokens)

**Payments & Crypto:**
- Crypto wallet integration (MetaMask, WalletConnect)
- Bitcoin, Ethereum, USDC support
- Payment processing APIs

**Development Tools:**
- pnpm 9.12 for package management
- TypeScript 5.8 for type safety
- ESLint + Prettier for code quality
- Supabase CLI 2.47 for database management

**Deployment & Infrastructure:**
- Netlify (live at https://startupai-site.netlify.app)
- GitHub auto-deployment on push
- Node.js >=18.0.0
- Analytics and conversion tracking

### 3.2 Product Platform: app.startupai.site ("The Product")
**Purpose:** Deliver core value and create customer advocates

**Core Responsibilities:**
- **Secure token validation and user session creation**
- Evidence-led strategy platform functionality
- Hypothesis management and validation workflows
- AI-powered insights and report generation
- User onboarding and feature adoption
- Customer satisfaction and retention optimization

**Technical Stack:**

**Frontend Framework & UI:**
- Next.js 15 with TypeScript
- React 19.1 with Server Components
- Turbopack for fast development builds
- Tailwind CSS 3.4 for styling
- shadcn/ui component library (Radix UI primitives)
- Lucide React for icons
- WCAG 2.0/2.1/2.2 AA accessibility compliance

**Backend & AI Orchestration:**
- Python 3.10+ runtime
- CrewAI 0.80+ for multi-agent workflows ([Implementation →](../../../app.startupai.site/backend/CREW_AI.md))
- FastAPI 0.100+ for API endpoints
- Uvicorn for ASGI server
- Pydantic 2.0+ for data validation
- Netlify Functions for serverless deployment

**AI & LLM Integration:**
- Vercel AI SDK for hot-swappable model support
- OpenAI GPT-4 (primary reasoning model)
- Anthropic Claude 3 (analytical tasks)
- Google Gemini Pro (creative ideation)
- Multi-provider fallback strategy

**Database & Vector Search:**
- Supabase PostgreSQL with extensions:
  - pgvector for vector embeddings
  - uuid-ossp for UUID generation
  - pg_net for HTTP requests
  - hstore for key-value storage
- Drizzle ORM for type-safe operations
- Supavisor connection pooling (transaction mode)
- HNSW indexes for semantic search
- OpenAI embeddings (1536 dimensions)

**Storage & File Management:**
- Supabase Storage with RLS policies
- CDN integration for global distribution
- Automatic image optimization
- Buckets: user-uploads, generated-reports, project-assets, public-assets

**Authentication & Security:**
- Supabase Auth (shared service)
- OAuth providers: Google, GitHub, Azure, Email
- Magic link authentication
- Multi-factor authentication (TOTP, SMS)
- JWT token-based session management
- Row-Level Security (RLS) policies

**Development Tools:**
- pnpm 9.12 for package management
- TypeScript 5.8 for type safety
- ESLint + Prettier for code quality
- Supabase CLI 2.47 for migrations
- Jest + Testing Library for unit tests
- Playwright for E2E testing
- axe-core for accessibility testing

**Deployment & Infrastructure:**
- Netlify (live at https://app-startupai-site.netlify.app)
- GitHub auto-deployment on push
- Node.js >=18.0.0
- Python runtime for serverless functions
- Environment-based configuration
- Advanced analytics and behavior tracking

### 3.3 CrewAI Backend (Python, Netlify Functions)

**📖 Complete Implementation:** [CREW_AI.md](../../../app.startupai.site/backend/CREW_AI.md)

- Executes the **6-agent Crew** (YAML-configured, sequential process v1.0):
  1. **Onboarding Agent** → Entrepreneur Brief (JSON + Markdown)
  2. **Customer Researcher** → Customer Profile (Jobs, Pains, Gains)
  3. **Competitor Analyst** → Positioning Map + Profiles
  4. **Value Designer** → Value Proposition Canvas + Statement
  5. **Validation Agent** → Validation Roadmap (Weak/Medium/Strong tests)
  6. **QA Agent** → Quality Audit + Final Deliverables
- **Framework Alignment:** Osterwalder's Value Proposition Design, Business Model Generation, Testing Business Ideas
- **LLM Support:** OpenAI GPT-4, Anthropic Claude, Google Gemini (hot-swappable via Vercel AI SDK)
- **Deployment:** Netlify Functions with Python runtime
- **Status:** ✅ Specification complete, ready for Phase 1-5 implementation  

---

## 4. Cross-Site Data Flow

### 4.1 Prospect to Customer (startupai.site)
```
Landing Page Visit
    ↓ Value Proposition Engagement
Free Trial Signup
    ↓ Email + Basic Info Collection
Trial Experience
    ↓ Limited Feature Access
Payment Decision
    ↓ Crypto Payment Processing
Authentication Token Generation
    ↓ Secure Handoff Preparation
```

### 4.2 Customer to advocate (app.startupai.site)
```
Token Validation
    ↓ Secure User Session Creation
Onboarding Flow
    ↓ Project Setup + First Hypothesis
Core Platform Usage
    ↓ Evidence Collection + AI Insights
Value Realization
    ↓ Report Generation + Results
Advocacy Generation
    ↓ Referrals + Success Stories
```

### 4.3 Secure Handoff Process
```
startupai.site:
1. User completes payment/signup
2. Generate JWT token with user data
3. Redirect to app.startupai.site with token

app.startupai.site:
1. Validate JWT token signature
2. Extract user information
3. Create/update user session
4. Begin onboarding experience
5. Track conversion completion
```

### 4.4 Shared Data Synchronization
- **User Profiles:** Synced across both platforms
- **Subscription Status:** Real-time payment and access updates
- **Usage Analytics:** Cross-site behavior and conversion tracking
- **Support Data:** Unified customer service and feedback  

---

## 5. API Architecture

### 5.1 startupai.site APIs
- `POST /api/auth/signup` – user registration and trial setup
- `POST /api/payments/crypto` – cryptocurrency payment processing
- `POST /api/auth/generate-token` – secure handoff token creation
- `GET /api/analytics/conversion` – conversion tracking data

### 5.2 app.startupai.site APIs
- `POST /api/auth/validate-token` – secure token validation
- `POST /api/crew/run` – start CrewAI execution
- `GET /api/crew/status/{run_id}` – check AI processing progress
- `GET /api/crew/result/{run_id}` – fetch generated deliverables
- `POST /api/projects/create` – new project initialization
- `POST /api/evidence/collect` – evidence ingestion
- `GET /api/reports/generate` – AI-powered report creation

### 5.3 Shared Services APIs
- `POST /api/users/sync` – cross-site user data synchronization
- `GET /api/analytics/funnel` – end-to-end conversion analytics
- `POST /api/support/ticket` – unified customer support

### 5.4 Vercel AI SDK Endpoints
- `POST /api/ai/predict-satisfaction` – user satisfaction prediction
- `POST /api/ai/recommend-experiments` – validation test recommendations
- `POST /api/ai/optimize-copy` – content optimization  

---

## 6. Security Architecture

### 6.1 Cross-Site Authentication
- **Shared Supabase Auth** – unified identity across both platforms
- **JWT Token Handoff** – cryptographically signed tokens for secure transitions
- **Session Management** – persistent authentication with automatic refresh
- **OAuth Integration** – Google, GitHub, Azure, and social login support
- **Magic Link Authentication** – passwordless email-based login
- **Multi-Factor Authentication** – optional TOTP and SMS verification

### 6.2 Data Protection
- **HTTPS Everywhere** – all traffic encrypted in transit
- **Row Level Security** – Supabase RLS policies for data isolation
- **Token Expiration** – short-lived handoff tokens (5-minute expiry)
- **API Rate Limiting** – protection against abuse and attacks
- **Database Encryption** – at-rest encryption for sensitive data
- **Audit Logging** – comprehensive activity tracking

### 6.3 Payment Security
- **Crypto Wallet Integration** – no private key storage
- **Payment Verification** – blockchain transaction confirmation
- **PCI Compliance** – secure handling of payment data
- **Fraud Detection** – automated suspicious activity monitoring  

---

## 7. Scalability & Performance

### 7.1 Independent Site Scaling
- **startupai.site** – optimized for high-traffic marketing campaigns
- **app.startupai.site** – optimized for engaged user productivity
- **Separate Deployments** – independent scaling and optimization
- **CDN Distribution** – global edge caching for both sites

### 7.2 Backend Scaling
- **Stateless Functions** – Netlify Functions auto-scale with demand
- **Database Scaling** – Supabase automatic scaling and connection pooling
- **Vector Search Optimization** – pgvector HNSW indexes for semantic search
- **Storage Scaling** – Supabase Storage with CDN distribution
- **AI Model Scaling** – Vercel AI SDK hot-swappable model endpoints
- **Queue Management** – background job processing for AI workflows

### 7.3 Multi-Tenant Architecture
- **Agency Support** – white-label deployment capability
- **Data Isolation** – RLS policies ensure tenant separation
- **Resource Allocation** – per-tenant usage limits and billing
- **Custom Branding** – agency-specific UI customization  

---

## 8. Deliverables (Client-Facing)

Each client engagement produces a package:  

- Entrepreneur Brief  
- Customer Profile (Jobs, Pains, Gains)  
- Competitor Positioning Map  
- Value Proposition Canvas & Statement  
- Validation Roadmap (weak/medium/strong)  
- QA Report  

---

## 9. Database Architecture

### 9.1 Supabase Configuration
- **Project Setup** – shared Supabase project for both sites
- **Connection Pooling** – Supavisor in transaction mode for serverless
- **Database Extensions** – pgvector for embeddings, uuid-ossp for UUIDs
- **Migration Management** – CLI-based schema versioning

### 9.2 Schema Design
```sql
-- Core user management
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  company TEXT,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Evidence and insights storage
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  content TEXT NOT NULL,
  embedding VECTOR(1536), -- OpenAI embeddings
  source_type TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- AI-generated reports and insights
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  report_type TEXT NOT NULL,
  content JSONB NOT NULL,
  generated_at TIMESTAMP DEFAULT NOW()
);
```

### 9.3 Row Level Security
```sql
-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);
```

### 9.4 Vector Search Functions
```sql
-- Semantic search for evidence
CREATE OR REPLACE FUNCTION match_evidence (
  query_embedding VECTOR(1536),
  project_filter UUID,
  match_threshold FLOAT,
  match_count INT
)
RETURNS SETOF evidence
LANGUAGE sql
AS $$
  SELECT *
  FROM evidence
  WHERE project_id = project_filter
    AND embedding <=> query_embedding < 1 - match_threshold
  ORDER BY embedding <=> query_embedding ASC
  LIMIT least(match_count, 50);
$$;
```

---

## 10. Storage Architecture

### 10.1 Supabase Storage Configuration
- **Bucket Organization** – separate buckets for user uploads, reports, assets
- **Access Control** – RLS policies for secure file access
- **CDN Integration** – global edge caching for static assets
- **File Processing** – automatic image optimization and resizing

### 10.2 Storage Buckets
```sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('user-uploads', 'user-uploads', false),
  ('generated-reports', 'generated-reports', false),
  ('public-assets', 'public-assets', true);

-- Storage policies
CREATE POLICY "Users can upload own files" ON storage.objects
  FOR INSERT WITH CHECK (auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view own files" ON storage.objects
  FOR SELECT USING (auth.uid()::text = (storage.foldername(name))[1]);
```

---

## ✅ Implementation Status

This high-level specification ensures the system is connected end-to-end with comprehensive Supabase configuration.

**CrewAI Backend:** ✅ Complete specification and implementation guide  
→ **See:** [CREW_AI.md](../../../app.startupai.site/backend/CREW_AI.md) for:
- Complete YAML configuration (agents.yaml, tasks.yaml)
- Full Python implementation (crew.py, main.py)
- Step-by-step implementation checklist (5 phases)
- Verification commands and testing guide

**Next Steps:**
1. Execute CrewAI implementation per [Phase 1-5 checklist](../../../app.startupai.site/backend/CREW_AI.md#-implementation-checklist)
2. Configure Supabase project and enable extensions
3. Implement Drizzle ORM schema
4. Deploy vector search functions
5. Integrate CrewAI backend with frontend  
