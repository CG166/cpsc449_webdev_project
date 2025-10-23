'use client';

export default function Navbar() {
    return(
        <>
        <hr className="w-full mx-auto h-0.25 bg-white border-0" />
        <nav style={{ backgroundColor: '#CC5500' }} className="p-0">
            <ul className="flex justify-evenly text-white text-2xl font-bold">
                <li className="flex-1 text-center"><a href="/clothing/mens" className="block w-full h-full p-3 hover:bg-orange-700 transition">Mens</a></li>
                <li className="flex-1 text-center"><a href="/clothing/womens" className="block w-full h-full p-3 hover:bg-orange-700 transition">Womens</a></li>
                <li className="flex-1 text-center"><a href="/clothing/kids" className="block w-full h-full p-3 hover:bg-orange-700 transition">Kids</a></li>
            </ul>
        </nav>
        </>
    )
}