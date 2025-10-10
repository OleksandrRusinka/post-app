import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

import { envServer } from './src/config/env'

config({ path: '.env.local' })

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: envServer.DATABASE_URL!,
  },
})
