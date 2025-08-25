// Netlify Functions version of Calendly webhook
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pqayifagqzuysqwlyaqr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxYXlpZmFncXp1eXNxd2x5YXFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MzE3MTYsImV4cCI6MjA3MTQwNzcxNn0.RH8fRO7vnPqxvTEryoUOxN3jyvIRZYG_ub71QwNbSwI';
const calendlyPAT = process.env.CALENDLY_PAT;

const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to fetch additional data from Calendly API
async function fetchCalendlyDetails(uri) {
  if (!calendlyPAT || !uri) return null;
  
  try {
    const response = await fetch(`https://api.calendly.com/${uri}`, {
      headers: {
        'Authorization': `Bearer ${calendlyPAT}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.warn('Calendly API request failed:', response.status);
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching Calendly details:', error);
    return null;
  }
}

exports.handler = async (event, context) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    console.log('Received Calendly webhook:', event.body);

    const webhookData = JSON.parse(event.body || '{}');
    const eventType = webhookData.event;
    const payload = webhookData.payload;

    if (!eventType || !payload) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid webhook data' })
      };
    }

    // Map Calendly webhook events to our trigger types
    let triggerType = 'calendly_webhook_unknown';
    switch (eventType) {
      case 'invitee.created':
        triggerType = 'calendly_meeting_booked';
        break;
      case 'invitee.canceled':
        triggerType = 'calendly_meeting_canceled';
        break;
      case 'invitee.rescheduled':
        triggerType = 'calendly_meeting_rescheduled';
        break;
      case 'invitee.paid':
        triggerType = 'calendly_payment_completed';
        break;
      default:
        triggerType = 'calendly_webhook_' + eventType.replace('.', '_');
    }

    // Extract relevant data
    const invitee = payload.invitee || {};
    const eventDetails = payload.event || {};
    const questions = payload.questions_and_answers || [];
    
    // Fetch additional details from Calendly API if we have a PAT
    let inviteeDetails = null;
    let eventTypeDetails = null;
    
    if (calendlyPAT) {
      // Fetch detailed invitee information
      if (invitee.uri) {
        inviteeDetails = await fetchCalendlyDetails(invitee.uri.replace('https://api.calendly.com/', ''));
      }
      
      // Fetch event type details  
      if (eventDetails.event_type?.uri) {
        eventTypeDetails = await fetchCalendlyDetails(eventDetails.event_type.uri.replace('https://api.calendly.com/', ''));
      }
    }
    
    // Try to extract form_response_id from custom questions or UTM parameters
    let formResponseId = null;
    
    // Look for form_response_id in questions
    const formResponseQuestion = questions.find(q => 
      q.question && q.question.toLowerCase().includes('form_response_id')
    );
    if (formResponseQuestion) {
      formResponseId = formResponseQuestion.answer;
    }
    
    // Look in UTM parameters if available
    if (!formResponseId && payload.tracking) {
      formResponseId = payload.tracking.utm_content || payload.tracking.custom_a1;
    }
    
    // Also try to extract from invitee details if available
    if (!formResponseId && inviteeDetails?.resource?.tracking) {
      const tracking = inviteeDetails.resource.tracking;
      formResponseId = tracking.utm_content || tracking.utm_term;
    }

    // Create posthog_snapshot entry
    const { data: snapshotData, error: snapshotError } = await supabase
      .from('posthog_snapshot')
      .insert({
        trigger: triggerType,
        posthog_distinct_id: invitee.email || 'webhook_user',
        posthog_session_id: null,
        page_view_id: null,
        session_replay_url: null,
        feature_flags: null,
        current_url: eventDetails.location?.join_url || null,
        referrer: null,
        user_agent: null,
        full_session_data: {
          calendly_webhook_event: eventType,
          calendly_payload: payload,
          invitee_email: invitee.email,
          invitee_name: invitee.name,
          event_start_time: eventDetails.start_time,
          event_end_time: eventDetails.end_time,
          event_location: eventDetails.location,
          questions_and_answers: questions,
          form_response_id: formResponseId,
          webhook_timestamp: new Date().toISOString(),
          // Enhanced data from Calendly API
          invitee_details: inviteeDetails?.resource || null,
          event_type_details: eventTypeDetails?.resource || null,
          calendly_api_enhanced: !!calendlyPAT
        }
      })
      .select()
      .single();

    if (snapshotError) {
      console.error('Failed to create posthog_snapshot:', snapshotError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Database error', details: snapshotError })
      };
    }

    // If we have a form_response_id, update that record
    if (formResponseId && triggerType === 'calendly_meeting_booked') {
      const { error: updateError } = await supabase
        .from('form_response')
        .update({
          updated_at: new Date().toISOString()
        })
        .eq('id', formResponseId);

      if (updateError) {
        console.error('Failed to update form_response:', updateError);
      }
    }

    console.log('Successfully processed Calendly webhook:', triggerType, snapshotData?.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        trigger: triggerType,
        snapshot_id: snapshotData?.id,
        form_response_id: formResponseId
      })
    };

  } catch (error) {
    console.error('Webhook processing error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error', details: error.message })
    };
  }
};