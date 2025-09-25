# 📚 StartupAI Platform Documentation

**Single Source of Truth for StartupAI Two-Site Architecture**  
**Last Updated:** September 25, 2025  

---

## 🏗️ Two-Site Architecture Overview

StartupAI uses a **marketing-to-product architecture** with clear separation of concerns:

- **🎯 startupai.site** (The Promise) - Convert prospects to customers
- **⚡ app.startupai.site** (The Product) - Deliver value and create advocates

## 🎯 Quick Start

**New to the project?** Start here:
1. [MVP Specification](product/mvp-specification.md) - Two-site architecture and features
2. [High-Level Architecture](technical/high_level_architectural_spec.md) - System design
3. [Implementation Plan](technical/two-site-implementation-plan.md) - 12-week roadmap
4. [User Stories](product/user-stories.md) - Cross-site user requirements

---

## 📁 Documentation Structure

### 📊 Business Analysis
**Market research, user needs, and strategic insights**

| Document | Purpose | Status |
|----------|---------|---------|
| [1-research.md](business/1-research.md) | Market landscape analysis | ✅ Complete |
| [2-evidence.md](business/2-evidence.md) | Supporting evidence compilation | ✅ Complete |
| [3-alternatives.md](business/3-alternatives.md) | Competitive analysis | ✅ Complete |
| [4-demand.md](business/4-demand.md) | Demand validation | ✅ Complete |
| [5-synthesis.md](business/5-synthesis.md) | Strategic recommendations | ✅ Complete |
| [6-bibliography.md](business/6-bibliography.md) | Source references | ✅ Complete |

### 🎯 Product Requirements
**Two-site strategy, features, and user stories**

| Document | Purpose | Cross-References | Status |
|----------|---------|------------------|---------|
| [PRD.md](product/PRD.md) | Master Product Requirements | → [MVP Spec](product/mvp-specification.md) | ✅ Complete |
| [mvp-specification.md](product/mvp-specification.md) | **🏗️ Two-Site Architecture & Features** | → [Implementation Plan](technical/two-site-implementation-plan.md), [User Stories](product/user-stories.md) | ✅ Complete |
| [user-stories.md](product/user-stories.md) | Cross-site authentication & user flows | → [UX Design](design/user-experience.md), [Architecture](technical/high_level_architectural_spec.md) | ✅ Complete |

### 🛠️ Technical Documentation
**Two-site architecture, setup, and implementation**

| Document | Purpose | Cross-References | Status |
|----------|---------|------------------|---------|
| [high_level_architectural_spec.md](technical/high_level_architectural_spec.md) | **🏗️ Two-Site System Architecture** | → [Implementation Plan](technical/two-site-implementation-plan.md), [MVP Spec](product/mvp-specification.md) | ✅ Complete |
| [two-site-implementation-plan.md](technical/two-site-implementation-plan.md) | **📋 12-Week Development Roadmap** | → [Architecture](technical/high_level_architectural_spec.md), [User Stories](product/user-stories.md) | ✅ Complete |
| [setup_specifications.md](technical/setup_specifications.md) | Development environment setup | → [Implementation Plan](technical/two-site-implementation-plan.md) | ✅ Complete |

### 🎨 Design Specifications
**Cross-site user experience and interface design**

| Document | Purpose | Cross-References | Status |
|----------|---------|------------------|---------|
| [user-experience.md](design/user-experience.md) | **🎨 Cross-Site User Journey & UX** | → [User Stories](product/user-stories.md), [MVP Spec](product/mvp-specification.md) | ✅ Complete |
| [ui-specifications.md](design/ui-specifications.md) | UI components and design system | → [UX Design](design/user-experience.md) | ✅ Complete |
| [design-system.md](design/design-system.md) | Shared design system across sites | → [UI Specs](design/ui-specifications.md) | ✅ Complete |

---

## 🔗 Document Cross-Reference Map

### 📋 By Development Phase

**Phase 1: Planning & Requirements**
1. [Business Analysis](business/) → [MVP Specification](product/mvp-specification.md)
2. [MVP Specification](product/mvp-specification.md) → [User Stories](product/user-stories.md)
3. [User Stories](product/user-stories.md) → [UX Design](design/user-experience.md)

**Phase 2: Architecture & Design**
1. [MVP Specification](product/mvp-specification.md) → [High-Level Architecture](technical/high_level_architectural_spec.md)
2. [High-Level Architecture](technical/high_level_architectural_spec.md) → [Implementation Plan](technical/two-site-implementation-plan.md)
3. [UX Design](design/user-experience.md) → [UI Specifications](design/ui-specifications.md)

**Phase 3: Implementation**
1. [Implementation Plan](technical/two-site-implementation-plan.md) → [Setup Specifications](technical/setup_specifications.md)
2. [User Stories](product/user-stories.md) → [Implementation Plan](technical/two-site-implementation-plan.md)

