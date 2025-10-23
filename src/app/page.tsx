"use client";

import Header from '../app/header/page'
import Image from "next/image";
// New Code
import Link from 'next/link';
import { useMemo, useState } from "react";
import Navbar from './components/Navbar'
import SectionBlock from './components/SectionBlock';

// ---------- Minimal Cart Types ----------
type Category = "shirts" | "shoes" | "pants" | "other";
type Product = { id: string; name: string; price: number; category: Category; };
type CartLine = { productId: string; quantity: number; };

// ---------- Tiny Demo Catalog ----------
const CATALOG: Product[] = [
  { id: "s1", name: "Classic Tee",      price: 2200,  category: "shirts" },
  { id: "p1", name: "Slim Chinos",      price: 4600,  category: "pants"  },
  { id: "sh1",name: "Everyday Sneakers",price: 6900,  category: "shoes"  },
  { id: "o1", name: "Crew Socks (3pk)", price: 1400,  category: "other"  },
];

const formatCurrency = (cents: number) =>
  (cents / 100).toLocaleString(undefined, { style: "currency", currency: "USD" });

export default function Home() {
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

  return (
    // Apply the animated background fade here:
    <main className="min-h-screen bg-[#CC5500]">
      <Header />

      {/* Second section: remove bg-black so the fade is visible */}
      <div id="Second section" className="flex items-center justify-center min-h-screen">
        <div className="flex-col"> {/* Word content container */}
          <h1 className="font-mono text-white text-4xl m-2">Welcome to ShopSite</h1><br/>
          <p className="font-mono text-white text-xl m-2">
            Welcome to ShopSite, your one-stop destination for stylish and affordable clothing for men, women, and kids. Whether you are updating your wardrobe or shopping for the whole family, we have something for everyone. Discover the latest trends, everyday essentials, and timeless pieces—all in one place
          </p>

          {/* Quick add examples to show the cart works right away */}
          <div className="mt-4 flex flex-wrap gap-2">
            {CATALOG.map(p => (
              <button
                key={p.id}
                className="px-3 py-1.5 rounded-xl border bg-white/20 text-white hover:bg-white/30"
                onClick={() => addToCart(p.id, 1)}
                title={`Add ${p.name}`}
              >
                Add {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Navbar />

      <div id="third section">
        <SectionBlock title='Shop Mens Clothing' content='Discover timeless style and everyday essentials in our men’s clothing collection. From casual wear to classic pieces, find everything you need to elevate your wardrobe with comfort, quality, and confidence.' href='/clothing/mens'/>
        <SectionBlock title='Shop Womens Clothing' content='Explore our versatile women’s clothing collection designed to fit every occasion. From chic everyday basics to elegant statement pieces, find styles that celebrate your unique look with comfort and confidence.' href='/clothing/womens'/>
        <SectionBlock title='Shop Kids Clothing' content='Shop our fun and durable kids’ clothing collection made for play, comfort, and style. From everyday essentials to colorful favorites, find outfits that keep up with your little ones’ energy and personality.' href='/clothing/kids'/>

        <div className="flex justify-end items-center h-25">
          {/* Contact Us button */}
          <Link href="/contactus">
            <button className='btn'>Contact Us</button>
          </Link>
        </div>
      </div>

      {/* ---------- Floating Cart Button ---------- */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-4 right-4 px-4 py-2 rounded-2xl border bg-white/80 backdrop-blur hover:bg-white shadow"
        aria-label="Open cart"
      >
        🛒 Cart ({cart.reduce((n, l) => n + l.quantity, 0)})
      </button>

      {/* ---------- Cart Drawer ---------- */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-[28rem] bg-white border-l z-30 transform transition-transform ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <button className="p-2 rounded-lg hover:bg-neutral-100" onClick={() => setCartOpen(false)}>
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            {cartWithProducts.length === 0 ? (
              <div className="p-6 text-neutral-500">Your cart is empty.</div>
            ) : (
              <ul className="divide-y">
                {cartWithProducts.map(({ line, product }) => (
                  <li key={line.productId} className="p-4 flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium leading-tight">{product.name}</div>
                          <div className="text-sm text-neutral-500 capitalize">{product.category}</div>
                        </div>
                        <div className="text-sm font-semibold">{formatCurrency(product.price)}</div>
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <label className="text-sm text-neutral-600">Qty</label>
                        <input
                          type="number"
                          min={1}
                          className="w-20 px-2 py-1 border rounded-lg"
                          value={line.quantity}
                          onChange={e => setQuantity(line.productId, Number(e.target.value))}
                        />
                        <button
                          className="ml-auto text-sm px-2 py-1 rounded-lg border hover:bg-neutral-50"
                          onClick={() => removeFromCart(line.productId)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Totals */}
          <div className="border-t p-4 space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between"><span>Tax {(TAX_RATE*100).toFixed(1)}%</span><span>{formatCurrency(tax)}</span></div>
            <div className="flex justify-between font-semibold text-base"><span>Total</span><span>{formatCurrency(total)}</span></div>
            <div className="pt-2 flex gap-2">
              <button className="flex-1 px-3 py-2 rounded-xl border hover:bg-neutral-50" onClick={clearCart}>Clear</button>
              <button
                className="flex-1 px-3 py-2 rounded-xl border bg-black text-white hover:opacity-90"
                disabled={cartWithProducts.length === 0}
                onClick={checkout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {cartOpen && (
        <button
          className="fixed inset-0 bg-black/30 backdrop-blur-[1px] z-20"
          aria-hidden
          onClick={() => setCartOpen(false)}
        />
      )}
    </main>
  );
}
