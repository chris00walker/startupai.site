-- QUICK FIX FOR EMAIL SIGNUP ISSUE
-- Execute this in Supabase SQL Editor: https://supabase.com/dashboard/project/eqxropalhxjeyvfcoyxg/sql

-- Step 1: Drop the problematic RLS policy
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;

-- Step 2: Create new policy that allows trigger inserts
CREATE POLICY "Users can insert own profile" ON public.user_profiles
FOR INSERT
WITH CHECK (
  auth.uid() = id          -- Allow authenticated users to insert their own profile
  OR
  auth.uid() IS NULL       -- Allow trigger to insert during signup (when not authenticated)
);

-- Verification query (run after the above)
SELECT * FROM pg_policies
WHERE tablename = 'user_profiles'
AND policyname = 'Users can insert own profile';