### 🎯 By Feature Area

**Cross-Site Authentication**
- [MVP Spec - Cross-Site Integration](product/mvp-specification.md#03-cross-site-integration-requirements)
- [User Stories - Epic 0](product/user-stories.md#epic-0-cross-site-authentication--handoff)
- [Architecture - Security](technical/high_level_architectural_spec.md#6-security-architecture)
- [Implementation - Phase 1](technical/two-site-implementation-plan.md#2-phase-1-shared-authentication-infrastructure)

**User Experience**
- [UX Design - Cross-Site Journey](design/user-experience.md#cross-site-user-journey-map)
- [User Stories - All Epics](product/user-stories.md)
- [MVP Spec - Marketing & Product Sites](product/mvp-specification.md#0-two-site-architecture-marketing--product-flow)

**Technical Implementation**
- [Architecture Overview](technical/high_level_architectural_spec.md)
- [12-Week Roadmap](technical/two-site-implementation-plan.md)
- [Development Setup](technical/setup_specifications.md)

---

## 🚀 Two-Site Technology Stack

### 🎯 startupai.site (Marketing)
- **Frontend:** Next.js 14 with TypeScript
- **Styling:** Tailwind CSS + Framer Motion
- **Authentication:** Supabase Auth (shared)
- **Payments:** Crypto wallet integration
- **Deployment:** Vercel

### ⚡ app.startupai.site (Product)
- **Frontend:** Next.js 14 with TypeScript
- **Backend:** Netlify Functions (Python)
- **AI Orchestration:** CrewAI multi-agent system
- **Database:** Supabase PostgreSQL
- **Storage:** Supabase Storage
- **Deployment:** Vercel

### 🔗 Shared Services
- **Authentication:** Supabase Auth with JWT tokens
- **Database:** Supabase PostgreSQL
- **AI Models:** Vercel AI SDK (multi-provider)
- **Analytics:** Cross-site tracking system

### AI Integration
- **CrewAI:** Multi-agent orchestration
- **OpenAI GPT-4:** Primary reasoning model
- **Anthropic Claude:** Analytical tasks
- **Google Gemini:** Creative ideation

---

## 📋 Development Status

### ✅ Completed
- [x] Market research and business case validation
- [x] Complete product requirements documentation
- [x] Technical architecture specification
- [x] MVP scope definition and user stories
- [x] Implementation roadmap and timeline
- [x] UX/UI design specifications

### 🔄 In Progress
- [ ] Supabase project setup and schema creation
- [ ] Next.js application foundation
- [ ] CrewAI agent development
- [ ] Core user flow implementation

### 📅 Upcoming
- [ ] Beta user testing program
- [ ] Performance optimization
- [ ] Security audit and compliance
- [ ] Production deployment

---

## 🎯 Key Metrics & Goals

### User Success Metrics
- **Time to Value:** <30 minutes from signup to first generated business model
- **User Activation:** >40% of users complete project setup
- **Quality Benchmark:** ≥8/10 rating for AI-generated outputs
- **Time Savings:** 50%+ reduction vs manual business model creation

### Business Metrics
- **Market Validation:** Proven willingness to pay $99-199/month
- **Competitive Advantage:** Evidence-first approach with full traceability
- **Target Market:** $10B+ addressable market for AI business tools
- **Revenue Model:** Freemium + crypto payments (Free trial → $500 sprint, $99-199/month SaaS, $1-3k/month enterprise)
- **Conversion Target:** 20-30% free trial to paid conversion

---

## 🔗 Related Resources

### External Links
- **Supabase Dashboard:** [Project Management](https://supabase.com)
- **Netlify Dashboard:** [Deployment Status](https://netlify.com)
- **GitHub Repository:** [Source Code](https://github.com/chriswalker/startupai.site)

### Development Tools
- **Design System:** Tailwind CSS with custom components
- **Testing:** Jest + Testing Library + Playwright
- **Code Quality:** ESLint + Prettier + TypeScript
- **CI/CD:** GitHub Actions + Netlify Deploy

---

## 📞 Contact & Support

**Project Owner:** Chris Walker  
**Repository:** `/home/chris/startupai.site`  
**Development Workspace:** `/home/chris/app.startupai.site`  

---

## 📝 Document Conventions

### Status Indicators
- ✅ **Complete** - Finalized and ready for implementation
- 🔄 **In Progress** - Currently being developed
- 📅 **Planned** - Scheduled for future development
- ❌ **Blocked** - Waiting on dependencies

### Priority Levels
- 🔥 **Critical** - Blocks MVP development
- ⚡ **High** - Important for MVP success
- 📋 **Medium** - Nice to have for MVP
- 💡 **Low** - Future enhancement

---

This documentation serves as the **single source of truth** for all StartupAI development. All team members should reference these documents for current requirements, specifications, and implementation guidance.
