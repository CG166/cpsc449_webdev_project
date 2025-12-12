'use client'
import Link from "next/link";
import { useState } from 'react';
import { addAddress } from '../actions/deliveryAddress';
import { useRouter } from 'next/navigation';

export default function AddAddress() {
    const router = useRouter();
    const[data, setData] = useState({ addressLine: '', country: '', state: '' , city: '', zipcode: ''});
      
      const updateField = (field: string, value: string) => {
        setData((prev) => ({ ...prev, [field]: value}));
      };
    
      const reset = () => {
        setData({ addressLine: '', country: '', state: '' , city: '', zipcode: ''});
      }
    
      async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
    
        if (!data.addressLine.trim() || !data.country.trim() || !data.state.trim() || !data.city.trim() || !data.zipcode.trim()) {
          return;
        }
    
        await addAddress(data.addressLine, data.country, data.state, data.city, data.zipcode);
        reset();
        alert("New Delivery Address Created!");

        router.push('/profile');
    
      }
    return (
    <main className="bg-purple-300 w-full min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded flex flex-col w-[80vh] h-[90vh] overflow-auto shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-orange text-3xl font-mono text-center flex-1">Update Address</h1>
          <div className="w-6"></div>
      </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="addressLine" className="mb-1 font-semibold">Address Line</label>
            <input
              className="box rounded-lg border border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="addressLine"
              type="text"
              value={data.addressLine}
              onChange={(e) => updateField("addressLine", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="country" className="mb-1 font-semibold">Country</label>
            <input
              className="box rounded-lg border border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="country"
              type="text"
              value={data.country}
              onChange={(e) => updateField("country", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="state" className="mb-1 font-semibold">State</label>
            <input
              className="box rounded-lg border border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="state"
              type="text"
              value={data.state}
              onChange={(e) => updateField("state", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="city" className="mb-1 font-semibold">City</label>
            <input
              className="box rounded-lg border border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="city"
              type="text"
              value={data.city}
              onChange={(e) => updateField("city", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="zipcode" className="mb-1 font-semibold">Zipcode</label>
            <input
              className="box rounded-lg border border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="zipcode"
              type="text"
              value={data.zipcode}
              onChange={(e) => updateField("zipcode", e.target.value)}
            />
          </div>

          <button className="btn mt-4" type="submit">
            Add Address
          </button>
        </form>

        <div className="mt-8 flex justify-center">
        </div>
      </div>
    </main>
  )
}