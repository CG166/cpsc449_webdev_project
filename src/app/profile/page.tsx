import Link from "next/link";
import { getUserID } from "../../../lib/cookie"
import { getUserInfo } from "../actions/users";

export default async function profile() {
    const userID = await getUserID();

    if(!userID) {
        return (
        <main>
            <h1>No User Currenly Logged In!</h1>
        </main>
        );
    }

    const user = await getUserInfo(userID);

    return (
        <main>
            <h1 className="text-center text-4xl text-black pt-10">User Account Info</h1>
            <h2 className="text-2xl text-black p-5">Name: {user.name}</h2>
            <h2 className="text-2xl text-black p-5">Email: {user.email}</h2>
            <h2 className="text-2xl text-black p-5">Username: {user.username}</h2>
            <Link href="/updateprofile" className="btn">Update Profile Info</Link>
        </main>
    );

}