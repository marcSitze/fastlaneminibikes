"use client";

import Link from "next/link";
import { X, ChevronRight } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Mini Bike Shop", href: "/collections/all" },
  { name: "Complete Mini Bikes", href: "/collections/complete-bikes" },
  { name: "Roller Kits & Frames", href: "/collections/roller-kits" },
  { name: "Engines & Performance", href: "/collections/engines" },
  { name: "Carburetors & Fuel", href: "/collections/fuel-system" },
  { name: "Exhaust Systems", href: "/collections/exhausts" },
  { name: "Wheels & Tires", href: "/collections/wheels-tires" },
  { name: "Seats & Controls", href: "/collections/controls-seats" },
  { name: "Merch & Stickers", href: "/collections/apparel" },
];

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden">
      <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-black border-r border-red-600/50 p-6 flex flex-col justify-between shadow-[4px_0_25px_rgba(255,0,0,0.3)] animate-in slide-in-from-left duration-200">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
            <span className="font-bold text-lg text-white tracking-widest uppercase">
              Fastlane Menu
            </span>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-1"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="mt-6 flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className="flex items-center justify-between py-3 px-2 text-white hover:text-red-500 font-bold uppercase tracking-wider text-sm border-b border-zinc-900 transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-zinc-600" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-zinc-800 space-y-4">
          <Link
            href="/account/login"
            onClick={onClose}
            className="block text-center w-full py-2.5 border border-zinc-700 text-white font-bold uppercase text-xs tracking-wider hover:border-red-600 hover:text-red-500 transition-colors"
          >
            Customer Account / Log in
          </Link>

          <a
            href="http://instagram.com/FLR_MINIBIKES"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-zinc-400 hover:text-red-500 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>@flr_minibikes</span>
          </a>
        </div>
      </div>
    </div>
  );
}
