---
purpose: "Outline analytics, SEO, and attribution practices for the marketing site"
status: "active"
last_reviewed: "2025-10-27"
---

# Analytics & SEO

This page aligns the historical PostHog documentation with the code that now powers the marketing stack. It also calls out the remaining work required for full SEO parity with the pre-migration site.

## Analytics Stack

| Tool | What it does | Where it lives | Notes |
| --- | --- | --- | --- |
| **PostHog (primary)** | Event + session analytics for marketing funnel and evidence previews. | Client bootstrap in `instrumentation-client.ts`; helpers in `src/lib/analytics.ts`. | `person_profiles: 'identified_only'` ensures PII only after consent (signup or demo form). |
| **Netlify Analytics** | Backup pageview trends + deploy regression checks. | Enabled at site level; no code dependency. | Used for sanity checks when PostHog is disabled in local/dev. |
| **Server logs** | Waitlist API success/failure metrics. | `src/app/api/waitlist/route.ts` logs to stdout. | Forwarded to Netlify log drain; errors raise incident in `ops/monitoring.md`. |

> GA4 is not currently deployed. If reinstated, add a dedicated section covering consent, tag manager, and duplication safeguards with PostHog.

### Event Inventory (Source of Truth)

All marketing events are declared in `src/lib/analytics.ts`. Key categories:

- `signup_started`, `signup_completed` – Fired from the marketing signup form (`src/components/signup-form.tsx`) and login flow when Supabase identifies a user.
- `pricing_viewed` – Triggered on `src/app/pricing/page.tsx` load to populate plan-level funnels.
- `demo_requested`, `contact_form_submitted` – Attached to respective forms in `src/app/demo/page.tsx` and `src/app/contact/page.tsx`.
- `case_study_viewed`, `blog_post_viewed`, `service_clicked` – Fired when visitors engage with long-form content.

Event payloads always include a timestamp and any additional context (plan, source, subject). Application-side events use a different namespace to avoid confusion (`app.startupai.site/docs/dev/analytics.md`).

### Data Governance

- **Consent** – Session recording is disabled until users grant consent. The product’s analytics manager (`app.startupai.site/frontend/src/lib/analytics/index.ts`) exposes the shared toggle; marketing mirrors the same behaviour before identifying visitors.
- **PII Boundaries** – Email addresses only captured on form submit or post-auth identify call. Waitlist API stores email in Supabase marketing schema with double opt-in support.
- **Environment keys** – `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` injected via Netlify. Local development expects `.env.local` to mirror production host; see `docs/dev/local-dev.md`.

## SEO & Content Hygiene

| Check | Implementation | Status |
| --- | --- | --- |
| Page metadata | Each `src/app/**/page.tsx` exports a `Metadata` object with title, description, OG tags. | ✅ |
| Structured headings | Pages follow H1 → H2/H3 hierarchy tied to research pillars. Automated tests ensure no skipped levels (`marketing#132`). | ✅ |
| Sitemap | **Not yet restored.** Legacy static `sitemap.xml` was removed during migration. | ⚠️ Recreate using Next.js `sitemap.ts` + Netlify automation (tracked in `marketing#149`). |
| Robots | Leverages Next.js defaults (indexable). Need explicit `robots.txt` before beta. | ⚠️ |
| Canonicals | Root layout sets canonical via Next.js metadata; confirm once dynamic locales ship. | 🟡 |
| Image alt text | Hero and case study imagery include meaningful alt attributes. Verified during accessibility audits. | ✅ |

### Content Ops

- **Publishing** – Most copy lives directly inside TSX modules. For large articles (case studies, blog), content arrays are defined at top-of-file with plain objects to simplify future MDX/CMS migration.
- **Deploy Hooks** – Netlify build webhook notifies PostHog to re-run sitemap ingestion once the sitemap returns (TODO above).
- **Search Console** – Marketing retains access; ensure new sitemap is submitted after restoration.

## Attribution Workflow

1. Campaign URLs use `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`. Examples stored in `/marketing/campaigns` Notion.
2. CTAs append `plan` query parameter (`trial`, `strategy-sprint`, `founder-platform`, `agency-co-pilot`), which the product callback persists as `plan_type`.
3. PostHog captures UTMs automatically; the application repo normalizes them into HubSpot when leads convert (see `app.startupai.site/docs/product-handshake/marketing-contracts.md`).

## Open Issues & Backlog

- `marketing#149` – Restore sitemap + robots endpoints.
- `marketing#150` – Add automated lighthouse audit (via GitHub Action) to track Core Web Vitals trend.
- `marketing#151` – Instrument testimonial carousel with engagement events once CMS migration completes.

Refer to `docs/work/in-progress.md` for sprint scheduling and to the product repo analytics docs for downstream ingestion logic.
