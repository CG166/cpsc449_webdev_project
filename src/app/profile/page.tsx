import Link from "next/link";
import { getUserID } from "../../../lib/cookie"
import { getUserInfo } from "../actions/users";
import AddAddress from "../components/AddAddress";
import AddCard from "../components/AddCard";
import { getAllAddressesByUser } from "../actions/deliveryAddress";
import AddressDisplayCard from "../components/AddressDisplayCard";
import { getAllCardsByUser } from "../actions/card";
import CardDisplayCard from "../components/CardDisplayCard";

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
    const addresses = await getAllAddressesByUser(userID)
    const cards = await getAllCardsByUser(userID)

    return (
        <main>
            <h1 className="text-center text-4xl text-black pt-10">User Account Info</h1>
            <h2 className="text-2xl text-black p-5">Name: {user.name}</h2>
            <h2 className="text-2xl text-black p-5">Email: {user.email}</h2>
            <h2 className="text-2xl text-black p-5">Username: {user.username}</h2>
            <Link href="/updateprofile" className="btn">Update Profile Info</Link>

            <h1>Delivery Addresses</h1>
            <div className="m-5">
                <>{addresses.map((address) => (
                    <div key={address.id}>
                        <AddressDisplayCard
                        addressLine={address.addressLine}
                        country={address.country}
                        state={address.state}
                        city={address.city}
                        zipcode={address.zipcode}
                        />
                    </div>
                ))} </>
            </div>
            <AddAddress/>
            <h1>Payment Methods</h1>
            <div className="m-5" >
                <>{cards.map((card) => (
                    <div key={card.id}>
                        <CardDisplayCard
                        cardHolderName={card.cardHolderName}
                        cardNumber={card.cardNumber}
                        expirDate={card.expirDate}
                        />
                    </div>
                ))} </>
            </div>
            <AddCard/>

        </main>
    );

}