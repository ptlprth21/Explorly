import { createBrowserClient } from '@supabase/auth-helpers-nextjs'; 
type Database = any;

export const createClientSupabase = () => {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};