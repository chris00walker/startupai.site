'use client';

import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables are not set');
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      flowType: 'pkce',
      detectSessionInUrl: false, // We handle this manually in callback
    },
  });
}
