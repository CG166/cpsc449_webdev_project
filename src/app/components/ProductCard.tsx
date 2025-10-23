'use client';
import Link from 'next/link';

type ProductCardProps = {
    id: number,
    name: string,
    description: string,
    stock: number,
    price: number,
};

export default function ProductCard ({ id, name, description, price, stock }: ProductCardProps) {
    return(
    <div className="p-8 w-full h-full">
        <div className="bg-white rounded-3xl shadow-lg min-h-[240px] min-w-[240px] w-full">
                <div className="p-8"> 
                    <h1 className="text-black text-xl font-mono font-light;" >{ name }</h1>
                    <h1 className="text-black text-l font-light;" >Price: { price }</h1>
                    <h1 className="text-black text-l font-light;" >In Stock: { stock }</h1>
                    <p className="text-black text-m font-light;" >{ description }</p> 
                </div>         
        </div>
    </div>
   );
}