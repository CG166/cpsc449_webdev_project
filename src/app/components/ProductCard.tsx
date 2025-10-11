'use client';
import Link from 'next/link';

type ProductCardProps = {
    productName: string;
    price: string;
    description: string;
};

export default function ProductCard ({ productName, price, description }: ProductCardProps) {
    return(
    <div className="p-8 ">
        <div className="bg-white rounded-3xl shadow-lg h-60 w-100">
                <div className="p-8"> 
                    <h1 className="text-black text-xl font-mono font-light;" >{ productName }</h1>
                    <h1 className="text-black text-xl font-mono font-light;" >{ price }</h1>
                    <h1 className="text-black text-xl font-mono font-light;" >{ description }</h1> 
                </div>         
        </div>
    </div>
   );
}