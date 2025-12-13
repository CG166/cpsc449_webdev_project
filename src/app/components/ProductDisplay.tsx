'use server'
import ProductCard from './ProductCard';
import { pCategory } from '../db/schema';
import { getProductsByCategory } from '../actions/products';
import { getUserID } from '../../../lib/cookie';
import Link from "next/link";
//import { addProductToCart } from "../actions/shoppingCart";



type ProductDisplayProps = {
    category: pCategory;
};

export default async function ProductDisplay ({category} : ProductDisplayProps) {
    const products = await getProductsByCategory(category);

    const userID = await getUserID();

    return(
    <div className="bg-purple-200 w-full overflow-x-hidden min-h-screen">
            <Link href="/" className="top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-black text-lg font-semibold shadow-lg hover:scale-105 transition">
                ← Back to Menu
            </Link>
    <div className="relative max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                    imageUrl={product.imageUrl}
                    />
                </div>
            ))} </>
    </div>
    </div> 
    </div>

    )
}