-- Fix Security Advisor findings: enable RLS on user_profiles and set stable search_path on functions

-- Ensure RLS is enabled (and enforced) on user_profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles FORCE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- Normalise search_path for security definer and trigger helper functions
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_catalog
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.set_consultant_profiles_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_catalog
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at_timestamp()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_catalog
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_contact_submissions_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_catalog
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_entrepreneur_brief_timestamp()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_catalog
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_session_activity(p_session_id VARCHAR)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
BEGIN
  UPDATE onboarding_sessions
  SET last_activity = NOW(),
      expires_at = NOW() + INTERVAL '24 hours'
  WHERE session_id = p_session_id
    AND status = 'active';
END;
$$;

CREATE OR REPLACE FUNCTION public.update_consultant_session_activity(p_session_id VARCHAR)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
BEGIN
  UPDATE consultant_onboarding_sessions
  SET last_activity = NOW(),
      expires_at = NOW() + INTERVAL '7 days'
  WHERE session_id = p_session_id
    AND status = 'active';
END;
$$;

CREATE OR REPLACE FUNCTION public.expire_old_sessions()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
DECLARE
  v_expired_count INTEGER;
BEGIN
  UPDATE onboarding_sessions
  SET status = 'expired'
  WHERE status = 'active'
    AND expires_at < NOW();

  GET DIAGNOSTICS v_expired_count = ROW_COUNT;
  RETURN v_expired_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.expire_old_consultant_sessions()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
DECLARE
  v_expired_count INTEGER;
BEGIN
  UPDATE consultant_onboarding_sessions
  SET status = 'expired'
  WHERE status = 'active'
    AND expires_at < NOW();

  GET DIAGNOSTICS v_expired_count = ROW_COUNT;
  RETURN v_expired_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.create_onboarding_session(
  p_user_id UUID,
  p_plan_type VARCHAR,
  p_user_context JSONB DEFAULT '{}'::jsonb
)
RETURNS VARCHAR
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
DECLARE
  v_session_id VARCHAR(255);
