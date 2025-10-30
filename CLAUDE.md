# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**StartupAI Marketing Site** (`startupai.site`) - Marketing website for the StartupAI platform. Part of a two-site architecture:

- **startupai.site** (Marketing) - Convert prospects to customers ← **THIS REPO**
- **app.startupai.site** (Product) - Deliver value and create advocates

**Tech Stack:**
- Frontend: Next.js 15.5.3 (TypeScript 5.8.3, React 19.1.1)
- Styling: Tailwind CSS 3.4.17 with ShadCN/UI component library (68+ components)
- Backend: Supabase PostgreSQL with Auth (JWT, OAuth)
- Analytics: PostHog v1.270.1
- Forms: Formspree integration, Resend API for email
- Package Manager: pnpm 9.12.1
- Node Version: 22.18.0 (managed via `.nvmrc`)

## Development Commands

### Setup and Development

```bash
# Initial setup
nvm use                    # Load Node 22.18.0
pnpm install              # Install dependencies

# Development
pnpm dev                  # Next.js dev with Turbopack (localhost:3000)
pnpm dev:local            # Explicit local dev (port 3000)
pnpm dev:staging          # Netlify dev (port 8888) for production-like testing

# Building
pnpm build                # Next.js static export build
pnpm build:staging        # Build with NODE_ENV=staging
pnpm build:production     # Build with NODE_ENV=production

# Code Quality
pnpm lint                 # ESLint check
pnpm type-check           # TypeScript validation
pnpm format               # Prettier format (JS, TS, JSON, MD, HTML, CSS)
pnpm format:check         # Check formatting without changes

# Environment
pnpm env:check            # Check environment variables
```

## Architecture

### Next.js App Router

This project uses **Next.js App Router** exclusively (`src/app/`).

**Key Routes:**
- `/` - Home page with hero and service overview
- `/login`, `/signup` - Authentication flows (Supabase)
- `/services/*` - 5 service pages (discovery, validation, scaling, advisory, optimization)
- `/contact` - Contact form (Formspree integration)
- `/pricing` - Pricing page
- `/blog` - Blog listing
- `/process`, `/product` - Process and product showcase
- `/case-studies` - Case studies
- `/ai-strategy` - AI strategy page
- `/demo/dashboard` - Demo dashboard preview
- `/api/waitlist` - POST endpoint for waitlist signup

**Layout Structure:**
- Root layout: `src/app/layout.tsx` includes Navigation and Footer
- All pages are static/pre-rendered for optimal performance

### Component Organization

```
src/components/
├── ui/                    # ShadCN/UI components (40+ components)
│   ├── Navigation.tsx     # Navigation header
│   ├── Footer.tsx         # Footer section
│   ├── button.tsx, card.tsx, dialog.tsx
│   ├── form.tsx, input.tsx, label.tsx
│   ├── data-display/      # Table, list, tags, filters
│   ├── data-entry/        # Form components
│   ├── feedback/          # Alert, toast, loading
│   └── navigation/        # Breadcrumb, sidebar, pagination
├── sections/
│   ├── Hero.tsx           # Home hero section
│   ├── ContactForm.tsx    # Contact section
│   ├── ServiceCard.tsx    # Service card component
│   └── AIStrategy.tsx     # AI strategy section
├── demo/
│   ├── DashboardLayout.tsx  # Demo dashboard layout
│   └── AppSidebar.tsx     # Demo sidebar
├── login-form.tsx         # Login form (Supabase integration)
├── signup-form.tsx        # Signup form
└── waitlist-form.tsx      # Waitlist form
```

**UI Library:** Built on Radix UI primitives with Tailwind CSS. Components in `ui/` follow ShadCN conventions (new-york style variant).

### Static Export Configuration

**Build Output:**
- Static export to `/out` directory
- Deployed to Netlify CDN
- Images unoptimized (required for static export)
- Trailing slashes enabled for URL consistency

### Authentication

**Supabase Integration:**
- OAuth providers: Google, GitHub, Azure
- JWT token management
- Secure cross-site token handoff to app.startupai.site
- Magic link support

**Key Files:**
- `src/lib/supabase/client.ts` - Supabase client initialization
- `src/lib/auth.ts` - Authentication helpers
- `src/components/login-form.tsx` - Login UI
- `src/components/signup-form.tsx` - Signup UI

### Environment Variables

