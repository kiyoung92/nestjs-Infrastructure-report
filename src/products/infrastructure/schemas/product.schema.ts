import { relations } from 'drizzle-orm';
import {
  index,
  int,
  mysqlTable,
  primaryKey,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { ordersProducts, stores } from 'src/database/schemas/schemas';

export const products = mysqlTable(
  'products',
  {
    id: int().autoincrement().notNull(),
    storeId: int('store_id')
      .notNull()
      .references(() => stores.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    name: varchar({ length: 200 }).notNull(),
    price: int().notNull(),
    salesVolume: int('sales_volume').notNull(),
    createdAt: timestamp('created_at', { fsp: 3, mode: 'string' }).notNull(),
    updatedAt: timestamp('updated_at', { fsp: 3, mode: 'string' }).notNull(),
    deletedAt: timestamp('deleted_at', { fsp: 3, mode: 'string' }),
  },
  (table) => {
    return {
      storeId: index('store_id').on(table.storeId),
      productsId: primaryKey({ columns: [table.id], name: 'products_id' }),
    };
  },
);

export const productsRelations = relations(products, ({ one, many }) => ({
  orderProducts: many(ordersProducts),
  store: one(stores, {
    fields: [products.storeId],
    references: [stores.id],
  }),
  stocks: many(stock),
}));

export const stock = mysqlTable(
  'stock',
  {
    id: int().autoincrement().notNull(),
    productId: int('product_id')
      .notNull()
      .references(() => products.id),
    stock: int().notNull(),
    updatedAt: timestamp('updated_at', { fsp: 3, mode: 'string' }).notNull(),
  },
  (table) => {
    return {
      productId: index('product_id').on(table.productId),
      stockId: primaryKey({ columns: [table.id], name: 'stock_id' }),
    };
  },
);

export const stockRelations = relations(stock, ({ one }) => ({
  product: one(products, {
    fields: [stock.productId],
    references: [products.id],
  }),
}));
