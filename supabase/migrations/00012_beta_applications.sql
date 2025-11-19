-- Beta Applications Migration
-- Creates table to store beta program applications from marketing site

-- ============================================================================
-- BETA APPLICATIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS beta_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Form Data
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  startup_idea TEXT NOT NULL,
  industry TEXT NOT NULL,
  timeline TEXT NOT NULL CHECK (timeline IN ('0-3 months', '3-6 months', '6-12 months', '12+ months')),
  referral_source TEXT,

  -- Application Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'paid')),

  -- Payment Information
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  payment_amount INTEGER DEFAULT 150000, -- Amount in cents ($1,500)
  payment_status TEXT CHECK (payment_status IN ('pending', 'processing', 'succeeded', 'failed', 'canceled')),
  paid_at TIMESTAMPTZ,

  -- Beta Cohort Assignment
  cohort_phase TEXT CHECK (cohort_phase IN ('phase_1', 'phase_2', 'phase_3', 'phase_4')),

  -- Metadata
  user_agent TEXT,
  ip_address TEXT,
  notes TEXT, -- Internal notes for manual review

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_beta_applications_status ON beta_applications(status);
CREATE INDEX IF NOT EXISTS idx_beta_applications_payment_status ON beta_applications(payment_status);
CREATE INDEX IF NOT EXISTS idx_beta_applications_created_at ON beta_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_beta_applications_email ON beta_applications(email);
CREATE INDEX IF NOT EXISTS idx_beta_applications_stripe_payment_intent ON beta_applications(stripe_payment_intent_id);

-- Enable Row Level Security (RLS)
ALTER TABLE beta_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow INSERT for anonymous users (form submissions)
CREATE POLICY "Allow anonymous beta application submissions"
  ON beta_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- RLS Policy: Allow authenticated admins to SELECT all applications
CREATE POLICY "Allow authenticated users to read beta applications"
  ON beta_applications
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policy: Allow authenticated admins to UPDATE applications
CREATE POLICY "Allow authenticated users to update beta applications"
  ON beta_applications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policy: Allow service role to do everything (for webhook updates)
CREATE POLICY "Allow service role full access to beta applications"
  ON beta_applications
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_beta_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function before UPDATE
CREATE TRIGGER update_beta_applications_updated_at
  BEFORE UPDATE ON beta_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_beta_applications_updated_at();

-- Function to automatically set paid_at timestamp when status changes to 'paid'
CREATE OR REPLACE FUNCTION set_beta_application_paid_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'paid' AND OLD.status != 'paid' THEN
    NEW.paid_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically set paid_at
CREATE TRIGGER set_beta_application_paid_at
  BEFORE UPDATE ON beta_applications
  FOR EACH ROW
  EXECUTE FUNCTION set_beta_application_paid_at();

-- Comment on table for documentation
COMMENT ON TABLE beta_applications IS 'Stores beta program applications and payment tracking from the marketing site';
COMMENT ON COLUMN beta_applications.payment_amount IS 'Payment amount in cents (e.g., 150000 = $1,500)';
COMMENT ON COLUMN beta_applications.cohort_phase IS 'Which beta cohort phase (1-4) the applicant is assigned to';
