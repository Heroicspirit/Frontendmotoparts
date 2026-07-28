import React from "react";
import Link from "next/link";

export default function FeaturedCategories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-bold mb-8 text-white">Featured Categories</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        <Link href="/user/bikeparts" className="md:col-span-5 group relative overflow-hidden rounded-2xl border border-slate-800 h-[380px] flex items-end p-6 cursor-pointer">
          <img 
            src="/images/motopa.jpg" 
            alt="Bike Engine Parts" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="relative z-10 space-y-1">
            <h3 className="text-xl font-bold text-white">Bike Parts</h3>
            <p className="text-sm text-slate-400">Engines, Exhausts & Brakes</p>
          </div>
        </Link>

        <div className="md:col-span-7 flex flex-col gap-6">
          
          <Link href="/user/ridinggear" className="group relative overflow-hidden rounded-2xl border border-slate-800 h-[178px] flex items-end p-6 cursor-pointer">
            <img 
              src="/images/riding gear.jpg" 
              alt="Riding Gear" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="relative z-10 space-y-0.5">
              <h3 className="text-lg font-bold text-white">Riding Gear</h3>
            </div>
          </Link>

          <Link href="/user/tires" className="group relative overflow-hidden rounded-2xl border border-slate-800 h-[178px] flex items-end p-6 cursor-pointer">
            <img 
              src="/images/tire.jpg" 
              alt="Motorcycle Tires" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="relative z-10 space-y-0.5">
              <h3 className="text-lg font-bold text-white">Tires</h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}