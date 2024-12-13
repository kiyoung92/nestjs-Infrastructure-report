import { relations } from 'drizzle-orm';
import {
  int,
  mysqlTable,
  primaryKey,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/mysql-core';
import { products } from 'src/database/schemas/schemas';

export const stores = mysqlTable(
  'stores',
  {
    id: int().autoincrement().notNull(),
    name: varchar({ length: 50 }).notNull(),
    createdAt: timestamp('created_at', { fsp: 3, mode: 'string' }).notNull(),
    updatedAt: timestamp('updated_at', { fsp: 3, mode: 'string' }).notNull(),
    deletedAt: timestamp('deleted_at', { fsp: 3, mode: 'string' }),
  },
  (table) => {
    return {
      storesId: primaryKey({ columns: [table.id], name: 'stores_id' }),
      name: unique('name').on(table.name),
    };
  },
);

export const storesRelations = relations(stores, ({ many }) => ({
  products: many(products),
}));
