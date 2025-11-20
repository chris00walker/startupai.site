---
purpose: "Document seeding responsibilities for marketing"
status: "active"
last_reviewed: "2025-10-27"
---

# Database Seeding

Marketing does not manage its own database. All seeding scripts live in the product repository (`app.startupai.site/frontend/src/db/seed.ts`).

## When Marketing Cares

- **Demo data for screenshots** – Coordinate with product to generate fresh entrepreneur briefs/projects.
- **Waitlist exports** – Currently handled via Formspree/Zapier; Supabase tables will be introduced in `marketing#155`/`#156`.

## Product Seeding Reference

| Command | Purpose | Owner |
| --- | --- | --- |
| `pnpm db:seed` (product repo) | Populates sample users/projects for dev environments. | Platform engineering |
| `supabase db dump` | Snapshot production (restricted access). | SRE |

For detailed scripts, see `app.startupai.site/docs/ops/database-seeding.md`.
