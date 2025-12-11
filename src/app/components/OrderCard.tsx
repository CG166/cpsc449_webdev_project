import { getOrderInfo } from "../actions/orders";

type OrderCardProps = {
    OID: number;
};

export default async function OrderCard({OID} : OrderCardProps) {
    const orderInfo = await getOrderInfo(OID);
    
    return (
        <main className="flex bg-white gap-3 p-5 rounded-2xl border border-black">
            <h1>Product: {orderInfo.productName}</h1>
            <h1>Price: {orderInfo.productPrice}</h1>
            <h1>Card: **** **** **** {orderInfo.cardNumber.slice(-4)}</h1>
            <h1>Ordered At: {orderInfo.orderedAt.toString()}</h1>
        </main>
    )
}