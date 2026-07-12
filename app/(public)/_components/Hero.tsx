import React from "react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-[#131722] to-[#0f1115] px-6 py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6 z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Find the Right Parts for Your Ride
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl">
            Precision engineered components and premium riding gear balanced for performance. Upgrade your motorcycle with industry-leading reliability.
          </p>
          <div>
            <button className="bg-blue-400 hover:bg-blue-500 text-slate-950 font-semibold px-6 py-3 rounded-full transition shadow-lg shadow-blue-400/20">
              Shop Parts
            </button>
          </div>
        </div>
        <div className="lg:col-span-6 relative flex justify-center">
          <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full max-w-md mx-auto"></div>
          <img 
            src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80" 
            alt="Superbike Profile" 
            className="relative rounded-2xl max-h-[450px] object-cover drop-shadow-2xl mix-blend-lighten"
          />
        </div>
      </div>
    </section>
  );
}