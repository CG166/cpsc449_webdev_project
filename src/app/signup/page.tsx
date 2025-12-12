'use client'
import Link from "next/link";
import { useState } from 'react';
import { createUser } from '../actions/users';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();
  const [data, setData] = useState({ name: '', email: '', username: '', password: '' });

  const updateField = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const reset = () => {
    setData({ name: '', email: '', username: '', password: '' });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!data.name.trim() || !data.email.trim() || !data.username.trim() || !data.password.trim()) {
      return;
    }

    await createUser(data.name, data.email, data.username, data.password);
    reset();
    alert("New User Created!");
    console.log("User Creation Successful!");
    router.push('/');
  }

  return (
    <main className="bg-purple-300 w-full min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-4xl flex flex-col w-[80vh] h-[90vh] overflow-auto shadow-lg">
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-orange text-3xl font-mono text-center flex-1">Create an Account</h1>
          <div className="w-6"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-semibold">Name</label>
            <input
              className="box rounded-2xl border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-semibold">Email</label>
            <input
              className="box rounded-2xl border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="username" className="mb-1 font-semibold">Username</label>
            <input
              className="box rounded-2xl border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="username"
              type="text"
              value={data.username}
              onChange={(e) => updateField("username", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-semibold">Password</label>
            <input
              className="box rounded-2xl border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => updateField("password", e.target.value)}
            />
          </div>

          <button className="btn mt-4 rounded-2xl" type="submit">Submit</button>

          <p className="text-center mt-2 text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
