// BRAND NEW Calendly webhook - fresh start
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pqayifagqzuysqwlyaqr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxYXlpZmFncXp1eXNxd2x5YXFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MzE3MTYsImV4cCI6MjA3MTQwNzcxNn0.RH8fRO7vnPqxvTEryoUOxN3jyvIRZYG_ub71QwNbSwI';

const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  console.log('🆕 NEW WEBHOOK RUNNING - FRESH START!');
  
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    console.log('📨 Received webhook:', event.body);

    const webhookData = JSON.parse(event.body || '{}');
    const eventType = webhookData.event;
    const payload = webhookData.payload;

    if (!eventType || !payload) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid webhook data' })
      };
    }

    console.log('🎯 Event type:', eventType);
    console.log('📧 Invitee email:', payload.email);

    // 1. FIRST: Create posthog_snapshot (we know this works)
    console.log('📊 Creating posthog_snapshot...');
    const { data: snapshotData, error: snapshotError } = await supabase
      .from('posthog_snapshot')
      .insert({
        trigger: 'calendly_meeting_booked',
        posthog_distinct_id: payload.email || 'webhook_user',
        posthog_session_id: null,
        page_view_id: null,
        session_replay_url: null,
        feature_flags: null,
        current_url: null,
        referrer: null,
        user_agent: null,
        full_session_data: {
          calendly_webhook_event: eventType,
          calendly_payload: payload,
          webhook_timestamp: new Date().toISOString()
        }
      })
      .select()
      .single();

    if (snapshotError) {
      console.error('❌ posthog_snapshot failed:', snapshotError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Database error', details: snapshotError })
      };
    }

    console.log('✅ posthog_snapshot created:', snapshotData?.id);

    // 2. SECOND: Create calendly_bookings (same exact pattern)
    let bookingData = null;
    if (eventType === 'invitee.created') {
      console.log('📅 Creating calendly_bookings...');
      
      const { data: bookingResult, error: bookingError } = await supabase
        .from('calendly_bookings')
        .insert({
          invitee_uri: payload.uri || `webhook-${Date.now()}`,
          invitee_name: payload.name || 'Unknown',
          invitee_email: payload.email || 'unknown@test.com',
          invitee_status: payload.status || 'active',
          calendly_status: 'booked',
          calendly_payload: payload,
          webhook_event_type: eventType
        })
        .select()
        .single();

      if (bookingError) {
        console.error('❌ calendly_bookings failed:', bookingError);
        console.error('❌ Error details:', JSON.stringify(bookingError, null, 2));
      } else {
        bookingData = bookingResult;
        console.log('✅ calendly_bookings created:', bookingData?.id);
      }
    } else {
      console.log('ℹ️  Skipping calendly_bookings - event type is:', eventType);
    }

    console.log('🎉 Webhook complete!');

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        webhook: 'NEW_FRESH_VERSION',
        snapshot_id: snapshotData?.id,
        booking_id: bookingData?.id || null,
        event_type: eventType
      })
    };

  } catch (error) {
    console.error('💥 Webhook error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error', details: error.message })
    };
  }
};