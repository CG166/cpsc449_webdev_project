'use server';
import { db } from "../db/db";
import { ShoppingCart, ShoppingCartItems, Orders, Products } from "../db/schema";
import { eq, inArray } from "drizzle-orm";

export async function createOrder(userID: number, customerInfo: any) {
  const cart = await db.select().from(ShoppingCart).where(eq(ShoppingCart.userId, userID));

  if (!cart.length) {
    throw new Error("Shopping cart is empty");
  }

  const cartId = cart[0].id;

  const cartItems = await db
    .select()
    .from(ShoppingCartItems)
    .where(eq(ShoppingCartItems.cartId, cartId));

  if (!cartItems.length) {
    throw new Error("No items in the shopping cart");
  }

  const productIds = cartItems.map(item => item.productId);
  const products = await db
    .select()
    .from(Products)
    .where(inArray(Products.id, productIds));
  const orderProducts = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      id: item.productId,
      name: product?.name ?? "Unknown",
      price: Number(product?.price ?? 0),
      quantity: item.quantity,
    };
  });

  const total = orderProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

  await db.insert(Orders).values({
    userID: userID,
    products: JSON.stringify(orderProducts),
    firstname: customerInfo.firstname,
    lastname: customerInfo.lastname,
    email: customerInfo.email,
    address: customerInfo.address,
    city: customerInfo.city,
    country: customerInfo.country,
    total: total.toFixed(2),
    createdAt: new Date(),
  });

  await db.delete(ShoppingCartItems).where(eq(ShoppingCartItems.cartId, cartId));
  await db.delete(ShoppingCart).where(eq(ShoppingCart.id, cartId));

  return { total, items: orderProducts };
}
