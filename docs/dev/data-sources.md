---
purpose: "Document the marketing site data sources and caching approach"
status: "active"
last_reviewed: "2025-10-27"
---

# Data Sources

| Data | Source | Usage | Ownership |
| --- | --- | --- | --- |
| Pricing tiers | In-repo config (`src/app/pricing/page.tsx`) synced with product plan IDs. | Renders pricing cards and CTA URLs. | Marketing (copy) + Product (plan identifiers). |
| Testimonials | Static arrays inside `src/app/case-studies/page.tsx`. | Case study highlights and social proof. | Marketing (sanitized anonymisation). |
| Waitlist entries | Formspree (production) or `/api/waitlist` (local). | Captures email leads and routes notifications. | Marketing Ops. |
| Contact leads | Netlify form with Zapier automation. | Sends detailed inquiries to CRM. | Marketing Ops + Sales. |
| Application status | External: `https://status.startupai.site`. | Populates trust ribbon and incident copy. | Product/SRE. |
| PostHog events | `instrumentation-client.ts` + `src/lib/analytics.ts`. | Funnel + campaign analytics, conversion goals. | Shared. |
| Supabase (anon) | Public tables/views (see below). | Landing page metrics, optional plan metadata (future). | Product Data team. |

## Supabase Integration

Marketing relies on a narrow subset of the shared Supabase project:

| Table / View | Purpose | Notes |
| --- | --- | --- |
| `marketing_waitlist` | Stores waitlist emails with timestamps + consent flags. | Written via Formspree webhook (production) or API route (dev). |
| `marketing_testimonials` *(roadmap)* | Sanitized quotes once CMS work lands. | To be created alongside CMS integration (see `docs/work/roadmap.md`). |

Schema is documented in `docs/schema/marketing-db.md`. Any change requires coordination with product migrations (`app.startupai.site/supabase/migrations`).

## Caching & Performance

- Marketing pages are statically exported (`next.config.js` sets `output: 'export'`), so data changes require rebuilds.
- When we switch to dynamic pricing/testimonials, use ISR via Netlify on-demand builders or client-side fetch with edge cache (≤60s TTL).
- Status checks use `fetch` with cache headers to avoid 429s from the external status page.

## Data Governance

- No PII is stored in the repo. Waitlist and contact data lives in external services with double opt-in.
- Plan copy must mirror application behaviour; verify against `app.startupai.site/frontend/src/app/api/onboarding/start/route.ts` when updating features or quotas.
- Analytics events follow the taxonomy in `docs/dev/analytics-seo.md`. Do not introduce new event names without updating that document and the product analytics suite.
