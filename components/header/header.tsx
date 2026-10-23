"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Menu, User } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { SearchDrawer } from "@/components/header/search-drawer";
import { MobileNav } from "@/components/header/mobile-nav";
import { AnnouncementBar } from "@/components/header/announcement-bar";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const openCart = useCartStore((s) => s.openCart);
  const items = useCartStore((s) => s.items);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <AnnouncementBar />

      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-red-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="text-white hover:text-red-500 p-2 focus:outline-none"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Desktop Navigation Left */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="/"
                className="text-white hover:text-red-500 font-bold uppercase tracking-wider text-sm transition-colors"
              >
                Home
              </Link>
              <Link
                href="/collections/all"
                className="text-white hover:text-red-500 font-bold uppercase tracking-wider text-sm transition-colors"
              >
                Mini Bike Shop
              </Link>
              <Link
                href="/collections/complete-bikes"
                className="text-white hover:text-red-500 font-bold uppercase tracking-wider text-sm transition-colors"
              >
                Bikes
              </Link>
              <Link
                href="/collections/roller-kits"
                className="text-white hover:text-red-500 font-bold uppercase tracking-wider text-sm transition-colors"
              >
                Rollers &amp; Frames
              </Link>
            </nav>

            {/* Center Logo */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <Link href="/" className="block py-2">
                <div className="relative w-36 sm:w-44 h-12 sm:h-14">
                  <Image
                    src="https://fastlaneminibikes.com/cdn/shop/files/FL_1_d39e2372-6212-4da8-a635-345ca33bc321_155x.png?v=1685030855"
                    alt="Fastlane Mini Bikes"
                    fill
                    sizes="(max-width: 640px) 144px, 176px"
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Right Icons: Search, Account, Cart */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-white hover:text-red-500 transition-colors p-1"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/account/login"
                className="hidden sm:flex items-center gap-1.5 text-white hover:text-red-500 font-bold uppercase text-xs tracking-wider transition-colors p-1"
              >
                <User className="w-4 h-4" />
                <span>Log in</span>
              </Link>

              <button
                onClick={openCart}
                className="relative text-white hover:text-red-500 transition-colors p-1 flex items-center gap-1"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden sm:inline font-bold uppercase text-xs tracking-wider">
                  Cart
                </span>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(255,0,0,0.8)] animate-in zoom-in">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <SearchDrawer isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  );
}
