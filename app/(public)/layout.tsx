import React from "react";
import Link from "next/link";
import { Search, ShoppingCart, Twitter, Instagram } from "lucide-react";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0f1115] text-[#f1f5f9] font-sans antialiased selection:bg-blue-500 selection:text-white">
      
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0f1115]/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tight text-white hover:opacity-90 transition">
            Moto<span className="text-blue-400">Parts</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <Link href="/" className="text-white border-b-2 border-blue-400 pb-0.5">Home</Link>
            <a href="#" className="hover:text-white transition">Bike Parts</a>
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
            <button className="relative p-2 text-slate-400 hover:text-white transition mr-1">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-1 right-1 bg-blue-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">1</span>
            </button>

            {/* Log In Button */}
            <Link href="/login">
              <button className="text-slate-200 hover:text-white font-medium text-sm px-4 py-2.5 rounded-full hover:bg-slate-800/60 transition border border-slate-800">
                Log in
              </button>
            </Link>

            {/* Sign Up Button */}
            <Link href="/register">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg shadow-blue-500/10 transition">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* CHILDPAGE BODY */}
      {children}

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950/40 px-6 py-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="text-sm font-bold text-white tracking-tight">
              Moto<span className="text-blue-400">Parts</span>
            </div>
            <p>© 2026 MotoParts. All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-6 text-slate-400">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Contact Us</a>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" className="hover:text-white transition"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white transition"><Instagram className="w-4 h-4" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}