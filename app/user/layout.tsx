"use client";

import { Home, Settings, ShoppingCart, ShieldAlert, LogOut, PackageSearch } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "../(public)/_components/Footer";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0f1115] flex flex-col">
      {children}
      <Footer />
    </div>
  );
}
