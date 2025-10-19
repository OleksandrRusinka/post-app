import { config } from 'dotenv'
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres, { Sql } from 'postgres'

import { envServer } from '@/config/env'

config({ path: '.env.local' })

class DrizzleManager {
  private static instance: PostgresJsDatabase
  private static client: Sql

  static getDb(): PostgresJsDatabase {
    if (!DrizzleManager.instance) {
      DrizzleManager.client = postgres(envServer.DATABASE_URL!)
      DrizzleManager.instance = drizzle({ client: DrizzleManager.client })
    }
    return DrizzleManager.instance
  }
}

export const db = DrizzleManager.getDb()
