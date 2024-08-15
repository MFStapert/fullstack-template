import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const locationTable = pgTable('location', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
});

export const meetTable = pgTable('meet', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  locationId: integer('location_id').references(() => locationTable.id),
});

export const meetsRelations = relations(meetTable, ({ many, one }) => ({
  meetToUsers: many(userToMeetTable),
  location: one(locationTable, {
    fields: [meetTable.locationId],
    references: [locationTable.id],
  }),
}));

export const userTable = pgTable('user', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const usersRelations = relations(userTable, ({ many }) => ({
  userToMeets: many(userToMeetTable),
}));

export const userToMeetTable = pgTable('user_to_meet', {
  userId: integer('user_id')
    .notNull()
    .references(() => userTable.id),
  meetId: integer('meet_id')
    .notNull()
    .references(() => meetTable.id),
});

export const usersToMeetsRelations = relations(userToMeetTable, ({ one }) => ({
  meet: one(meetTable, {
    fields: [userToMeetTable.meetId],
    references: [meetTable.id],
  }),
  user: one(userTable, {
    fields: [userToMeetTable.userId],
    references: [userTable.id],
  }),
}));

export const schema = {
  meetTable,
  meetsRelations,
  locationTable,
  userTable,
  usersRelations,
  userToMeetTable,
  usersToMeetsRelations,
};
