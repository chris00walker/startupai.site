---
purpose: "Private technical source of truth for application data schema"
status: "active"
last_reviewed: "2025-10-27"
---

# Data Schema

Supabase Postgres hosts the canonical data model. Drizzle ORM definitions live in the product repo (`app.startupai.site/frontend/src/db/schema`). Schema changes are managed via SQL migrations under `app.startupai.site/supabase/migrations`.

## Core Domains

### Users & Plans

| Table | Purpose | Notes |
| --- | --- | --- |
| `auth.users` (Supabase) | Base auth identity. | Managed by Supabase. |
| `user_profiles` | Stores role, plan status, onboarding flags, consent metadata. | Created in `00005_user_roles_and_plans.sql`. |
| `trial_usage_counters` | Tracks plan limits for onboarding sessions and workflows. | Enforced by onboarding API before starting sessions. |

### Onboarding

Defined in `00009_onboarding_schema.sql`.

| Table | Highlights |
| --- | --- |
| `onboarding_sessions` | Stores conversation history, stage progress, plan type, AI context. JSONB columns (`conversation_history`, `stage_data`) capture dynamic content. Status enum: `active`, `paused`, `completed`, `abandoned`, `expired`, `error`. RLS ensures users only access their sessions. |
| `entrepreneur_briefs` | Structured output from onboarding (customer segments, problems, solutions, metrics). Supports versioning via `previous_version_id`. |
| `onboarding_feedback` | Captures user satisfaction, follow-up actions, and NPS-style ratings. |

### Evidence & Strategy

| Table | Highlights |
| --- | --- |
| `projects` | Primary workspace entity. Links to evidence, hypotheses, experiments. |
| `hypotheses`, `experiments` | Track assumption lifecycle and validation plans. |
| `evidence` | Stores structured evidence with vector embeddings (see `backend/src/startupai/tools.py`). |
| `reports` | Houses generated Fit Reports, canvases, and exports. |

### CrewAI Outputs *(roadmap)*

Upcoming migration will add `crew_ai_runs` and `crew_ai_outputs` once automation is live. Marketing should treat these as planned until migrations land.

## Migration Workflow

1. Update Drizzle schema files in the product repo.
2. Generate migration (`pnpm drizzle-kit generate`).
3. Review SQL and apply via `supabase db push` or CI.
4. Update documentation (this file, product spec) and notify marketing if output-facing structures change.

## Row-Level Security

- RLS enabled on user-owned tables (`onboarding_sessions`, `entrepreneur_briefs`, `evidence`, etc.).
- Policies usually follow pattern: allow user (`auth.uid() = user_id`) and service-role override.
- Marketing has no direct database access; all reads happen via APIs or exports coordinated with product ops.

## Data Retention & Compliance

- Onboarding sessions expire after 24 hours by default (`expires_at` in `onboarding_sessions`).
- Entrepreneur briefs retain version history; future work will add soft-delete or archival policies.
- Evidence embeddings rely on OpenAI. Opt-out flags must be respected before generating embeddings.

For the canonical specs and table definitions, see the product repo’s `docs/specs/data-schema.md` once updated alongside this file.
