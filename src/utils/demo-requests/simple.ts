import { solutions } from '../../data/solutions';
import { DEMO_CONFIG } from '../constants';
import type { DemoRequestPayload, DemoRequestResult } from './types';

export const handleSimpleDemoRequest = async (pathname: string): Promise<DemoRequestResult> => {
  try {
    // Get the current page path, remove leading slash
    const pagePath = pathname.substring(1) || 'home';
    const fullUrl = `${DEMO_CONFIG.BASE_DOMAIN}/${pagePath}`;
    
    // Get solution info if on a solution page
    let solutionName = 'no solution requested';
    if (pagePath.startsWith('solutions/') || pagePath.startsWith('workflows/')) {
      const solutionId = pagePath.split('/')[1];
      const solution = solutions.find(s => s.id === solutionId);
      if (solution) {
        solutionName = solution.title;
      }
    }

    // Send to Slack webhook with expected payload format
    const payload: DemoRequestPayload = {
      "solution-name": solutionName,
      "page-name": fullUrl,
      "url": fullUrl
    };

    try {
      await fetch(DEMO_CONFIG.WEBHOOK_URLS.SLACK.SIMPLE, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (slackError) {
      console.warn('Slack webhook error:', slackError);
    }

    return {
      success: true,
      formUrl: DEMO_CONFIG.FORM_URLS.SIMPLE
    };
  } catch (error) {
    console.error('Failed to send demo request:', error);
    return {
      success: false,
      formUrl: DEMO_CONFIG.FORM_URLS.SIMPLE
    };
  }
};