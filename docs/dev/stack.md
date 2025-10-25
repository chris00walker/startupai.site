---
purpose: "Overview of the marketing site technology stack"
status: "active"
last_reviewed: "2025-10-27"
---

# Stack Overview

| Layer | Choice | Why | Source |
| --- | --- | --- | --- |
| Framework | Next.js 15 (App Router) | File-based routing, static export, shared patterns with application repo. | `package.json`, `src/app/*` |
| Language | TypeScript | Strong typing for marketing components + shared utilities. | `tsconfig.json` |
| Styling | Tailwind CSS + Shadcn UI | Rapid iteration + consistent design tokens shared with product. | `tailwind.config.js`, `src/components/ui/*` |
| State / Forms | React Hook Form + Zod | Accessible form validation, reused in app repo. | `src/components/signup-form.tsx`, `src/app/api/waitlist/route.ts` |
| Data Fetching | Static props / fetch | Site is statically exported; only waitlist API uses runtime fetch. | `next.config.js`, `src/app/api/waitlist/route.ts` |
| Analytics | PostHog JS client | Unified event pipeline with application analytics. | `instrumentation-client.ts`, `src/lib/analytics.ts` |

## Project Structure

```
src/
  app/            # App Router pages (pricing, product, services, blog, etc.)
  components/     # Shadcn-derived UI primitives + marketing-specific widgets
  lib/            # Utilities (analytics, formatting, Supabase client)
  styles/         # Global CSS + design token definitions
```

Key directories:

- `src/components/ui/` – Shadcn components generated via `pnpm shadcn:add`. Synchronized manually with the app repo to keep UX consistent.
- `src/components/sections/` – Marketing-specific sections (hero, testimonials).
- `src/lib/supabase/client.ts` – Browser-only client for Supabase auth flows.

## Build & Deployment

- `pnpm dev` – Next.js dev server (Turbopack).
- `pnpm build` – `next build && next export` producing `out/` for Netlify.
- Netlify deploy uses `netlify.toml` for headers and redirects. Production build injects Supabase/PostHog env vars.
- No serverless functions beyond `/api/waitlist`.

## Shared Code with Application Repo

- Design tokens originate from the same palette (see `src/app/globals.css` here and `frontend/src/app/globals.css` in the product repo).
- Analytics taxonomy reused via similar helper shape (`src/lib/analytics.ts` vs `frontend/src/lib/analytics/index.ts`).
- Navigation/footer components mirror product variations to keep brand consistent.

## Tooling

- **Linting** – `pnpm lint` (Next.js ESLint config).
- **Formatting** – Prettier (`pnpm format`).
- **Type Checking** – `pnpm type-check`.
- **CI** – Netlify builds + GitHub actions (see `.github/workflows` once re-enabled).

## Roadmap Notes

- CMS integration pending (see `docs/work/roadmap.md`). Until then copy lives inline.
- Bundle analyzer + automated Lighthouse planned (`marketing#150`, `marketing#152`).
- Shared component extraction into a package is on the backlog but not yet prioritized.
