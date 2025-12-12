import { getUserID } from "../../../lib/cookie"
import { getAllProductsByUser } from "../actions/shoppingCart";
import ProductDisplayCard from "../components/ProductDisplayCard";
import Link from "next/link";


export default async function shoppingcart() {
    const userID = await getUserID();

    if(!userID) {
        return (
        <main>
            <h1>No User Currenly Logged In!</h1>
        </main>
        );
    }

    const productIDs = await getAllProductsByUser(userID);

    if(!productIDs) {
        return (
            <main>
                <h1>Shopping cart</h1>
                <h2>No items in shopping cart!</h2>
            </main>
        )
    }
    
    return (
        <main>
        <div className="w-full min-h-screen p-6 flex flex-col">
        <div className="flex items-center justify-center relative mb-10 h-12">
        <Link href="/" className="absolute top-4 left-4 text-orange-500 text-3xl font-bold hover:text-gray-700 transition">
          ← Back to Menu
        </Link>
        <h1 className="text-4xl font-bold mt-30 text-orange-500">Shopping Cart</h1>
        <div className="w-6"></div>
      </div>
            {productIDs.map((id,index) => (
                <ProductDisplayCard key={`${id}-${index}`} productID={id} UID={userID}/>
            ))}
            <Link href="/checkout" className="btn">Checkout</Link>
        </div>
        </main>
    )
}