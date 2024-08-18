import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text, timestamp, unique } from 'drizzle-orm/pg-core';

export const locationTable = pgTable('location', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
});

export const userTable = pgTable('user', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const meetTable = pgTable('meet', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  createdBy: integer('created_by')
    .notNull()
    .references(() => userTable.id),
  time: timestamp('time').notNull(),
  finalized: boolean('finalized').notNull(),
  locationId: integer('location_id').references(() => locationTable.id),
});

export const voteTable = pgTable(
  'vote',
  {
    id: serial('id').primaryKey(),
    createdBy: integer('created_by')
      .notNull()
      .references(() => userTable.id),
    locationId: integer('location_id')
      .notNull()
      .references(() => locationTable.id),
    meetId: integer('meet_id')
      .notNull()
      .references(() => meetTable.id),
  },
  table => {
    return {
      unique: unique().on(table.createdBy, table.locationId, table.meetId),
    };
  },
);

export const userToMeetTable = pgTable('user_to_meet', {
  userId: integer('user_id')
    .notNull()
    .references(() => userTable.id),
  meetId: integer('meet_id')
    .notNull()
    .references(() => meetTable.id),
});

export const meetsRelations = relations(meetTable, ({ many, one }) => ({
  meetToUsers: many(userToMeetTable),
  location: one(locationTable, {
    fields: [meetTable.locationId],
    references: [locationTable.id],
  }),
  createdBy: one(userTable, {
    fields: [meetTable.createdBy],
    references: [userTable.id],
  }),
}));

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
  userToMeetTable,
  usersToMeetsRelations,
};
