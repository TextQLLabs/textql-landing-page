import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pqayifagqzuysqwlyaqr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxYXlpZmFncXp1eXNxd2x5YXFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MzE3MTYsImV4cCI6MjA3MTQwNzcxNn0.RH8fRO7vnPqxvTEryoUOxN3jyvIRZYG_ub71QwNbSwI'

export const supabase = createClient(supabaseUrl, supabaseKey)