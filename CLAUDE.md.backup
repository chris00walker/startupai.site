# CLAUDE.md - StartupAI Marketing Site Memory

## Project Identity

**Name**: StartupAI Marketing Site  
**Purpose**: Public-facing lead capture and product positioning  
**Framework**: Next.js 15 (App Router, Static Export)  
**Deployment**: Netlify

## AI Founders Architecture

```
        AI Founders Team
         (startupai-crew)
     [Core Decision Engine]
             ↙    ↘
    startupai.site   app.startupai.site
    [Transparency]      [Delivery]
```

### Key Services

- **AI Founders Core (startupai-crew)**: CrewAI agents that analyze, build, and validate
- **Marketing Interface (startupai.site)**: Public transparency, lead capture, AI team visibility
- **Product Interface (app.startupai.site)**: Customer portal, validation delivery, results dashboard

The AI Founders Team is the heart of StartupAI. The two web interfaces are windows into their work—one for public transparency, one for customer delivery.

### Key Constraints

- **Static Export Only**: No server-side rendering, no API routes in production
- **Service Communication**: Marketing displays AI activity; product delivers AI results
- **Query Parameter Passing**: `?plan=professional` passed to app during signup

## Directory Structure

```
src/
├── app/               # Next.js App Router pages
├── components/        # Shadcn UI components (New York theme)
├── lib/               # Utilities (Supabase client, analytics)
└── styles/            # Tailwind config

netlify/functions/     # Serverless functions (waitlist notification)
docs/                  # Project documentation
```

## Core Commands

```bash
# Development
pnpm dev                    # Next.js dev server (port 3000)
pnpm dev:staging            # Netlify dev (test functions locally)

# Quality Checks
pnpm lint                   # ESLint
pnpm type-check             # TypeScript validation
pnpm format                 # Prettier write
pnpm format:check           # Prettier verify

# Build & Deploy
pnpm build                  # Static export → out/
# Deployment automatic via Netlify on push to main
```

## Authentication Flow

1. User clicks "Sign Up" on marketing site
2. `SignupForm` calls `supabase.auth.signUp()` with plan metadata
3. Supabase redirects to `${NEXT_PUBLIC_APP_URL}/auth/callback`
4. Product app handles OAuth callback and onboarding

### GitHub OAuth

- Production: Redirects through app domain
- Development: `NEXT_PUBLIC_APP_URL=http://localhost:3001`

## Form Handling

- **Waitlist**: Formspree (form `mpwjagrn`) + optional Resend email
- **Contact**: Client-side validation (CRM integration planned)
- **Signup**: Supabase Auth (handled in product app)

## Environment Variables (Critical - Never Commit)

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_APP_URL=...           # Product app URL for auth redirect
NEXT_PUBLIC_POSTHOG_KEY=...
RESEND_API_KEY=...                # Optional for waitlist emails
```

## Design System

- **UI Framework**: Shadcn UI (New York theme)
- **CSS**: Tailwind CSS (shared tokens with product app)
- **Typography**: System fonts
- **Colors**: Defined in `tailwind.config.js`

## Coding Standards

### Components

- Functional components only
- TypeScript strict mode
- Props validated with Zod when using forms
- Default exports for pages, named exports for components

### Styling

- Tailwind utility classes (no custom CSS unless necessary)
- Shadcn component variants
- Responsive design: mobile-first

### Forms

- React Hook Form + Zod validation
- Error states with accessible labels
- Loading states during submission

### Next.js 15 Client/Server Component Rules

**🚨 CRITICAL: You CANNOT mix these patterns in the same file:**

❌ **WRONG** (causes "use client" directive error):

```tsx
// page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  // ← Server component pattern
  title: 'My Page',
};

('use client'); // ← Client directive (ERROR: must be first line)

import { useForm } from 'react-hook-form'; // ← Client hook

export default function MyPage() {
  const form = useForm(); // ← Client hook usage
  // ...
}
```

**Why this fails:**

1. `export const metadata` only works in **Server Components**
2. `'use client'` must be the **first line** (before imports)
3. `useForm` and other React hooks only work in **Client Components**
4. You cannot have both server (metadata) and client (hooks) in one file

---

✅ **CORRECT - Option 1: Separate Files (Recommended for SEO)**

Use this when you need both metadata AND client-side interactivity:

```tsx
// src/app/my-page/page.tsx (Server Component)
import { Metadata } from 'next';
import MyPageClient from './MyPageClient';

