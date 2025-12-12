'use client'

import Link from "next/link";

export default function Updateprofile() {
  
  return (
    <main className="bg-purple-300 w-full min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded flex flex-col w-[80vh] h-[90vh] overflow-auto shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-orange text-3xl font-mono text-center flex-1">Update Profile</h1>
          <div className="w-6"></div>
        </div>
        <form >
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-semibold">Name</label><br />
            <input className="box rounded-lg border border-gray-300 p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" id="name" type="text" name="name" /><br />
            <label htmlFor="email " className="mb-1 font-semibold">Email</label><br />
            <input className="box rounded-lg border border-gray-300 p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" id="email" type="email" name="email" /><br />

            <label htmlFor="username" className="mb-1 font-semibold">Username</label><br />
            <input className="box rounded-lg border border-gray-300 p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" id="username" name="username" type="text"/><br />

            {/* Submit Button */}
            <button className="btn mt-4" type="submit" >Update</button>
          </div>
        </form>
      </div>
    </main>
  );
}