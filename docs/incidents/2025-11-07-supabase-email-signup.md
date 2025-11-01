# Incident Report: Supabase Email Signup Failure

**Date**: 2025-11-07  
**Severity**: High (Primary signup path broken)  
**Status**: Open  
**Duration**: Ongoing

## Summary

Manual QA of the marketing signup form surfaced that the email+password path fails. Supabase rejects the request with `AuthApiError: Database error saving new user` while GitHub OAuth continues to work. The issue reproduces outside of the Next.js app, indicating a Supabase-side configuration or database constraint problem.

## Timeline

- **2025-11-07 14:20 PT** – Manual marketing site test flagged that the “Create Account” flow fails (UI shows generic error).  
- **2025-11-07 14:32 PT** – Reproduced failure with direct REST call to `https://eqxropalhxjeyvfcoyxg.supabase.co/auth/v1/signup`; response `500` with `error_id` `9977241a948d13ca-MIA`.  
- **2025-11-07 14:40 PT** – Replicated using `@supabase/auth-js` (same payload as `src/components/signup-form.tsx`); Supabase returned `Database error saving new user`.  
- **2025-11-07 14:45 PT** – Confirmed GitHub OAuth path still succeeds end-to-end.

## Root Cause

Unknown. Supabase accepts the request and password but fails when persisting the user record. Likely causes:

- Auth email provider misconfiguration (e.g., domain restrictions, disabled email signups).  
- Database trigger or policy on `auth.users` rejecting inserts (missing column defaults, RLS, etc.).  
- Supabase migration introducing constraints that require fields not provided by marketing signup.

## Impact

- Email/password signup on the marketing site always fails.  
- Only visitors using GitHub OAuth can create accounts.  
- Net-new leads attempting email signup receive an error and cannot onboard.

## Reproduction Steps

```bash
node - <<'NODE'
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(
  'https://eqxropalhxjeyvfcoyxg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxeHJvcGFsaHhqZXl2ZmNveXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMjAwNDYsImV4cCI6MjA3Njg5NjA0Nn0.Y2wE2TsKSo2VCHFtdT1r_b4lcgOhlTNJzDT3eqZIza0'
)
;(async () => {
  const email = `qa+${Date.now()}@startupai.site`
  const { data, error } = await supabase.auth.signUp({
    email,
    password: 'Supabase123!',
    options: {
      data: { full_name: 'Docs QA', company: 'Test Marketing', plan_choice: 'trial' },
      emailRedirectTo: 'https://app-startupai-site.netlify.app/auth/callback?next=/onboarding?plan=trial',
    },
  })
  console.log({ email, data, error })
})()
NODE
```

Expected: `data.user.id` populated.  
Actual: `error` is `AuthApiError: Database error saving new user`.

## Mitigation & Next Steps

1. **Supabase Auth settings** – Verify email provider is enabled and not restricted to approved domains.  
2. **Supabase logs** – Check Auth and Postgres logs for `error_id 9977241a948d13ca-MIA` to pinpoint SQL failure.  
3. **Database triggers** – Review recent migrations or triggers on `auth.users` / `auth.identities` that may require additional metadata.  
4. **Temporary messaging** – Update marketing UI copy to acknowledge the issue and recommend GitHub signup until resolved (optional).  
5. **Retest** – After adjustments, rerun the reproduction script and marketing signup form.

## Owners

- Marketing Engineering: initial detection, UI messaging, regression testing.  
- Product Platform / Supabase Admins: diagnose and fix Supabase configuration or schema.

## Related Artifacts

- Marketing repo issue: _TBD_  
- Supabase project: `eqxropalhxjeyvfcoyxg`  
- Production env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
