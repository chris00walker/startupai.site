import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

function getStripeClient() {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    throw new Error('Missing Stripe secret key');
  }

  return new Stripe(stripeSecretKey, {
    apiVersion: '2025-11-17.clover',
  });
}

// Send confirmation email to applicant
async function sendConfirmationEmail(application: any) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || 'beta@startupai.site';

  if (!apiKey) {
    console.log(
      '[stripe-webhook] (no RESEND_API_KEY) skipping confirmation email'
    );
    return { ok: true, delivered: false };
  }

  try {
    const completedDate = new Date().toLocaleDateString();
    const emailHtml = `
      <h1>Welcome to the StartupAI Private Beta, ${application.name}!</h1>
      <p>Your payment of $1,500 has been successfully processed.</p>
      <h2>What You Unlocked:</h2>
      <ul>
        <li>3 full validation cycles</li>
        <li>Real ad spend included</li>
        <li>FREE lifetime Founder Tier access</li>
        <li>$10,440+ value over 5 years</li>
      </ul>
      <p>Questions? Email beta@startupai.site</p>
      <p style="font-size: 12px;">Application ID: ${application.id}</p>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [application.email],
        subject: 'Welcome to StartupAI Private Beta!',
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const errTxt = await res.text().catch(() => '');
      console.error('[stripe-webhook] Resend error:', res.status, errTxt);
      return { ok: false, delivered: false };
    }

    return { ok: true, delivered: true };
  } catch (error) {
    console.error('[stripe-webhook] Email error:', error);
    return { ok: false, delivered: false };
  }
}

// Send admin notification
async function sendAdminNotification(
  application: any,
  session: Stripe.Checkout.Session
) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || 'beta@startupai.site';
  const to = 'cw@chriswalker.consulting';

  if (!apiKey) {
    console.log(
      '[stripe-webhook] (no RESEND_API_KEY) skipping admin notification'
    );
    return { ok: true, delivered: false };
  }

  try {
    const amount = ((session.amount_total || 0) / 100).toFixed(2);
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Beta Payment Received - ${application.name}`,
        html: `
          <h2>New Beta Payment Completed!</h2>
          <p><strong>Applicant:</strong> ${application.name}</p>
          <p><strong>Email:</strong> ${application.email}</p>
          <p><strong>Amount:</strong> $${amount}</p>
          <p><strong>Application ID:</strong> ${application.id}</p>
          <p><strong>Checkout Session ID:</strong> ${session.id}</p>
        `,
      }),
    });

    if (!res.ok) {
      const errTxt = await res.text().catch(() => '');
      console.error(
        '[stripe-webhook] Admin notification error:',
        res.status,
        errTxt
      );
      return { ok: false, delivered: false };
    }

    return { ok: true, delivered: true };
  } catch (error) {
    console.error('[stripe-webhook] Admin notification error:', error);
    return { ok: false, delivered: false };
  }
}

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const stripe = getStripeClient();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error('Missing Stripe webhook secret');
    }

    const signature = event.headers['stripe-signature'];

    if (!signature) {
      console.error('[stripe-webhook] Missing stripe-signature header');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing signature' }),
      };
    }

    let stripeEvent: Stripe.Event;

    try {
      stripeEvent = stripe.webhooks.constructEvent(
        event.body || '',
        signature,
        webhookSecret
      );
    } catch (err) {
      console.error('[stripe-webhook] Signature verification failed:', err);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid signature' }),
      };
    }

    console.log('[stripe-webhook] Event type:', stripeEvent.type);

    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object as Stripe.Checkout.Session;
      const applicationId = session.client_reference_id;

      console.log(
        '[stripe-webhook] Checkout completed for application:',
        applicationId
      );

      if (!applicationId) {
        console.error(
          '[stripe-webhook] No application_id in client_reference_id'
        );
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Missing application_id' }),
        };
      }

      const supabase = getSupabaseClient();

      const { data: application, error: updateError } = await supabase
        .from('beta_applications')
        .update({
          status: 'paid',
          payment_status: 'succeeded',
          stripe_customer_id: session.customer as string,
        })
        .eq('id', applicationId)
        .select()
        .single();

      if (updateError) {
        console.error('[stripe-webhook] Database update error:', updateError);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Database update failed' }),
        };
      }

      console.log('[stripe-webhook] Application updated to paid status');

      sendConfirmationEmail(application).catch((err) => {
        console.error(
          '[stripe-webhook] Failed to send confirmation email:',
          err
        );
      });

      sendAdminNotification(application, session).catch((err) => {
        console.error(
          '[stripe-webhook] Failed to send admin notification:',
          err
        );
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ received: true }),
      };
    }

    console.log('[stripe-webhook] Unhandled event type:', stripeEvent.type);

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('[stripe-webhook] Unexpected error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
