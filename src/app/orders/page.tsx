import { db } from "../db/db";
import { Orders } from "../db/schema";
import { eq } from "drizzle-orm";

export default async function OrdersPage() {
  const userID = 3;

  const orders = await db
    .select()
    .from(Orders)
    .where(eq(Orders.userId, userID));

  return (
    <div className="p-10">
      <h1 className="text-center text-2xl text-black mb-8">My Orders</h1>

      {orders.length === 0 && (
        <p className="text-center text-gray-600">You have no orders yet.</p>
      )}

      <div className="space-y-4">
        {orders.map(order => (
          <div
            key={order.id}
            className="border p-4 rounded-xl shadow-sm bg-white"
          >
            <h2 className="font-semibold text-lg">Order #{order.id}</h2>

            <p className="text-sm text-gray-700">
              <strong>Name:</strong> {order.firstname}, {order.lastname}
            </p>

            <p className="text-sm text-gray-700">
              <strong>Shipping Address:</strong> {order.address}, {order.city},{" "}
              {order.country}
            </p>
            
            <p className="text-sm text-gray-700">
              <strong>Total price:</strong> 
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Ordered on: {order.createdAt?.toString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
