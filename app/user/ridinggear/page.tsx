"use client";

import React, { useState, useEffect } from "react";
import { 
  Heart, 
  ShoppingCart, 
  SlidersHorizontal, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  X,
  Search 
} from "lucide-react";
import Header from "../_components/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { getProductsByCategory, searchProducts } from "@/lib/api/products";

export default function RidingGearPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<(string | number)[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const MAX_PRICE = 20000;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(MAX_PRICE);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProductsByCategory('ridinggear');
      if (response.success) {
        setProducts(response.data || response.products || []);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      fetchProducts();
      return;
    }

    try {
      setIsSearching(true);
      const response = await searchProducts(query);
      if (response.success) {
        setProducts(response.data || response.products || []);
      }
    } catch (error) {
      console.error('Failed to search products:', error);
      setProducts([]);
    } finally {
      setIsSearching(false);
    }
  };

  const toggleFavorite = (id: string | number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      product: product._id || product.id,
      title: product.title,
      image: product.image?.startsWith('http') ? product.image : `http://localhost:5001${product.image}`,
      price: parseFloat(product.price),
      quantity: 1
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleBuyNow = (product: any) => {
    addToCart({
      product: product._id || product.id,
      title: product.title,
      image: product.image?.startsWith('http') ? product.image : `http://localhost:5001${product.image}`,
      price: parseFloat(product.price),
      quantity: 1
    });
    router.push('/checkout');
  };

  const resetFilters = () => {
    setSelectedBrand("");
    setMaxPrice(MAX_PRICE);
    setInStockOnly(false);
  };

  const filteredProducts = products.filter((product: any) => {
    if (selectedBrand && product.brand?.toLowerCase() !== selectedBrand.toLowerCase()) {
      return false;
    }

    const price = parseFloat(product.price);
    if (maxPrice < MAX_PRICE && !isNaN(price) && price > maxPrice) {
      return false;
    }

    if (inStockOnly && (!product.stock || product.stock <= 0)) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#0f1115] flex flex-col">
      <Header />
      <main className="flex-1 p-6 lg:p-10">

      {showToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#1f2635] border border-slate-800 rounded-xl p-4 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
          <div className="text-left pr-4">
            <p className="text-xs font-bold text-white">Added to cart successfully!</p>
            <p className="text-[11px] text-slate-400">1 item added to your selection</p>
          </div>
          <button 
            onClick={() => setShowToast(false)} 
            className="text-slate-500 hover:text-slate-300 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

        <aside className="w-full lg:w-60 shrink-0 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-900">
            <h3 className="text-sm font-bold tracking-wider uppercase text-white">Filters</h3>
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between cursor-pointer group">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">Brand</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <div className="space-y-2.5 pl-0.5">
              {["Alpinestars", "Rev'it!", "Dainese"].map((brand) => (
                <label key={brand} className="flex items-center gap-3 text-xs text-slate-400 hover:text-slate-200 cursor-pointer select-none">
                  <input 
                    type="checkbox"
                    checked={selectedBrand === brand}
                    onChange={() => setSelectedBrand(prev => prev === brand ? "" : brand)}
                    className="w-4 h-4 rounded border-slate-800 bg-[#111319] text-blue-500 focus:ring-0 accent-blue-500" 
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">Price Range</span>
              <button
                onClick={resetFilters}
                className="text-[10px] font-semibold text-blue-400 hover:text-blue-300 transition"
              >
                Show All
              </button>
            </div>
            <div className="space-y-2">
              <input
                type="range"
                min={0}
                max={MAX_PRICE}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-medium text-slate-500">
                <span>Rs 0</span>
                <span>{maxPrice >= MAX_PRICE ? `Rs ${MAX_PRICE}+` : `Rs ${maxPrice}`}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">Size</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <button className="w-full bg-[#111319] border border-slate-800/80 rounded-xl px-3 py-2.5 flex items-center justify-between text-xs text-slate-400 hover:border-slate-700 transition">
              <span>Select Size</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">Availability</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <label className="flex items-center gap-3 text-xs text-slate-400 hover:text-slate-200 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded border-slate-800 bg-[#111319] text-blue-500 focus:ring-0 accent-blue-500" 
              />
              <span>In Stock</span>
            </label>
          </div>
        </aside>

        <div className="flex-1 space-y-6">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-900">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Riding Gear</h1>
              <p className="text-xs text-slate-500 pt-0.5">
                Showing {filteredProducts.length} of {products.length} results
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-[#111319] border border-slate-800/80 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-700 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-slate-500">Sort by:</span>
              <button className="bg-[#111319] border border-slate-800/80 rounded-xl px-4 py-2 flex items-center gap-3 text-xs font-semibold text-white hover:border-slate-700 transition">
                <span>Highest Price</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {loading && (
            <div className="text-center text-slate-500 text-sm py-12">
              Loading products...
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center text-slate-500 text-sm py-12">
              No products found for the selected filters.
            </div>
          )}

          {!loading && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product: any) => {
                const productId = product._id || product.id;
                const isFavorite = favorites.includes(productId);

                return (
                  <div key={productId} className="group bg-[#111319] border border-slate-900 rounded-2xl p-4 flex flex-col justify-between space-y-4 hover:border-slate-800 transition duration-150">

                    <div className="relative rounded-xl overflow-hidden aspect-square bg-[#0a0c10] flex items-center justify-center">
                      {product.tag && (
                        <span className="absolute top-3 left-3 z-10 bg-blue-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                          {product.tag}
                        </span>
                      )}
                      {product.discount && (
                        <span className="absolute top-3 left-3 z-10 bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-md">
                          {product.discount}
                        </span>
                      )}

                      <button 
                        onClick={() => toggleFavorite(productId)}
                        className="absolute top-3 right-3 z-10 p-1.5 bg-[#0a0c10]/40 backdrop-blur-sm rounded-full text-slate-400 hover:text-rose-500 hover:scale-105 transition"
                      >
                        <Heart 
                          className={`w-4 h-4 ${isFavorite ? "text-rose-500" : ""}`}
                          fill={isFavorite ? "currentColor" : "none"}
                        />
                      </button>

                      <img 
                        src={product.image?.startsWith('http') ? product.image : `http://localhost:5001${product.image}`} 
                        alt={product.title} 
                        className="w-full h-full object-cover brightness-90 group-hover:scale-102 transition duration-300"
                      />
                    </div>

                    <div className="space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                          {product.brand}
                        </span>
                        <h4 className="text-sm font-semibold text-slate-200 line-clamp-2 leading-snug group-hover:text-white transition">
                          {product.title}
                        </h4>
                        {product.inStock && (
                          <span className="inline-block bg-slate-800/60 text-slate-400 text-[10px] font-medium px-2 py-0.5 rounded mt-1">
                            In Stock
                          </span>
                        )}
                      </div>

                      <div className="space-y-3 pt-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-bold text-white">
                            Rs {product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-slate-600 line-through">
                              Rs {product.originalPrice}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleBuyNow(product)} 
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition shadow-sm shadow-blue-500/5 text-center"
                          >
                            Buy Now
                          </button>
                          <button 
                            onClick={() => handleAddToCart(product)} 
                            className="p-2.5 bg-[#181d29] hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-xl border border-slate-800/80 transition"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

          <div className="flex items-center justify-center gap-2 pt-8">
            <button className="p-2 bg-[#111319] border border-slate-900 rounded-xl text-slate-500 hover:text-slate-300 transition disabled:opacity-40" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center shadow-md shadow-blue-500/10">
              1
            </button>
            <button className="w-8 h-8 bg-[#111319] border border-slate-900 text-slate-400 hover:text-slate-200 font-semibold text-xs rounded-xl flex items-center justify-center transition">
              2
            </button>
            <button className="w-8 h-8 bg-[#111319] border border-slate-900 text-slate-400 hover:text-slate-200 font-semibold text-xs rounded-xl flex items-center justify-center transition">
              3
            </button>
            <button className="p-2 bg-[#111319] border border-slate-900 rounded-xl text-slate-400 hover:text-slate-200 transition">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
      </main>

    </div>
  );
}