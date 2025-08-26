#!/usr/bin/env node

// Script to create Calendly webhooks
// Usage: CALENDLY_PAT=pat_here WEBHOOK_URL=url_here node scripts/create-calendly-webhook.js

const CALENDLY_PAT = process.env.CALENDLY_PAT;
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'https://textql.com/.netlify/functions/calendly-webhook';

if (!CALENDLY_PAT) {
  console.error('❌ CALENDLY_PAT environment variable required');
  console.log('Usage: CALENDLY_PAT=your_pat_here node scripts/create-calendly-webhook.js');
  process.exit(1);
}

async function createWebhook() {
  try {
    // First get the user's organization
    console.log('🔍 Getting user organization...');
    const userResponse = await fetch('https://api.calendly.com/users/me', {
      headers: {
        'Authorization': `Bearer ${CALENDLY_PAT}`,
        'Content-Type': 'application/json'
      }
    });

    if (!userResponse.ok) {
      throw new Error(`User API error: ${userResponse.status} ${userResponse.statusText}`);
    }

    const userData = await userResponse.json();
    const orgUri = userData.resource.current_organization;
    
    console.log('👤 User:', userData.resource.name);
    console.log('📧 Email:', userData.resource.email);
    console.log('🏢 Organization:', orgUri);

    // Create the webhook
    console.log('🔗 Creating webhook...');
    const webhookPayload = {
      url: WEBHOOK_URL,
      events: ['invitee.created'],
      organization: orgUri,
      scope: 'organization'
    };

    console.log('📋 Webhook payload:', JSON.stringify(webhookPayload, null, 2));

    const webhookResponse = await fetch('https://api.calendly.com/webhook_subscriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CALENDLY_PAT}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(webhookPayload)
    });

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      throw new Error(`Webhook creation failed: ${webhookResponse.status} ${webhookResponse.statusText}\n${errorText}`);
    }

    const webhookData = await webhookResponse.json();
    console.log('✅ Webhook created successfully!');
    console.log('🆔 Webhook ID:', webhookData.resource.uri.split('/').pop());
    console.log('📡 Webhook URL:', webhookData.resource.url);
    console.log('📅 Events:', webhookData.resource.events);
    console.log('✨ Status:', webhookData.resource.state);

    return webhookData.resource;

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createWebhook();