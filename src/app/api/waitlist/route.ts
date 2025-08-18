import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
});

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
      'Authorization': `Bearer ${apiKey}`,
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

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: 'Invalid payload' },
        { status: 400 }
      );
    }

    const { email } = parsed.data;
    const result = await notifyOwner(email);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
