/**
 * Analytics Helper Utilities for PostHog
 *
 * Provides type-safe event tracking for marketing site analytics.
 * Use these helpers instead of calling posthog directly for consistency.
 */

import posthog from 'posthog-js';

// Marketing Site Events
export type MarketingEvent =
  | 'page_view'
  | 'signup_started'
  | 'signup_completed'
  | 'pricing_viewed'
  | 'demo_requested'
  | 'trial_started'
  | 'contact_form_submitted'
  | 'service_clicked'
  | 'case_study_viewed'
  | 'blog_post_viewed'
  | 'founder_profile_viewed'
  | 'team_page_viewed';

interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Track a marketing event
 */
export const trackEvent = (
  eventName: MarketingEvent,
  properties?: EventProperties
) => {
  if (typeof window !== 'undefined') {
    posthog.capture(eventName, {
      ...properties,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Identify a user after authentication
 */
export const identifyUser = (
  userId: string,
  properties?: {
    email?: string;
    name?: string;
    role?: string;
    plan?: string;
    [key: string]: string | undefined;
  }
) => {
  if (typeof window !== 'undefined') {
    posthog.identify(userId, properties);
  }
};

/**
 * Track signup flow
 */
export const analytics = {
  signup: {
    started: (source?: string) => trackEvent('signup_started', { source }),
    completed: (userId: string, plan: string) => {
      trackEvent('signup_completed', { plan });
      identifyUser(userId, { plan });
    },
  },

  pricing: {
    viewed: (referrer?: string) => trackEvent('pricing_viewed', { referrer }),
  },

  demo: {
    requested: (companyName?: string) =>
      trackEvent('demo_requested', { companyName }),
  },

  contact: {
    submitted: (subject?: string) =>
      trackEvent('contact_form_submitted', { subject }),
  },

  content: {
    caseStudyViewed: (title: string) =>
      trackEvent('case_study_viewed', { title }),
    blogPostViewed: (title: string) =>
      trackEvent('blog_post_viewed', { title }),
    serviceClicked: (serviceName: string) =>
      trackEvent('service_clicked', { service: serviceName }),
  },

  team: {
    founderProfileViewed: (founderName: string, role: string) =>
      trackEvent('founder_profile_viewed', { founder: founderName, role }),
    pageViewed: () => trackEvent('team_page_viewed'),
  },
};

/**
 * Reset user identity (on logout)
 */
export const resetUser = () => {
  if (typeof window !== 'undefined') {
    posthog.reset();
  }
};
