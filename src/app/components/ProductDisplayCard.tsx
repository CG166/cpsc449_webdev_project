'use client'
import { useEffect, useState } from "react";
import { getProductInfo } from "../actions/products";
import { removeProductFromCart } from "../actions/shoppingCart";

type ProductDisplayCardProps = {
    productID: number
    UID?: number,

}

type Product = {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
  category: "WOMEN" | "MEN" | "KIDS";
};

export default function ProductDisplayCard({productID, UID } : ProductDisplayCardProps) {
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        async function getProduct() {
            const product = await getProductInfo(productID)
            const formattedProduct: Product = {
            id: product.id,
            name: product.name,
            description: product.description,
            stock: product.stock,
            price: Number(product.price),
            category: product.category ?? "WOMEN",
        };
        setProduct(formattedProduct);
        }

        getProduct();

    }, [productID]);


    async function removeProduct(PID: number) {
        if(UID) {
            await removeProductFromCart(UID, PID);
        }
    }

    if(!product) {
        return(
            <main>
                <h1>No Products found!</h1>
            </main>
        )
    }

    return (
        <div className="p-8 w-full h-full">
        <div className="bg-white rounded-3xl shadow-lg min-h-[240px] min-w-[240px] w-full">
                <div className="p-8"> 
                    <h1 className="text-black text-xl font-mono font-light;" >{product.name}</h1>
                    <h1 className="text-black text-l font-light;" >Price: {product.price}</h1>
                    <h1 className="text-black text-l font-light;" >In Stock: {product.stock}</h1>
                    <p className="text-black text-m font-light;" >{product.description}</p>
                    <div>
                        {UID ? 
                        <button className="btn" onClick={() => removeProduct(product.id)} >Remove</button>
                         : <h1></h1>}
                    </div>
                </div>     
        </div>
    </div>
    );
}