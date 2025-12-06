import { int, mysqlEnum, mysqlTable, varchar, decimal, datetime, json}
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
  quantity: int("quantity").notNull().default(1)
});

export const Orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  userID: int("user_id").notNull(),
  products: json("products").notNull(),
  firstname: varchar("firstname", { length: 100 }).notNull(),
  lastname: varchar("lastname", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  createdAt: datetime("created_at").default(new Date()),
});

export const OrderItems = mysqlTable("order_items", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("order_id").notNull(),
  productId: int("product_id").notNull(),
  quantity: int("quantity").notNull()
});

 export type pCategory = "WOMEN" | "MEN" | "KIDS";
