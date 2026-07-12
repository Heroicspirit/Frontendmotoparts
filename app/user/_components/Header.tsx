"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
    { href: "/user/dashboard", label: "Home" },
    { href: "/user/bikeparts", label: "Bike Parts" },
    { href: "/brands", label: "Brands" },
    { href: "/offers", label: "Offers" },
];

export default function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const { cartCount } = useCart();

    const isActive = (href: string) => pathname?.startsWith(href);

    return (
        <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0f1115]/90 backdrop-blur-md px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              
              {/* Logo */}
              <Link href="/user/dashboard" className="text-xl font-bold tracking-tight text-white hover:opacity-90 transition">
                Moto<span className="text-blue-400">Parts</span>
              </Link>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
                <Link href="/user/dashboard" className="text-white border-b-2 border-blue-400 pb-0.5">Home</Link>
                <Link href="/user/bikeparts" className="hover:text-white transition">Bike Parts</Link>
                <a href="#" className="hover:text-white transition">Brands</a>
                <a href="#" className="hover:text-white transition">Offers</a>
              </nav>

              {/* Search Bar */}
              <div className="relative flex-1 max-w-md mx-4 hidden sm:block">
                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                  <Search className="w-4 h-4" />
                </span>
                <input 
                  type="text" 
                  placeholder="Search parts..." 
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-full py-1.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>

              {/* Actions Block */}
              <div className="flex items-center gap-3">
                {/* Shopping Cart */}
                <Link href="/user/cart" className="relative p-2 text-slate-400 hover:text-white transition mr-1">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 bg-blue-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {cartCount > 9 ? "9+" : cartCount}
                    </span>
                  )}
                </Link>

                {/* User Button */}
                <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-300 hidden md:inline">Dashboard</span>
                </div>

                {/* Mobile hamburger */}
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  aria-label="Toggle menu"
                  aria-expanded={open}
                  className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-800 hover:bg-slate-800 transition-colors"
                >
                  {open ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-slate-400">
                      <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-slate-400">
                      <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile panel */}
            <div className={"md:hidden overflow-hidden transition-[max-height] duration-300 " + (open ? "max-h-96" : "max-h-0")}>
              <div className="pb-4 pt-2 border-t border-slate-800">
                <div className="flex flex-col gap-2">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`${isActive(link.href) ? "text-white font-semibold" : "text-slate-400"} py-2 transition-colors`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
        </header>
    );
}