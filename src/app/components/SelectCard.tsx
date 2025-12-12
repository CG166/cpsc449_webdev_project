"use client";
import { PaymentMethod } from "../db/schema";
import { useEffect, useState } from "react";

type Card = typeof PaymentMethod.$inferSelect;

type SelectCardProps = {
  cards: Card[];
  onSelect?: (id: number | null) => void;
};

export default function SelectCard({ cards, onSelect }: SelectCardProps) {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  useEffect(() => {
    onSelect?.(selectedCard);
  }, [selectedCard, onSelect]);

  return (
    <div className="m-5 bg-white p-4 rounded-md shadow">
      <select
        className="border rounded-md p-2 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedCard ?? ""}
        onChange={(e) => setSelectedCard(Number(e.target.value))}
      >
        <option value="" disabled>
          Select a card
        </option>
        {cards.map((card) => (
          <option key={card.id} value={card.id}>
            {`${card.cardHolderName} **** ${card.cardNumber.slice(-4)}`}
          </option>
        ))}
      </select>
    </div>
  );
}
