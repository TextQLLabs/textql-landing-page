import { workflows } from '../../data/workflows';
import { DEMO_CONFIG } from '../constants';
import type { DemoRequestPayload, DemoRequestResult } from './types';

export const handleSimpleDemoRequest = async (pathname: string): Promise<DemoRequestResult> => {
  try {
    // Get the current page path, remove leading slash
    const pagePath = pathname.substring(1) || 'home';
    const fullUrl = `${DEMO_CONFIG.BASE_DOMAIN}/${pagePath}`;
    
    // Get workflow info if on a workflow page
    let workflowName = 'no workflow requested';
    if (pagePath.startsWith('workflows/')) {
      const workflowId = pagePath.split('/')[1];
      const workflow = workflows.find(w => w.id === workflowId);
      if (workflow) {
        workflowName = workflow.title;
      }
    }

    // Send to Slack webhook with expected payload format
    const payload: DemoRequestPayload = {
      "workflow-name": workflowName,
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