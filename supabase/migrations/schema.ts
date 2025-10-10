import { sql } from 'drizzle-orm'
import { pgPolicy, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const posts = pgTable(
  'posts',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
    title: text().notNull(),
    body: text().notNull(),
  },
  (table) => [
    pgPolicy('UPDATE', { as: 'permissive', for: 'update', to: ['public'], using: sql`true` }),
    pgPolicy('READ', { as: 'permissive', for: 'select', to: ['public'] }),
    pgPolicy('INSERT', { as: 'permissive', for: 'insert', to: ['public'] }),
    pgPolicy('DELETE', { as: 'permissive', for: 'delete', to: ['public'] }),
  ],
)
