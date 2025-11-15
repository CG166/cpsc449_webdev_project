
import { getProductInfo } from "../actions/products";
import { removeProductFromCart } from "../actions/shoppingCart";

type ProductDisplayCardProps = {
    productID: number
    UID?: number,

}

export default async function ProductDisplayCard({productID, UID } : ProductDisplayCardProps) {
    
    const product = await getProductInfo(productID)

    async function removeProduct(PID: number) {
        if(UID) {
            await removeProductFromCart(UID, PID);
        }
    }

    return (
        <div className="p-8 w-full h-full">
        <div className="bg-white rounded-3xl shadow-lg min-h-[240px] min-w-[240px] w-full">
                <div className="p-8"> 
                    <h1 className="text-black text-xl font-mono font-light;" >{product.name}</h1>
                    <h1 className="text-black text-l font-light;" >Price: {product.price}</h1>
                    <h1 className="text-black text-l font-light;" >In Stock: {product.stock}</h1>
                    <p className="text-black text-m font-light;" >{product.description}</p>
                    {/*<div>
                        {UID ? 
                        <button onClick={() => removeProduct(product.id)} >Remove</button>
                         : <h1>Please log in</h1>}
                    </div>*/}
                </div>     
        </div>
    </div>
    );
}