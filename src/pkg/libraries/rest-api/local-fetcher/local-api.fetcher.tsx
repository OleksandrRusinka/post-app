import ky from 'ky'

import { LOCAL_API_BASE_URL } from '@/config/env/env.client'

// api fetcher for JSONPlaceholder
export const localApiFetcher = ky.create({
  prefixUrl: LOCAL_API_BASE_URL,
  timeout: 30000,
})
