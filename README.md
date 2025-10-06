# StartupAI

**Transforming startup chaos into strategic clarity through AI-powered business intelligence.**

StartupAI addresses a critical gap in the startup ecosystem: the overwhelming struggle founders face when trying to transform raw business ideas into credible, actionable strategies. Research shows that 83% of entrepreneurs feel "lost in a sea of information" when validating ideas, juggling fragmented tools, expensive consultants, and generic AI outputs that lack business context.

This platform represents the evolution from traditional consulting to an AI-native approach, where founders can rapidly generate Business Model Canvases, validate assumptions with evidence-based insights, and translate strategy into technical architecture - all while maintaining data privacy and actionable guidance.

**The Problem We Solve:**
- **Time Pressure**: Founders waste 20-40 hours on manual planning worth $1.5K-$6K in consultant fees
- **Fragmented Tools**: Teams juggle Miro boards, spreadsheets, and disconnected research tools
- **Validation Uncertainty**: 72% of business assumptions never get tested, leading to costly pivots
- **Generic Output**: Standard AI tools produce "bargain bin quality" plans that could apply to any business

**Our Solution:**
An integrated AI co-pilot that delivers speed (instant canvases), guidance (built-in domain expertise), and actionability (traceable from strategy to code) - replacing the need for expensive consultants while providing enterprise-grade privacy and customization.

This website serves as the marketing and authentication gateway for the StartupAI platform. It provides the entry point for users to learn about services, sign up for waitlists, and authenticate into the main application platform where the AI-powered business intelligence tools are delivered.

## Live Demo

The website is deployed and accessible at:

- **Production**: <https://startupai-site.netlify.app> ✅ Live with CI/CD
- **Local Development**: http://localhost:3000

**Two-Site Architecture:**
- **Marketing Site**: <https://startupai-site.netlify.app> (this repository) - ✅ 95% Complete
- **Product Platform**: <https://app-startupai-site.netlify.app> (app.startupai.site repository) - ⚠️ 50-55% Complete

**Latest Audit:** [Codebase Audit (Oct 4, 2025)](docs/CODEBASE_AUDIT_2025-10-04.md)

## Features

- **Professional Design System**: ShadCN UI components with "new-york" style variant (60+ components)
- **Service Showcase**: 5 detailed service pages (Discovery, Validation, Scaling, Advisory, Optimization)
- **Authentication Flow**: Login/signup forms with Supabase Auth (⚠️ temporarily disabled for testing)
- **Waitlist Integration**: Formspree-powered forms for lead generation
- **SEO Optimized**: Meta tags, structured data, and performance optimized
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Static Export**: Optimized for Netlify deployment
- **Loading States**: Enhanced UX with proper loading and error handling
- **19 Pages**: All functional and deployed

## Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript 5.8.3
- **Runtime**: React 19.1.1
- **Styling**: Tailwind CSS with custom design tokens
- **Components**: ShadCN/UI component library (30+ components)
- **Database**: Supabase PostgreSQL with pgvector for semantic search
- **ORM**: Drizzle ORM for type-safe database operations
- **Storage**: Supabase Storage with CDN distribution
- **Authentication**: Supabase Auth with JWT token handoff
- **Vector Search**: pgvector with HNSW indexes for semantic search
- **Forms**: React Hook Form with Zod validation
- **Package Manager**: pnpm (✅ migrated from npm)
- **Deployment**: Netlify with GitHub integration (✅ live)
- **CLI Tools**: Supabase CLI for migrations and local development
- **Build Tool**: Turbopack for fast development


## Prerequisites

- Node.js 22.18.0 (run `nvm use` to load the version specified in `.nvmrc`)
- pnpm (install via `corepack enable pnpm`) - ✅ Migrated from npm
- Supabase CLI (install via `pnpm add -D supabase`) - ✅ Installed

## Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/chris00walker/startupai.site.git
   cd startupai.site
   ```

2. Align Node.js version and install dependencies:

   ```bash
   nvm use
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to:

   ```text
   http://localhost:3000
   ```

## Available Scripts

