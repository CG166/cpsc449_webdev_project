'use client'
import { useState } from 'react';
import { addAddress } from '../actions/deliveryAddress';

export default function AddAddress() {
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
    
      }
    return (
        <main className='bg-white p-8 rounded flex w-[300px] self-center max-h-[90vh] overflow-auto'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="addressLine" >Address Line</label><br />
                    <input className="box" id="addressLine" type="text" name="addressLine" value={data.addressLine} onChange={(e) => updateField("addressLine", e.target.value)}/><br />

                    <label htmlFor="country">Country</label><br />
                    <input className="box" id="country" type="text" name="country" value={data.country} onChange={(e) => updateField("country", e.target.value)}/><br />

                    <label htmlFor="state" >State</label><br />
                    <input className="box" id="state" name="state" type="text" value={data.state} onChange={(e) => updateField("state", e.target.value)}/><br />

                    <label htmlFor="city" >City</label><br />
                    <input className="box" id="city" name="city" type="text" value={data.city} onChange={(e) => updateField("city", e.target.value)}/><br />

                    <label htmlFor="zipcode" >Zipcode</label><br />
                    <input className="box" id="zipcode" name="zipcode" type="text" value={data.zipcode} onChange={(e) => updateField("zipcode", e.target.value)}/><br />

                    {/* Submit Button */}
                    <button className="btn" type="submit" >Add</button>
                </form>
        </main>
    );
}