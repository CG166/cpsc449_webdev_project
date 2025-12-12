"use client";

import Link from "next/link";
import AddCard from "./AddCard";
import AddressDisplayCard from "./AddressDisplayCard";
import CardDisplayCard from "./CardDisplayCard";
import { useState } from "react";

interface Address {
  id: number;
  addressLine: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
}

interface Card {
  id: number;
  cardHolderName: string;
  cardNumber: string;
  expirDate: string;
}

interface User {
  name: string;
  email: string;
  username: string;
}

interface ProfileTabsProps {
  user: User;
  addresses: Address[];
  cards: Card[];
}

export default function ProfileTabs({ user, addresses, cards }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="flex p-6 gap-6">
      <div className="flex flex-col gap-2 border-r pr-4">
        <button
          className={`px-4 py-2 text-left ${
            activeTab === "account" ? "border-l-4 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab("account")}
        >
          User Info
        </button>

        <button
          className={`px-4 py-2 text-left ${
            activeTab === "addresses" ? "border-l-4 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab("addresses")}
        >
          Delivery Addresses
        </button>

        <button
          className={`px-4 py-2 text-left ${
            activeTab === "cards" ? "border-l-4 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab("cards")}
        >
          Payment Methods
        </button>
      </div>

      <div className="flex-1">
        {activeTab === "account" && (
          <div className="bg-white shadow rounded p-8 w-full max-w-3xl mx-auto mb-6">
            <h1 className="text-4xl mb-6 font-bold text-center">User Account Info</h1>

            <div className="py-2 border-b flex justify-between">
              <span className="font-semibold">Name:</span>
              <span>{user.name}</span>
            </div>

            <div className="py-2 border-b flex justify-between">
              <span className="font-semibold">Email:</span>
              <span>{user.email}</span>
            </div>

            <div className="py-2 flex justify-between">
              <span className="font-semibold">Username:</span>
              <span>{user.username}</span>
            </div>

            <div className="flex justify-center mt-6">
              <Link href="/updateprofile" className="btn">
                Edit
              </Link>
            </div>
          </div>
        )}

        {activeTab === "addresses" && (
          <div className="bg-white shadow rounded p-8 w-full max-w-3xl mx-auto mb-6">
            <h1 className="text-4xl mb-6 font-bold text-center">Delivery Addresses</h1>

            {addresses.length === 0 ? (
              <p>No saved addresses.</p>
            ) : (
              <div className="space-y-0">
                {addresses.map((address, index) => (
                  <div
                    key={address.id}
                    className={`py-4 ${index < addresses.length - 1 ? "border-b" : ""}`}
                  >
                    <AddressDisplayCard {...address} />
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center mt-6">
              <Link href="/updateaddresses" className="btn">
                Edit
              </Link>
            </div>
          </div>
        )}

        {activeTab === "cards" && (
          <div className="bg-white shadow rounded p-8 w-full max-w-3xl mx-auto">
            <h1 className="text-4xl mb-6 font-bold text-center">Payment Methods</h1>
            {cards.length === 0 ? (
              <p>No saved cards.</p>
            ) : (
              <div className="space-y-4">
                {cards.map((card) => (
                  <CardDisplayCard key={card.id} {...card} />
                ))}
              </div>
            )}
            <div className="flex justify-center mt-6">
              <Link href="/updatecard" className="btn">
                Edit
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
