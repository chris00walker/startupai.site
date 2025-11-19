import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

interface BetaApplicationPayload {
  name: string;
  email: string;
  startupIdea: string;
  industry: string;
  timeline: string;
  referralSource?: string;
}

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Prefer service role when available so serverless execution does not depend on anon-key headers/RLS.
  const resolvedKey = supabaseServiceKey || supabaseAnonKey;

  if (!supabaseUrl || !resolvedKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, resolvedKey);
}

// Send email notification to admin
async function sendAdminNotification(
  data: BetaApplicationPayload,
  applicationId: string
) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || 'notifications@startupai.site';
  const to = 'cw@chriswalker.consulting';

  if (!apiKey) {
    console.log(
      '[beta-application] (no RESEND_API_KEY) skipping email notification'
    );
    return { ok: true, delivered: false };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `🎯 New Beta Application from ${data.name}`,
        html: `
          <h2>New Beta Program Application</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Industry:</strong> ${data.industry}</p>
          <p><strong>Timeline:</strong> ${data.timeline}</p>
          <p><strong>Referral Source:</strong> ${data.referralSource || 'N/A'}</p>
          <hr />
          <p><strong>Startup Idea:</strong></p>
          <p>${data.startupIdea.replace(/\n/g, '<br />')}</p>
          <hr />
          <p><strong>Application ID:</strong> ${applicationId}</p>
          <p><a href="https://supabase.com/dashboard/project/${process.env.NEXT_PUBLIC_SUPABASE_URL?.match(/https:\/\/([^.]+)/)?.[1]}/editor">View in Supabase</a></p>
        `,
      }),
    });

    if (!res.ok) {
      const errTxt = await res.text().catch(() => '');
      console.error('[beta-application] Resend error:', res.status, errTxt);
      return { ok: false, delivered: false };
    }

    return { ok: true, delivered: true };
  } catch (error) {
    console.error('[beta-application] Email notification error:', error);
    return { ok: false, delivered: false };
  }
}

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ ok: false, error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request body
    const body: BetaApplicationPayload = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!body.name || body.name.length < 2) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          ok: false,
          error: 'Name must be at least 2 characters',
        }),
      };
    }

    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ ok: false, error: 'Invalid email address' }),
      };
    }

    if (!body.startupIdea || body.startupIdea.length < 20) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          ok: false,
          error: 'Startup idea must be at least 20 characters',
        }),
      };
    }

    if (!body.industry) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ ok: false, error: 'Industry is required' }),
      };
    }

    const validTimelines = [
      '0-3 months',
      '3-6 months',
      '6-12 months',
      '12+ months',
    ];
    if (!body.timeline || !validTimelines.includes(body.timeline)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ ok: false, error: 'Invalid timeline' }),
      };
    }

    // Extract metadata from event
    const userAgent = event.headers['user-agent'] || undefined;
    const ipAddress =
      event.headers['x-forwarded-for'] ||
      event.headers['x-real-ip'] ||
      undefined;

    // Get Supabase client
    const supabase = getSupabaseClient();

    // Insert into Supabase
    const { data, error } = await supabase
      .from('beta_applications')
      .insert({
        name: body.name,
        email: body.email,
        startup_idea: body.startupIdea,
        industry: body.industry,
        timeline: body.timeline,
        referral_source: body.referralSource || null,
        user_agent: userAgent,
        ip_address: ipAddress,
        status: 'pending',
        payment_status: null,
      })
      .select()
      .single();

    if (error) {
      console.error('[beta-application] Supabase error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          ok: false,
          error: 'Failed to save beta application',
          details: error.message,
        }),
      };
    }

    // Send email notification (fire and forget)
    sendAdminNotification(body, data.id).catch((err) => {
      console.error('[beta-application] Email notification failed:', err);
    });

    // Return success
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ok: true,
        message: 'Beta application submitted successfully',
        id: data.id,
      }),
    };
  } catch (error) {
    console.error('[beta-application] Unexpected error:', error);

    // Return more helpful error message
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
