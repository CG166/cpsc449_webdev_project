"use client";

import Header from '../app/header/page'
import Image from "next/image";
// New Code
import Link from 'next/link';
import { useMemo, useState } from "react";
import { useCart, CATALOG, formatCurrency } from './cart/page';
import Navbar from './components/Navbar'
import SectionBlock from './components/SectionBlock';
import CartDrawer from './cart/cartdrawer';

export default function Home() {
  return (
    // Apply the animated background fade here:
    <main className="min-h-screen animate-lavender-burnt">
      <Header />
      <CartDrawer />

      {/* Second section: remove bg-black so the fade is visible */}
      <div id="Second section" className="flex items-center justify-center min-h-screen">
        <div className="flex-col"> {/* Word content container */}
          <h1 className="font-mono text-white text-4xl m-2">Welcome to ShopSite</h1><br/>
          <p className="font-mono text-white text-xl m-2">
            Welcome to ShopSite, your one-stop destination for stylish and affordable clothing for men, women, and kids. Whether you are updating your wardrobe or shopping for the whole family, we have something for everyone. Discover the latest trends, everyday essentials, and timeless pieces—all in one place
          </p>
        </div>
      </div>

      <Navbar />

      <div id="third section">
        <SectionBlock title='Shop Mens Clothing' content='Discover timeless style and everyday essentials in our men’s clothing collection. From casual wear to classic pieces, find everything you need to elevate your wardrobe with comfort, quality, and confidence.' href='/clothing/mens'/>
        <SectionBlock title='Shop Womens Clothing' content='Explore our versatile women’s clothing collection designed to fit every occasion. From chic everyday basics to elegant statement pieces, find styles that celebrate your unique look with comfort and confidence.' href='/clothing/womens'/>
        <SectionBlock title='Shop Kids Clothing' content='Shop our fun and durable kids’ clothing collection made for play, comfort, and style. From everyday essentials to colorful favorites, find outfits that keep up with your little ones’ energy and personality.' href='/clothing/kids'/>

        <div className="flex justify-end items-center h-25">
          {/* Contact Us button */}
          <Link href="/contactus">
            <button className='btn'>Contact Us</button>
          </Link>
        </div>
      </div>

      
    </main>
  );
}
