'use client'
import { useState } from 'react';
import { addCard } from '../actions/card';

export default function AddCard() {
    const[data, setData] = useState({cardHolderName: '', cardNumber: '', expirDate: '', cvc: ''});
      
      const updateField = (field: string, value: string) => {
        setData((prev) => ({ ...prev, [field]: value}));
      };
    
      const reset = () => {
        setData({cardHolderName: '', cardNumber: '', expirDate: '', cvc: ''});
      }
    
      async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
    
        if (!data.cardHolderName.trim() || !data.cardNumber.trim() || !data.expirDate.trim() || !data.cvc.trim()) {
          return;
        }
    
        await addCard(data.cardHolderName, data.cardNumber, data.expirDate, data.cvc);
        reset();
        alert("New payment method added!");
    
      }
    return (
        <main className='bg-white p-8 rounded flex w-[300px] self-center max-h-[90vh] overflow-auto'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="cardHolderName" >Card Holder Name</label><br />
                    <input className="box" id="cardHolderName" type="text" name="cardHolderName" value={data.cardHolderName} onChange={(e) => updateField("cardHolderName", e.target.value)}/><br />

                    <label htmlFor="cardNumber">Card Number</label><br />
                    <input className="box" id="cardNumber" type="text" name="cardNumber" value={data.cardNumber} onChange={(e) => updateField("cardNumber", e.target.value)}/><br />

                    <label htmlFor="expirDate" >Expiration Date</label><br />
                    <input className="box" id="expirDate" name="expirDate" type="text" value={data.expirDate} onChange={(e) => updateField("expirDate", e.target.value)}/><br />

                    <label htmlFor="cvc" >CVC</label><br />
                    <input className="box" id="cvc" name="cvc" type="text" value={data.cvc} onChange={(e) => updateField("cvc", e.target.value)}/><br />

                    {/* Submit Button */}
                    <button className="btn" type="submit" >Add</button>
                </form>
        </main>
    );
}