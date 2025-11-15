'use client'
import { useState } from 'react';
import { createUser } from '../actions/users';

export default function Signup() {
  const[data, setData] = useState({ name: '', email: '', username: '' , password: ''});
  
  const updateField = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value}));
  };

  const reset = () => {
    setData({ name: '', email: '', username: '' , password: ''});
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!data.name.trim() || !data.email.trim() || !data.username.trim() || !data.password.trim()) {
      return;
    }

    await createUser(data.name, data.email, data.username, data.password);
    reset();
    alert("New User Created!");
    console.log("User Creation Successful!")

  }

  return (
    <main>
        <div className="bg-purple-300 w-full min-h-screen flex justify-center items-center;">
            <div className="bg-white p-8 rounded flex flex-col w-[300px] self-center max-h-[90vh] overflow-auto;">
                <h1 className="text-black text-2xl font-mono;" >Create an Account</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name" >Name</label><br />
                    <input className="box" id="name" type="text" name="name" value={data.name} onChange={(e) => updateField("name", e.target.value)}/><br />

                    <label htmlFor="email ">Email</label><br />
                    <input className="box" id="email" type="email" name="email" value={data.email} onChange={(e) => updateField("email", e.target.value)}/><br />

                    <label htmlFor="username" >Username</label><br />
                    <input className="box" id="username" name="username" type="text" value={data.username} onChange={(e) => updateField("username", e.target.value)}/><br />

                    <label htmlFor="password" >Password</label><br />
                    <input className="box" id="password" name="password" type="password" value={data.password} onChange={(e) => updateField("password", e.target.value)}/><br />

                    {/* Submit Button */}
                    <button className="btn" type="submit" >Submit</button>
                </form>
            </div>
        </div>
        
    </main>
  );
}