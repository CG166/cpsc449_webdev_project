'use client';

import Link from "next/link";

export default function Topbar() {
    return(
        <nav className="hidden md:flex items-center gap-6">
            <Link href="/profile" className="navbtn">My Profile</Link>
            <Link href="/orders" className="navbtn">My Orders</Link>
            <Link href="/shoppingcart" className="navbtn">My Shopping Cart</Link>
        </nav>
    );
}