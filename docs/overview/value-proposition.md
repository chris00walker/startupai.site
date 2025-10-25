---
purpose: "Explain StartupAI’s marketing value proposition using public-safe language"
status: "active"
last_reviewed: "2025-10-27"
---

# Value Proposition

StartupAI positions itself as the **evidence-led strategy co‑pilot** for founders and advisors who need investor-ready artifacts fast without sacrificing rigor. The promise rests on three durable pillars that are reflected in the live experience:

1. **Speed to Clarity** – Guided onboarding (marketing CTA → `app.startupai.site/onboarding`) converts raw ideas into structured canvases and briefs in a single session. Landing experiences such as `src/app/demo/page.tsx` show the before/after transformation to anchor this promise.
2. **Traceable Advice** – Every recommendation carries citations and confidence flags. Marketing copy references the same evidence ledger surfaced inside the product (`app.startupai.site/src/app/(app)/dashboard`), ensuring no mismatch between what we claim and what users see post-signup.
3. **Strategic Continuity** – Outputs travel from strategy to execution: exports feed directly into domain models, test plans, and CrewAI workflows. This story is consistent across pricing cards (`src/app/pricing/page.tsx`) and the product spec (`app.startupai.site/docs/specs/frontend-components.md`).

## Target Segments (Validated)

| Segment | JTBD Signal | Marketing Narrative | Product Touchpoint |
| --- | --- | --- | --- |
| **Solo founders & indie hackers** | *"I need a credible plan tonight."* Jobs #1–2 from research show extreme time pressure and template fatigue. | Hero copy promises “Investor-ready canvases overnight” and highlights instant exports. | Guided onboarding wizard + Fit Report export (`app.startupai.site/src/app/(app)/reports/fit-report`). |
| **Early product leaders** | Need to align cross-functional teams and connect strategy to delivery. | Messaging emphasizes evidence ledger + DDD handoffs. | DDD/TDD scaffolding surfaced in CrewAI workflow (`app.startupai.site/backend/CREW_AI.md`). |
| **Advisors & accelerators** | Drive consistency across cohorts. | “Cohort-ready outputs” in services and partner sections. | Workspace management + white-label features gated behind `agency-co-pilot` plan (feature flags in `app.startupai.site/src/lib/plans.ts`). |
| **Privacy-conscious builders** | Concerned about leaking ideas. | Trust pledge highlights RLS, private-by-default storage, and no data resale. | Supabase RLS policies in `app.startupai.site/supabase/migrations` enforce column-level privacy. |

## Message → Evidence Map

| Claim | Proof Source | Where it appears |
| --- | --- | --- |
| “20–40 hours saved per project” | Synthesis of founder interviews + paid pilot retrospectives (`docs/work/done.md`, `app.startupai.site/docs/features/completion-reports/CREWAI_IMPLEMENTATION_COMPLETE.md`). | Product hero, pricing copy, nurture email templates. |
| “Traceable to cited evidence” | Evidence ledger UX (`app.startupai.site/src/app/(app)/evidence`) + PostHog events verifying citation usage. | Feature trio on `/product`, Fit Dashboard teaser on `/demo`. |
| “Hard-gated progression” | Gate scoring logic + route protection (`app.startupai.site/src/app/(app)/projects/[id]/gate`). | Pricing plan comparison, onboarding stage descriptions. |
| “Private by design” | Supabase bucket policies + anonymised testimonial flow (`src/app/case-studies/page.tsx`). | Trust row on `/pricing`, legal copy in footer. |

## Market Evidence Summary

Findings below condense the pre-migration research series (`business/1-research.md` → `6-bibliography.md`). The raw transcripts and bibliography live in the app repository under `docs/research/`.

- **Jobs-to-be-Done** – Founders want a rapid way to articulate strategy (JTBD-1), translate it into execution (JTBD-2), and loop in real customer evidence (JTBD-3). Each job anchored the product storyline and the onboarding prompts.
- **Struggling Moments** – “Blank canvas + ticking clock,” “DIY overload,” and “credibility gap vs. investors” remained recurring quotes. Marketing materials now pair each pain with an on-screen countermeasure (e.g., demo video showing citations).
- **Alternatives & Switching Costs** – Competitive mapping (Notion templates, bespoke consultants, emerging AI tools) informed the comparison table in `src/app/pricing/page.tsx`. Pricing language mirrors the actual effort/cost deltas documented in the research.
- **Demand & Willingness to Pay** – Paid concierge pilots at $500–$1,500 validated monetization. We reference those pilots in case studies while keeping client identities anonymized.
- **Risks & Objections** – Privacy posture and output quality gate adoption. The trust section, audit exports, and PostHog retention dashboards are highlighted to proactively answer these concerns.

## Implementation Touchpoints

- **Marketing Site** – Messaging centralized in `src/app/page.tsx`, `src/app/product/page.tsx`, and supporting components under `src/components/marketing`. Updates follow the component-driven copy map in `docs/work/in-progress.md`.
- **Analytics** – PostHog events listed in `docs/dev/analytics-seo.md` validate engagement with proof elements (e.g., `evidence_ledger_preview_clicked`). Funnels confirm whether claims resonate.
- **Contracts with Application** – Plan identifiers and CTA parameters referenced here mirror the canonical contract table in `docs/product-handshake/marketing-to-app-contracts.md`.

## Looking Forward

- **In Flight** – Dynamic testimonial ingestion and localized messaging (tracked in `docs/work/phases.md`). These will expand segment-specific proof without diluting privacy promises.
- **Upcoming Research Sprints** – Q1 2026 roadmap includes a new round of advisor interviews plus longitudinal follow-up with paid pilot alumni to refresh the evidence base.
- **Open Questions** – How do we communicate AI explainability without overloading copy? What is the right balance between transparent citations and competitive secrecy? These threads are captured as research backlog items (`docs/work/backlog.md`).

> 🔗 Need the full raw analysis? See [`app.startupai.site/docs/research`](https://github.com/chris00walker/app.startupai.site/tree/main/docs/research) for transcripts, coding frames, and bibliography. Internal readers can request the redacted qualitative repository via the research Slack channel.
