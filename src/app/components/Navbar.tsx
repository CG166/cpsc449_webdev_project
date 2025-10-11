'use client';

export default function Navbar() {
    return(
        <nav style={{ backgroundColor: '#CC5500' }} className="p-4">
            <ul className="flex justify-evenly text-white text-2xl font-bold">
                <li><a href="/clothing/mens" className="hover:text-emerald-700">Mens</a></li>
                <li><a href="/clothing/womens" className="hover:text-emerald-700">Womens</a></li>
                <li><a href="/clothing/kids" className="hover:text-emerald-700">Kids</a></li>
            </ul>
        </nav>
    )
}