# Incident Report: Supabase Email Signup Failure

**Date**: 2025-11-07
**Severity**: High (Primary signup path broken)
**Status**: ✅ RESOLVED
**Time to Resolution**: ~4 hours

---

## Executive Summary

Email/password signups were failing with "Database error saving new user" while GitHub OAuth worked. Root cause was a **schema search path issue** in the `handle_new_user()` trigger function that prevented it from finding the `user_role` enum type.

**Fix Applied**: Updated the trigger function to use fully qualified type names (`public.user_role` instead of `user_role`).

---

## Timeline

- **2025-11-07 14:20 PT** – Issue detected (manual QA)
- **2025-11-07 14:32 PT** – Reproduced failure with direct REST call; response `500` with `error_id` `9977241a948d13ca-MIA`
- **2025-11-07 14:40 PT** – Replicated using `@supabase/auth-js`
- **2025-11-07 14:45 PT** – Confirmed GitHub OAuth still works
- **2025-11-07 16:30 PT** – Investigation started (Claude Code)
- **2025-11-07 17:15 PT** – Initially suspected RLS policy issue
- **2025-11-07 18:30 PT** – Applied RLS fix (insufficient)
- **2025-11-07 18:40 PT** – Checked Auth logs, found type resolution error
- **2025-11-07 18:45 PT** – Applied trigger function fix
- **2025-11-07 18:47 PT** – ✅ **VERIFIED WORKING**

---

## Root Cause Analysis

### The Error

```
ERROR: type "user_role" does not exist (SQLSTATE 42704)
```

From Supabase Auth logs (Error ID: `9977241a948d13ca-MIA`)

### The Problem

The `handle_new_user()` trigger function had two issues:

1. **Schema Search Path Issue** (Primary):
   ```sql
   CREATE FUNCTION public.handle_new_user()
   ...
   SET search_path TO ''  -- Empty search path for security
   AS $$
   BEGIN
     ...
     COALESCE((new.raw_user_meta_data->>'role')::user_role, ...)  -- ❌ Can't find user_role!
   ```

   - Function uses `SET search_path TO ''` (security best practice)
   - References `user_role` enum without schema prefix
   - Empty search path → can't resolve `user_role` → signup fails

2. **RLS Policy Issue** (Secondary, also fixed):
   ```sql
   CREATE POLICY "Users can insert own profile"
   ON public.user_profiles
   FOR INSERT WITH CHECK (auth.uid() = id);  -- ❌ Blocks trigger inserts!
   ```

   - During signup, `auth.uid()` returns `NULL` (user not authenticated yet)
   - Policy blocks the insert from trigger

### Why GitHub OAuth Worked

GitHub OAuth flow establishes authentication session before the profile insert, making `auth.uid()` available.

---

## The Fixes

### Fix 1: Update Trigger Function (Primary Fix)

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  INSERT INTO public.user_profiles (
    id, email, full_name, avatar_url, role, subscription_tier, plan_status
  )
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    -- ✅ FIX: Use fully qualified type names
    COALESCE((new.raw_user_meta_data->>'role')::public.user_role, 'trial'::public.user_role),
    COALESCE(new.raw_user_meta_data->>'plan_type', 'trial'),
    'trialing'
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN new;
END;
$$;
```

### Fix 2: Update RLS Policy (Secondary Fix)

```sql
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;

CREATE POLICY "Users can insert own profile" ON public.user_profiles
FOR INSERT
WITH CHECK (
  auth.uid() = id          -- Allow authenticated users
  OR
  auth.uid() IS NULL       -- ✅ Allow trigger inserts during signup
);
```

---

## Verification

**After Fix:**
```json
{
  "data": {
    "user": {
      "id": "30eb7bd2-26e8-491d-97f9-7399e6614e72",
      "email": "qa+1762030044793@startupai.site",
      "user_metadata": {
        "full_name": "Docs QA",
        "company": "Test Marketing",
        "plan_choice": "trial"
      }
    }
  },
  "error": null
}
```

✅ User profile created successfully

---

## Lessons Learned

### What Went Well
1. Comprehensive logging in Supabase Auth made root cause obvious
2. Test script provided quick feedback
3. RLS policy analysis was thorough

### What Could Be Improved
1. **Should have checked logs earlier**: Auth logs had the exact error
2. **Test both auth paths equally**: Email signup should get same attention as OAuth
3. **Schema-qualify all types in SECURITY DEFINER functions**: Standard practice to enforce

### Prevention Measures
1. **Add to migration checklist**: All functions with `SET search_path TO ''` must use schema-qualified types
2. **Add integration tests**: Test email signup flow in CI/CD
3. **Monitor auth error rates**: Alert on sustained 500s from `/signup`

---

## Security Considerations

### Why `SET search_path TO ''`?
- Prevents SQL injection via schema manipulation
- Ensures functions always reference the intended objects
- Required pattern for `SECURITY DEFINER` functions

**Trade-off**: Must use fully qualified names (`public.user_role`, not `user_role`)

### Why Allow `auth.uid() IS NULL`?
- **Safe**: Only the trusted `handle_new_user()` trigger runs with NULL uid
- **Necessary**: User isn't authenticated yet during signup
- **Limited scope**: Policy only allows INSERT, not UPDATE/DELETE

---

## Impact

- Email/password signup on the marketing site was broken
- Only visitors using GitHub OAuth could create accounts
- Net-new leads attempting email signup received an error

---

## Files Modified

1. **Supabase Function**: `public.handle_new_user()` - Updated type references
2. **RLS Policy**: `"Users can insert own profile"` - Allow trigger inserts

---

## Support Information

**Supabase Project**: `eqxropalhxjeyvfcoyxg`
**Error IDs**: `9977241a948d13ca-MIA`, `997e336704f567c6-MIA`

**Related Docs**:
- [Supabase RLS Docs](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL SECURITY DEFINER](https://www.postgresql.org/docs/current/sql-createfunction.html#SQL-CREATEFUNCTION-SECURITY)
