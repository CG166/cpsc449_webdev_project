"use client";

import { useMemo, useState } from "react";

// ---------- Minimal Cart Types ----------
export type Category = "shirts" | "shoes" | "pants" | "other";
export type Product = { id: string; name: string; price: number; category: Category; };
export type CartLine = { productId: string; quantity: number; };

export const CATALOG: Product[] = [
  { id: "s1", name: "Classic Tee",      price: 2200,  category: "shirts" },
  { id: "p1", name: "Slim Chinos",      price: 4600,  category: "pants"  },
  { id: "sh1",name: "Everyday Sneakers",price: 6900,  category: "shoes"  },
  { id: "o1", name: "Crew Socks (3pk)", price: 1400,  category: "other"  },
];

export const formatCurrency = (cents: number) =>
  (cents / 100).toLocaleString(undefined, { style: "currency", currency: "USD" });

export function ShoppingCart() {
    // ---------- Cart State ----------
    const [cartOpen, setCartOpen] = useState(false);
    const [cart, setCart] = useState<CartLine[]>([]);
    const productById = useMemo(() => {
        const m = new Map<string, Product>();
        for (const p of CATALOG) m.set(p.id, p);
        return m;
    }, []);

    const cartWithProducts = useMemo(() => {
        return cart
            .map(l => ({ line: l, product: productById.get(l.productId)! }))
            .filter(x => Boolean(x.product));
    }, [cart, productById]);

    const subtotal = cartWithProducts.reduce((sum, x) => sum + x.product.price * x.line.quantity, 0);
    const TAX_RATE = 0.085;
    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + tax;
    // ---------- Cart Ops ----------
    const addToCart = (productId: string, qty = 1) => {
        setCart(prev => {
            const i = prev.findIndex(l => l.productId === productId);
            if (i === -1) return [...prev, { productId, quantity: qty }];
            const next = [...prev];
            next[i] = { ...next[i], quantity: next[i].quantity + qty };
            return next;
        });
        setCartOpen(true);
    };

    const setQuantity = (productId: string, qty: number) => {
        setCart(prev => prev.map(l => l.productId === productId ? { ...l, quantity: Math.max(1, qty) } : l));
    };

    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter(l => l.productId !== productId));
    };

    const clearCart = () => setCart([]);

    const checkout = () => {
        // Placeholder checkout
        alert(`Order placed!\n\n${JSON.stringify({
            lines: cartWithProducts.map(({ line, product }) => ({
                productId: line.productId,
                name: product.name,
                unitPrice: product.price,
                quantity: line.quantity,
                lineTotal: product.price * line.quantity,
            })),
            subtotal, tax, total, placedAt: new Date().toISOString()
        }, null, 2)}`);
        clearCart();
        setCartOpen(false);
    };
    

    return {
        cartOpen,
        setCartOpen,
        cart,
        cartWithProducts,
        subtotal,
        TAX_RATE,
        tax,
        total,
        addToCart,
        setQuantity,
        removeFromCart,
        clearCart,
        checkout
    }
}