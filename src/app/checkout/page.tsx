import CheckoutForm from "./CheckoutForm";
import { getUserID } from "../../../lib/cookie";
import { getAllProductsByUser } from "../actions/shoppingCart";
import ProductDisplayCard from "../components/ProductDisplayCard";

export default async function CheckoutPage() {
  const userID = await getUserID();

  if (!userID) return <p>No user logged in</p>;

  const productIDs = await getAllProductsByUser(userID);

  if (!productIDs || productIDs.length === 0)
    return <p>No items in cart</p>;

  return (
    <main className="p-10 flex flex-col gap-10">
      <h1 className="text-3xl font-bold text-black text-center">Checkout</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-black">Your Items</h2>
        <div className="flex flex-col gap-4">
          {productIDs.map((id, index) => (
            <ProductDisplayCard key={`${id}-${index}`} productID={id} UID={userID}/>
          ))}
        </div>
      </section>

      <CheckoutForm productIDs={productIDs} userID={userID} />
    </main>
  );
}