export const metadata: Metadata = {
  title: 'My Page',
  description: 'Page description for SEO',
  openGraph: {
    title: 'My Page',
    description: 'OG description',
  },
};

export default function MyPage() {
  return <MyPageClient />;
}
```

```tsx
// src/app/my-page/MyPageClient.tsx (Client Component)
'use client'; // ← First line!

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
// ... other imports

export default function MyPageClient() {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  // All your client-side logic here
  return <div>{/* Your JSX */}</div>;
}
```

---

✅ **CORRECT - Option 2: Client-Only (No Metadata)**

Use this when you DON'T need SEO metadata:

```tsx
// src/app/my-page/page.tsx (Client Component)
'use client'; // ← First line, no imports before this!

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// ... other imports

export default function MyPage() {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  return <div>{/* Your JSX */}</div>;
}
```

---

✅ **CORRECT - Option 3: Server-Only (No Client Hooks)**

Use this for pure content pages without interactivity:

```tsx
// src/app/my-page/page.tsx (Server Component)
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Page',
  description: 'Page description',
};

export default function MyPage() {
  // No useState, useEffect, useForm, etc.
  return <div>{/* Pure HTML/JSX, no client interactivity */}</div>;
}
```

---

### When to Use Each Pattern

| Pattern                      | Use When                                 | SEO    | Interactivity |
| ---------------------------- | ---------------------------------------- | ------ | ------------- |
| **Option 1: Separate Files** | Need both metadata AND forms/hooks       | ✅ Yes | ✅ Yes        |
| **Option 2: Client-Only**    | Internal pages, dashboards, tools        | ❌ No  | ✅ Yes        |
| **Option 3: Server-Only**    | Blog posts, documentation, landing pages | ✅ Yes | ❌ No         |

**For StartupAI marketing site:** Use **Option 1** for all public-facing pages (beta, pricing, about, etc.) because we need SEO.

---

### Validation Checklist

Before creating any page in `src/app/`:

- [ ] Does this page need SEO metadata? (titles, descriptions, OG tags)
- [ ] Does this page need client hooks? (useState, useForm, useEffect)
- [ ] If YES to both → Use separate files (page.tsx + ClientComponent.tsx)
- [ ] If only metadata → Use server component only
- [ ] If only hooks → Use client component only (but consider SEO impact!)

---

### Quick Reference

**Files that need client hooks:**

- Forms (React Hook Form)
- Interactive components (onClick handlers with state)
- API calls (useEffect, fetch)
- Browser APIs (localStorage, window, document)

**Files that need metadata:**

- All public marketing pages (for SEO)
- Landing pages
- Product pages
- Blog posts
- Any page you want shared on social media

---

## Quality Gates

- [ ] All TypeScript errors resolved
- [ ] All ESLint warnings fixed
- [ ] No "use client" directive errors (check file separation)
- [ ] Lighthouse score > 90 (Performance, Accessibility, SEO)
- [ ] All forms tested end-to-end
- [ ] Auth redirect to product app verified

## Common Tasks

### Add New Page

1. Create file in `src/app/[route]/page.tsx`
2. **DECISION POINT**: Does it need both metadata AND client hooks?
   - **YES**: Create `page.tsx` (server, metadata only) + `ClientComponent.tsx` (client hooks)
   - **NO**: Create single file as server OR client component
3. Export metadata for SEO (if server component)
4. Add navigation link if needed
5. Test static export: `pnpm build && npx serve out`
6. **VALIDATE**: Run `pnpm type-check` to catch Next.js 15 errors

### Update Shadcn Component

1. Modify in `src/components/ui/[component].tsx`
2. Keep New York theme conventions
3. Test in Storybook if available

### Test Auth Flow

1. Start both servers: `pnpm dev` (this site) and product app
2. Complete signup on marketing site
3. Verify redirect with token to product app
4. Check Supabase dashboard for new user

## Related Services

- **AI Founders Core**: `startupai-crew` (CrewAI agents - the brain of the operation)
- **Product Interface**: `app.startupai.site` (customer portal for AI-driven validation)
- **Marketing Interface**: `startupai.site` (this repository - public transparency layer)

### Master Architecture

The **single source of truth** for cross-service architecture lives in:
```
startupai-crew/docs/master-architecture/
├── 01-ecosystem.md           # Three-service reality diagram
├── 02-organization.md        # C-suite → Agent hierarchy
├── 03-validation-spec.md     # Technical implementation guide
├── 04-status.md              # Honest status assessment
└── reference/                # API contracts, approval workflows

