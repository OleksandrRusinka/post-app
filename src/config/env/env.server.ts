import z from 'zod'

import { createEnv } from '@t3-oss/env-nextjs'

// env server
export const envServer = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']).optional().default('development'),

    SENTRY_DSN: z.string().optional(),
    SENTRY_ENV: z.string().optional(),
    GROWTHBOOK_CLIENT_KEY: z.string().min(1, { message: 'GROWTHBOOK_CLIENT_KEY is required' }),
    GROWTHBOOK_API_HOST: z.string().min(1, { message: 'GROWTHBOOK_API_HOST is required' }),
    SUPABASE_URL: z.string().min(1, { message: 'SUPABASE_URL is required' }),
    SUPABASE_ANON_KEY: z.string().min(1, { message: 'SUPABASE_ANON_KEY is required' }),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    SENTRY_ENV: process.env.NEXT_PUBLIC_SENTRY_ENV,
    GROWTHBOOK_CLIENT_KEY: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    GROWTHBOOK_API_HOST: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
})
