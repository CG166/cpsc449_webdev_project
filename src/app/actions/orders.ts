import { db } from "../db/db";
import { Orders, OrderItems, Products } from "../db/schema";
import { eq, desc } from "drizzle-orm";

export async function getUserOrders(userID: number) {
  return await db
    .select({
      id: Orders.id,
      createdAt: Orders.createdAt,
      firstname: Orders.firstname,
      lastname: Orders.lastname,
      address: Orders.address,
      city: Orders.city,
      country: Orders.country,
      email: Orders.email,
      total: Orders.total,
      products: OrderItems.productId,
      quantity: OrderItems.quantity,
      productName: Products.name,
      productPrice: Products.price
    })
    .from(Orders)
    .leftJoin(OrderItems, eq(OrderItems.orderId, Orders.id))
    .leftJoin(Products, eq(Products.id, OrderItems.productId))
    .where(eq(Orders.userID, userID))
    .orderBy(desc(Orders.id));
}