startupai-crew/docs/work/
└── backlog.md                # Hypothesis-driven feature queue
```

This marketing site should only contain documentation specific to its own implementation. For anything that spans services, refer to the crew's master architecture.

## Cross-Repo Coordination

**⚠️ This repo is DOWNSTREAM of all others.** It depends on CrewAI and Product App.

### Before Starting Work
- Check `docs/work/cross-repo-blockers.md` for current dependencies
- If working on blocked items (Activity Feed, Metrics, etc.), verify upstream status:
  - CrewAI APIs: `startupai-crew/docs/work/cross-repo-blockers.md`
  - Product results UI: `app.startupai.site/docs/work/cross-repo-blockers.md`

### When Blockers Are Resolved Upstream
1. Update `docs/work/cross-repo-blockers.md` status
2. Move items to "In Progress" in `docs/work/in-progress.md`

### Dependency Chain
```
CrewAI → Product App → Marketing Site (this repo)
```

**Current blockers**: See `docs/work/cross-repo-blockers.md`

## Claude Code Customizations

### Available Agents (Project-Level)
See `.claude/agents/` for repo-specific agents:
- **content-strategist**: Evidence-based marketing copy, value proposition messaging, conversion-focused content, and strategic storytelling
- **performance-optimizer**: Next.js static export optimization, Lighthouse performance, Core Web Vitals, image optimization, and bundle analysis

### User-Level Agents (Available Across All Repos)
See `~/.claude/agents/` for cross-repo agents:
- **ecosystem-coordinator**: Cross-repo dependency management and blocker tracking
- **backend-developer**: Supabase, Drizzle ORM, API design, database architecture
- **frontend-developer**: Next.js, React, shadcn/ui, component patterns
- **ai-engineer**: CrewAI Flows, Vercel AI SDK, LLM integration

### Available Skills
See `~/.claude/skills/` for cross-repo skills:
- **frontend-design**: Creative UI design guidance emphasizing distinctive aesthetics (typography, bold colors, motion, atmospheric backgrounds) - avoid generic "AI slop" patterns
- **cross-repo-sync**: Update blocker files across all 3 repos
- **quality-gate**: Comprehensive pre-commit checks (lint, type-check, test, build)
- **crewai-integration-check**: Validate CrewAI API contracts and deployment connectivity

### Usage
Agents are automatically invoked based on context and trigger words in their descriptions. Skills are discovered and used when relevant to the current task. See individual agent/skill files for detailed capabilities.

## Documentation

All project documentation lives under `docs/`.

**Markdown allowed in repo root:**

- `README.md` – project overview
- `CLAUDE.md` – assistant + architecture guidance
- `AGENTS.md` – AI agents and responsibilities

Exceptions:
- Tooling dotfiles like `.mcp.README.md` may live in root only if required by the tool.

---

### Where to put what (routing rules)

When creating a new `.md` file, place it under `docs/` based on purpose:

- `docs/overview/` – vision, personas, JTBD, messaging, high-level architecture, public roadmap
- `docs/specs/` – feature specs, flows, API contracts, data schema and integrations
- `docs/dev/` – stack, local dev, performance, security, a11y/i18n, analytics, technical interaction specs
- `docs/ops/` – deployments, monitoring, runbooks, seeding, operational workflows
- `docs/incidents/` – incidents and RCAs (`YYYY-MM-DD-short-slug.md`)
- `docs/work/` – roadmap, phases, backlog, in-progress/done, implementation plans
- `docs/adrs/` – architecture decisions (`adr-XXXX-short-title.md`)
- `docs/schema/` – shared/marketing DB schemas
- `docs/archive/` – deprecated or legacy docs kept for reference

**Note**: Cross-service contracts and master architecture live in `startupai-crew/docs/master-architecture/`

---

### Rules for AI assistants (Claude, etc.)

When generating documentation:

1. **Do not create new `.md` files in the repo root**, unless the name is exactly:
   - `README.md`
   - `CLAUDE.md`
   - `AGENTS.md`
2. Put all other docs under `docs/` using the routing rules above.
3. If no directory is clearly correct, default to `docs/work/` **or** propose a new subdirectory under `docs/` and briefly describe its purpose at the top of the file.
4. After creating a new doc, add a link to it in `docs/README.md` for discoverability.
