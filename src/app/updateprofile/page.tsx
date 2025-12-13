import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserInfo, updateUserInfo } from "../actions/users";

export default async function Updateprofile() {
  const cookieStore = await cookies();
  const userID = cookieStore.get("userID")?.value;

  if (!userID) {
    redirect("/login");
  }

  const user = await getUserInfo(Number(userID));

  async function handleSubmit(formData: FormData) {
    'use server'
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;

    await updateUserInfo(Number(userID), name, email, username);
    redirect("/profile");
  }

  return (
    <main className="bg-purple-300 w-full min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded flex flex-col w-[80vh] h-[90vh] overflow-auto shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-orange text-3xl font-mono text-center flex-1">Update Profile</h1>
          <div className="w-6"></div>
        </div>
        <form action={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-semibold">Name</label><br />
            <input
              className="box rounded-lg border border-gray-300 p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="name"
              type="text"
              name="name"
              defaultValue={user.name}
            /><br />
            <label htmlFor="email" className="mb-1 font-semibold">Email</label><br />
            <input
              className="box rounded-lg border border-gray-300 p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="email"
              type="email"
              name="email"
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]{3,}$"
              defaultValue={user.email}
            /><br />
            <label htmlFor="username" className="mb-1 font-semibold">Username</label><br />
            <input
              className="box rounded-lg border border-gray-300 p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="username"
              type="text"
              name="username"
              defaultValue={user.username}
            /><br />
            <button className="btn mt-4" type="submit">Update</button>
          </div>
        </form>
      </div>
    </main>
  );
}
