---
purpose: "Document the public-safe marketing database schema"
status: "active"
last_reviewed: "2025-10-27"
---

# Marketing Data Schema

Marketing currently relies on external services (Formspree, Resend) plus shared Supabase tables owned by the product team. A dedicated marketing schema will be introduced alongside the CMS initiative (tracked in `docs/work/roadmap.md`).

## Today

- **Supabase** – No marketing-specific tables are provisioned yet. Waitlist exports are stored in Formspree/Zapier and manually synced to the product CRM.
- **Shared Views** – Product exposes aggregated plan/reporting data to marketing through internal dashboards, not via direct database access.

## Planned Schema (Q1 2026)

| Table | Purpose | Key Columns | Status |
| --- | --- | --- | --- |
| `marketing_waitlist` | Persist waitlist signups with consent metadata. | `email`, `source`, `plan_interest`, `consent_at`, timestamps. | TODO (`marketing#156`). |
| `marketing_contacts` | Store enriched contact form submissions for follow-up. | `name`, `email`, `company`, `service_interest`, `message`, `consent_at`. | TODO (`marketing#155`). |
| `marketing_testimonials` | Hold anonymised testimonial copy surfaced on the site. | `id`, `segment`, `body`, `source`, `approved_at`. | TODO (`marketing#161`). |

### Security Expectations

- RLS will restrict anonymous inserts via stored procedures to ensure consent is recorded.
- Read access limited to marketing service role; raw PII will not be queryable anonymously.
- Product will expose read-only views (e.g., `marketing_waitlist_export_view`) for weekly CSV exports.

## Coordination with Product

- Schema changes live in `app.startupai.site/supabase/migrations`. Marketing will pair with product data engineers to add migrations when backlog items move into active phase.
- Update this document and `docs/dev/data-sources.md` once tables are provisioned.

For now, treat Formspree/Zapier as the source of truth and follow `docs/ops/forms-and-leads.md` for lead handling procedures.
