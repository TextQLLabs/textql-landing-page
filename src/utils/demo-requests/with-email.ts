import { DEMO_CONFIG } from '../constants';
import type { DemoRequestOptions, DemoRequestResult } from './types';

export const handleEmailDemoRequest = async ({ email, pathname }: DemoRequestOptions): Promise<DemoRequestResult> => {
  if (!email) {
    throw new Error('Email is required for email demo requests');
  }

  try {
    const pagePath = pathname.substring(1) || 'home';
    const fullUrl = `${DEMO_CONFIG.BASE_DOMAIN}/${pagePath}`;
    
    const payload = {
      "page-name": fullUrl,
      "email": email,
      "url": fullUrl
    };

    // Send webhook with email
    try {
      await fetch(DEMO_CONFIG.WEBHOOK_URLS.SLACK.EMAIL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (webhookError) {
      console.warn('Slack webhook error:', webhookError);
      // Continue execution even if webhook fails
    }

    // Safely construct the form URL with encoded email parameter
    const formUrl = `${DEMO_CONFIG.FORM_URLS.WITH_EMAIL}?email=${encodeURIComponent(email)}`;

    return {
      success: true,
      formUrl
    };
  } catch (error) {
    console.error('Failed to send demo request with email:', error);
    // Safely construct fallback URL
    const fallbackUrl = `${DEMO_CONFIG.FORM_URLS.WITH_EMAIL}?email=${encodeURIComponent(email)}`;
    return {
      success: false,
      formUrl: fallbackUrl,
      error: 'Failed to submit form. Please try again.'
    };
  }
};