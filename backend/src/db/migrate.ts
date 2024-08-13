import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import process from 'node:process';
import postgres from 'postgres';
import { posts, schema } from './schema';

export async function runMigrations() {
  console.log('Running migrations...');
  const sql = postgres(process.env.DATABASE_URL, { max: 1 });
  const db = drizzle<typeof schema>(sql);
  await migrate(db, { migrationsFolder: './migrations' });
  if (process.env.NODE_ENV !== 'PRODUCTION') {
    await seed(db);
  }
  await sql.end();
  console.log('Finished running migrations...');
}

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
