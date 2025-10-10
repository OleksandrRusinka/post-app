import ky from 'ky'

import { envClient } from '@/config/env/env.client'

// api fetcher for JSONPlaceholder
export const localApiFetcher = ky.create({
  prefixUrl: `${envClient.NEXT_PUBLIC_LOCAL_API_BASE_URL}`,
  timeout: 30000,
})
