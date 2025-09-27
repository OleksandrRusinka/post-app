import { z } from 'zod'

import { createEnv } from '@t3-oss/env-nextjs'

// env client
export const envClient = createEnv({
  client: {
    // API Configuration
    NEXT_PUBLIC_API_BASE_URL: z.string().url().min(1, { message: 'NEXT_PUBLIC_API_BASE_URL is required' }),

    // App Configuration
    NEXT_PUBLIC_APP_NAME: z.string().min(1, { message: 'NEXT_PUBLIC_APP_NAME is required' }),
    NEXT_PUBLIC_APP_URL: z.string().url().min(1, { message: 'NEXT_PUBLIC_APP_URL is required' }),

    // Analytics
    NEXT_PUBLIC_MIXPANEL_TOKEN: z.string().optional(),
    NEXT_PUBLIC_GROWTHBOOK_API_HOST: z.string().url().optional(),
    NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY: z.string().optional(),

    // Feature Flags
    NEXT_PUBLIC_ENABLE_ANALYTICS: z.enum(['true', 'false']).default('false'),
    NEXT_PUBLIC_ENABLE_DEV_TOOLS: z.enum(['true', 'false']).default('false'),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    // API Configuration
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,

    // App Configuration
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,

    // Analytics
    NEXT_PUBLIC_MIXPANEL_TOKEN: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
    NEXT_PUBLIC_GROWTHBOOK_API_HOST: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,

    // Feature Flags
    NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS,
    NEXT_PUBLIC_ENABLE_DEV_TOOLS: process.env.NEXT_PUBLIC_ENABLE_DEV_TOOLS,
  },
})
