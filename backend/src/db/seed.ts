import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import type { Sql } from 'postgres';
import { locationTable, meetTable, schema, userTable, userToMeetTable } from './schema';

export async function seed(db: PostgresJsDatabase<typeof schema>, sql: Sql) {
  console.log('Running seed method...');
  await db.delete(userToMeetTable);
  await db.delete(meetTable);
  await db.delete(locationTable);
  await db.delete(userTable);

  await seedLocations(db, sql);
  await seedUsers(db, sql);
  await seedMeets(db, sql);

  console.log('Finished running seed method...');
}

export async function seedLocations(db: PostgresJsDatabase<typeof schema>, sql: Sql) {
  const locations = [
    {
      id: 1,
      title: 'Ijssel',
    },
  ];
  const result = await db.insert(locationTable).values(locations).returning();

  await sql`SELECT setval(
    pg_get_serial_sequence('location', 'id'),
    (SELECT COALESCE(MAX(id) + 1, 1) FROM "location"),
    false
  );`;
  return result;
}

export async function seedUsers(db: PostgresJsDatabase<typeof schema>, sql: Sql) {
  const users = [
    {
      id: 1,
      name: 'Marijn',
    },
    {
      id: 2,
      name: 'Yorick',
    },
  ];
  const result = await db.insert(userTable).values(users).returning();

  await sql`SELECT setval(
    pg_get_serial_sequence('user', 'id'),
    (SELECT COALESCE(MAX(id) + 1, 1) FROM "user"),
    false
  );`;
  return result;
}

export async function seedMeets(db: PostgresJsDatabase<typeof schema>, sql: Sql) {
  const meets = [
    {
      id: 1,
      title: 'seed meet',
      createdBy: 1,
      time: new Date(),
    },
  ];
  const result = await db.insert(meetTable).values(meets).returning();
  await db
    .insert(userToMeetTable)
    .values({
      userId: 1,
      meetId: 1,
    })
    .returning();

  await sql`SELECT setval(
    pg_get_serial_sequence('meet', 'id'),
    (SELECT COALESCE(MAX(id) + 1, 1) FROM "meet"),
    false
  );`;
  return result;
}
