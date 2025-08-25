// BRAND NEW Calendly webhook - completely different name to bypass all caching
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pqayifagqzuysqwlyaqr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxYXlpZmFncXp1eXNxd2x5YXFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MzE3MTYsImV4cCI6MjA3MTQwNzcxNn0.RH8fRO7vnPqxvTEryoUOxN3jyvIRZYG_ub71QwNbSwI';

const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  console.log('🚀 CALENDLY-HOOK-2025 - COMPLETELY FRESH!');
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    console.log('📨 Received:', event.body);

    const webhookData = JSON.parse(event.body || '{}');
    const eventType = webhookData.event;
    const payload = webhookData.payload;

    console.log('🎯 Event:', eventType, 'Email:', payload?.email);

    // 1. Create posthog_snapshot (same as before - we know this works)
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
      return { statusCode: 500, body: JSON.stringify({ error: 'Database error' }) };
    }

    console.log('✅ posthog_snapshot:', snapshotData?.id);

    // 2. Create calendly_bookings (this should work now!)
    let bookingData = null;
    if (eventType === 'invitee.created') {
      console.log('📅 Inserting calendly_bookings...');
      
      const { data: bookingResult, error: bookingError } = await supabase
        .from('calendly_bookings')
        .insert({
          invitee_uri: payload.uri || `fresh-${Date.now()}`,
          invitee_name: payload.name || 'Fresh User',
          invitee_email: payload.email || 'fresh@test.com',
          invitee_status: payload.status || 'active',
          calendly_status: 'booked',
          calendly_payload: payload,
          webhook_event_type: eventType
        })
        .select()
        .single();

      if (bookingError) {
        console.error('❌ calendly_bookings ERROR:', JSON.stringify(bookingError, null, 2));
      } else {
        bookingData = bookingResult;
        console.log('✅ calendly_bookings SUCCESS:', bookingData?.id);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        webhook_version: 'CALENDLY-HOOK-2025',
        snapshot_id: snapshotData?.id,
        booking_id: bookingData?.id || null,
        event_type: eventType
      })
    };

  } catch (error) {
    console.error('💥 ERROR:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};