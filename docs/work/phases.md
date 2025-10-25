---
purpose: "Publish current marketing phases and goals"
status: "active"
last_reviewed: "2025-10-27"
---

# Current Phases

| Phase | Status | Focus | KPIs | Dependencies |
| --- | --- | --- | --- | --- |
| **Phase 1 – Guided Onboarding Story** | ✅ (wrap-up) | Align marketing copy with live onboarding wizard; refresh pricing/demos. | Trial sign-ups/week, onboarding completion rate. | CrewAI workflow instrumentation (product). |
| **Phase 2 – Trust & Evidence** | 🟡 (active) | Publish verifiable proof (Fit Report excerpts, status badge, privacy pledge refresh). | Trust ribbon CTR, Time on Product page, qualitative feedback. | CrewAI data export, status API. |
| **Phase 3 – Performance & Accessibility** | 🟡 (active) | Close accessibility gaps (skip link, contrast) and automate Lighthouse checks. | Lighthouse PWA score > 90, zero axe violations. | Engineering capacity; CI pipeline updates. |
| **Phase 4 – Content Engine & Localization** | 🟠 (queued) | Launch long-form evidence-led articles, prep EU localization. | Organic traffic, localized conversion rate. | CMS decision, i18n groundwork (`marketing#158`). |
| **Phase 5 – Automation & CRM Sync** | 🟠 (queued) | Wire waitlist/contact data into Supabase + CRM; automate reporting. | Lead processing time, data accuracy. | Supabase schema migration (`marketing#155`/`#156`). |

Phases are reviewed monthly. Move items forward once exit criteria are met and update dependent docs (e.g., value proposition, roadmap).
