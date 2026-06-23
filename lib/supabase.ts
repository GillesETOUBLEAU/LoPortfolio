import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://drodstfbouwlltxyhela.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyb2RzdGZib3V3bGx0eHloZWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMDI2MzcsImV4cCI6MjA5Nzc3ODYzN30.gY1a2cfrzVAOFdEmb3pPlQ5XLUcH0rPZVeV0vO3KuQA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
