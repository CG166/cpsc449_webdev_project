"use client";
import { DeliveryAddress } from "../db/schema";
import { useEffect, useState } from "react";
import AddressDisplayCard from "./AddressDisplayCard";

type Address = typeof DeliveryAddress.$inferSelect;

type SelectedCardProps = {
  addresses: Address[];
  onSelect?: (id: number | null) => void;
};

export default function SelectAddress({ addresses, onSelect} : SelectedCardProps) {
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  useEffect(() => {
    onSelect?.(selectedAddress);
  }, [selectedAddress, onSelect]);

  return (
    <>
      {/* Addresses */}
      <div className="m-5">
        {addresses.map((address) => (
          <div
            key={address.id}
            onClick={() => setSelectedAddress(address.id)}
            className={`p-2 rounded-md cursor-pointer transition-all ${selectedAddress === address.id ? "ring-2 ring-blue-500" : "ring-1 ring-gray-300"}`}
          >
            <AddressDisplayCard
            addressLine={address.addressLine}
            country={address.country}
            state={address.state}
            city={address.city}
            zipcode={address.zipcode}
                            
            />
          </div>
        ))}
      </div>
    </>
  );
}