BEGIN
  v_session_id := 'onb_' || encode(gen_random_bytes(16), 'hex');

  INSERT INTO onboarding_sessions (
    session_id,
    user_id,
    plan_type,
    user_context,
    started_at,
    last_activity,
    expires_at
  ) VALUES (
    v_session_id,
    p_user_id,
    p_plan_type,
    p_user_context,
    NOW(),
    NOW(),
    NOW() + INTERVAL '24 hours'
  );

  RETURN v_session_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.calculate_brief_completeness(
  p_brief_id UUID
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
DECLARE
  v_brief entrepreneur_briefs%ROWTYPE;
  v_completeness INTEGER := 0;
  v_total_sections INTEGER := 6;
  v_completed_sections INTEGER := 0;
BEGIN
  SELECT * INTO v_brief FROM entrepreneur_briefs WHERE id = p_brief_id;

  IF jsonb_array_length(v_brief.customer_segments) > 0 THEN
    v_completed_sections := v_completed_sections + 1;
  END IF;

  IF v_brief.problem_description IS NOT NULL AND LENGTH(v_brief.problem_description) > 50 THEN
    v_completed_sections := v_completed_sections + 1;
  END IF;

  IF v_brief.solution_description IS NOT NULL AND LENGTH(v_brief.solution_description) > 50 THEN
    v_completed_sections := v_completed_sections + 1;
  END IF;

  IF jsonb_array_length(v_brief.competitors) > 0 THEN
    v_completed_sections := v_completed_sections + 1;
  END IF;

  IF v_brief.budget_range IS NOT NULL THEN
    v_completed_sections := v_completed_sections + 1;
  END IF;

  IF v_brief.business_stage IS NOT NULL THEN
    v_completed_sections := v_completed_sections + 1;
  END IF;

  v_completeness := (v_completed_sections * 100) / v_total_sections;

  UPDATE entrepreneur_briefs
  SET completeness_score = v_completeness
  WHERE id = p_brief_id;

  RETURN v_completeness;
END;
$$;

CREATE OR REPLACE FUNCTION public.upsert_entrepreneur_brief(
  p_session_id VARCHAR,
  p_user_id UUID,
  p_brief_data JSONB
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
DECLARE
  v_brief_id UUID;
  v_existing_brief entrepreneur_briefs%ROWTYPE;
BEGIN
  SELECT * INTO v_existing_brief
  FROM entrepreneur_briefs
  WHERE session_id = p_session_id;

  IF FOUND THEN
    UPDATE entrepreneur_briefs SET
      customer_segments = COALESCE((p_brief_data->>'customer_segments')::jsonb, customer_segments),
      problem_description = COALESCE(p_brief_data->>'problem_description', problem_description),
      solution_description = COALESCE(p_brief_data->>'solution_description', solution_description),
      competitors = COALESCE((p_brief_data->>'competitors')::jsonb, competitors),
      budget_range = COALESCE(p_brief_data->>'budget_range', budget_range),
      business_stage = COALESCE(p_brief_data->>'business_stage', business_stage),
      updated_at = NOW()
    WHERE id = v_existing_brief.id;

    v_brief_id := v_existing_brief.id;
  ELSE
    INSERT INTO entrepreneur_briefs (
      session_id,
      user_id,
      customer_segments,
      problem_description,
      solution_description,
      competitors,
      budget_range,
      business_stage
    ) VALUES (
      p_session_id,
      p_user_id,
      (p_brief_data->>'customer_segments')::jsonb,
      p_brief_data->>'problem_description',
      p_brief_data->>'solution_description',
      (p_brief_data->>'competitors')::jsonb,
      p_brief_data->>'budget_range',
      p_brief_data->>'business_stage'
    ) RETURNING id INTO v_brief_id;
  END IF;

  PERFORM calculate_brief_completeness(v_brief_id);

  RETURN v_brief_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.create_project_from_onboarding(
  p_session_id VARCHAR,
  p_project_name VARCHAR DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
DECLARE
  v_session onboarding_sessions%ROWTYPE;
  v_brief entrepreneur_briefs%ROWTYPE;
  v_project_id UUID;
  v_project_name VARCHAR(255);
BEGIN
  SELECT * INTO v_session FROM onboarding_sessions WHERE session_id = p_session_id;
  SELECT * INTO v_brief FROM entrepreneur_briefs WHERE session_id = p_session_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Onboarding session not found: %', p_session_id;
  END IF;

  IF p_project_name IS NULL THEN
    v_project_name := COALESCE(
      v_brief.unique_value_proposition,
      'Project from ' || TO_CHAR(v_session.started_at, 'YYYY-MM-DD')
    );
  ELSE
    v_project_name := p_project_name;
  END IF;

  INSERT INTO projects (
    user_id,
    name,
    description,
    stage,
    onboarding_session_id,
    entrepreneur_brief_id,
    onboarding_completed_at,
    onboarding_quality_score,
    created_at,
    updated_at
  ) VALUES (
    v_session.user_id,
    v_project_name,
    v_brief.problem_description,
    CASE v_brief.business_stage
      WHEN 'idea' THEN 'idea'
      WHEN 'validation' THEN 'validation'
      ELSE 'scaling'
    END,
    p_session_id,
    v_brief.id,
    NOW(),
    v_brief.overall_quality_score,
    NOW(),
    NOW()
  ) RETURNING id INTO v_project_id;

  UPDATE onboarding_sessions
  SET status = 'completed', completed_at = NOW()
  WHERE session_id = p_session_id;

  RETURN v_project_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.match_evidence(
  query_embedding vector,
  match_threshold DOUBLE PRECISION DEFAULT 0.7,
  match_count INTEGER DEFAULT 10,
  filter_project_id UUID DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  project_id UUID,
  title TEXT,
  content TEXT,
  summary TEXT,
  fit_type TEXT,
  strength TEXT,
  source TEXT,
  similarity DOUBLE PRECISION
)
LANGUAGE plpgsql
SET search_path = public, pg_catalog
AS $$
BEGIN
  RETURN QUERY
  SELECT
    evidence.id,
    evidence.project_id,
    evidence.title,
    evidence.content,
    evidence.summary,
    evidence.fit_type,
    evidence.strength,
    evidence.source,
    1 - (evidence.embedding <=> query_embedding) AS similarity
  FROM evidence
  WHERE
    evidence.embedding IS NOT NULL
    AND (filter_project_id IS NULL OR evidence.project_id = filter_project_id)
    AND 1 - (evidence.embedding <=> query_embedding) > match_threshold
  ORDER BY evidence.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
