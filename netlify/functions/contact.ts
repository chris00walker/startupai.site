import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { createClient } from '@supabase/supabase-js';

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  industry: string;
  message: string;
  newsletter: boolean;
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

// Optional: Send email notification using Resend
async function sendEmailNotification(data: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || 'notifications@startupai.site';
  const to = process.env.CONTACT_NOTIFICATION_EMAIL || 'hello@startupai.site';

  if (!apiKey) {
    console.log('[contact] (no RESEND_API_KEY) skipping email notification');
    return { ok: true, delivered: false };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `New Contact Form Submission from ${data.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
          <p><strong>Industry:</strong> ${data.industry}</p>
          <p><strong>Newsletter:</strong> ${data.newsletter ? 'Yes' : 'No'}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br />')}</p>
        `,
      }),
    });

    if (!res.ok) {
      const errTxt = await res.text().catch(() => '');
      console.error('[contact] Resend error:', res.status, errTxt);
      return { ok: false, delivered: false };
    }

    return { ok: true, delivered: true };
  } catch (error) {
    console.error('[contact] Email notification error:', error);
    return { ok: false, delivered: false };
  }
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
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
    const body: ContactPayload = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!body.name || body.name.length < 2) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ ok: false, error: 'Name must be at least 2 characters' }),
      };
    }

    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ ok: false, error: 'Invalid email address' }),
      };
    }

    if (!body.industry) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ ok: false, error: 'Industry is required' }),
      };
    }

    if (!body.message || body.message.length < 10) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ ok: false, error: 'Message must be at least 10 characters' }),
      };
    }

    // Extract metadata from event
    const userAgent = event.headers['user-agent'] || undefined;
    const ipAddress = event.headers['x-forwarded-for'] ||
                      event.headers['x-real-ip'] ||
                      undefined;

    // Get Supabase client
    const supabase = getSupabaseClient();

    // Insert into Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert({
        name: body.name,
        email: body.email,
        company: body.company || null,
        industry: body.industry,
        message: body.message,
        newsletter_opted_in: body.newsletter,
        user_agent: userAgent,
        ip_address: ipAddress,
        source: 'website',
        status: 'new',
      })
      .select()
      .single();

    if (error) {
      console.error('[contact] Supabase error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          ok: false,
          error: 'Failed to save contact submission',
          details: error.message
        }),
      };
    }

    // Send email notification (fire and forget)
    sendEmailNotification(body).catch(err => {
      console.error('[contact] Email notification failed:', err);
    });

    // Return success
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ok: true,
        message: 'Contact form submitted successfully',
        id: data.id,
      }),
    };

  } catch (error) {
    console.error('[contact] Unexpected error:', error);

    // Return more helpful error message
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        ok: false,
        error: 'Internal server error',
        details: errorMessage
      }),
    };
  }
};
