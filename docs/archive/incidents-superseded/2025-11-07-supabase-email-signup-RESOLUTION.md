# Resolution: Supabase Email Signup Failure

**Date**: 2025-10-31
**Status**: **IDENTIFIED - REQUIRES MANUAL FIX**
**Original Incident**: [2025-11-07-supabase-email-signup.md](./2025-11-07-supabase-email-signup.md)

## Root Cause Analysis

The email signup failure was caused by a **Row Level Security (RLS) policy conflict** on the `user_profiles` table.

### The Problem

1. When a user signs up via email/password, Supabase:
   - Creates a record in `auth.users`
   - Triggers the `handle_new_user()` function to create a profile in `public.user_profiles`

2. The `user_profiles` table has this RLS policy:
   ```sql
   CREATE POLICY "Users can insert own profile" ON "public"."user_profiles"
   FOR INSERT WITH CHECK (("auth"."uid"() = "id"));
   ```

3. **The Issue**: When the trigger fires, the user **is not yet authenticated** because they're still being created. At that moment:
   - `auth.uid()` returns `NULL` (no session exists yet)
   - The RLS policy evaluates to: `NULL = <new_user_id>`
   - This evaluates to `false`, blocking the insert
   - Result: `AuthApiError: Database error saving new user`

### Why GitHub OAuth Works

GitHub OAuth likely succeeds because the authentication flow establishes a session before the profile insert, or handles the profile creation differently.

## The Fix

Modify the RLS policy to allow inserts when `auth.uid()` is `NULL` (system/trigger inserts):

```sql
-- Step 1: Drop the problematic policy
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;

-- Step 2: Create new policy allowing both user and system inserts
CREATE POLICY "Users can insert own profile" ON public.user_profiles
FOR INSERT
WITH CHECK (
  auth.uid() = id          -- Allow authenticated users to insert their own profile
  OR
  auth.uid() IS NULL       -- Allow system/trigger to insert during signup
);
```

### Security Considerations

This modification is safe because:
- **Regular users** (authenticated) can still only insert their own profile (`auth.uid() = id`)
- **Trigger function** can insert during signup when `auth.uid() IS NULL`
- The trigger is `SECURITY DEFINER` and owned by `postgres`, so it runs with elevated privileges
- The trigger code is trusted and only inserts the correct user ID from `new.id`

## How to Apply the Fix

### Option 1: Supabase Dashboard (Recommended)

1. Navigate to: https://supabase.com/dashboard/project/eqxropalhxjeyvfcoyxg/sql
2. Click "New Query"
3. Paste the contents of `QUICK_FIX.sql` (in project root)
4. Click "Run"
5. Verify with the included verification query

### Option 2: Supabase CLI (Advanced)

```bash
# Note: This approach has migration history conflicts in current setup
cd /home/chris/projects/startupai.site
supabase db push --linked
```

## Testing the Fix

After applying the fix, test with:

```bash
node test_signup.js
```

Expected result:
```json
{
  "email": "qa+...@startupai.site",
  "data": {
    "user": { "id": "...", "email": "..." },
    "session": { "access_token": "..." }
  },
  "error": null
}
```

## Files Created

- `QUICK_FIX.sql` - Simple SQL to execute in Supabase Dashboard
- `supabase/migrations/20251031215331_fix_rls_policy_for_email_signup.sql` - Full migration file
- `test_signup.js` - Test script to verify email signup works

## Next Steps

1. ✅ **Apply the fix** using Option 1 above
2. ✅ **Test** email signup with `test@startupai.site` / `Test123456!`
3. ✅ **Re-test** marketing signup form at production URL
4. ✅ **Update monitoring** to detect similar auth failures
5. ✅ **Document** in dev environment setup docs

## Error ID Reference

Original error from Supabase logs:
- **Error ID**: `9977241a948d13ca-MIA`
- **Message**: "Database error saving new user"
- **True Cause**: RLS policy blocking trigger insert

## Related Code

- **Trigger**: `auth.on_auth_user_created` → `public.handle_new_user()`
- **Function**: `src/lib/supabase/migrations/20251031215331_fix_rls_policy_for_email_signup.sql:10-45`
- **Table**: `public.user_profiles` (schema: `supabase/migrations/20251031215331_fix_rls_policy_for_email_signup.sql:user_profiles`)
- **Policy**: "Users can insert own profile" (modified by this fix)
