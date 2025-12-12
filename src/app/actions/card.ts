'use server'
import { db } from "../db/db";
import { PaymentMethod } from "../db/schema";
import { getUserID } from "../../../lib/cookie";
import { eq } from "drizzle-orm";


export async function addCard(CardHolderName: string, CardNumber: string, ExpirDate: string, Cvc: string) {
    const UID = await getUserID();
    if(!UID) {
        console.log("Failed to add new payment method")
        return 
    }
    await db.insert(PaymentMethod).values({userId: UID, cardHolderName: CardHolderName, cardNumber: CardNumber, expirDate: ExpirDate, cvc: Cvc});
}

export async function getAllCardsByUser(id: number) {
    const cards = await db.select().from(PaymentMethod).where(eq(PaymentMethod.userId, id))
    return cards
}



