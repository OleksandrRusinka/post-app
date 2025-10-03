import z from 'zod'

import { createEnv } from '@t3-oss/env-nextjs'

// env server
export const envServer = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production', 'test']).optional().default('development'),
    SENTRY_ORG: z.string().optional(),
    SENTRY_PROJECT: z.string().optional(),
    SENTRY_AUTH_TOKEN: z.string().optional(),
    GROWTHBOOK_CLIENT_KEY: z.string().optional(),
    GROWTHBOOK_API_HOST: z.string().url().optional(),
  },
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url().min(1, { message: 'NEXT_PUBLIC_SUPABASE_URL is required' }),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, { message: 'NEXT_PUBLIC_SUPABASE_ANON_KEY is required' }),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    GROWTHBOOK_CLIENT_KEY: process.env.GROWTHBOOK_CLIENT_KEY,
    GROWTHBOOK_API_HOST: process.env.GROWTHBOOK_API_HOST,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
})
