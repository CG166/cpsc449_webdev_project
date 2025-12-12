'use client'
import { useState } from "react";
import { loginUser } from "../actions/users";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [data, setData] = useState({ username: '', password: '' });
  const router = useRouter();

  const updateField = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const reset = () => {
    setData({ username: '', password: '' });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!data.username.trim() || !data.password.trim()) {
      return;
    }

    const loginAttempt = await loginUser(data.username, data.password);

    if (loginAttempt.success) {
      reset();
      alert("Login Successful!");
      router.push("/");
    } else {
      alert("Login failed!");
      console.log("Login failed:", loginAttempt.message);
    }
  }

  return (
    <main className="bg-purple-300 w-full min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-3xl flex flex-col w-[80vh] max-w-md h-[70vh] overflow-auto shadow-lg">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-orange text-3xl font-mono text-center flex-1">Login</h1>
          <div className="w-6"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </form>

      </div>
    </main>
  );
}
