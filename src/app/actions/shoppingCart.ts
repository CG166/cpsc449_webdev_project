'use server'
import { db } from "../db/db";
import { ShoppingCart, ShoppingCartItems } from "../db/schema";
import { eq, and } from "drizzle-orm";

export async function addProductToCart(UID: number, PID: number) {
    const cartRow = await db.select().from(ShoppingCart).where(eq(ShoppingCart.userId, UID));

    let cart = cartRow[0];

    if (!cart) {
        await db.insert(ShoppingCart).values({ userId: UID });
        const newCartRow = await db.select().from(ShoppingCart).where(eq(ShoppingCart.userId, UID));
        cart = newCartRow[0];
    }

    const cartID = cart.id;

    //insert product
    const insert = await db.insert(ShoppingCartItems).values({cartId: cartID, productId: PID});
    if(!insert) {
        console.log("Adding Product:", PID, " to User:", UID, " failed!");
    } else {
        console.log("Adding Product:", PID, " to User:", UID, " succedeed!");
    }

}

export async function removeProductFromCart(UID: number, PID: number) {
    const cartRow = await db.select().from(ShoppingCart).where(eq(ShoppingCart.userId, UID));

    const cart = cartRow[0];

    if (!cart) {
        return null;
    }

    const cartID = cart.id;
 
    await db.delete(ShoppingCartItems).where(and(eq(ShoppingCartItems.cartId, cartID),eq(ShoppingCartItems.productId, PID)))
}

export async function getAllProductsByUser(UID: number) {
    const cartRow = await db.select().from(ShoppingCart).where(eq(ShoppingCart.userId, UID));

    const cart = cartRow[0];

    if (!cart) {
        return null;
    }

    const cartID = cart.id;

    const userItemsinShoppingCart = await db.select({ productId: ShoppingCartItems.productId }).from(ShoppingCartItems).where(eq(ShoppingCartItems.cartId, cartID));

    return userItemsinShoppingCart.map(item => item.productId);
}
