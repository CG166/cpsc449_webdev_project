'use server'
import { db } from "../db/db";
import { Orders } from "../db/schema";
import { getUserID } from "../../../lib/cookie";

export async function createOrder(PID: number) {
    const UID = await getUserID();
    if(!UID) {
        console.log("Failed to create order")
        return 
    }
    await db.insert(Orders).values({userId: UID, productId: PID});
}