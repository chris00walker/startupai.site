import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

interface WaitlistPayload {
  email: string;
}

async function notifyOwner(email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || 'onboarding@resend.dev';
  const to = 'cw@chriswalker.consulting';

  if (!apiKey) {
    console.log('[waitlist] (no RESEND_API_KEY) new email:', email);
    return { ok: true, delivered: false } as const;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: 'New waitlist signup',
      text: `New waitlist signup: ${email}`,
      html: `<p>New waitlist signup:</p><p><strong>${email}</strong></p>`,
    }),
  });

  if (!res.ok) {
    const errTxt = await res.text().catch(() => '');
    console.error('[waitlist] Resend error:', res.status, errTxt);
    throw new Error('Failed to send email');
  }

  return { ok: true, delivered: true } as const;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ ok: false, error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request body
    const body: WaitlistPayload = JSON.parse(event.body || '{}');

    // Validate email
    if (!body.email || !isValidEmail(body.email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: false, error: 'Invalid email' }),
      };
    }

    // Send notification
    const result = await notifyOwner(body.email);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('[waitlist] Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: 'Server error' }),
    };
  }
};
