# CLAUDE.md - StartupAI Marketing Site

## Quick Reference
- **Purpose**: Public-facing lead capture and product positioning
- **Framework**: Next.js 15 (App Router, Static Export)
- **Deployment**: Netlify
- **CLI Tools**: See `~/.claude/CLAUDE.md`
- **Master Architecture**: [`startupai-crew/docs/master-architecture/`](../startupai-crew/docs/master-architecture/)
- **Testing**: TDD with JDTD methodology - see [`app.startupai.site/docs/testing/`](../app.startupai.site/docs/testing/)

## Architecture
```
    AI Founders Team (startupai-crew)
         [Core Decision Engine]
             ↙    ↘
  startupai.site   app.startupai.site
  [Transparency]      [Delivery]
```

**Constraint**: Static export only - no SSR, no API routes in production.

## Directory Structure
```
src/
├── app/           # Next.js App Router pages
├── components/    # Shadcn UI (New York theme)
├── lib/           # Utilities (Supabase client, analytics)
└── styles/        # Tailwind config

netlify/functions/ # Serverless functions (waitlist notification)
```

## Commands
```bash
pnpm dev              # Dev server (port 3000)
pnpm dev:staging      # Netlify dev (test functions locally)
pnpm lint             # ESLint
pnpm type-check       # TypeScript
pnpm build            # Static export → out/
```

## Coding Standards

### Components
- Functional components, TypeScript strict mode
- Default exports for pages, named exports for components
- Tailwind utility classes, mobile-first responsive

### Forms
- React Hook Form + Zod validation
- Error states with accessible labels

### Next.js 15 Client/Server Rules
**See `docs/dev/nextjs15-patterns.md` for full guide.**

Quick rule: You cannot mix `export const metadata` with client hooks (`useForm`, `useState`) in the same file.

| Pattern | Use When |
|---------|----------|
| Separate files (page.tsx + ClientComponent.tsx) | Need both SEO metadata AND forms/hooks |
| Client-only (`'use client'` first line) | Internal pages, dashboards |
| Server-only (no hooks) | Blog posts, static content |

## Auth Flow
1. User clicks "Sign Up" → `supabase.auth.signUp()` with plan metadata
2. Supabase redirects to `${NEXT_PUBLIC_APP_URL}/auth/callback`
3. Product app handles OAuth callback and onboarding

## Form Handling
- **Waitlist**: Formspree (`mpwjagrn`) + optional Resend email
- **Contact**: Client-side validation
- **Signup**: Supabase Auth (handled in product app)

## Quality Gates
- [ ] TypeScript and ESLint errors resolved
- [ ] No "use client" directive errors
- [ ] Lighthouse > 90 (Performance, Accessibility, SEO)
- [ ] Auth redirect to product app verified

## Cross-Repo
- **Upstream**: `startupai-crew` → `app.startupai.site` → this repo
- **Blockers**: `docs/work/cross-repo-blockers.md`
- **Master Architecture**: `startupai-crew/docs/master-architecture/`

## Documentation
```
docs/
├── overview/    # Vision, personas, messaging
├── specs/       # Feature specs, API contracts
├── dev/         # Stack, local dev, performance
├── ops/         # Deployments, monitoring
├── work/        # Roadmap, backlog, in-progress
└── adrs/        # Architecture decisions
```

---
**Last Updated**: 2026-01-20
