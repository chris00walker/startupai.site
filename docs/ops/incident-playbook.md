---
purpose: "Provide a public-safe incident response outline for marketing"
status: "active"
last_reviewed: "2025-10-27"
---

# Incident Playbook

This guide covers marketing-owned incidents (site down, broken CTA, analytics outage). Security events escalate through the shared `security@startupai.site` process.

## 1. Detect & Triage

| Signal | Tool | Action |
| --- | --- | --- |
| Uptime regression | Netlify status notifications or Pingdom (SRE-owned). | Confirm by visiting `https://startupai.site` and reviewing Netlify deploy logs. |
| Form failures | PostHog anomaly (drop in `signup_started`), support email, or Formspree alert. | Reproduce using `/api/waitlist` dev path; capture response body. |
| Cross-site auth failure | Reports of redirect loops or Supabase errors. | Check `app` status page and Supabase dashboard. |

Document start time, affected routes, and current Netlify deploy ID.

## 2. Contain

1. Assess scope (marketing only vs cross-site).
2. If regression introduced by recent deploy, roll back (`docs/ops/deploy.md`).
3. For upstream outages (Supabase, PostHog), notify product on-call via shared Slack channel `#ops-alerts`.

## 3. Communicate

- Update status banner if customer impact is visible (`docs/product-handshake/public-status-links.md`).
- Post summary in `#marketing-ops` and tag stakeholders (marketing lead, product counterpart).
- For prolonged issues (>30 min), prepare customer-facing copy (tweet/status page).

## 4. Remediate

- Apply fix (if marketing-owned) via hotfix branch → merge → redeploy.
- Verify:
  - Primary CTA redirect.
  - Waitlist submission (dev route and Formspree).
  - Analytics events flowing to PostHog.
  - Status ribbon reflects accurate state.

## 5. Review

- Open incident report (label `incident`) documenting root cause, timeline, and follow-ups.
- Update relevant docs (`docs/ops/monitoring.md`, `docs/ops/deploy.md`, this playbook) if process changed.
- Close loop with stakeholders.

> Sensitive details (stack traces, customer lists) remain in the private incident notes doc maintained in the internal Confluence space.
