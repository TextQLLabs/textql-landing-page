// Calendly webhook - stores meeting booking events in calendly_events table
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pqayifagqzuysqwlyaqr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxYXlpZmFncXp1eXNxd2x5YXFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MzE3MTYsImV4cCI6MjA3MTQwNzcxNn0.RH8fRO7vnPqxvTEryoUOxN3jyvIRZYG_ub71QwNbSwI';

const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    console.log('📅 Calendly webhook received:', event.body);

    const webhookData = JSON.parse(event.body || '{}');
    const eventType = webhookData.event;
    const payload = webhookData.payload;

    if (!eventType || !payload) {
      console.error('❌ Missing event type or payload');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing event type or payload' })
      };
    }

    // Log the event type we received
    console.log('📋 Event type:', eventType);

    // Store the complete webhook data in calendly_events table
    const { data: eventData, error: eventError } = await supabase
      .from('calendly_events')
      .insert({
        full_session_data: {
          event_type: eventType,
          payload: payload,
          webhook_timestamp: new Date().toISOString(),
          raw_webhook_data: webhookData
        }
      })
      .select()
      .single();

    if (eventError) {
      console.error('❌ Failed to insert calendly_events:', eventError);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Database insert failed',
          details: eventError.message 
        })
      };
    }

    console.log('✅ Successfully stored calendly event:', eventData.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        event_id: eventData.id,
        event_type: eventType
      })
    };

  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};