- `pnpm dev` - Start development server (http://localhost:3000)
- `pnpm build` - Build for production with static export
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

## Project Structure

```text
src/
├── app/                 # Next.js App Router pages
│   ├── login/          # Authentication pages
│   └── signup/         # User registration
├── components/          # Reusable React components
│   ├── ui/             # ShadCN/UI components (30+ components)
│   ├── login-form.tsx  # Authentication form component
│   └── sections/       # Page sections
├── lib/                # Utility libraries
│   ├── auth.ts         # Authentication service
│   └── utils.ts        # ShadCN utilities (cn function)
└── assets/             # Static assets
```

## Authentication Integration

This website integrates with the StartupAI Product Platform for user authentication:

- **Supabase Auth**: Shared authentication system across both sites
- **JWT Token Handoff**: Cryptographically signed tokens for secure transitions
- **OAuth Support**: Google, GitHub, Azure, and email authentication
- **Magic Links**: Passwordless authentication option
- **Cross-Site Sessions**: Persistent authentication with automatic refresh

### OAuth Configuration (Critical)

OAuth requires configuration in **TWO** locations:

**1. Code Configuration:**
- **File:** `.env.production` (committed to repository)
- **Variables:**
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_APP_URL` (must be production URL)

**2. Supabase Dashboard Configuration:**
- **Site URL:** Must be set to `https://app-startupai-site.netlify.app`
- **Redirect URLs:** Must include:
  - `http://localhost:3000/**` (development)
  - `https://app-startupai-site.netlify.app/**` (production)
  - `https://startupai-site.netlify.app/**` (marketing)

⚠️ **Important:** If OAuth redirects to `localhost:3000` in production, check Supabase dashboard settings

### Integration with app.startupai.site Platform

1. User visits marketing site (startupai-site.netlify.app)
2. User completes signup/payment process
3. Supabase Auth generates secure JWT token
4. User is redirected to product platform (app-startupai-site.netlify.app)
5. Token is validated and user session is created
6. User begins onboarding in product platform

## Deployment

The website is automatically deployed to Netlify via GitHub integration:

1. Push changes to the `main` branch
2. GitHub triggers Netlify build process
3. Netlify builds and deploys automatically
4. Available at <https://startupai-site.netlify.app>

**Deployment Status:** ✅ Live with full CI/CD pipeline  
**Build Command:** `pnpm build`  
**Package Manager:** pnpm 9.12.1 (✅ migrated from npm on Sept 26, 2025)  
**Repository:** chris00walker/startupai.site  
**Branch:** main

## Design System

The project includes a comprehensive design system with:

- **Design Tokens**: Consistent colors, typography, spacing
- **Component Library**: Professional UI components
- **Layout System**: Responsive grid and container patterns
- **Animation System**: Smooth transitions and micro-interactions

## Form Integration

- **Development**: Uses local API routes for testing
- **Production**: Integrates with Formspree for form submissions
- **Environment Detection**: Automatically switches based on NODE_ENV

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## Documentation

### 📖 Master Reference

**→ [Two-Site Implementation Plan](docs/technical/two-site-implementation-plan.md)**  
The **SINGLE SOURCE OF TRUTH** for all StartupAI development. Contains architecture, status, and implementation details for both marketing and product platforms.

### 📚 Documentation Categories

#### Business & Product
- [Product Requirements Document (PRD)](docs/product/PRD.md)
- [MVP Specifications](docs/product/mvp-specification.md)
- [User Stories](docs/product/user-stories.md)
- [Business Case Overview](docs/business/7-overview.md)
- [Market Research](docs/business/1-research.md)

#### Design & UX
- [Design System](docs/design/design-system.md)
- [UI Specifications](docs/design/ui-specifications.md)
- [Accessibility Standards](docs/design/accessibility-standards.md) (WCAG 2.1 AA)
- [User Experience Patterns](docs/design/user-experience.md)

#### Technical Guides
- [Next.js Configuration](docs/technical/next.js.md)
- [Netlify Deployment](docs/technical/netlify.md)
- [PostHog Analytics](docs/technical/PostHog.md)
- [AI SDK Integration](docs/technical/AI_SDK_Pages_Router.md)

#### Engineering & Operations
- [npm→pnpm Migration](docs/engineering/releases/migration-npm-pnpm.md) (Sept 26, 2025)
- [Netlify Environment Setup](docs/engineering/deployment/NETLIFY_ENV_SETUP.md)
- [PostHog Production Deployment](docs/integrations/posthog/POSTHOG_PRODUCTION_COMPLETE.md) (Oct 5, 2025)
- [Git Workflow](docs/operations/git-workflow/GIT_COMMIT_SUMMARY.md)

### 🔗 Product Platform Documentation

For product-specific documentation (authentication, database, testing, CrewAI), see:
- **[app.startupai.site README](../app.startupai.site/README.md)** - Product platform overview
- **[Implementation Status](../app.startupai.site/docs/operations/implementation-status.md)** - Weekly progress tracking
- **[CrewAI Backend](../app.startupai.site/backend/CREW_AI.md)** - AI agent implementation

---

## Current Status

**Overall Progress:** 95% Complete  
**Last Updated:** October 6, 2025  
**Critical Issues:**
- ⚠️ Login form authentication disabled for testing (MUST FIX before production)
- ⚠️ Signup form not integrated with Supabase

**Next Steps:**
1. Re-enable authentication in login form (2 hours)
2. Integrate signup with Supabase user creation (4 hours)
3. Test cross-site handoff to product platform

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
