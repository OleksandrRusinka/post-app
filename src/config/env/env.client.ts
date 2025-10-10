import { z } from 'zod'

import { createEnv } from '@t3-oss/env-nextjs'

// env client
export const envClient = createEnv({
  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().min(1, { message: 'NEXT_PUBLIC_API_BASE_URL is required' }),
    NEXT_PUBLIC_LOCAL_API_BASE_URL: z.string().min(1, { message: 'NEXT_PUBLIC_LOCAL_API_BASE_URL is required' }),
    NEXT_PUBLIC_MIXPANEL_TOKEN: z.string().optional(),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_LOCAL_API_BASE_URL: process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL,
    NEXT_PUBLIC_MIXPANEL_TOKEN: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
  },
})
