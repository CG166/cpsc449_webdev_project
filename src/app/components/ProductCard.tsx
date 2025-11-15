'use client';
import { addProductToCart } from "../actions/shoppingCart";
//import { useEffect } from "react";

type ProductCardProps = {
    id: number,
    name: string,
    description: string,
    stock: number,
    price: number,
    UserID: number;
    ProductID: number;

};

export default function ProductCard ({ id, name, description, price, stock, UserID, ProductID}: ProductCardProps) {
    console.log("PC-UID:", UserID);
    console.log("PC-PID", ProductID);

    async function addProduct() {
                if(UserID) {
                    await addProductToCart(UserID, ProductID);
                }
            }
    

    return(
    <div className="p-8 w-full h-full">
        <div className="bg-white rounded-3xl shadow-lg min-h-[240px] min-w-[240px] w-full">
                <div className="p-8"> 
                    <h1 className="text-black text-xl font-mono font-light;" >{ name }</h1>
                    <h1 className="text-black text-l font-light;" >Price: { price }</h1>
                    <h1 className="text-black text-l font-light;" >In Stock: { stock }</h1>
                    <p className="text-black text-m font-light;" >{ description }</p> 
                    <button onClick={() => addProduct()} >Add</button>
                </div>     
        </div>
    </div>
   );
}