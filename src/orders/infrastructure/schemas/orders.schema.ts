import { relations } from 'drizzle-orm';
import {
  index,
  int,
  mysqlTable,
  primaryKey,
  timestamp,
  tinyint,
} from 'drizzle-orm/mysql-core';
import { products, users } from 'src/database/schemas/schemas';

export const orders = mysqlTable(
  'orders',
  {
    id: int().autoincrement().notNull(),
    userId: int('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    isPayment: tinyint('is_payment').notNull(),
    createdAt: timestamp('created_at', { fsp: 3, mode: 'string' }).notNull(),
  },
  (table) => {
    return {
      userId: index('user_id').on(table.userId),
      ordersId: primaryKey({ columns: [table.id], name: 'orders_id' }),
    };
  },
);

export const ordersRelations = relations(orders, ({ one, many }) => ({
  orderProducts: many(ordersProducts),
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
}));

export const ordersProducts = mysqlTable(
  'orders_products',
  {
    id: int().autoincrement().notNull(),
    orderId: int('order_id')
      .notNull()
      .references(() => orders.id),
    productId: int('product_id')
      .notNull()
      .references(() => products.id),
    price: int().notNull(),
    count: int().notNull(),
  },
  (table) => {
    return {
      orderId: index('order_id').on(table.orderId),
      productId: index('product_id').on(table.productId),
      ordersProductsId: primaryKey({
        columns: [table.id],
        name: 'orders_products_id',
      }),
    };
  },
);

export const ordersProductsRelations = relations(ordersProducts, ({ one }) => ({
  order: one(orders, {
    fields: [ordersProducts.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [ordersProducts.productId],
    references: [products.id],
  }),
}));
