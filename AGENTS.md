# Repository Guidelines

This Next.js 15 marketing site serves as the public transparency interface for StartupAI's AI Founders Team, exporting statically to Netlify and routing qualified visitors to the product app via Supabase authentication.

## Project Structure & Module Organization

- Marketing entry point lives in `src/app`; keep client components in `src/components` to minimize hydration.
- `src/components/ui` houses Shadcn UI primitives (synced with `components.json`). Add via `pnpm dlx shadcn-ui@latest add <component>`.
- Shared logic is under `src/lib` (Supabase client, analytics), `src/styles`, and `src/types`; import through the `@/*` alias.
- `netlify/functions` contains serverless hooks (e.g., `waitlist.ts` → Resend). `supabase/.temp` tracks the linked project ref—commit changes.
- Read `docs/overview/ai-founders-architecture.md` before altering service integration flows; keep CTA and plan contracts aligned with `docs/service-contracts/marketing-to-app-contracts.md`.

## Build, Test, and Development Commands

- `pnpm dev` / `pnpm dev:local` start Turbopack; `pnpm dev:staging` runs `netlify dev` for Supabase + functions parity.
- `pnpm build` must pass before merge; `pnpm lint` and `pnpm type-check` gate linting and types.
- Format with `pnpm format` (or `pnpm format:check` in CI).

## Coding Style & Naming Conventions

- TypeScript-first; use PascalCase files for components, camelCase for utilities, kebab-case for non-React files.
- Favor Tailwind utilities and `cn` helper; extend Shadcn variants in `components/ui/base` when adding states.
- Preserve the “new-york” design tokens—touch `tailwind.config.js` and matching CSS variables together.
- Read environment values via `process.env` and guard like `src/lib/supabase/client.ts` does.

## Supabase & Auth Workflow

- Required env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_APP_URL`; mirror Netlify values in `.env.local` and add PostHog/Formspree keys when needed.
- Always create clients through `src/lib/supabase/client.ts`; do not embed keys in components.
- Use Supabase CLI against the ref stored in `supabase/.temp/project-ref` for migrations or status checks.
- Test OAuth with `pnpm dev:staging` to confirm redirect origins and plan query params (see pricing CTA mapping in `docs/service-contracts/marketing-to-app-contracts.md`).

## Testing Guidelines

- No automated tests today; run `pnpm lint`, `pnpm type-check`, and `pnpm build` plus manual QA notes (device, viewport, logged-in path).
- Validate Netlify functions and Resend flows with `pnpm dev:staging` or deploy previews.
- Document Supabase schema or analytics changes in `docs/schema` and `docs/dev/analytics-seo.md` alongside code updates.

## Commit & Pull Request Guidelines

- Use Conventional Commits (`fix:`, `feat:`, `chore:`) with scoped granularity (`feat(waitlist-form): ...`).
- PRs must list validation commands, Supabase/Netlify envs touched, and include before/after visuals for UI updates.
- Link relevant docs (`docs/dev/local-dev.md`, AI Founders architecture, contracts) and request design/infra review when touching Shadcn tokens, routing, or auth.
