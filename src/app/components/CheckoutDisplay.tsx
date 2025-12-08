import { getUserID } from "../../../lib/cookie";
import { getAllProductsByUser } from "../actions/shoppingCart";
import ProductDisplayCard from "./ProductDisplayCard";

export default async function CheckoutDisplay() {
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
            <h1 className="text-center text-2xl text-black mt-5">Checkout</h1>
            <h2 className="text-xl text-black">Ordering Items</h2>
            {productIDs.map((id) => (
                    <ProductDisplayCard key={id} productID={id}/>
            ))}        
        </main>
    )
}