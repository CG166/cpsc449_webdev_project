import Link from "next/link";
import { getAllOrderIDs } from "../actions/orders";
import OrderCard from "../components/OrderCard";

export default async function orders() {
    const IDS = await getAllOrderIDs();
    if (!IDS) {
        return;
    }

    return (
        <main>
            <div className="flex items-center justify-center relative mb-10 h-12">
                <Link href="/" className="absolute top-4 left-4 text-orange-500 text-3xl font-bold hover:text-gray-700 transition">
                    ← Back to Menu
                </Link>

                <h1 className="text-4xl font-bold mt-30">My Orders</h1>
            </div>

            <div className="mt-25">
                {IDS.map((ID) => (
                <div className="m-5" key={ID}>
                    <OrderCard OID={ID} />
                </div>
                ))}
            </div>
        </main>
    )

}