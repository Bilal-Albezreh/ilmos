import { createClient } from '@supabase/supabase-js';

// The '!' tells TypeScript: "Trust me, these variables exist in .env.local"
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a single instance of the client to use throughout the app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);