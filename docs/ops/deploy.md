---
purpose: "Document marketing deploy workflow and rollback plan"
status: "active"
last_reviewed: "2025-10-27"
---

# Deployment Runbook

Marketing deploys automatically through Netlify when commits land on `main`. Use this runbook to shepherd releases and respond to incidents.

## Branch & Review Policy

- **`main`** → production (`startupai-site.netlify.app`).
- **Feature branches** → Netlify preview deploys. Link previews in PR descriptions.
- All PRs must:
  1. Reference a tracked work item (`docs/work/*` or GitHub issue).
  2. Pass `pnpm lint` + `pnpm type-check` (CI enforced).
  3. Include before/after screenshots for visual changes.
  4. Tag design + product reviewers if copy or contracts change.

## Standard Deploy Steps

1. Ensure local branch passes lint/type check.
2. Push and open PR; confirm Netlify preview build is green (includes static export).
3. Smoke test preview:
   - Primary CTA (`/pricing` → plan redirect).
   - Waitlist form (dev mode uses `/api/waitlist`).
   - Analytics network calls (PostHog) not throwing errors.
4. Merge PR once approvals complete.
5. Netlify auto-promotes. Verify production by visiting `https://startupai.site`.
6. Update `docs/work/done.md` if launch-worthy.

## Rollback Procedure

1. Navigate to Netlify **Deploys → Production**.
2. Identify the last known good deploy and click **Promote to production**.
3. Capture the incident in GitHub (label `incident`) with:
   - Commit SHA rolled back.
   - Root cause hypothesis.
   - Follow-up actions (`docs/work/in-progress.md`).
4. If rollback relates to cross-site issues, alert product team so they can validate Supabase/crew integrations.

## Environment Configuration

- Netlify environment variables live in `Settings → Build & deploy → Environment`.
- Never store secrets in this repo. Use Netlify UI or encrypted vault to set `RESEND_API_KEY`.
- `netlify.toml` controls redirects, caching, and headers. Update docs + coordinate with product before editing security headers.

## Post-Deploy Checklist

- Lighthouse sanity check (manual until automation lands).
- Confirm PostHog events for key pages (pricing view, signup started) appear within 5 minutes.
- Check uptime on `https://status.startupai.site` to ensure marketing endpoints still report healthy.

Refer to `docs/ops/incident-playbook.md` for broader incident coordination and `docs/ops/monitoring.md` for the alerting stack.
