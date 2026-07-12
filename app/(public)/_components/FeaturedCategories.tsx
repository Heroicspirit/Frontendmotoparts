import React from "react";

export default function FeaturedCategories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-bold mb-8 text-white">Featured Categories</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Big Card: Bike Parts */}
        <div className="md:col-span-5 group relative overflow-hidden rounded-2xl bg-gradient-to-t from-black/80 to-transparent border border-slate-800 h-[380px] flex items-end p-6">
          <img 
            src="https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=600&q=80" 
            alt="Bike Engine Parts" 
            className="absolute inset-0 w-full h-full object-cover -z-10 group-hover:scale-105 transition duration-500 brightness-[0.65]" 
          />
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">Bike Parts</h3>
            <p className="text-sm text-slate-400">Engines, Exhausts & Brakes</p>
          </div>
        </div>

        {/* Split Container Right */}
        <div className="md:col-span-7 flex flex-col gap-6">
          {/* Top Row: Riding Gear */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-t from-black/80 to-transparent border border-slate-800 h-[178px] flex items-end p-6">
            <img 
              src="https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=800&q=80" 
              alt="Riding Gear Helmet" 
              className="absolute inset-0 w-full h-full object-cover -z-10 group-hover:scale-105 transition duration-500 brightness-[0.55]" 
            />
            <div className="space-y-0.5">
              <h3 className="text-lg font-bold text-white">Riding Gear</h3>
            </div>
          </div>

          {/* Bottom Row: Tires */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-t from-black/80 to-transparent border border-slate-800 h-[178px] flex items-end p-6">
            <img 
              src="https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80" 
              alt="Motorcycle Tires" 
              className="absolute inset-0 w-full h-full object-cover -z-10 group-hover:scale-105 transition duration-500 brightness-[0.5]" 
            />
            <div className="space-y-0.5">
              <h3 className="text-lg font-bold text-white">Tires</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}