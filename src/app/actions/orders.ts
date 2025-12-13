'use server'
import { db } from "../db/db";
import { Orders, PaymentMethod, Products } from "../db/schema";
import { getUserID } from "../../../lib/cookie";
import { removeProductFromCart } from "./shoppingCart";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function createOrder(PIDs: number[], PMID: number, DAID: number, ) {
    const UID = await getUserID();
    if(!UID) {
        console.log("Failed to create order")
        return 
    }
    for (const PID of PIDs) {
        await db.insert(Orders).values({userId: UID, productId: PID, paymentMethodId: PMID, DeliveryAddressId: DAID});
        await removeProductFromCart(UID, PID);
    }
    redirect("/thankyoupage");
}

export async function getOrderInfo(OID: number) {
    const orderInfo = await db.select().from(Orders).where(eq(Orders.id, OID)); //Get the order
    const order = orderInfo[0];
    const productId = order.productId;
    const paymentMethodId = order.paymentMethodId;

    const productInfo = await db.select().from(Products).where(eq(Products.id, productId)); //Get product name and price
    const product = productInfo[0];
    const paymentInfo = await db.select().from(PaymentMethod).where(eq(PaymentMethod.id, paymentMethodId));
    const payment = paymentInfo[0];

    return {
    productName: product.name,
    productPrice: product.price,
    cardNumber: payment.cardNumber,
    orderedAt: order.orderedAt,
    imageUrl: product.imageUrl
  };
}

export async function getAllOrderIDs(){
    const UID = await getUserID();
    if(!UID) {
        console.log("Failed to retrieve orders")
        return 
    }
    const orders = await db.select({ id: Orders.id }).from(Orders).where(eq(Orders.userId, UID));
    return orders.map(order => order.id);
};