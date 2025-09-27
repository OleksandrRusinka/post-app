import ky from 'ky'

import { API_BASE_URL } from '@/shared/constants'

// api fetcher
export const restApiFetcher = ky.create({
  prefixUrl: API_BASE_URL,
  timeout: 30000,
})
