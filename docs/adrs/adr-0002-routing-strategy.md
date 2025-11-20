---
purpose: "Private ADR for routing consolidation strategy"
status: "active"
last_reviewed: "2025-10-27"
---

# ADR-0002: Routing Strategy

## Context

We inherited both Pages Router and App Router code paths during the migration from legacy Next.js releases. Maintaining dual routers increased bundle size and complicated auth guarding.

## Decision

- Consolidate on **App Router** for all authenticated experiences.
- Preserve a single `middleware.ts` ensuring Supabase session refresh for every request.
- Expose `/api/public/*` routes via Next.js Route Handlers, keeping legacy Netlify Functions only as fallbacks documented in [`ops/router-consolidation.md`](../ops/router-consolidation.md).

## Consequences

- ✅ Simplified data fetching (Server Components, RSC caching).
- ✅ Consistent auth middleware and layouts.
- ⚠️ Requires marketing site to proxy any legacy Pages Router endpoints still referenced externally; track these in [`public-interfaces/marketing-contracts.md`](../public-interfaces/marketing-contracts.md).
- ⚠️ All future features must follow the App Router conventions defined in [`specs/frontend-components.md`](../specs/frontend-components.md).

Revisit this ADR only if Next.js introduces incompatible breaking changes.
