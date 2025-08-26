import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://gwdharlktlkhqljffrie.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3ZGhhcmxrdGxraHFsamZmcmllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxODE0MzUsImV4cCI6MjA3MTc1NzQzNX0.OKoe79P1ie7gcAft2ykWC_ERPCFK03vEwaTLO_NXv6Y"

export const supabase = createClient(supabaseUrl, supabaseKey)