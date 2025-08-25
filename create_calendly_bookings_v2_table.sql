-- Create improved calendly_bookings table based on actual webhook data
DROP TABLE IF EXISTS calendly_bookings CASCADE;

CREATE TABLE calendly_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Link to original form submission (extracted from tracking data)
  form_response_id UUID REFERENCES form_response(id),
  
  -- Invitee Information
  invitee_uri TEXT NOT NULL, -- payload.uri
  invitee_name TEXT, -- payload.name
  invitee_email TEXT, -- payload.email
  invitee_timezone TEXT, -- payload.timezone
  invitee_status TEXT, -- payload.status (active, canceled, etc.)
  
  -- Scheduled Event Information
  scheduled_event_uri TEXT, -- payload.scheduled_event.uri
  scheduled_event_name TEXT, -- payload.scheduled_event.name "30 Minute Meeting"
  event_start_time TIMESTAMP WITH TIME ZONE, -- payload.scheduled_event.start_time
  event_end_time TIMESTAMP WITH TIME ZONE, -- payload.scheduled_event.end_time
  event_status TEXT, -- payload.scheduled_event.status
  event_type_uri TEXT, -- payload.scheduled_event.event_type
  
  -- Meeting Location
  location_type TEXT, -- payload.scheduled_event.location.type
  location_status TEXT, -- payload.scheduled_event.location.status
  location_join_url TEXT, -- payload.scheduled_event.location.join_url
  
  -- Tracking Information
  utm_source TEXT, -- payload.tracking.utm_source
  utm_medium TEXT, -- payload.tracking.utm_medium
  utm_campaign TEXT, -- payload.tracking.utm_campaign
  utm_term TEXT, -- payload.tracking.utm_term
  utm_content TEXT, -- payload.tracking.utm_content
  
  -- Action URLs
  cancel_url TEXT, -- payload.cancel_url
  reschedule_url TEXT, -- payload.reschedule_url
  
  -- Status and Flags
  calendly_status TEXT DEFAULT 'booked', -- our status: booked, canceled, rescheduled
  is_rescheduled BOOLEAN DEFAULT FALSE, -- payload.rescheduled
  is_no_show BOOLEAN DEFAULT FALSE, -- payload.no_show
  
  -- Host Information
  host_user_uri TEXT, -- payload.scheduled_event.event_memberships[0].user
  host_name TEXT, -- payload.scheduled_event.event_memberships[0].user_name
  host_email TEXT, -- payload.scheduled_event.event_memberships[0].user_email
  
  -- Event Metadata
  invitees_limit INTEGER, -- payload.scheduled_event.invitees_counter.limit
  invitees_total INTEGER, -- payload.scheduled_event.invitees_counter.total
  invitees_active INTEGER, -- payload.scheduled_event.invitees_counter.active
  
  -- Full payload for debugging
  calendly_payload JSONB, -- Complete webhook payload
  
  -- Webhook metadata
  webhook_event_type TEXT, -- invitee.created, invitee.canceled, etc.
  webhook_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE calendly_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert on calendly_bookings" 
ON calendly_bookings FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Allow anonymous select on calendly_bookings" 
ON calendly_bookings FOR SELECT 
TO anon 
USING (true);

CREATE POLICY "Allow anonymous update on calendly_bookings" 
ON calendly_bookings FOR UPDATE 
TO anon 
USING (true);

-- Add indexes for common queries
CREATE INDEX idx_calendly_bookings_form_response_id ON calendly_bookings(form_response_id);
CREATE INDEX idx_calendly_bookings_invitee_email ON calendly_bookings(invitee_email);
CREATE INDEX idx_calendly_bookings_event_start_time ON calendly_bookings(event_start_time);
CREATE INDEX idx_calendly_bookings_calendly_status ON calendly_bookings(calendly_status);
CREATE INDEX idx_calendly_bookings_scheduled_event_uri ON calendly_bookings(scheduled_event_uri);
CREATE INDEX idx_calendly_bookings_webhook_event_type ON calendly_bookings(webhook_event_type);
CREATE INDEX idx_calendly_bookings_utm_source ON calendly_bookings(utm_source);

-- Add comments
COMMENT ON TABLE calendly_bookings IS 'Calendly booking events with detailed structured data extracted from webhooks';
COMMENT ON COLUMN calendly_bookings.form_response_id IS 'Links to the original form submission that led to this booking';
COMMENT ON COLUMN calendly_bookings.invitee_uri IS 'Unique Calendly URI for this invitee';
COMMENT ON COLUMN calendly_bookings.scheduled_event_uri IS 'Unique Calendly URI for the scheduled event';
COMMENT ON COLUMN calendly_bookings.calendly_status IS 'Our tracking status: booked, canceled, rescheduled, no_show';
COMMENT ON COLUMN calendly_bookings.webhook_event_type IS 'Original webhook event: invitee.created, invitee.canceled, etc.';