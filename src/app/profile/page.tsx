import Link from "next/link";
import { getUserID } from "../../../lib/cookie"
import { getUserInfo } from "../actions/users";
import AddCard from "../components/AddCard";
import { getAllAddressesByUser } from "../actions/deliveryAddress";
import AddressDisplayCard from "../components/AddressDisplayCard";
import { getAllCardsByUser } from "../actions/card";
import CardDisplayCard from "../components/CardDisplayCard";
import ProfileTabs from "../components/ProfileTabs";

export default async function profile() {
    const userID = await getUserID();

    if(!userID) {
        return (
        <main>
            <h1>No User Currenly Logged In!</h1>
        </main>
        );
    }

    const [user, addresses, cards] = await Promise.all([
        getUserInfo(userID),
        getAllAddressesByUser(userID),
        getAllCardsByUser(userID)
    ]);

    return (
    <main className="p-5">
        <div className="flex items-center justify-center relative mb-10 h-12">
            <Link href="/"
            className="absolute left-0 text-orange text-5xl hover:text-gray-700 transition">
                &lt;
            </Link>
            <h1 className="text-4xl font-bold">My Profile</h1>
        </div>
      <ProfileTabs user={user} addresses={addresses} cards={cards} />
    </main>
  );

}