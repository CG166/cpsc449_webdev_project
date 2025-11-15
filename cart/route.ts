// src/app/api/cart/route.ts
import { NextRequest } from "next/server";

type CartLine = { productId: string; quantity: number };

// Very simple in-memory store keyed by a cartId cookie.
// This resets whenever the server restarts (good enough for a class project).
const carts = new Map<string, CartLine[]>();

function getOrCreateCartId(req: NextRequest): { cartId: string; isNew: boolean } {
  const existing = req.cookies.get("cartId")?.value;
  if (existing) return { cartId: existing, isNew: false };
  return { cartId: crypto.randomUUID(), isNew: true };
}

function jsonWithCartCookie(req: NextRequest, body: unknown): Response {
  const { cartId, isNew } = getOrCreateCartId(req);
  const res = Response.json(body);

  if (isNew) {
    // 30 days
    res.headers.append(
      "Set-Cookie",
      `cartId=${cartId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`
    );
  }
  return res;
}

// GET /api/cart → current cart for this browser
export async function GET(req: NextRequest) {
  const { cartId } = getOrCreateCartId(req);
  const cart = carts.get(cartId) ?? [];
  return jsonWithCartCookie(req, { cart });
}

// PUT /api/cart → replace entire cart
export async function PUT(req: NextRequest) {
  const { cartId } = getOrCreateCartId(req);
  const body = (await req.json().catch(() => null)) as { cart?: CartLine[] } | null;

  const nextCart = Array.isArray(body?.cart)
    ? body!.cart.filter(
        (item) =>
          typeof item.productId === "string" &&
          typeof item.quantity === "number" &&
          item.quantity > 0
      )
    : [];

  carts.set(cartId, nextCart);
  return jsonWithCartCookie(req, { cart: nextCart });
}

// DELETE /api/cart → clear cart
export async function DELETE(req: NextRequest) {
  const { cartId } = getOrCreateCartId(req);
  carts.delete(cartId);
  return jsonWithCartCookie(req, { cart: [] });
}
