'use server';

import { db } from "../db/db";
import { Products, pCategory } from "../db/schema";
import { eq } from "drizzle-orm";
//import { revalidatePath } from "next/cache";

export async function getProductsByCategory(category: pCategory) {
    return await db
        .select()
        .from(Products)
        .where(eq(Products.category, category))
}

export async function getProductInfo(id: number) {
    const products = await db.select().from(Products).where(eq(Products.id, id))
    return products[0]
}