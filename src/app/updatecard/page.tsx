'use client'
import Link from "next/link";
import { useState } from 'react';
import { addCard } from '../actions/card';

export default function AddCard() {
  const [data, setData] = useState({ cardHolderName: '', cardNumber: '', expirDate: '', cvc: '' });
  
  const updateField = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const reset = () => {
    setData({ cardHolderName: '', cardNumber: '', expirDate: '', cvc: '' });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const cardNumberOnlyDigits = data.cardNumber.replace(/\D/g, "");
    const cvcOnlyDigits = data.cvc.replace(/\D/g, "");
    if (
      !data.cardHolderName.trim() ||
      cardNumberOnlyDigits.length !== 16 ||
      data.expirDate.trim().length !== 5 ||
      (cvcOnlyDigits.length !== 3 && cvcOnlyDigits.length !== 4)) 
      {
      alert("Please enter valid card details: 16-digit card number, MM/YY expiration, and 3-4 digit CVC.");
      return;
    }

    await addCard(data.cardHolderName, data.cardNumber, data.expirDate, data.cvc);
    reset();
    alert("New payment method added!");
  }

  return (
    <main className="bg-purple-300 w-full min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg flex flex-col w-[80vh] max-w-3xl overflow-auto">
        
        <div className="flex items-center justify-between mb-6">
          <Link href="/profile" className="text-red-500 text-3xl font-bold hover:text-gray-700 transition">
            &lt;
          </Link>
          <h1 className="text-orange text-3xl font-mono text-center flex-1">Add Payment Method</h1>
          <div className="w-6"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="cardHolderName" className="mb-1 font-semibold">Card Holder Name</label>
            <input
              className="box rounded-lg border border-gray-300 p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="cardHolderName"
              type="text"
              value={data.cardHolderName}
              onChange={(e) => updateField("cardHolderName", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="cardNumber" className="mb-1 font-semibold">Card Number</label>
            <input
              className="box rounded-lg border border-gray-300 p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="cardNumber"
              type="text"
              placeholder="1234 1234 1234 1234"
              value={data.cardNumber}
              onChange={(e) => updateField("cardNumber", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="expirDate" className="mb-1 font-semibold">Expiration Date</label>
            <input
              className="box rounded-lg border border-gray-300 p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="expirDate"
              type="text"
              placeholder="MM/YY"
              value={data.expirDate}
              onChange={(e) => updateField("expirDate", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="cvc" className="mb-1 font-semibold">CVV/CVC</label>
            <input
              className="box rounded-lg border border-gray-300 p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="cvc"
              type="text"
              placeholder="123"
              value={data.cvc}
              onChange={(e) => updateField("cvc", e.target.value)}
            />
          </div>

          <button className="btn mt-4" type="submit">
            Add
          </button>
        </form>
      </div>
    </main>
  );
}
