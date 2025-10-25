---
purpose: "Public messaging matrix for StartupAI marketing surfaces"
status: "active"
last_reviewed: "2025-10-27"
---

# Messaging Matrix

This matrix keeps messaging, proof points, and CTAs aligned with the product experience. Compare copy against the product onboarding flow before publishing updates.

## Audience x Message Grid

| Audience | Core Message | Proof / Assets | CTA | Implementation |
| --- | --- | --- | --- | --- |
| **Founders exploring fit** | “Turn back-of-napkin ideas into investor-ready strategy overnight.” | Demo walkthrough (`src/app/demo/page.tsx`), Fit Report screenshots. | `Start Free` (links to `/signup?plan=trial`). | Hero (`src/app/page.tsx`) + product story sections (`src/app/product/page.tsx`). |
| **Technical/product leaders** | “Keep strategy, evidence, and delivery artifacts in sync.” | Evidence ledger previews, DDD/TDD handoff description. | `Book Strategy Sprint` (`plan=strategy-sprint`). | Product page sections + pricing feature bullets. |
| **Advisors & accelerators** | “Deliver consistent cohort outputs.” | Workspace management bullet list, anonymized cohort stats. | `Partner with us` (contact form). | Case studies (`src/app/case-studies/page.tsx`) and services pages. |
| **Privacy-conscious builders** | “Evidence is private-by-default and traceable.” | Status page, privacy policy, Supabase RLS summary. | `Read Trust Pledge` (links to `/privacy`). | Currently woven into service copy; dedicated trust module tracked in backlog (`marketing#160`). |

## Key Themes & Copy Sources

- **Speed to Clarity** – Borrow language from onboarding stage prompts (`app.startupai.site/frontend/src/app/onboarding/stages.ts`).
- **Traceability** – Cite evidence ledger UI (screenshots curated in Figma). Mention citations + audit logs.
- **Strategic Continuity** – Reference CrewAI workflow status and gating logic. Keep expectations realistic until full automation ships.

## Surface Checklist

| Surface | Modules | Owner | Status |
| --- | --- | --- | --- |
| Homepage (`src/app/page.tsx`) | Hero, credibility row, process timeline, testimonial slider, CTA block. | Marketing | ✅ |
| Product page (`src/app/product/page.tsx`) | Value pillars, evidence ledger preview, onboarding walkthrough. | Marketing | ✅ |
| Pricing page (`src/app/pricing/page.tsx`) | Plan comparison, FAQ, trust ribbon. | Marketing + Product | 🟡 (Dynamic pricing backlog) |
| Demo page (`src/app/demo/page.tsx`) | Video embed, Fit Report sample. | Marketing | 🟡 (CrewAI data pending) |
| Case studies (`src/app/case-studies/page.tsx`) | Industry-specific narratives, anonymized outcomes. | Marketing Ops | 🟡 (Add Q4 cohort) |

## Tone & Style Guidelines

- Confident but grounded; cite data instead of hype.
- Gender-neutral, founder-inclusive language.
- Avoid deterministic promises—qualify outputs as evidence-backed recommendations.
- Use second-person copy sparingly; lean on “we partner with you…” statements.

## Governance

- Review messaging monthly or when product milestones shift (`docs/work/phases.md`).
- Log any major copy change in `docs/work/in-progress.md` (Messaging lane).
- Mirror updates in nurture email sequences and sales collateral to stay consistent.

## Backlog Notes

- `marketing#158` – Localize hero copy variants for EU audiences once i18n groundwork is ready.
- `marketing#159` – Introduce interactive proof module (walkthrough or clickable ledger) post CrewAI launch.
