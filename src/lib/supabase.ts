import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = 'https://pyzipmsezfxlvlzcakfp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5emlwbXNlemZ4bHZsemNha2ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4NjUxODQsImV4cCI6MjA0ODQ0MTE4NH0.LaR2IPIj9HPi6Ndf40STT7JE-vysRbNzXeFWbWY1wVY';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce',
  },
});