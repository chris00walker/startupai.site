# StartupAI Marketing Site

This repository hosts the public transparency interface for StartupAI's AI Founders Team. It showcases the AI agents' work, captures leads, and routes qualified visitors into the customer portal at `app.startupai.site`. The site is built with Next.js 15 App Router, exports to static HTML, and deploys to Netlify with Supabase-powered sign-up flows and PostHog analytics.

## AI Founders Architecture

This site is one of three core services in the AI Founders Architecture:

- **AI Founders Team ([`startupai-crew`](https://github.com/chris00walker/startupai-crew))** – The CrewAI agents that form the brain of StartupAI, analyzing markets and validating ideas.
- **Marketing Interface (this repository)** – Public transparency layer showing AI team activity, capturing leads, and building trust through visibility.
- **Product Interface ([`app.startupai.site`](https://github.com/chris00walker/app.startupai.site))** – Customer portal where users receive AI-driven validation results and strategic insights.

### Technical Implementation

- **Static export + edge services** – `next.config.js` sets `output: 'export'`, so pages ship as static assets. Dynamic needs are handled client-side, through Formspree, or via Netlify Functions.
- **Shared design system** – Shadcn UI components (New York theme) and Tailwind tokens mirror the product repo to keep UX consistent.
- **Lead capture** – Waitlist submissions post to Formspree in production. A sample API handler lives at `src/app/api.bak/waitlist/route.ts`; move it back under `src/app/api/waitlist/route.ts` or point requests to `/.netlify/functions/waitlist` when using `pnpm dev:staging` to exercise the Netlify function locally.
- **Service integration** – Pricing CTAs and sign-up forms append a `plan` query parameter that the product app validates during Supabase onboarding.

## Tech Stack

| Layer      | Tooling                           | Notes                                                                         |
| ---------- | --------------------------------- | ----------------------------------------------------------------------------- |
| Framework  | Next.js 15 + Turbopack dev server | App Router, React 19, static export workflow.                                 |
| Language   | TypeScript 5.8                    | Strict mode with bundler module resolution.                                   |
| UI         | Tailwind CSS + Shadcn UI          | `components.json` tracks generator config.                                    |
| Forms      | React Hook Form + Zod             | Used by waitlist, contact, and sign-up flows.                                 |
| Auth       | Supabase Auth (browser client)    | `src/lib/supabase/client.ts` wraps `@supabase/ssr`.                           |
| Analytics  | PostHog                           | Bootstraps in `instrumentation-client.ts`; helpers in `src/lib/analytics.ts`. |
| Deployment | Netlify                           | `netlify.toml` sets build command, redirects, headers, env vars.              |

## Directory Layout

```
src/
  app/               Route tree (home, services, product, blog, etc.)
  components/        Shadcn UI primitives + marketing sections
  lib/               Supabase client, analytics helpers, utilities
  styles/            Tailwind layer; complements Shadcn tokens
netlify/functions/   Edge functions (waitlist notification)
docs/                Project guides, runbooks, contracts
```

See [`docs/README.md`](docs/README.md) for a full documentation index.

## Getting Started

1. **Install dependencies**
   ```bash
   nvm use        # Node 18+
   pnpm install
   ```
2. **Create `.env.local`**
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   NEXT_PUBLIC_APP_URL=http://localhost:3001
   NEXT_PUBLIC_POSTHOG_KEY=...
   NEXT_PUBLIC_POSTHOG_HOST=https://us.posthog.com
   RESEND_API_KEY=...            # optional, for waitlist email alerts
   RESEND_FROM=onboarding@resend.dev
   ```
   Production values come from Netlify environment settings.
3. **Run locally**
   ```bash
   pnpm dev            # Next.js + Turbopack
   ```
   For serverless parity (Netlify Functions + Supabase hand-off), use:
   ```bash
   pnpm dev:staging    # netlify dev wrapper
   ```

## Key Commands

- `pnpm dev` – Local development server on port 3000.
- `pnpm dev:staging` – `netlify dev`; proxies `/.netlify/functions/*` and mirrors env vars.
- `pnpm build` – Production build + static export (`out/`).
- `pnpm lint` / `pnpm type-check` – ESLint + TypeScript gates.
- `pnpm format` / `pnpm format:check` – Prettier write/verify across code, config, docs.

## Lead Capture & Auth Flows

- **Waitlist** – `WaitlistForm` uses Formspree form `mpwjagrn` in production. During local work it still targets `/api/waitlist`; to test end-to-end, temporarily restore the handler from `src/app/api.bak/waitlist/route.ts` or switch the fetch URL to `/.netlify/functions/waitlist` while running `pnpm dev:staging`. Both implementations validate the email and optionally notify the team via Resend.
- **Contact** – `ContactForm` currently performs client-side validation and logs submissions. A Netlify Form + CRM workflow is planned (`docs/ops/forms-and-leads.md`).
- **Sign-up** – `SignupForm` calls Supabase `auth.signUp` with plan metadata and PKCE redirect back to the product app (`NEXT_PUBLIC_APP_URL`). GitHub OAuth is supported; in development the redirect stays on localhost, while production flows through the app domain.
- **Login** – `/login` immediately redirects to `${NEXT_PUBLIC_APP_URL}/login` so OAuth completes on the product domain before returning to onboarding.

## Deployment

- CI/CD runs through Netlify. Deploys trigger on `main`, executing `pnpm build` and publishing `out/`.
- Redirects and headers live in `netlify.toml`, including legacy HTML routes → App Router paths.
- Environment variables (Supabase, PostHog, marketing/app URLs) are managed in Netlify UI. Keep `.env.local` in sync when testing flows that bridge to the product app.

## Related Services

- **AI Founders Core**: [`startupai-crew`](https://github.com/chris00walker/startupai-crew) – The CrewAI agents that power StartupAI's core intelligence.
- **Product Interface**: [`app.startupai.site`](https://github.com/chris00walker/app.startupai.site) – Customer portal for AI-driven validation delivery.

## License

MIT © Chris Walker. See [LICENSE](LICENSE) for details.
