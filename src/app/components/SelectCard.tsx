"use client";
import { PaymentMethod } from "../db/schema";
import { useEffect, useState } from "react";
import CardDisplayCard from "./CardDisplayCard";

type PaymentMethod = typeof PaymentMethod.$inferSelect;

type SelectCardProps = {
  cards: PaymentMethod[];
  onSelect?: (id: number | null) => void;
};

export default function SelectCard({ cards, onSelect} : SelectCardProps) {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  useEffect(() => {
    onSelect?.(selectedCard);
  }, [selectedCard, onSelect]);

  return (
    <>
      {/* Addresses */}
      <div className="m-5">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => setSelectedCard(card.id)}
            className={`p-2 rounded-md cursor-pointer transition-all ${selectedCard === card.id ? "ring-2 ring-blue-500" : "ring-1 ring-gray-300"}`}
          >
            <CardDisplayCard
                cardHolderName={card.cardHolderName}
                cardNumber={card.cardNumber}
            />
          </div>
        ))}
      </div>
    </>
  );
}
