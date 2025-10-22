import { defineConfig } from 'drizzle-kit'

import { envServer } from './src/config/env'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: envServer.DATABASE_URL,
  },
})
