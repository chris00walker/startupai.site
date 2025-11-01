-- Fix: Allow the handle_new_user trigger to bypass RLS when creating user profiles
--
-- Problem: The RLS policy "Users can insert own profile" blocks inserts during signup
-- because auth.uid() is NULL when the trigger fires (user not yet authenticated).
--
-- Solution: Modify the handle_new_user function to use the service_role privileges
-- which can bypass RLS policies.

-- Drop and recreate the function with proper RLS bypass
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
-- Set the role to bypass RLS for this specific insert
SET search_path TO ''
AS $$
BEGIN
  -- Insert profile with data from OAuth provider (stored in raw_user_meta_data)
  -- This runs with SECURITY DEFINER privileges as the function owner (postgres)
  -- and will bypass RLS policies
  INSERT INTO public.user_profiles (
    id,
    email,
    full_name,
    avatar_url,
    role,
    subscription_tier,
    plan_status
  )
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'trial'::user_role),
    COALESCE(new.raw_user_meta_data->>'plan_type', 'trial'),
    'trialing'
  )
  ON CONFLICT (id) DO NOTHING; -- Prevent duplicate inserts

  RETURN new;
END;
$$;

-- Ensure the trigger owner has bypassrls privilege
-- The function owner (postgres) should already have this, but we ensure it
ALTER FUNCTION public.handle_new_user() OWNER TO postgres;

-- Alternative approach: Modify the RLS policy to allow inserts from trusted sources
-- We'll keep the existing policy but add an exception for system-initiated inserts

-- First, let's check the current policies and potentially update them
-- Drop the old policy
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;

-- Recreate with a condition that allows both:
-- 1. Users inserting their own profile (when authenticated)
-- 2. System inserts (when auth.uid() is NULL, which happens during trigger execution)
CREATE POLICY "Users can insert own profile" ON public.user_profiles
FOR INSERT
WITH CHECK (
  auth.uid() = id  -- Allow users to insert their own profile when authenticated
  OR
  auth.uid() IS NULL  -- Allow inserts when not authenticated (e.g., from trigger during signup)
);

-- Grant necessary permissions
GRANT ALL ON FUNCTION public.handle_new_user() TO anon;
GRANT ALL ON FUNCTION public.handle_new_user() TO authenticated;
GRANT ALL ON FUNCTION public.handle_new_user() TO service_role;
