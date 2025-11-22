import { getUserID } from "../../../lib/cookie";
import { getAllProductsByUser } from "../actions/shoppingCart";
import ProductDisplayCard from "../components/ProductDisplayCard";

export default async function Checkout() {
    const userID = await getUserID();
    
    if (!userID) {
        return (
        <main>
            <h1>No User Currently Logged In!</h1>
        </main>
        );
    }

    const productIDs = await getAllProductsByUser(userID);

    if (!productIDs || productIDs.length === 0) {
        return (
            <main>
                <h1 className="text-3xl mb-3">Shopping Cart</h1>
                <h2 className="text-xl">No items in shopping cart!</h2>
            </main>
        );
    }

    return (
        <main className="p-10 flex flex-col gap-10">
            <h1 className="text-center text-3xl font-bold text-black mb-6">Checkout</h1>

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-black">Ordering items</h2>
                <div className="flex flex-col gap-4">
                    {productIDs.map((id) => (
                        <ProductDisplayCard key={id} productID={id} UID={userID}/>
                    ))}
                </div>
            </section>

            <section className="bg-white p-8 rounded-3xl shadow-xl max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-black">Payment Information</h2>

                <form className="flex flex-col gap-6">
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-black font-semibold mb-1">First Name</label>
                            <input type="text" required className="w-full border rounded-lg p-3"/>
                        </div>
                        <div className="w-1/2">
                            <label className="block text-black font-semibold mb-1">Last Name</label>
                            <input type="text" className="w-full border rounded-lg p-3"/>
                        </div>
                    </div>
                    <div>
                        <label className="block text-black font-semibold mb-1">Card Number</label>
                        <input type="text" required maxLength={16} className="w-full border rounded-lg p-3" placeholder="1234 5678 9012 3456"/>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-black font-semibold mb-1">Expiration Date</label>
                            <input type="text" required maxLength={5} placeholder="MM/YY" className="w-full border rounded-lg p-3"/>
                        </div>
                        <div className="w-1/2">
                            <label className="block text-black font-semibold mb-1">Security Code (CVV/CVC)</label>
                            <input type="text" required maxLength={4} className="w-full border rounded-lg p-3" placeholder="123"/>
                        </div>
                    </div>

                    <div>
                        <label className="block text-black font-semibold mb-1">Address</label>
                        <input type="text" required className="w-full border rounded-lg p-3" placeholder="123 Main Street, City, Country"/>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-black font-semibold mb-1">City</label>
                            <input type="text" required className="w-full border rounded-lg p-3"/>
                        </div>
                        <div className="w-1/2">
                            <label className="block text-black font-semibold mb-1">Country</label>
                            <input type="text" required className="w-full border rounded-lg p-3"/>
                        </div>
                    </div>

                    <div>
                        <label className="block text-black font-semibold mb-1">Email</label>
                        <input type="text" required className="w-full border rounded-lg p-3"/>
                    </div>

                    <button 
                        type="submit" 
                        className="btn w-full bg-black text-white py-3 mt-4 rounded-xl hover:bg-gray-800"
                    >
                        Place Order
                    </button>
                </form>
            </section>

        </main>
    );
}
