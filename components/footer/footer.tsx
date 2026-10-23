import Link from "next/link";
import { MapPin, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram";
import { NewsletterForm } from "@/components/footer/newsletter-form";

export function Footer() {
  return (
    <footer className="bg-black border-t-2 border-red-600/40 text-white mt-16">
      {/* Value Badges Banner */}
      <div className="border-b border-zinc-900 bg-zinc-950/60 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 bg-red-950/50 border border-red-600/40 text-red-500">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-xs uppercase tracking-wider">Fast Nationwide Shipping</p>
              <p className="text-[11px] text-zinc-400">Shipped 1-7 days following order</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 bg-red-950/50 border border-red-600/40 text-red-500">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-xs uppercase tracking-wider">Born in Los Angeles</p>
              <p className="text-[11px] text-zinc-400">Est. 2015 custom minibike culture</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 bg-red-950/50 border border-red-600/40 text-red-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-xs uppercase tracking-wider">Authentic High Performance</p>
              <p className="text-[11px] text-zinc-400">Billet parts, ARC, PWK &amp; RLV</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 bg-red-950/50 border border-red-600/40 text-red-500">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-xs uppercase tracking-wider">100% Track Tested</p>
              <p className="text-[11px] text-zinc-400">Built for speed &amp; reliability</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="space-y-4">
            <span className="text-lg font-black text-white tracking-widest uppercase block">
              Fastlane Mini Bikes
            </span>
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider leading-relaxed">
              Your 1 Stop Mini Bike Shop For Parts &amp; Upgrades. Mini Bikes are more than just a hobby, it’s a lifestyle!
            </p>
            <div className="pt-2">
              <a
                href="http://instagram.com/FLR_MINIBIKES"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-red-500 hover:text-white uppercase tracking-wider transition-colors border border-zinc-800 hover:border-red-600 px-3 py-1.5"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Follow @flr_minibikes</span>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-200 mb-4 pb-2 border-b border-zinc-800">
              Shop Minibikes
            </h4>
            <ul className="space-y-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400">
              <li>
                <Link href="/collections/all" className="hover:text-red-500 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/collections/complete-bikes" className="hover:text-red-500 transition-colors">
                  Complete Mini Bikes
                </Link>
              </li>
              <li>
                <Link href="/collections/roller-kits" className="hover:text-red-500 transition-colors">
                  Roller Kits &amp; Frames
                </Link>
              </li>
              <li>
                <Link href="/collections/engines" className="hover:text-red-500 transition-colors">
                  Engines &amp; Performance
                </Link>
              </li>
              <li>
                <Link href="/collections/exhausts" className="hover:text-red-500 transition-colors">
                  Exhaust Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* Parts & Accessories */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-200 mb-4 pb-2 border-b border-zinc-800">
              Parts &amp; Upgrades
            </h4>
            <ul className="space-y-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400">
              <li>
                <Link href="/collections/fuel-system" className="hover:text-red-500 transition-colors">
                  Carburetors &amp; Fuel Line
                </Link>
              </li>
              <li>
                <Link href="/collections/wheels-tires" className="hover:text-red-500 transition-colors">
                  Wheels, Slicks &amp; Rims
                </Link>
              </li>
              <li>
                <Link href="/collections/controls-seats" className="hover:text-red-500 transition-colors">
                  Custom 19&quot; Seats
                </Link>
              </li>
              <li>
                <Link href="/collections/apparel" className="hover:text-red-500 transition-colors">
                  FLMB Stickers &amp; Merch
                </Link>
              </li>
              <li>
                <Link href="/account/login" className="hover:text-red-500 transition-colors">
                  Customer Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Icons */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p className="font-bold uppercase tracking-wider text-center sm:text-left">
            &copy; {new Date().getFullYear()}, Fastlane Mini Bikes LLC. All rights reserved.
          </p>

          <div className="flex items-center flex-wrap gap-2 text-[10px] uppercase font-bold text-zinc-400">
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800">Visa</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800">Mastercard</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800">Amex</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800">Discover</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800">PayPal</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800">Apple Pay</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800">Shop Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
