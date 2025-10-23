'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

enum Category {
    women = "women",
    men = "men",
    kid = "kid",
}

type ProductDisplayProps = {
    category: string;
};

type Product = {
    id: number
    name: string,
    description: string,
    stock: number,
    price: number,
    category: Category,
}

export default function ProductDisplay () {
    const [products, setproducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setproducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return(
    <div className="bg-orange-600 w-full overflow-x-hidden">
    <div className="relative max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 py-6">
        {loading ? (
            <p>Loading Products.....</p>
        ) : products.length === 0 ? (
            <p>No products found.</p>
        ) : (
                <>
                {products.map((product) => (
                <div key={product.id}>
                    <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    stock={product.stock}
                    description={product.description}
                    />
                </div>
                ))} </>
    
        )}
    </div>
    </div> 
    </div> 
    )
}