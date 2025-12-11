import { sql } from "drizzle-orm";
import { int, mysqlEnum, mysqlTable, varchar, decimal, datetime}
 from "drizzle-orm/mysql-core";


 //Creating user
 export const User = mysqlTable("users" , {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull(),
    username: varchar("username", { length: 100 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull()
 });

 export const Products = mysqlTable("products", {
   id: int("id").autoincrement().primaryKey(),
   name: varchar("name", { length:100 }).notNull(),
   description: varchar("description", { length:255 }).notNull(),
   stock: int("stock").notNull(),
   price: decimal("price", { precision: 10, scale: 2 }).notNull(),
   category: mysqlEnum("category", ['WOMEN', 'MEN', 'KIDS'] as const)
 });

 export const ShoppingCart = mysqlTable("shopping_cart", {
   id: int("id").autoincrement().primaryKey(),
   userId: int("userid")
    .notNull()
    .references(() => User.id),
 });

 export const ShoppingCartItems = mysqlTable("shoppingcart_item", {
  id: int("id").autoincrement().primaryKey(),
  cartId: int("cart_id")
    .notNull()
    .references(() => ShoppingCart.id),
  productId: int("product_id")
    .notNull()
    .references(() => Products.id),
});

export const PaymentMethod = mysqlTable("payment_method", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userid")
    .notNull()
    .references(() => User.id),
  cardHolderName: varchar("card_holder_name", { length: 100 }).notNull(),
  cardNumber: varchar("card_number", { length: 100 }).notNull(),
  expirDate: varchar("expir_date", { length:100 }).notNull(),
  cvc: varchar("cvc", { length: 100 }).notNull(),
});

export const DeliveryAddress = mysqlTable("delivery_address", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userid")
    .notNull()
    .references(() => User.id),
  addressLine: varchar("address_line", { length: 100 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  zipcode: varchar("zipcode", { length: 100 }).notNull()
});

export const Orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userid")
    .notNull()
    .references(() => User.id),
  productId: int("product_id")
    .notNull()
    .references(() => Products.id),
  paymentMethodId: int("payment_method_id")
    .notNull()
    .references(() => PaymentMethod.id),
  DeliveryAddressId: int("delivery_address_id")
    .notNull()
    .references(() => DeliveryAddress.id),
  orderedAt: datetime("ordered_at").notNull().default(sql`CURRENT_TIMESTAMP`)
});

 export type pCategory = "WOMEN" | "MEN" | "KIDS";
