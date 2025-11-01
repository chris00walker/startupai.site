---
purpose: "Describe lead capture flows and processing for marketing"
status: "active"
last_reviewed: "2025-10-27"
---

# Forms & Lead Handling

Marketing currently runs two lead capture surfaces (waitlist + contact). This page reconciles the legacy automation plan with the present implementation.

## Waitlist (Primary CTA)

| Environment | Path | Processor | Storage | Notes |
| --- | --- | --- | --- | --- |
| Production | Landing hero + pricing modals | Formspree form `mpwjagrn` | Formspree inbox → Zapier → Supabase `marketing_waitlist` | Sends Resend notification if `RESEND_API_KEY` configured. |
| Local / Preview | `/api/waitlist` (needs restoration) or `/.netlify/functions/waitlist` | Bring back `src/app/api.bak/waitlist/route.ts` for Next dev, or run Netlify function (`netlify/functions/waitlist.ts`) via `pnpm dev:staging` | Console log (no DB write) | Ensure the client posts to the endpoint you expose; default code still points to `/api/waitlist`. |

Validation is handled client-side via Zod (`src/components/waitlist-form.tsx`) and server-side in the API route. Formspree includes basic spam filtering; add hCaptcha if abuse increases (`marketing#154`).

## Contact Form

- Component: `src/components/sections/ContactForm.tsx`
- Current behaviour: client-side validation + simulated API call (console log). No persistence yet.
- Roadmap: hook into Netlify Forms or a secure webhook (Zapier) and write to Supabase `marketing_contacts` table (not created yet). Tracked as `marketing#155`.

## Lead Handoff to Product

| Lead type | Trigger | Product action |
| --- | --- | --- |
| Waitlist signup | Weekly export from Supabase view `marketing_waitlist_view` (to be created). | Product team invites selected leads to onboarding. |
| Pricing inquiry | Once contact form integration ships. | Product team receives enriched lead with service interest. |

Until automation is complete, marketing exports waitlist CSVs manually and logs outreach in the CRM.

## Data Hygiene

- Only capture email, optional name/company, and consent timestamp.
- Honor unsubscribe requests by deleting entries from Supabase (`marketing_waitlist`).
- Keep marketing automation credentials (Formspree, Zapier, Resend) in the shared password manager.

## Follow-ups

- `marketing#154` – Evaluate hCaptcha / rate limiting for Formspree if spam appears.
- `marketing#155` – Implement contact form backend + CRM sync.
- `marketing#156` – Create Supabase views for weekly exports and document process in this file.
