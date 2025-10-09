import ky from 'ky'

import { API_BASE_URL } from '@/config/env/env.client'

// api fetcher for supabase
export const restApiFetcher = ky.create({
  prefixUrl: API_BASE_URL,
  timeout: 30000,
})
