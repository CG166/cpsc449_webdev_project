import { getOrderInfo } from "../actions/orders";

type OrderCardProps = {
    OID: number;
};

function formatToPST(dateString: string | Date | undefined) {
  if (!dateString) return 'Unknown';

  const dateUTC = new Date(dateString);
  const pstOffset = +8;
  const datePST = new Date(dateUTC.getTime() + pstOffset * 60 * 60 * 1000);

  return datePST.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default async function OrderCard({OID} : OrderCardProps) {
    const orderInfo = await getOrderInfo(OID);
    
    return (
        <main className="flex bg-white gap-3 p-5 rounded-2xl border border-black">
            <h1>Product: {orderInfo.productName}</h1>
            <h1>Price: {orderInfo.productPrice}</h1>
            <h1>Card: **** **** **** {orderInfo.cardNumber.slice(-4)}</h1>
            <h1>Ordered At: {formatToPST(orderInfo.orderedAt)}</h1>
        </main>
    )
}