**Required** (set in `.env.local`):
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `NEXT_PUBLIC_MARKETING_URL` - Marketing site URL (this site)
- `NEXT_PUBLIC_APP_URL` - Product platform URL (app.startupai.site)
- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog analytics key
- `NEXT_PUBLIC_POSTHOG_HOST` - PostHog endpoint (https://us.i.posthog.com)

**Optional:**
- `JWT_SECRET` - Session JWT (backend only)
- `SESSION_SECRET` - Session secret (backend only)
- `RESEND_API_KEY` - Email API for waitlist notifications
- `NODE_ENV` - Environment (development/staging/production)

**Environment Files:**
- `.env.example` - Template for all environments
- `.env.local` - Local development (gitignored)
- `.env.production` - Production variables (committed)
- `.env.staging` - Staging environment
- `.envrc` - direnv config (loads from `~/.secrets/startupai`)

See `.env.example` for complete template.

## Important Conventions

### Styling

- **CSS Variables:** Use HSL values defined in `src/styles/globals.css`
- **Tailwind Utilities:** Use `cn()` helper from `src/lib/utils.ts` (clsx + tailwind-merge)
- **Dark Mode:** Supported via class-based approach
- **Responsive Design:** Mobile-first with Tailwind breakpoints

### Forms

- **Validation:** All forms use Zod schemas for validation
- **Form Handling:** React Hook Form for state management
- **Patterns:**
  ```typescript
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { z } from 'zod';

  const schema = z.object({ email: z.string().email() });
  const form = useForm({ resolver: zodResolver(schema) });
  ```

### Analytics

- **PostHog Integration:** Event tracking via `src/lib/analytics.ts`
- **Type-Safe Events:** Use defined event types for consistency
- **Common Events:** Page views, button clicks, form submissions

### File Organization

- **Component Colocation:** Keep related components together
- **No Mock Data:** All components use real data from Supabase
- **Import Aliases:** Use `@/` prefix for src imports (e.g., `@/components`, `@/lib`)

### Code Quality

- **TypeScript Strict Mode:** All code must type-check
- **No Unused Imports:** Clean up imports before committing
- **Explicit Error Handling:** All async operations should handle errors
- **Accessibility:** All interactive elements need proper ARIA labels
- **Security:** Never commit secrets, use environment variables

### Git Workflow

- **Never force push to main** without explicit permission
- **Follow existing commit message style:** Check `git log` for patterns
- **Test before committing:** Run `pnpm type-check` and `pnpm build`
- **Format code:** Run `pnpm format` before committing

## Deployment

### Netlify Configuration

**Build Settings (`netlify.toml`):**
- Build command: `pnpm build`
- Publish directory: `out`
- Node.js 18, pnpm 9.12.1

**Deployment Contexts:**
1. **Production (main branch)**
   - URL: https://startupai-site.netlify.app
   - NODE_ENV=production

2. **Staging (staging branch)**
   - URL: https://staging--startupai-site.netlify.app
   - NODE_ENV=staging

**Features:**
- Automatic builds on push to main
- Preview deploys for pull requests
- Redirects for old HTML routes
- Security headers (X-Frame-Options, XSS-Protection, CSP)
- Cache control for static assets
- SPA routing fallback

## Key Documentation

### Repository Documentation
- **README.md** - Comprehensive project overview with features and setup
- **ENVIRONMENTS.md** - Multi-environment setup guide (local, staging, production)
- **agents.md** - AI agents implementation details

### Docs Directory (`/docs`)
```
docs/
├── overview/           # Platform overview & architecture
├── specs/              # Technical specifications
├── schema/             # Database schema documentation
├── ops/                # Operations and deployment guides
├── engineering/        # Engineering practices and migrations
├── adrs/               # Architecture Decision Records
├── work/               # Work tracking and issues
└── archive/            # Archived documentation
```

**Key Files:**
- `docs/overview/platform-overview.md` - Two-site architecture
- `docs/overview/two-site-plan-public.md` - Implementation plan
- `docs/overview/architecture.md` - System architecture
- `docs/overview/messaging-matrix.md` - Feature/messaging mapping

### External References
- **Two-Site Implementation Plan:** See docs/overview/two-site-plan-public.md - Single source of truth for all StartupAI development
- **Product Platform:** `../app.startupai.site` - Related product repository
- **CrewAI Backend:** `../startupai-crew` - AI analysis backend

## Common Pitfalls

1. **Don't use `npm`:** This project uses `pnpm` exclusively
2. **Don't modify `.next/` or `node_modules/`:** These are generated directories
3. **Don't store secrets in code:** Use environment variables and `.env.local`
4. **Don't skip type checking:** Run `pnpm type-check` before committing
5. **Don't commit unformatted code:** Run `pnpm format` before committing
6. **Don't bypass authentication:** All protected routes must check Supabase session
7. **Don't disable image optimization without reason:** Static export requires it

## Project Status

**Overall:** ~95% Complete (as of October 2025)
- ✅ Infrastructure: 100% (Netlify, Supabase, Analytics)
- ✅ UI Components: 95% (68+ components, ShadCN/UI library)
- ✅ Pages: 100% (19 pages, all static/pre-rendered)
- ⚠️ Authentication: 90% (Supabase integration ongoing)
- ⚠️ Testing: 0% (No testing framework configured)

**Recent Updates:**
- Migrated from npm to pnpm (Sept 26, 2025)
- Updated to Next.js 15.5.3 and React 19.1.1
- Integrated PostHog analytics
- Added comprehensive environment documentation

**Next Priorities:**
1. Complete Supabase authentication integration
2. Add Jest/Vitest testing framework
3. Implement E2E tests with Playwright
4. Add more blog content
5. Complete signup flow integration

## Testing

**Current Status:** No testing framework configured
- No Jest, Vitest, or Playwright tests
- Type checking via TypeScript (`pnpm type-check`)
- Linting via ESLint
- Manual testing approach currently in use

**Recommended Testing Setup:**
- Unit tests: Jest or Vitest for component testing
- Integration tests: Test API routes and Supabase integration
- E2E tests: Playwright for user flow testing

## Getting Help

- **Documentation Issues:** Check `README.md` and `docs/` directory first
- **Build Errors:** Ensure `nvm use` and `pnpm install` completed successfully
- **Type Errors:** Run `pnpm type-check` for detailed error messages
- **Environment Issues:** Verify `.env.local` has all required variables
- **Supabase Issues:** Check Supabase dashboard and connection strings
- **Deployment Issues:** Check Netlify build logs and deployment status
