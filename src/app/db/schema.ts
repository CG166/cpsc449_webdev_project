import { int, mysqlEnum, mysqlTable, varchar, decimal}
 from "drizzle-orm/mysql-core";

 //Definitions
 export const categoryEnum = mysqlEnum("category", ['women', 'men', 'kid']);

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
   category: categoryEnum.notNull()
 });
