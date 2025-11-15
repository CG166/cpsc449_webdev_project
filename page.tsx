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

type TabKey = "overview" | "orders" | "payments";

const tabs: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "orders", label: "Orders" },
  { key: "payments", label: "Payment Methods" },
];


export function AccountLayout() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold tracking-tight">My Account</h1>
          <nav className="flex gap-4 text-sm text-slate-600">
            <a href="/" className="hover:text-slate-900">
              Home
            </a>
            <a href="/cart" className="hover:text-slate-900">
              Cart
            </a>
            <a href="/account" className="font-semibold text-slate-900">
              Account
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex gap-2 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`border-b-2 px-3 py-2 text-sm font-medium transition
                ${
                  activeTab === tab.key
                    ? "border-slate-900 text-slate-900"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && <OverviewSection />}
        {activeTab === "orders" && <OrdersSection />}
        {activeTab === "payments" && <PaymentMethodsSection />}
      </main>
    </div>
  );
}

function OverviewSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="rounded-xl border bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold text-slate-700">
          Profile
        </h2>
        <p className="text-sm text-slate-500">
          Logged in as <span className="font-medium text-slate-900">Demo User</span>
          <br />
          demo@example.com
        </p>
      </section>

      <section className="rounded-xl border bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold text-slate-700">
          Quick stats
        </h2>
        <ul className="space-y-1 text-sm text-slate-600">
          <li>
            <span className="font-semibold text-slate-900">3</span> active orders
          </li>
          <li>
            <span className="font-semibold text-slate-900">$412.00</span> spent this month
          </li>
          <li>
            <span className="font-semibold text-slate-900">2</span> saved payment methods
          </li>
        </ul>
      </section>
    </div>
  );
}

function OrdersSection() {
  // Fake data just for UI
  const orders = [
    {
      id: "ORD-1001",
      date: "2025-03-02",
      total: 129.99,
      status: "Shipped",
    },
    {
      id: "ORD-1000",
      date: "2025-02-24",
      total: 54.5,
      status: "Delivered",
    },
  ];

  return (
    <section className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-700">
          Order history
        </h2>
        <span className="text-xs text-slate-400">
          Showing {orders.length} orders
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-slate-50 text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">Order #</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Total</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b last:border-0">
                <td className="px-3 py-2 font-mono text-xs text-slate-900">
                  {o.id}
                </td>
                <td className="px-3 py-2 text-slate-600">{o.date}</td>
                <td className="px-3 py-2 text-slate-900">
                  ${o.total.toFixed(2)}
                </td>
                <td className="px-3 py-2">
                  <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PaymentMethodsSection() {
  const methods = [
    {
      id: 1,
      type: "Credit Card",
      brand: "Visa",
      last4: "4242",
      expiry: "03/29",
      isDefault: true,
    },
    {
      id: 2,
      type: "Digital Wallet",
      brand: "PayPal",
      last4: "****",
      expiry: "",
      isDefault: false,
    },
  ];

  return (
    <section className="space-y-3">
      {methods.map((m) => (
        <div
          key={m.id}
          className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm"
        >
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {m.brand}{" "}
              <span className="text-xs font-normal text-slate-500">
                ({m.type})
              </span>
            </p>
            <p className="text-xs text-slate-500">
              {m.last4 !== "****" ? `Ending in ${m.last4}` : "Linked account"}
              {m.expiry && ` - Expires ${m.expiry}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {m.isDefault && (
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs font-medium text-white">
                Default
              </span>
            )}
            <button className="rounded-lg border px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50">
              Edit
            </button>
          </div>
        </div>
      ))}

      <button className="mt-2 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
        + Add payment method
      </button>
    </section>
  );
}

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
        <SectionBlock title='Shop Mens Clothing' content='Discover timeless style and everyday essentials in our mens clothing collection. From casual wear to classic pieces, find everything you need to elevate your wardrobe with comfort, quality, and confidence.' href='/clothing/mens'/>
        <SectionBlock title='Shop Womens Clothing' content='Explore our versatile womens clothing collection designed to fit every occasion. From chic everyday basics to elegant statement pieces, find styles that celebrate your unique look with comfort and confidence.' href='/clothing/womens'/>
        <SectionBlock title='Shop Kids Clothing' content='Shop our fun and durable kids clothing collection made for play, comfort, and style. From everyday essentials to colorful favorites, find outfits that keep up with your little ones energy and personality.' href='/clothing/kids'/>

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
