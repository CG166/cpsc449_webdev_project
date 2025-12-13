'use client'
import { useEffect, useState } from "react";
import { getProductInfo } from "../actions/products";
import { addProductToCart,removeProductFromCart, getCartProduct } from "../actions/shoppingCart";
import Image from "next/image";

type ProductDisplayCardProps = {
    productID: number
    UID?: number,
    quantity?: number;
    compact?: boolean
}

type Product = {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
  category: "WOMEN" | "MEN" | "KIDS";
  imageUrl: string;
  quantity?: number;
};

export default function ProductDisplayCard({productID, UID, compact } : ProductDisplayCardProps) {
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        async function getProduct() {
            const productData = await getProductInfo(productID);
            let qty = 1;

            if (UID) {
            await getCartProduct(UID, productID);
            }

            const formattedProduct: Product = {
            id: productData.id,
            name: productData.name,
            description: productData.description,
            stock: productData.stock,
            price: Number(productData.price),
            category: productData.category ?? "WOMEN",
            imageUrl: productData.imageUrl,
            quantity: qty,
            };

            setProduct(formattedProduct);
        }

        getProduct();
    }, [productID, UID]);

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
        {compact ? (
        <div className="bg-white rounded-3xl shadow-lg w-full">
            <div className="p-4 flex items-center gap-3">
                <Image src={product.imageUrl} alt={product.name} width={60} height={60} className="rounded-xl"/>
                <div className="flex flex-col items-end ml-auto">
                    <h1 className="text-black text-sm font-mono font-light">{product.name}</h1>
                    <h1 className="text-black text-sm font-light">${product.price.toFixed(2)}</h1>
                </div>
            </div>
        </div>
        ) : (
        <div className="bg-white rounded-3xl shadow-lg min-h-[240px] min-w-[240px] w-full">
                <div className="p-8"> 
                    <h1 className="text-black text-xl font-mono font-light;" >{product.name}</h1>
                    <h1 className="text-black text-l font-light;" >Price: ${product.price}</h1>
                    <h1 className="text-black text-l font-light;" >In Stock: {product.stock}</h1>
                    <p className="text-black text-m font-light;" >{product.description}</p>
                    <div className="flex gap-2 mt-2 items-center">
                        <label>Qty:</label>
                        <span>{product.quantity}</span>
                    </div>
                    <Image src={product.imageUrl} alt={product.name} width={200} height={200} className="rounded-xl mt-3"/>
                    
                    <div>
                        {UID ? 
                        <button className="btn" onClick={() => removeProduct(product.id)} >Remove</button>
                         : <h1></h1>}
                    </div>
                </div>     
        </div>
        )}
    </div>
    );
}
