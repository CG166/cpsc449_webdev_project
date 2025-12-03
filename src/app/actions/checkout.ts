'use server'
import { NextRequest, NextResponse } from "next/server";
import { db } from "../db/db";
import { ShoppingCart, ShoppingCartItems, Orders } from "../db/schema";
import { eq } from "drizzle-orm";

export async function createOrder(userID: number, productIDs: number[], customerInfo: any) {

  await db.insert(Orders).values({
    userId: userID,
    products: JSON.stringify(productIDs),
    firstname: customerInfo.firstname,
    lastname: customerInfo.lastname,
    email: customerInfo.email,
    address: customerInfo.address,
    city: customerInfo.city,
    country: customerInfo.country,
  });

  const cart = await db.select().from(ShoppingCart).where(eq(ShoppingCart.userId, userID));

  if (cart.length > 0) {
    await db.delete(ShoppingCartItems).where(eq(ShoppingCartItems.cartId, cart[0].id));
    await db.delete(ShoppingCart).where(eq(ShoppingCart.id, cart[0].id));
  }
}
