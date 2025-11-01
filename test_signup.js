const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(
  'https://eqxropalhxjeyvfcoyxg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxeHJvcGFsaHhqZXl2ZmNveXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMjAwNDYsImV4cCI6MjA3Njg5NjA0Nn0.Y2wE2TsKSo2VCHFtdT1r_b4lcgOhlTNJzDT3eqZIza0'
)
;(async () => {
  const email = `qa+${Date.now()}@startupai.site`
  console.log('Testing signup for:', email)
  const { data, error } = await supabase.auth.signUp({
    email,
    password: 'Supabase123!',
    options: {
      data: { full_name: 'Docs QA', company: 'Test Marketing', plan_choice: 'trial' },
      emailRedirectTo: 'https://app-startupai-site.netlify.app/auth/callback?next=/onboarding?plan=trial',
    },
  })
  console.log('Result:', JSON.stringify({ email, data, error }, null, 2))
  process.exit(error ? 1 : 0)
})()
