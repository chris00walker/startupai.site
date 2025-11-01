# Fix Email Signup Issue - Action Required

## 🚨 Quick Summary

**Problem**: Email/password signups fail with "Database error saving new user"
**Root Cause**: RLS policy blocks the `handle_new_user` trigger from creating user profiles
**Status**: **Fix ready - needs manual application via Supabase Dashboard**

---

## ⚡ Quick Fix (5 minutes)

### Step 1: Apply the SQL Fix

1. **Open Supabase SQL Editor**: https://supabase.com/dashboard/project/eqxropalhxjeyvfcoyxg/sql

2. **Run this SQL**:
   ```sql
   -- Drop problematic RLS policy
   DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;

   -- Create fixed policy
   CREATE POLICY "Users can insert own profile" ON public.user_profiles
   FOR INSERT
   WITH CHECK (
     auth.uid() = id OR auth.uid() IS NULL
   );
   ```

3. **Verify** (should return 1 row):
   ```sql
   SELECT * FROM pg_policies
   WHERE tablename = 'user_profiles'
   AND policyname = 'Users can insert own profile';
   ```

### Step 2: Test Email Signup

```bash
cd /home/chris/projects/startupai.site
node test_signup.js
```

**Expected**: Should return `data.user.id` instead of error

### Step 3: Test with Real Account

Try creating account at production with:
- Email: `test@startupai.site`
- Password: `Test123456!`

---

## 📋 What Was the Problem?

The `user_profiles` table RLS policy required `auth.uid() = id` for inserts. But when a user signs up:

1. Supabase creates user in `auth.users`
2. Trigger fires to create profile in `user_profiles`
3. **At this point**: User isn't authenticated yet → `auth.uid()` = `NULL`
4. **Policy check fails**: `NULL = user_id` → `false`
5. **Insert blocked** → Signup fails

**The Fix**: Allow inserts when `auth.uid() IS NULL` (from trigger) OR `auth.uid() = id` (from authenticated user)

---

## 🔍 Why GitHub OAuth Works

GitHub OAuth flow likely establishes authentication session before the profile insert, so `auth.uid()` is set by the time the trigger runs.

---

## 📁 Files Reference

- `QUICK_FIX.sql` - SQL to run (same as above)
- `test_signup.js` - Test script
- `docs/incidents/2025-11-07-supabase-email-signup-RESOLUTION.md` - Full analysis
- `supabase/migrations/20251031215331_fix_rls_policy_for_email_signup.sql` - Migration file

---

## ✅ Checklist

- [ ] Apply SQL fix in Supabase Dashboard
- [ ] Run `node test_signup.js` → should succeed
- [ ] Test marketing signup form
- [ ] Create test account `test@startupai.site`
- [ ] Close incident report
- [ ] Update dev docs with this finding

---

## 🆘 If Issues Persist

1. Check Supabase logs: https://supabase.com/dashboard/project/eqxropalhxjeyvfcoyxg/logs/explorer
2. Verify trigger exists:
   ```sql
   SELECT * FROM pg_trigger
   WHERE tgname = 'on_auth_user_created';
   ```
3. Check function:
   ```sql
   SELECT prosrc FROM pg_proc
   WHERE proname = 'handle_new_user';
   ```

Contact: Created by Claude Code on 2025-10-31
