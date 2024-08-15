import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { locationTable, meetTable, schema, userTable, userToMeetTable } from './schema';

export async function seed(db: PostgresJsDatabase<typeof schema>) {
  console.log('Running seed method...');
  await db.delete(userToMeetTable);
  await db.delete(meetTable);
  await db.delete(locationTable);
  await db.delete(userTable);

  await seedLocations(db);
  await seedUsers(db);

  console.log('Finished running seed method...');
}

export async function seedLocations(db: PostgresJsDatabase<typeof schema>) {
  const locations = [
    {
      title: 'Ijssel',
    },
  ];
  return db.insert(locationTable).values(locations).returning();
}

export async function seedUsers(db: PostgresJsDatabase<typeof schema>) {
  const users = [
    {
      name: 'Marijn',
    },
    {
      name: 'Yorick',
    },
  ];
  return db.insert(userTable).values(users).returning();
}
