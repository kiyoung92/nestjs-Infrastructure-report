import { relations } from 'drizzle-orm';
import {
  index,
  int,
  mysqlTable,
  primaryKey,
  timestamp,
  tinyint,
} from 'drizzle-orm/mysql-core';
import { products, users } from 'src/infrastructure/database/schemas/schema';

export const orderProducts = mysqlTable(
  'order_products',
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
      orderProductsId: primaryKey({
        columns: [table.id],
        name: 'order_products_id',
      }),
    };
  },
);

export const orderProductsRelations = relations(orderProducts, ({ one }) => ({
  order: one(orders, {
    fields: [orderProducts.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderProducts.productId],
    references: [products.id],
  }),
}));

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
  orderProducts: many(orderProducts),
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
}));
