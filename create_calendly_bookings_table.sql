-- Create calendly_bookings table for testing
CREATE TABLE calendly_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Link to original form submission
  form_response_id UUID REFERENCES form_response(id),
  
  -- Calendly event details
  calendly_event_uri TEXT NOT NULL,
  calendly_event_type TEXT, -- 'invitee.created', 'invitee.canceled', etc.
  calendly_invitee_email TEXT,
  calendly_invitee_name TEXT,
  calendly_start_time TIMESTAMP WITH TIME ZONE,
  calendly_end_time TIMESTAMP WITH TIME ZONE,
  calendly_location JSONB,
  calendly_status TEXT DEFAULT 'booked',
  
  -- Full webhook payload for debugging
  calendly_payload JSONB,
  
  -- Additional tracking
  invitee_details JSONB,
  event_type_details JSONB
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

-- Add indexes
CREATE INDEX idx_calendly_bookings_form_response_id ON calendly_bookings(form_response_id);
CREATE INDEX idx_calendly_bookings_status ON calendly_bookings(calendly_status);
CREATE INDEX idx_calendly_bookings_start_time ON calendly_bookings(calendly_start_time);
CREATE INDEX idx_calendly_bookings_email ON calendly_bookings(calendly_invitee_email);

-- Add comments
COMMENT ON TABLE calendly_bookings IS 'Test table for Calendly webhook events - safe testing without modifying existing tables';
COMMENT ON COLUMN calendly_bookings.form_response_id IS 'Links to the original form submission';
COMMENT ON COLUMN calendly_bookings.calendly_event_uri IS 'Unique URI of the Calendly event';
COMMENT ON COLUMN calendly_bookings.calendly_status IS 'Status: booked, canceled, rescheduled, no_show';