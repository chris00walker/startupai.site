---
purpose: "Reference marketing backlog sources"
status: "active"
last_reviewed: "2025-10-27"
---

# Backlog

This list captures prioritized but unscheduled work. Issue IDs refer to GitHub tickets (create them if missing before sprinting).

| Theme | Item | Notes | Issue |
| --- | --- | --- | --- |
| Content & Messaging | Add crewAI-backed demo module once backend ships. | Requires product data feed. | `marketing#159` |
| Content & Messaging | Publish EU-focused copy variant + localization groundwork. | Depends on i18n infrastructure. | `marketing#158` |
| Analytics & Monitoring | Automate Lighthouse + link checks in CI. | Align with product CI changes. | `marketing#150`, `marketing#157` |
| Analytics & Monitoring | Instrument waitlist form events in PostHog. | Shared taxonomy update. | `marketing#151` |
| Data & CMS | Stand up marketing Supabase tables (`marketing_waitlist`, `marketing_contacts`, `marketing_testimonials`). | Requires product data migration. | `marketing#155`, `marketing#156`, `marketing#161` |
| Performance & A11y | Add skip link, gradient contrast fix, aria labels. | Part of accessibility initiative. | `marketing#145`, `marketing#148` |
| Operations | Restore sitemap/robots automation. | Recreate Next.js sitemap + Netlify hook. | `marketing#149` |
| Operations | Formalize Formspree → Supabase export workflow. | Document in `docs/ops/forms-and-leads.md` once live. | `marketing#156` |
| QA & Reliability | Add automated cross-site signup smoke test. | Covers marketing → product redirect path. | `marketing#162` |
| Trust & Proof | Build dedicated trust module (status, privacy, security badges). | Requires status JSON feed from product (`public-status-links`). | `marketing#160` |

Additional ideas live in the shared Notion “Campaign Backlog” and are triaged monthly.
