---
purpose: "Private technical source of truth for Supabase configuration"
status: "active"
last_reviewed: "2025-10-27"
---

# Supabase Configuration

## Project Snapshot

| Item | Value |
| --- | --- |
| Project ID | `eqxropalhxjeyvfcoyxg` (us-east-1) |
| Postgres | v15 with `pgvector`, `uuid-ossp`, `pg_net` extensions enabled |
| Auth | Supabase Auth with PKCE, secure cookies, session expiry 1 week |
| Storage | Buckets for evidence assets and exports (RLS enforced) |

## Environment Variables

| Variable | Scope | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Frontend (marketing + product) | Public; never store secrets. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Frontend | Rotated quarterly; treat as public. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side (product backend, CrewAI) | Stored in 1Password + Netlify build secrets. |
| `DATABASE_URL` / `DIRECT_DATABASE_URL` | Drizzle migrations + scripts | Use pooled connection for serverless workloads. |

## Access & Tooling

- CLI: `supabase link --project-ref eqxropalhxjeyvfcoyxg`
- Apply migrations: `supabase db push --include-all`
- Generate types: `pnpm drizzle-kit generate`
- Secrets stored in Netlify + GitHub Actions via 1Password Connect. Never commit keys.

## Security

- Row Level Security enabled on all user tables (see [`specs/data-schema.md`](data-schema.md)).
- Policies follow pattern: allow owner via `auth.uid()`, service-role override for admin tooling.
- Storage buckets scoped to user/project IDs; uploads require signed URLs.
- Audit logging enabled for auth, onboarding, evidence tables. Logs retained 90 days.

## Functions & Hooks

| Function | Purpose |
| --- | --- |
| `handle_onboarding_completion` | Updates session status, writes entrepreneur brief snapshot. |
| `update_trial_usage` | Maintains `trial_usage_counters` after each session. |
| `purge_expired_sessions` *(scheduled)* | Cleans up sessions older than 48 hours. |

(Created via `00009_onboarding_schema.sql`; see migrations for definitions.)

## Observability

- Supabase logs piped to Grafana + e-mail alerts for errors (managed by product SRE).
- Marketing should rely on PostHog + status page notifications rather than direct DB access.

## Roadmap / TODO

- Add marketing-specific schema (`marketing_waitlist`, `marketing_contacts`) – see [`schema/marketing-db.md`](../schema/marketing-db.md).
- Harden CrewAI tooling secrets (rotate OpenAI keys, add dedicated service role).
- Document backup/restore runbooks (currently maintained by product ops).

Refer to the product repository’s Supabase spec for full details (`app.startupai.site/docs/specs/supabase.md`).
