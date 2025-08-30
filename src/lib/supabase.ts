import { createClient } from '@supabase/supabase-js'

// Use environment variables to determine which database to connect to
// Production will use VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from Netlify
// Development will fall back to dev database when env vars are not set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://gwdharlktlkhqljffrie.supabase.co"
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3ZGhhcmxrdGxraHFsamZmcmllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxODE0MzUsImV4cCI6MjA3MTc1NzQzNX0.OKoe79P1ie7gcAft2ykWC_ERPCFK03vEwaTLO_NXv6Y"

export const supabase = createClient(supabaseUrl, supabaseKey)