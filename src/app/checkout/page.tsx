import CheckoutDisplay from "../components/CheckoutDisplay";

export default async function Checkout() {
    
    return (
        <main>
            <h1 className="text-center text-2xl text-black mt-5">Checkout</h1>
            <CheckoutDisplay/>
            <button className="btn">Place Order</button>
            
        </main>
    )
}