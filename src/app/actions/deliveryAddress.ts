'use server'
import { db } from "../db/db";
import { DeliveryAddress, Orders } from "../db/schema";
import { getUserID } from "../../../lib/cookie";
import { eq } from "drizzle-orm";


export async function addAddress(Addressline: string, Country: string, State: string, City: string, Zipcode: string) {
    const UID = await getUserID();
    if(!UID) {
        console.log("Failed to add new address")
        return 
    }
    console.log({ UID, Addressline, Country, State, City, Zipcode });
    await db.insert(DeliveryAddress).values({userId: UID, addressLine: Addressline, country: Country, state: State , city: City, zipcode: Zipcode});
}

export async function getAllAddressesByUser(id: number) {
    const addresses = await db.select().from(DeliveryAddress).where(eq(DeliveryAddress.userId, id))
    return addresses
}

export async function deleteAddress(id: number) {
  try {
    await db.delete(DeliveryAddress).where(eq(DeliveryAddress.id, id));
    return true;
  } catch (error) {
    console.error("Error deleting address:", error);
    throw error;
  }
}


