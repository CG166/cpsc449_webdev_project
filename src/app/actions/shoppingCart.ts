'use server'
import { db } from "../db/db";
import { ShoppingCart, ShoppingCartItems, Products } from "../db/schema";
import { eq, and } from "drizzle-orm";

export async function addProductToCart(UID: number, PID: number, qty: number) {
    let cartRow = await db.select().from(ShoppingCart).where(eq(ShoppingCart.userId, UID));
    let cart = cartRow[0];

    if (!cart) {
        await db.insert(ShoppingCart).values({ userId: UID });
        cartRow = await db.select().from(ShoppingCart).where(eq(ShoppingCart.userId, UID));
        cart = cartRow[0];
    }

    const cartID = cart.id;

    const existingItem = await db.select().from(ShoppingCartItems)
        .where(and(eq(ShoppingCartItems.cartId, cartID), eq(ShoppingCartItems.productId, PID)));
    
    if (existingItem.length > 0) {
        const currentQty = existingItem[0].quantity;
        await db.update(ShoppingCartItems)
            .set({ quantity: currentQty + qty })
            .where(eq(ShoppingCartItems.id, existingItem[0].id));
        console.log(`Increased quantity of Product ${PID} for User ${UID} to ${currentQty + qty}`);
    } else {
        await db.insert(ShoppingCartItems).values({ cartId: cartID, productId: PID, quantity: qty });
        console.log(`Added Product ${PID} to User ${UID} cart with quantity ${qty}`);
    }
}

export async function getCartProduct(userId: number, productId: number) {
  const cart = await db.select().from(ShoppingCart).where(eq(ShoppingCart.userId, userId)).limit(1);
  if (!cart[0]) return null;

  const cartItem = await db
    .select({ quantity: ShoppingCartItems.quantity })
    .from(ShoppingCartItems)
    .where(
      and(
        eq(ShoppingCartItems.cartId, cart[0].id),
        eq(ShoppingCartItems.productId, productId)
      )
    )
    .limit(1);

  return cartItem[0] || { quantity: 1 };
}

export async function getAllProductsByUserWithQty(UID: number) {
  const cartRow = await db.select().from(ShoppingCart).where(eq(ShoppingCart.userId, UID));
  const cart = cartRow[0];
  if (!cart) return null;

  const items = await db.select({
    productId: ShoppingCartItems.productId,
    quantity: ShoppingCartItems.quantity
  })
  .from(ShoppingCartItems)
  .where(eq(ShoppingCartItems.cartId, cart.id));

  const detailedItems = await Promise.all(items.map(async (item) => {
    const product = await db.select().from(Products).where(eq(Products.id, item.productId));
    const prod = product[0];
    return {
      id: prod.id,
      name: prod.name,
      description: prod.description,
      stock: prod.stock,
      price: Number(prod.price),
      category: prod.category,
      imageUrl: prod.imageUrl,
      quantity: item.quantity
    };
  }));

  return detailedItems;
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
