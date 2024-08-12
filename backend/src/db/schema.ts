import { boolean, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const posts = pgTable('Post', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content'),
  published: boolean('published').default(false).notNull(),
});

export const schema = {
  posts,
};
