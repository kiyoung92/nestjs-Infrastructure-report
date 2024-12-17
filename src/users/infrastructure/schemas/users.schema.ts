import { relations } from 'drizzle-orm';
import {
  int,
  mysqlTable,
  primaryKey,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { orders, points } from 'src/database/schemas/schemas';

export const users = mysqlTable(
  'users',
  {
    id: int().autoincrement().notNull(),
    name: varchar({ length: 150 }).notNull(),
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
  points: many(points),
}));
