import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  title: text('title').notNull(),
  body: text('body').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
})
