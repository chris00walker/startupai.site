-- Contact Submissions Migration
-- Creates table to store contact form submissions from marketing site

-- ============================================================================
-- CONTACT SUBMISSIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Form Data
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  industry TEXT NOT NULL,
  message TEXT NOT NULL,

  -- Newsletter Opt-in
  newsletter_opted_in BOOLEAN DEFAULT FALSE,

  -- Metadata
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded', 'archived')),
  source TEXT DEFAULT 'website',
  user_agent TEXT,
  ip_address TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow INSERT for anonymous users (form submissions)
CREATE POLICY "Allow anonymous contact form submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- RLS Policy: Allow authenticated admins to SELECT all submissions
-- Note: Adjust this based on your admin role structure
CREATE POLICY "Allow authenticated users to read contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policy: Allow authenticated admins to UPDATE submissions
CREATE POLICY "Allow authenticated users to update contact submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_contact_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function before UPDATE
CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_contact_submissions_updated_at();

-- Comment on table for documentation
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from the marketing site';
