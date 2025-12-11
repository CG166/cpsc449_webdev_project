import { getAllOrderIDs } from "../actions/orders";
import OrderCard from "../components/OrderCard";

export default async function orders() {
    const IDS = await getAllOrderIDs();
    if (!IDS) {
        return;
    }

    return (
        <main>
            <h1 className="text-center text-2xl text-black pt-10">My Orders</h1>
            <div className="m-5">
                <>{IDS.map((ID) => (
                    <div className="m-5" key={ID}>
                       <OrderCard OID={ID}/>             
                    </div>
                ))} </>
            </div>
        </main>

    )

}