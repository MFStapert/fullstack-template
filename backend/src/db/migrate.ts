import { schema } from '@db/schema';
import { seed } from '@db/seed';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import process from 'node:process';
import postgres from 'postgres';

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
