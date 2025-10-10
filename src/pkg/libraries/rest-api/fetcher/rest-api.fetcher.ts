import ky from 'ky'

import { envClient } from '@/config/env/env.client'

// api fetcher for supabase
export const restApiFetcher = ky.create({
  prefixUrl: `${envClient.NEXT_PUBLIC_API_BASE_URL}`,
  timeout: 30000,
})
