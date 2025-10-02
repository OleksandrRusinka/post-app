import { createClient as createSupabaseClient } from '@supabase/supabase-js'

import { envClient } from '@/config/env'

export const createClient = async () => {
  return createSupabaseClient(envClient.NEXT_PUBLIC_SUPABASE_URL, envClient.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
    },
  })
}
