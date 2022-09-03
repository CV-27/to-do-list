import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://whtuhuecnnfcnbessxze.supabase.co';
const supabaseAnonToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndodHVodWVjbm5mY25iZXNzeHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE4ODAwNjAsImV4cCI6MTk3NzQ1NjA2MH0.puOjJ7jchxd3jIQAZ1hoGMRlLQRuYg6hvhBzDxgAgDM';

export default createClient(supabaseUrl, supabaseAnonToken);
