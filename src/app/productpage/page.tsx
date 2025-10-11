import ProductCard from "@/app/components/ProductCard";

export default function productpage() {
  return (
    <div className="bg-emerald-700">
      <h1 className="text-center text-5xl md:text-7xl font-extrabold text-white drop-shadow-[0_0_2px_#000000] pt-5">Discover</h1>
      <div className="flex grid-cols-3 p-3">
        <ProductCard 
        productName="Classic Tee" 
        price="$22.00" 
        description="A soft cotton tee perfect for everyday wear." 
        />
        <ProductCard 
        productName="Slim Chinos" 
        price="$46.00" 
        description="Tailored fit pants with a modern silhouette." 
        />

        <ProductCard 
        productName="Everyday Sneakers" 
        price="$69.00" 
        description="Lightweight and durable sneakers for daily use." 
        />

        <ProductCard 
        productName="Crew Socks (3-Pack)" 
        price="$14.00" 
        description="Comfortable socks made with breathable fabric." 
        />

        <ProductCard 
        productName="Denim Jacket" 
        price="$88.00" 
        description="Classic denim jacket with a timeless design." 
        />

        <ProductCard 
        productName="Canvas Tote Bag" 
        price="$18.00" 
        description="Eco-friendly tote perfect for errands or the beach." 
        />
      </div>
    </div>
  );
}