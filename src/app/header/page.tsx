import Image from "next/image";
import Link from "next/link"

export default function Header() {
  return (
    <main>
      <div id="first section" className="flex w-full items-center bg-purple-300 justify-between;">
        <div className="flex items-start">  
          <Image src="/globe.svg" alt="website icon" width={50} height={50}/>
          <Link href="/" className="p-2 text-white drop-shadow-md font-bold text-4xl">ShopSite</Link>
        </div>
        {/* Button Container */}
        <div className="flex space-x-1 mt-4 items-end ml-auto">
          {/* Sign Up button */}
          <Link href="/signup">
          <button className='btn' >Sign up</button>
          </Link>
          {/* Log In button */}
          <Link href="/login">
          <button className='btn' >Log In</button>
          </Link>
        </div>
      </div>
    </main>
  );
}