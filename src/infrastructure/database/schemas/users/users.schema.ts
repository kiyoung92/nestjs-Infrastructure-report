import { relations } from 'drizzle-orm';
import {
  index,
  int,
  mysqlTable,
  primaryKey,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { orders } from 'src/infrastructure/database/schemas/schema';

export const users = mysqlTable(
  'users',
  {
    id: int().autoincrement().notNull(),
    name: varchar({ length: 150 }),
    createdAt: timestamp('created_at', { fsp: 3, mode: 'string' }).notNull(),
    updatedAt: timestamp('updated_at', { fsp: 3, mode: 'string' }).notNull(),
    deletedAt: timestamp('deleted_at', { fsp: 3, mode: 'string' }),
  },
  (table) => {
    return {
      usersId: primaryKey({ columns: [table.id], name: 'users_id' }),
    };
  },
);

export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
  points: many(point),
}));

export const point = mysqlTable(
  'point',
  {
    id: int().autoincrement().notNull(),
    userId: int('user_id')
      .notNull()
      .references(() => users.id),
    point: int().notNull(),
    updatedAt: timestamp('updated_at', { fsp: 3, mode: 'string' }).notNull(),
  },
  (table) => {
    return {
      userId: index('user_id').on(table.userId),
      pointId: primaryKey({ columns: [table.id], name: 'point_id' }),
    };
  },
);

export const pointRelations = relations(point, ({ one, many }) => ({
  user: one(users, {
    fields: [point.userId],
    references: [users.id],
  }),
  pointHistories: many(pointHistories),
}));

export const pointHistories = mysqlTable(
  'point_histories',
  {
    id: int().autoincrement().notNull(),
    pointId: int('point_id').notNull(),
    point: int()
      .notNull()
      .references(() => point.id),
    balance: int().notNull(),
    useType: varchar('use_type', { length: 6 }).notNull(),
    createdAt: timestamp('created_at', { fsp: 3, mode: 'string' }).notNull(),
  },
  (table) => {
    return {
      point: index('point').on(table.point),
      pointHistoriesId: primaryKey({
        columns: [table.id],
        name: 'point_histories_id',
      }),
    };
  },
);

export const pointHistoriesRelations = relations(pointHistories, ({ one }) => ({
  point: one(point, {
    fields: [pointHistories.point],
    references: [point.id],
  }),
}));
