---
purpose: "Private technical source of truth for PostHog instrumentation"
status: "active"
last_reviewed: "2025-10-27"
---

# PostHog Runbook

This runbook replaces the archived installation guides and documents how PostHog is configured across marketing and product today.

## Project & Access

- **Workspace**: StartupAI (PostHog Cloud, `us.i.posthog.com`)
- **Key Storage**: Netlify environment variables (`NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`). Product repo additionally stores `POSTHOG_SERVER_KEY` for secure server events.
- **Access**: Marketing + Product share a single project to follow the full journey. Use Personal API keys (1Password) for CLI/exports.

## Instrumentation Overview

| Surface | Entry point | Helper | Notes |
| --- | --- | --- | --- |
| Marketing (`startupai.site`) | `instrumentation-client.ts` | `src/lib/analytics.ts` | Autocapture enabled; manual events for key funnels. |
| Product (`app.startupai.site`) | `frontend/instrumentation-client.ts` | `frontend/src/lib/analytics/index.ts` | Consent-aware tracking with richer event set. |

### Canonical Event Names

| Category | Marketing Events | Product Events | Description |
| --- | --- | --- | --- |
| Acquisition | `pricing_viewed`, `signup_started`, `signup_completed`, `demo_requested`, `contact_form_submitted` | Same events plus `signup_failed`, `signup_initiated_oauth` | Drive funnel dashboards. Ensure both repos stay in sync. |
| Content | `case_study_viewed`, `blog_post_viewed`, `service_clicked` | N/A | Marketing-only engagement tracking. |
| Product usage | N/A | `project_created`, `hypothesis_added`, `evidence_uploaded`, `workflow_started`, etc. | See `frontend/src/lib/analytics/index.ts`. |
| CrewAI | N/A | `crewai_analysis_started/completed/failed` | Used for backend reliability dashboards. |

Update both helper files when adding or renaming events.

### Identity & Session Handling

- Marketing calls `identifyUser` only after the user reaches the product (`analytics.signup.completed`). This keeps anonymous browsing anonymous.
- Product respects consent toggles (`setConsent` in `frontend/src/lib/analytics/index.ts`) and disables session recording until users opt in.
- Session recording is off by default on marketing; enable only for research sprints with explicit consent.

## Dashboards & Alerts

- **Marketing Funnel** – Tracks `pricing_viewed → signup_started → signup_completed`. Owner: Marketing Ops.
- **Onboarding Health** – Tracks stage completion events emitted by the product onboarding wizard. Owner: Product PM.
- **CrewAI Reliability** – Watches `crewai_analysis_failed`. Owner: Engineering.
- Alerts: Configure PostHog insight alerts to Slack `#analytics-alerts` when conversion drops >10% WoW or when error events spike.

## Troubleshooting

| Symptom | Likely Cause | Fix |
| --- | --- | --- |
| No events in dev | Missing env vars or running on `localhost` without HTTPS | Set test keys, keep host consistent. |
| Events duplicated | Both marketing + product firing same event on redirect | Check `src/lib/analytics.ts` to ensure only final confirmation triggers `signup_completed`. |
| Session recordings missing | Consent not granted or key disabled. | Verify `setConsent(true)` path in product repo; marketing intentionally leaves off. |
| 403 from PostHog | Key rotated or revoked. | Update Netlify environment and redeploy. |

## Change Management

1. Update helper functions in both repos.
2. Amend this runbook and `docs/dev/analytics-seo.md`.
3. Notify ops to adjust dashboards/alerts.
4. QA in staging (preview deploy + PostHog QA project if sensitive).

Legacy incident reports and completion write-ups remain in `docs/archive/legacy-public-docs.md` if historical context is needed.
