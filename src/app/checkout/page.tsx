import CheckoutForm from './CheckoutForm';
import { getUserID } from '../../../lib/cookie';
import { getAllProductsByUser } from '../actions/shoppingCart';
import ProductDisplayCard from '../components/ProductDisplayCard';

export default async function CheckoutPage() {
  const userID = await getUserID();

  if (!userID) {
    return (
      <main className="p-6">
        <h1 className="text-2xl text-red-600 font-bold">No User Currently Logged In!</h1>
      </main>
    );
  }

  const productIDs = await getAllProductsByUser(userID);

  if (!productIDs || productIDs.length === 0) {
    return (
      <main className="p-6">
        <h1 className="text-3xl mb-3">Shopping Cart</h1>
        <h2 className="text-xl">No items in shopping cart!</h2>
      </main>
    );
  }

  return (
    <main className="p-10 flex flex-col gap-10">
      <h1 className="text-center text-3xl font-bold text-black mb-6">Checkout</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-black">Ordering Items</h2>
        <div className="flex flex-col gap-4">
          {productIDs.map((id) => (
            <ProductDisplayCard key={id} productID={id} UID={userID} />
          ))}
        </div>
      </section>

      <CheckoutForm productIDs={productIDs} userID={userID} />
    </main>
  );
}
