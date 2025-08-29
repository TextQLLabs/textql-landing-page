// Calendly webhook - stores meeting booking events in calendly_events table
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

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
    const environment = process.env.CALENDLY_ENVIRONMENT || 'development';
    console.log(`📅 Calendly webhook received (${environment}):`, event.body);

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

    // Extract key fields from webhook payload
    const invitee = payload || {};
    const scheduledEvent = invitee.scheduled_event || {};
    const location = scheduledEvent.location || {};
    
    // Extract host email from event memberships (with fallbacks for different payload structures)
    const eventMemberships = scheduledEvent.event_memberships || [];
    let hostEmail = null;
    
    // Primary method: Find host in event_memberships
    const hostMembership = eventMemberships.find(membership => membership.user_email);
    if (hostMembership) {
      hostEmail = hostMembership.user_email;
    }
    
    // Fallback 1: Check if event_type has event owner info
    if (!hostEmail && scheduledEvent.event_type && scheduledEvent.event_type.owner) {
      hostEmail = scheduledEvent.event_type.owner.email || scheduledEvent.event_type.owner.user_email;
    }
    
    // Fallback 2: Check direct owner field in scheduled_event
    if (!hostEmail && scheduledEvent.owner) {
      hostEmail = scheduledEvent.owner.email || scheduledEvent.owner.user_email;
    }
    
    // Log host email extraction for debugging
    if (hostEmail) {
      console.log('👤 Host email extracted:', hostEmail);
    } else {
      console.log('⚠️ No host email found in webhook payload');
      console.log('📋 Event memberships:', JSON.stringify(eventMemberships, null, 2));
    }
    
    // Add to identity table FIRST if email exists
    if (invitee.email) {
      console.log('👤 Adding email to identity table:', invitee.email);
      
      const { data: identityData, error: identityError } = await supabase
        .from('identity')
        .insert({
          email: invitee.email.toLowerCase().trim()
        })
        .select()
        .single();

      if (identityError) {
        // If it's a unique constraint error, that's expected (email already exists)
        if (identityError.code === '23505') {
          console.log('ℹ️ Email already exists in identity table:', invitee.email);
        } else {
          console.error('❌ Failed to insert into identity table:', identityError);
          return {
            statusCode: 500,
            body: JSON.stringify({ 
              error: 'Identity table insert failed',
              details: identityError.message 
            })
          };
        }
      } else {
        console.log('✅ Successfully added new identity:', identityData.id);
      }
    }
    
    // Then store extracted data in calendly_events table
    const { data: eventData, error: eventError } = await supabase
      .from('calendly_events')
      .insert({
        // Invitee details
        invitee_name: invitee.name || null,
        invitee_email: invitee.email || null,
        invitee_timezone: invitee.timezone || null,
        invitee_status: invitee.status || null,
        
        // Meeting details
        event_name: scheduledEvent.name || null,
        event_start_time: scheduledEvent.start_time || null,
        event_end_time: scheduledEvent.end_time || null,
        
        // Host details
        host_email: hostEmail,
        
        // Location/Meeting info
        meeting_type: location.type || null,
        join_url: location.join_url || null,
        
        // Keep full JSON for anything else
        full_session_data: {
          event_type: eventType,
          payload: payload,
          webhook_timestamp: new Date().toISOString(),
          environment: environment,
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

    // Now link this calendly event to the form_response record by email
    if (invitee.email) {
      console.log('🔗 Attempting to link calendly event to form_response for email:', invitee.email);
      
      const { data: updateData, error: updateError } = await supabase
        .from('form_response')
        .update({ 
          calendly_event_id: eventData.id 
        })
        .eq('email', invitee.email.toLowerCase().trim())
        .is('calendly_event_id', null) // Only update if no calendly event is already linked
        .select()
        .order('created_at', { ascending: false }) // Get the most recent form response
        .limit(1);

      if (updateError) {
        console.error('❌ Failed to link form_response:', updateError);
        // Don't fail the whole webhook, just log the error
      } else if (updateData && updateData.length > 0) {
        console.log('✅ Successfully linked calendly event to form_response:', updateData[0].id);
      } else {
        console.log('ℹ️ No matching form_response found for email:', invitee.email);
      }
    } else {
      console.log('ℹ️ No email in calendly payload - skipping form_response linking');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        event_id: eventData.id,
        event_type: eventType,
        linked_form_response: !!invitee.email
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