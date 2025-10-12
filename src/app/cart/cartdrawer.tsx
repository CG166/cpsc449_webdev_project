"use client";

import { useCart, formatCurrency } from "./page";
import Link from "next/link";

export default function CartDrawer() {
    const {
        cartOpen,
        setCartOpen,
        cart,
        cartWithProducts,
        subtotal,
        TAX_RATE,
        tax,
        total, 
        setQuantity,
        removeFromCart,
        clearCart,
        checkout
    } = useCart();

    return (
        <>
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
        </>
    );
}