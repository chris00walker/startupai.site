-- REAL FIX FOR EMAIL SIGNUP ISSUE
-- The issue is that the handle_new_user function can't find the user_role type
-- because search_path is set to '' (empty), so it doesn't look in the public schema
-- Execute this in Supabase SQL Editor: https://supabase.com/dashboard/project/eqxropalhxjeyvfcoyxg/sql

-- Fix: Use fully qualified type names (public.user_role) in the function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  -- Insert profile with data from OAuth provider (stored in raw_user_meta_data)
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
    -- FIX: Use fully qualified type name public.user_role
    COALESCE((new.raw_user_meta_data->>'role')::public.user_role, 'trial'::public.user_role),
    COALESCE(new.raw_user_meta_data->>'plan_type', 'trial'),
    'trialing'
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN new;
END;
$$;

-- Verify the function was updated
SELECT prosrc FROM pg_proc WHERE proname = 'handle_new_user';
