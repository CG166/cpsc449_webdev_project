import Header from "../../header/page";
import ProductDisplay from "@/app/components/ProductDisplay";

export default function Mens() {
  return (
    <div>
      <div className="bg-orange-600 w-full">
        <h1 className="flex justify-center text-white drop-shadow-md font-bold text-4xl pt-10">Mens Clothing</h1>
      </div>
      <ProductDisplay/>
    </div>
  );
}