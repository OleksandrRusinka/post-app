import { z } from 'zod'

import { createEnv } from '@t3-oss/env-nextjs'

// env client
export const envClient = createEnv({
  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().url().min(1, { message: 'NEXT_PUBLIC_API_BASE_URL is required' }),
    NEXT_PUBLIC_APP_NAME: z.string().min(1, { message: 'NEXT_PUBLIC_APP_NAME is required' }),
    NEXT_PUBLIC_APP_URL: z.string().url().min(1, { message: 'NEXT_PUBLIC_APP_URL is required' }),
    NEXT_PUBLIC_SENTRY_ENV: z.string().min(1).optional(),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SENTRY_ENV: process.env.NEXT_PUBLIC_SENTRY_ENV,
  },
})
