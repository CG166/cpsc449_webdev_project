"use client";

import { useState } from "react";
import SelectAddress from "../components/SelectAddress";
import SelectCard from "../components/SelectCard";
import { DeliveryAddress, PaymentMethod } from "../db/schema";
import ProductDisplayCard from "./ProductDisplayCard";
import { createOrder } from "../actions/orders";

type Address = typeof DeliveryAddress.$inferSelect;
type PaymentMethod = typeof PaymentMethod.$inferSelect;

type SelectedCardProps = {
  addresses: Address[];
  cards: PaymentMethod[];
  productIDs: number[];
};


export default function CheckoutClient({ addresses, cards, productIDs} : SelectedCardProps) {
  const [addressId, setAddressId] = useState<number | null>(null);
  const [cardId, setCardId] = useState<number | null>(null);

  return (
    <div>
      <h2 className="text-xl text-black">Delivering to</h2>
      <SelectAddress addresses={addresses} onSelect={setAddressId} />

      <h2 className="text-xl text-black">Payment Method</h2>
      <SelectCard cards={cards} onSelect={setCardId} />

      <h2 className="text-xl text-black">Ordering Items</h2>
            {productIDs.map((id) => (
                    <ProductDisplayCard key={id} productID={id}/>
            ))}       

      <button
        className="btn"
        onClick={() => {
          if (!addressId || !cardId) {
            alert("Please select a delivery address and payment method!");
            return;
          }
          createOrder(productIDs, cardId, addressId)
        }}
      >
        Place Order
      </button>
    </div>
  );
}
