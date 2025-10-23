import { NextResponse } from "next/server";
import { db } from "../../db/db";
import { Products } from "../../db/schema";
import { eq } from 'drizzle-orm';



export async function GET() {
  try {
    const allProducts = await db.select().from(Products);
    return NextResponse.json(allProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

/*
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    //Filtering if method or else fetch all

    const allProducts = await db.select().from(Products);
    return NextResponse.json(allProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
*/