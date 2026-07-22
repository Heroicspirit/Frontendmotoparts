"use client";

import React, { useEffect, useState, useRef } from "react";
import { 
  Search, 
  ShoppingCart, 
  User, 
  CheckCircle2, 
  Calendar, 
  Truck, 
  MapPin, 
  Pencil, 
  ArrowLeft 
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OrderSuccessPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<any>(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    const pendingOrder = sessionStorage.getItem('pendingOrder');
    if (!pendingOrder) {
      router.push('/user/cart');
      return;
    }
    setOrderData(JSON.parse(pendingOrder));
    sessionStorage.removeItem('pendingOrder');
  }, [router]);

  if (!orderData) {
    return <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center text-white">Loading...</div>;
  }

  const { orderNumber, items, shippingAddress, total, createdAt, paymentMethod } = orderData;
  const orderDate = createdAt ? new Date(createdAt).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }) : new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-200 antialiased font-sans flex flex-col justify-between">
      
      {/* HEADER NAVIGATION BAR */}
      <nav className="bg-[#0a0c10] border-b border-slate-900/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Category Links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-black tracking-tight text-white">
              Moto<span className="text-blue-500">Parts</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-400 tracking-wide uppercase">
              <Link href="/user/bikeparts" className="hover:text-white transition">Bike Parts</Link>
              <Link href="/accessories" className="hover:text-white transition">Accessories</Link>
              <Link href="/user/ridinggear" className="hover:text-white transition">Riding Gear</Link>
              <Link href="/brands" className="hover:text-white transition">Brands</Link>
              <Link href="/offers" className="hover:text-white transition">Offers</Link>
            </div>
          </div>

          {/* Search Bar & Toolbar Icons */}
          <div className="flex items-center gap-6 flex-1 max-w-md justify-end md:flex-initial">
            <div className="relative w-full max-w-[240px] hidden sm:block">
              <input 
                type="text" 
                placeholder="Search parts..." 
                className="w-full bg-[#11141d] border border-slate-800/80 rounded-full py-2 pl-9 pr-4 text-xs text-slate-300 outline-none focus:border-slate-700 transition"
              />
              <Search className="absolute left-3 top-2.5 text-slate-500" size={13} />
            </div>
            
            <div className="flex items-center gap-4 text-slate-400">
              <button className="hover:text-white transition">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1z" />
                </svg>
              </button>
              <Link href="/user/cart" className="hover:text-white transition relative">
                <ShoppingCart size={18} />
              </Link>
              <Link href="/user/dashboard" className="hover:text-white transition">
                <User size={18} />
              </Link>
            </div>
          </div>

        </div>
      </nav>

      {/* MAIN BODY CONTENT CONTAINER */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* CENTERED SUCCESS HERO STATEMENT */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full flex items-center justify-center">
            <CheckCircle2 size={28} />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">Thank you for your order.</h1>
            <p className="text-xs text-slate-400 font-medium">Your precision-engineered parts are being prepared for dispatch.</p>
          </div>
        </div>

        {/* CORE INTERFACE HUB GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SECTION BLOCKS */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* ORDER IDENTIFIER BANNER */}
            <div className="bg-[#11141e] border border-slate-850 rounded-xl p-5 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">Order Identifier</span>
                <h3 className="text-base font-bold text-slate-100 tracking-wide">#{orderNumber || 'MP-' + Math.random().toString(36).substr(2, 9).toUpperCase()}</h3>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 pt-0.5">
                  <Calendar size={12} className="text-slate-500" /> Order Date: {orderDate}
                </span>
              </div>
              {/* Dynamic Status Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/20 text-[11px] font-bold text-blue-400">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                Status: Confirmed
              </div>
            </div>

            {/* PURCHASED ITEMS STACK VIEW BOX */}
            <div className="bg-[#11141e] border border-slate-850 rounded-xl p-6 space-y-5">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Purchased Items</h2>

              {items.map((item: any, index: number) => (
                <div key={index} className="bg-[#0b0d14] rounded-lg p-3 flex gap-4 items-center border border-slate-900">
                  <div className="w-16 h-16 rounded overflow-hidden bg-[#131622] shrink-0 border border-slate-800">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover brightness-90"
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-semibold text-slate-200 truncate">{item.title}</h4>
                    <p className="text-[10px] text-slate-500 font-medium truncate">Qty: {item.quantity}</p>
                    <div className="text-xs font-bold text-white pt-0.5">Rs {(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* ESTIMATED DELIVERY BLOCK METRIC */}
            <div className="bg-[#11141e] border border-slate-850 rounded-xl p-6 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-[#171b26] border border-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                <Truck size={18} />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">Estimated Delivery</span>
                <h3 className="text-sm font-bold text-white">3-5 Business Days</h3>
                <p className="text-xs text-slate-400">Standard Technical Logistics</p>
              </div>
            </div>

          </div>

          {/* RIGHT SECTION SIDEBAR BLOCKS */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* SHIPPING DESTINATION CARD VIEW */}
            <div className="bg-[#11141e] border border-slate-850 rounded-xl p-6 space-y-5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin size={13} className="text-slate-400" /> Shipping To
              </h3>
              
              {/* Formatted Address Information Text */}
              <div className="text-xs text-slate-300 space-y-1 leading-relaxed pl-1">
                <div className="font-bold text-white text-xs pb-0.5">{shippingAddress.firstName} {shippingAddress.lastName}</div>
                <div>{shippingAddress.address}</div>
                <div>{shippingAddress.city}</div>
                <div>{shippingAddress.phone}</div>
              </div>

              {/* Payment Method */}
              <div className="text-xs text-slate-400 pt-2">
                <span className="font-bold text-white">Payment Method:</span> {paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'wallet' ? 'Khalti / IME Pay' : paymentMethod}
              </div>
            </div>

            {/* ORDER TOTAL SUMMARY DETAIL PANEL */}
            <div className="bg-[#11141e] border border-slate-850 rounded-xl p-6 space-y-5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Order Total</h3>

              {/* Pricing breakdown arrays */}
              <div className="space-y-4 text-xs border-b border-slate-900 pb-5">
                <div className="flex justify-between items-center text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">Rs {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Shipping Cost</span>
                  <span className="text-blue-400 font-bold tracking-wide text-[10px]">FREE</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Technical Tax</span>
                  <span className="text-white font-medium">Rs. 0</span>
                </div>
              </div>

              {/* Total Final Paid Block Display */}
              <div className="flex justify-between items-baseline pt-1">
                <span className="text-xs font-medium text-slate-400">Total Amount Paid</span>
                <span className="text-xl font-black text-blue-400">Rs {total.toFixed(2)}</span>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM REDIRECT ACTION LINK */}
        <div className="flex justify-center pt-4">
          <Link href="/user/dashboard" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition group">
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition" /> Back to Dashboard
          </Link>
        </div>

      </main>

      {/* SYSTEM BAR FOOTER */}
      <footer className="bg-[#090b10] border-t border-slate-900 text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="font-bold text-slate-400">MotoParts</span>
            <span>© 2024 MotoParts. Precision Engineering for Every Ride.</span>
          </div>
          <div className="flex items-center gap-6 font-medium">
            <Link href="/privacy" className="hover:text-slate-300 transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition">Terms of Service</Link>
            <Link href="/contact" className="hover:text-slate-300 transition">Contact Us</Link>
            <Link href="/shipping-info" className="hover:text-slate-300 transition">Shipping Info</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}