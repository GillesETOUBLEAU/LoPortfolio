import { createClient } from '@supabase/supabase-js';

// Contact form Supabase project
const SUPABASE_URL = 'https://drodstfbouwlltxyhela.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyb2RzdGZib3V3bGx0ehhlbGEiLCJyb2tlIjoiYW5vbiIsImlhdCI6MTc4MjIwMjYzNywiZXhwIjoyMDk3Nzg3NjM5fQ.gY1a2cfrzVAOFdEmb3pPlQ5XLUcH0rPZVeV0vO3KuQA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
