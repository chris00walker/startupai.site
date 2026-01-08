/**
 * Public Activity Feed API
 *
 * GET /.netlify/functions/public-activity
 *
 * Returns anonymized agent activities for the marketing site activity feed.
 * Data is sourced from the public_activity_log table in Supabase.
 *
 * Query params:
 * - limit: number (default: 10, max: 50)
 * - founder: string (optional filter by founder_id)
 */

import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

interface ActivityLogRow {
  id: string;
  founder_id: string;
  activity_type: string;
  description: string;
  created_at: string;
  project_id?: string;
  kickoff_id?: string;
}

interface PublicActivity {
  id: string;
  agentName: string;
  agentColor: string;
  activity: string;
  timestamp: string;
  metric?: string;
}

// Map founder_id to display name and color
const founderDisplayMap: Record<string, { name: string; color: string }> = {
  sage: { name: 'Sage', color: 'blue' },
  forge: { name: 'Forge', color: 'orange' },
  pulse: { name: 'Pulse', color: 'green' },
  compass: { name: 'Compass', color: 'purple' },
  guardian: { name: 'Guardian', color: 'silver' },
  ledger: { name: 'Ledger', color: 'gold' },
};

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Prefer service role for serverless
  const resolvedKey = supabaseServiceKey || supabaseAnonKey;

  if (!supabaseUrl || !resolvedKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, resolvedKey);
}

/**
 * Format a timestamp to relative time (e.g., "2 hours ago")
 */
function formatRelativeTime(isoTimestamp: string): string {
  const date = new Date(isoTimestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
}

/**
 * Transform database row to public activity format
 */
function transformToPublicActivity(row: ActivityLogRow): PublicActivity {
  const founderInfo = founderDisplayMap[row.founder_id] || {
    name: 'AI Agent',
    color: 'gray',
  };

  return {
    id: row.id,
    agentName: founderInfo.name,
    agentColor: founderInfo.color,
    activity: row.description,
    timestamp: formatRelativeTime(row.created_at),
  };
}

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // CORS headers for cross-origin requests
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=60', // Cache for 1 minute
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ ok: false, error: 'Method not allowed' }),
    };
  }

  try {
    // Parse query parameters
    const params = event.queryStringParameters || {};
    const limit = Math.min(parseInt(params.limit || '10', 10), 50);
    const founder = params.founder;

    // Get Supabase client
    const supabase = getSupabaseClient();

    // Build query
    let query = supabase
      .from('public_activity_log')
      .select('id, founder_id, activity_type, description, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);

    // Optional founder filter
    if (founder && founderDisplayMap[founder.toLowerCase()]) {
      query = query.eq('founder_id', founder.toLowerCase());
    }

    const { data, error } = await query;

    if (error) {
      console.error('[public-activity] Supabase error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          ok: false,
          error: 'Failed to fetch activities',
          details: error.message,
        }),
      };
    }

    // Transform to public format
    const activities: PublicActivity[] = (data || []).map(transformToPublicActivity);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ok: true,
        activities,
        count: activities.length,
        timestamp: new Date().toISOString(),
      }),
    };
  } catch (error) {
    console.error('[public-activity] Unexpected error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        ok: false,
        error: 'Internal server error',
        details: errorMessage,
      }),
    };
  }
};
