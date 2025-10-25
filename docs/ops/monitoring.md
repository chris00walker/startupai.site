---
purpose: "Outline monitoring and alerting for the marketing site"
status: "active"
last_reviewed: "2025-10-27"
---

# Monitoring & Alerting

| Signal | Tool / Query | Cadence | Escalation |
| --- | --- | --- | --- |
| **Uptime / deploy health** | Netlify deploy notifications + Pingdom check `startupai.site`. | Real-time | `#marketing-ops`, then follow incident playbook. |
| **PostHog funnel** | Dashboard “Marketing → Onboarding” (events: `pricing_viewed`, `signup_started`, `signup_completed`). | Daily review | Investigate drop, sync with product analytics. |
| **Waitlist submissions** | Formspree dashboard + Resend email (if enabled). | Daily inbox check | If zero submissions for 48h, run manual test + open issue. |
| **Core Web Vitals** | Chrome Lighthouse manual audit (pre-release) + Google Search Console (monthly). | Per release + monthly | Add to performance backlog if thresholds breached. |
| **Link integrity** | `npm run lint` includes markdown link linting; scheduled weekly via GitHub Action (todo `marketing#157`). | Weekly (planned) | Fix broken links promptly. |

## Dashboards & Alerts

- **PostHog** – Dashboard `Marketing / Acquisition` tracks CTA conversion. Set up anomaly alerts >10% drop WoW.
- **Netlify** – Build hooks notify channel on failure. Enable email alerts for deploy failures.
- **Formspree** – Configured to send failure notifications if webhook errors.

## Manual Checks (Weekly)

1. Submit waitlist form (dev mode) and confirm success message.
2. Click primary CTA to ensure Supabase login loads.
3. Verify status ribbon reflects `status.startupai.site`.
4. Spot-check top pages with Lighthouse (mobile).

## Backlog / TODO

- `marketing#150` – Automate Lighthouse checks in CI.
- `marketing#151` – Instrument waitlist submissions with PostHog to detect silent failures.
- `marketing#157` – Add scheduled link checker GitHub Action.

Additional sensitive dashboards (revenue, CRM) live in the private BI workspace.
