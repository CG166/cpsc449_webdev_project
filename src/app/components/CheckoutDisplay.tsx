"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SelectAddress from "../components/SelectAddress";
import SelectCard from "../components/SelectCard";
import { DeliveryAddress, PaymentMethod } from "../db/schema";
import ProductDisplayCard from "./ProductDisplayCard";
import { createOrder } from "../actions/orders";

type Address = typeof DeliveryAddress.$inferSelect;
type PaymentMethod = typeof PaymentMethod.$inferSelect;

type CheckoutClientProps = {
  addresses: Address[];
  cards: PaymentMethod[];
  productIDs: number[];
};

export default function CheckoutClient({ addresses, cards, productIDs }: CheckoutClientProps) {
  const [addressId, setAddressId] = useState<number | null>(null);
  const [cardId, setCardId] = useState<number | null>(null);
  const router = useRouter();

  return (
    <div className="w-full min-h-screen p-6 flex flex-col">
        <div className="flex items-center justify-center relative mb-10 h-12">
        <Link href="/shoppingcart" className="absolute top-4 left-4 text-orange-500 text-3xl font-bold hover:text-gray-700 transition">
          ← Back to Cart
        </Link>
        <h1 className="text-4xl font-bold mt-30 text-orange-500">Shopping Cart</h1>
        <div className="w-6"></div>
      </div>

      <div className="flex gap-6 w-full max-w-5xl mt-10">
        <div className="basis-3/4 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Delivering to</h2>
          <SelectAddress addresses={addresses} onSelect={setAddressId} />

          <h2 className="text-xl font-semibold mt-6 mb-4">Payment Method</h2>
          <SelectCard cards={cards} onSelect={setCardId} />
        </div>

        <div className="basis-1/4 bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4">
          <h2 className="text-xl font-semibold mb-4">Ordering Items</h2>
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[70vh]">
            {productIDs.map((id, index) => (
              <ProductDisplayCard key={`${id}-${index}`} productID={id} compact />
            ))}
          </div>

          <button
            className="btn mt-4 self-start"
            onClick={async () => {
              if (!addressId || !cardId) {
                alert("Please select a delivery address and payment method!");
                return;
              }
              await createOrder(productIDs, cardId, addressId);
              router.push("/thankyoupage");
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
