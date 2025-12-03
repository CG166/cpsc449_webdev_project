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
            <h1 className="text-center text-4xl text-black pt-10" >Shopping cart</h1>
            {productIDs.map((id, index) => (
                        <ProductDisplayCard key={`${id}-${index}`} productID={id} UID={userID}/>
                      ))}
            <Link href="/checkout" className="btn">Checkout</Link>
        </main>
    )
}