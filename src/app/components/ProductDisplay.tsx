'use server'
import ProductCard from './ProductCard';
import { pCategory } from '../db/schema';
import { getProductsByCategory } from '../actions/products';
import { getUserID } from '../../../lib/cookie';
//import { addProductToCart } from "../actions/shoppingCart";



type ProductDisplayProps = {
    category: pCategory;
};

export default async function ProductDisplay ({category} : ProductDisplayProps) {
    const products = await getProductsByCategory(category);

    const userID = await getUserID();
        if (!userID){
            return null;
        }

    console.log("PD_UID:",userID)

    //async function testAPI() {
        //if(userID) {
            //await addProductToCart(userID, products[0].id);
        //}
    //}

    //testAPI();


    return(
    <div className="bg-orange-600 w-full overflow-x-hidden">
    <div className="relative max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 py-6">
        <>
            {products.map((product) => (
                <div key={product.id}>
                    <ProductCard
                    id={product.id}
                    name={product.name}
                    price={Number(product.price)}
                    stock={product.stock}
                    description={product.description}
                    ProductID={product.id}
                    UserID={userID}
                    />
                </div>
            ))} </>
    </div>
    </div> 
    </div> 
    )
}