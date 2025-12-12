"use client";
import { DeliveryAddress } from "../db/schema";
import { useEffect, useState } from "react";

type Address = typeof DeliveryAddress.$inferSelect;

type SelectAddressProps = {
  addresses: Address[];
  onSelect?: (id: number | null) => void;
};

export default function SelectAddress({ addresses, onSelect }: SelectAddressProps) {
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  useEffect(() => {
    onSelect?.(selectedAddress);
  }, [selectedAddress, onSelect]);

  return (
    <div className="m-5 bg-white p-4 rounded-md shadow">
      <select
        className="border rounded-md p-2 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedAddress ?? ""}
        onChange={(e) => setSelectedAddress(Number(e.target.value))}
      >
        <option value="" disabled>
          Select an address
        </option>
        {addresses.map((address) => (
          <option key={address.id} value={address.id}>
            {`${address.addressLine}, ${address.city}, ${address.state}, ${address.zipcode}, ${address.country}`}
          </option>
        ))}
      </select>
    </div>
  );
}
