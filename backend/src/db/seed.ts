import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { posts, schema } from './schema';

export async function seed(db: PostgresJsDatabase<typeof schema>) {
  console.log('Running seed method...');
  await db.delete(posts);
  const data = [
    {
      title: 'Post',
      content: 'lorem ipsum',
      published: true,
    },
    {
      title: 'Paper',
      content: 'solor dolem',
      published: true,
    },
    {
      title: 'Blog',
      content: 'een woord',
      published: true,
    },
  ];
  await db.insert(posts).values(data);
  console.log('Finished running seed method...');
}
