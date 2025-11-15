'use client';
import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  buttons?: React.ReactNode;
};

export default function Header({ buttons }: HeaderProps) {
    return (
    <main>
      <div id="first section" className="flex w-full items-center bg-purple-300 justify-between;">
        <div className="flex items-start">  
          <Image src="/globe.svg" alt="website icon" width={50} height={50}/>
          <Link href="/" className="p-2 text-white drop-shadow-md font-bold text-4xl">ShopSite</Link>
        </div>
        {/* Button Container */}
        <div className="flex space-x-1 ml-auto">
          {buttons}
        </div>
      </div>
    </main>
    );
}