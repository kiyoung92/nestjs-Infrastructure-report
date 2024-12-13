import { relations } from 'drizzle-orm';
import {
  index,
  int,
  mysqlTable,
  primaryKey,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { users } from 'src/database/schemas/schemas';

export const points = mysqlTable(
  'points',
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
      pointsId: primaryKey({ columns: [table.id], name: 'points_id' }),
    };
  },
);

export const pointsRelations = relations(points, ({ one, many }) => ({
  pointHistories: many(pointHistories),
  user: one(users, {
    fields: [points.userId],
    references: [users.id],
  }),
}));

export const pointHistories = mysqlTable(
  'point_histories',
  {
    id: int().autoincrement().notNull(),
    pointId: int('point_id')
      .notNull()
      .references(() => points.id),
    point: int().notNull(),
    balance: int().notNull(),
    useType: varchar('use_type', { length: 6 }).notNull(),
    createdAt: timestamp('created_at', { fsp: 3, mode: 'string' }).notNull(),
  },
  (table) => {
    return {
      pointId: index('point_id').on(table.pointId),
      pointHistoriesId: primaryKey({
        columns: [table.id],
        name: 'point_histories_id',
      }),
    };
  },
);

export const pointHistoriesRelations = relations(pointHistories, ({ one }) => ({
  point: one(points, {
    fields: [pointHistories.pointId],
    references: [points.id],
  }),
}));
