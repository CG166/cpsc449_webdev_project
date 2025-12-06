'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createOrder } from "../actions/checkout";

type CheckoutFormProps = {
  productIDs: number[];
  userID: number;
};

export default function CheckoutForm({ productIDs, userID }: CheckoutFormProps) {
  const router = useRouter();

  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    card: '',
    exp: '',
    cvv: '',
    address: '',
    city: '',
    country: '',
    email: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsSubmitting(true);

    await createOrder(userID, data);

    router.push("/thankyoupage");
  }

  return (
    <section className="bg-white p-8 rounded-3xl shadow-xl max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-black">Shipping Information</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        <div className="flex gap-4">
          <input name="firstname" placeholder="First Name" required className="w-1/2 border rounded-lg p-3" value={data.firstname} onChange={handleChange} />
          <input name="lastname" placeholder="Last Name" required className="w-1/2 border rounded-lg p-3" value={data.lastname} onChange={handleChange} />
        </div>

        <div>
              <label className="block text-black font-semibold mb-1">Card Number</label>
              <input name="card" type="text" required maxLength={16} className="w-full border rounded-lg p-3" placeholder="1234 5678 9012 3456"
                value={data.card} onChange={handleChange}
              />
          </div>

          <div className="flex gap-4">
              <div className="w-1/2">
                  <label className="block text-black font-semibold mb-1">Expiration Date</label>
                  <input name="exp" type="text" required maxLength={5} placeholder="MM/YY" className="w-full border rounded-lg p-3"
                    value={data.exp} onChange={handleChange}
                  />
              </div>
              <div className="w-1/2">
                  <label className="block text-black font-semibold mb-1">Security Code (CVV/CVC)</label>
                  <input name="cvv" type="text" required maxLength={4} className="w-full border rounded-lg p-3" placeholder="123"
                    value={data.cvv} onChange={handleChange}
                  />
              </div>
          </div>

        <input name="email" type="email" placeholder="Email" required className="w-full border rounded-lg p-3" value={data.email} onChange={handleChange} />

        <input name="address" placeholder="Address" required className="w-full border rounded-lg p-3" value={data.address} onChange={handleChange} />

        <div className="flex gap-4">
          <input name="city" placeholder="City" required className="w-1/2 border rounded-lg p-3" value={data.city} onChange={handleChange} />
          <input name="country" placeholder="Country" required className="w-1/2 border rounded-lg p-3" value={data.country} onChange={handleChange} />
        </div>

        <button type="submit" disabled={isSubmitting} className="btn w-full bg-black text-white py-3 mt-4 rounded-xl hover:bg-gray-800">
          {isSubmitting ? "Processing..." : "Place Order"}
        </button>

      </form>
    </section>
  );
}

