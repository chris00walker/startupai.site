---
purpose: "Summarize the marketing site's security posture"
status: "active"
last_reviewed: "2025-10-27"
---

# Security Overview

Marketing runs as a static Next.js export with a narrow runtime surface. This document replaces the legacy incident reports and captures the live posture plus remaining risks.

## Attack Surface

| Surface | Description | Controls |
| --- | --- | --- |
| Netlify-hosted static site | HTML/CSS/JS generated at build time. | Locked down via Netlify team RBAC. |
| `/api/waitlist` route | Minimal POST handler using Resend. | Zod validation, no DB access, logs suppressed in production. |
| Formspree endpoint | Production waitlist + contact forms. | Requires Formspree account; anti-spam enabled. |
| External links to application | Redirects with `plan` param to `app.startupai.site`. | Supabase PKCE ensures tokens exchange server-side. |

No server-side rendering or database writes occur within this repo.

## Secrets & Environment Variables

| Variable | Purpose | Where set | Notes |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client Supabase access. | Netlify env / `.env.local`. | Public values but rotate if leaked. |
| `NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_HOST` | Analytics bootstrap. | Netlify env. | Public values. |
| `NEXT_PUBLIC_APP_URL` | Cross-site redirects. | Netlify env. | Controls where CTAs point. |
| `RESEND_API_KEY` | Optional email notifications. | Netlify env (optional). | Omit to avoid emailing from non-production. |

Service-role keys, database credentials, and CrewAI tokens live exclusively in the application repo or secret manager.

## Platform Hardening

- **HTTP Security Headers** – Configured in `netlify.toml` (HSTS handled by Netlify globally). Includes `X-Frame-Options: DENY` and `Permissions-Policy`.
- **Form Spam Protection** – Formspree includes built-in bot filters; Netlify forms use honeypot fields.
- **Dependencies** – Renovate bot monitors vulnerabilities. Run `pnpm audit` during release as belt-and-suspenders.
- **Static Export** – Eliminates SSR injection vectors. Any future move to SSR must re-run threat modeling.

## Known Risks & Follow-ups

| Risk | Mitigation | Owner | Status |
| --- | --- | --- | --- |
| Supabase anon key widely shared | Rotate quarterly; monitor via Supabase logs. | Product | Ongoing |
| Form submissions lack rate limits | Netlify handles basic rate limiting, but consider adding Recaptcha if abuse increases. | Marketing Ops | On watchlist |
| Legacy docs with secrets | Confirmed removed in migration; Git history audited 25 Oct 2025. | Marketing Engineering | Complete |
| Shared status links | Ensure status/changelog pages enforce HTTPS and proper cache headers. | Product SRE | Q4 2025 |

## Incident Response

- Follow `docs/ops/incident-playbook.md` for uptime or security incidents.
- Security contact: `security@startupai.site` (monitored inbox).
- For PostHog incidents, refer to `docs/ops/runbook-posthog.md`.

Historical security reports (PostHog key exposure, Supabase fixes) are preserved in `archive/legacy-public-docs.md` for audit purposes.
