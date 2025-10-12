"use client"

import Header from "../../header/page";
import { CATALOG, formatCurrency, useCart } from '../../cart/page';
import CartDrawer from "@/app/cart/cartdrawer";

export default function Mens() {
  const {
      setCartOpen,
      cart, 
      addToCart,
    } = useCart();
    
  const menClothes = CATALOG.filter(p => p.category === "shirts" || p.category === "pants" || p.category === "shoes" || p.category === "other")

  return (
    <div>
        <Header />
        <CartDrawer />
        <main className="min-h-screen p-10">
          <h1 className="text-3xl font-bold mb-15 text-center ">Kids' Clothing</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {menClothes.map(p => (
              <div key={p.id} className="border p-4 rounded-lg bg-white">
                {/* Placeholder image */}
                <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-black-500 text-sm">Image coming soon</span>
                </div>
                <h2 className="font-semibold">{p.name}</h2>
                <p className="text-sm text-gray-500 capitalize">{p.category}</p>
                <p className="font-medium mt-2">{formatCurrency(p.price)}</p>
                <button
                  className="mt-2 px-3 py-1.5 rounded-lg bg-black text-white hover:opacity-90"
                  onClick={() => addToCart(p.id)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Floating Cart Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="fixed bottom-4 right-4 px-4 py-2 rounded-2xl border bg-white/80 backdrop-blur hover:bg-white shadow"
          >
            🛒 Cart ({cart.reduce((n, l) => n + l.quantity, 0)})
          </button> 
        </main>
    </div>
  );
}