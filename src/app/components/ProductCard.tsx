'use client';
import { useState } from "react";
import { addProductToCart } from "../actions/shoppingCart";
import Image from "next/image";

type ProductCardProps = {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
  UserID?: number;
  ProductID: number;
  imageUrl: string;
};

export default function ProductCard({ name, description, price, stock, UserID, ProductID, imageUrl }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  async function addProduct() {
    if (!UserID || !ProductID) {
      alert("Please log in to add to cart!");
      return;
    }

    if (quantity < 1) {
      alert("Quantity must be at least 1");
      return;
    }

    await addProductToCart(UserID, ProductID, quantity);
    alert(`Added ${quantity} item(s) to cart`);
  }

  return (
    <div className="p-4 w-full h-full">
      <div className="bg-white rounded-3xl shadow-lg min-h-[240px] min-w-[240px] w-full flex flex-col items-center p-4 gap-2">
        <div className="relative w-full h-48 bg-gray-50 rounded-2xl overflow-hidden">
          <Image src={imageUrl} alt={name} fill className="object-contain p-3" sizes="(max-width: 768px) 100vw, 300px"/>
        </div>

        <h1 className="text-black text-xl font-mono font-light mt-2">{name}</h1>
        <p className="text-black text-sm font-light text-center">{description}</p>
        <h1 className="text-black text-lg font-light mt-1">Price: ${price}</h1>
        <h1 className="text-black text-lg font-light">In Stock: {stock}</h1>

        <div className="flex gap-2 mt-2 items-center">
          <label>Qty:</label>
          <input
            type="number"
            min={1}
            max={stock}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border rounded-md w-16 text-center"
          />
        </div>

        <button className="btn mt-2" onClick={addProduct}>
          Add to Cart
        </button>

      </div>
    </div>
  );
}
