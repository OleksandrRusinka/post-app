import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres, { Sql } from 'postgres'

import { envServer } from '@/config/env'

import 'server-only'

class DrizzleManager {
  private static instance: PostgresJsDatabase | null = null
  private static client: Sql | null = null

  static getDb(): PostgresJsDatabase {
    if (!DrizzleManager.instance) {
      DrizzleManager.client = postgres(envServer.DATABASE_URL, {
        max: 1,
        prepare: false,
      })
      DrizzleManager.instance = drizzle({ client: DrizzleManager.client })
    }
    return DrizzleManager.instance
  }

  static async disconnect(): Promise<void> {
    if (DrizzleManager.client) {
      try {
        await DrizzleManager.client.end()
      } catch (err) {
        if (envServer.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('Error while disconnecting Drizzle:', err)
        }
      } finally {
        DrizzleManager.client = null
        DrizzleManager.instance = null
      }
    }
  }
}

export const db = DrizzleManager.getDb()
