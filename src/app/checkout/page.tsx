import { getUserID } from "../../../lib/cookie";
import { getAllCardsByUser } from "../actions/card";
import { getAllAddressesByUser } from "../actions/deliveryAddress";
import { getAllProductsByUser, getAllProductsByUserWithQty } from "../actions/shoppingCart";
import CheckoutDisplay from "../components/CheckoutDisplay";

export default async function Checkout() {
    const userID = await getUserID();
    
        if(!userID) {
            return (
            <main>
                <h1>No User Currenly Logged In!</h1>
            </main>
            );
        }

        const addresses = await getAllAddressesByUser(userID)
        const cards = await getAllCardsByUser(userID)
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
            <CheckoutDisplay addresses={addresses} cards={cards} productIDs={productIDs}/>
        </main>
    )
}