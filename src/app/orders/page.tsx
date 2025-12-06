import { db } from "../db/db";
import { Orders, Products } from "../db/schema";
import { eq, desc, inArray } from "drizzle-orm";

function parseOrderProducts(productsJson: string) {
  try {
    return JSON.parse(productsJson) as { id: number; quantity: number }[];
  } catch {
    return [];
  }
}

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

export default async function OrdersPage() {
  const userID = 3;

  const orders = await db
    .select()
    .from(Orders)
    .where(eq(Orders.userID, userID))
    .orderBy(desc(Orders.id));

  const ordersWithProducts = await Promise.all(
    orders.map(async (order) => {
      const orderProducts = parseOrderProducts(order.products as any);
      if (orderProducts.length === 0) return { ...order, productsDetails: [] };

      const productIds = orderProducts.map((p) => p.id);

      const productsDetails = await db
        .select()
        .from(Products)
        .where(inArray(Products.id, productIds))

      const productsWithQuantity = productsDetails.map((prod) => {
        const quantityObj = orderProducts.find((p) => p.id === prod.id);
        return {
          ...prod,
          quantity: quantityObj?.quantity || 0,
          totalPrice: Number(prod.price) * (quantityObj?.quantity || 0),
        };
      });

      return { ...order, productsDetails: productsWithQuantity };
    })
  );

  return (
    <div className="p-10">
      <h1 className="text-center text-3xl font-bold text-black mb-8">
        My Orders
      </h1>

      {ordersWithProducts.length === 0 && (
        <p className="text-center text-gray-600">You have no orders yet.</p>
      )}

      <div className="space-y-6">
        {ordersWithProducts.map((order) => (
          <div
            key={order.id}
            className="border p-4 rounded-xl shadow-sm bg-white"
          >
            <h2 className="font-semibold text-lg mb-2">
              Order #{order.id} – {formatToPST(order.createdAt!)}
            </h2>

            <div className="mb-2">
              <strong>Products:</strong>
              <ul className="list-disc ml-5 mt-1">
                {order.productsDetails.map((prod) => (
                  <li key={prod.id}>
                    {prod.name} x {prod.quantity} = ${prod.totalPrice.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-gray-700">
              <strong>Total:</strong>{" "}
              $
              {order.productsDetails
                .reduce((sum, p) => sum + p.totalPrice, 0)
                .toFixed(2)}
            </p>

            <p className="text-sm text-gray-700 mt-1">
              <strong>Shipping:</strong> {order.address}, {order.city},{" "}
              {order.country}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Email: {order.email} | Name: {order.firstname} {order.lastname}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
