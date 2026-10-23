import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";

export function MissionSection() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/60 border border-red-600/50 text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
        <Flame className="w-4 h-4 text-red-500" />
        <span>LOS ANGELES • EST 2015</span>
      </div>

      <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-wide leading-relaxed max-w-3xl mx-auto uppercase">
        Est 2015 in Los Angeles Fast Lane Mini Bikes LLC is Your 1 Stop Mini Bike Shop For Parts &amp; Upgrades.
      </h1>

      <p className="mt-6 text-base sm:text-lg text-zinc-300 font-bold uppercase tracking-wider leading-relaxed max-w-2xl mx-auto">
        Mini Bikes are more than just a Hobbie it’s a Life Style Great way to Introduce the younger generation into World of Motor Sports.
      </p>

      <p className="mt-4 text-sm sm:text-base text-red-500 font-extrabold uppercase tracking-widest max-w-xl mx-auto">
        Join us in Fast Lane &amp; follow us on Instagram{" "}
        <a
          href="http://instagram.com/FLR_MINIBIKES"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white transition-colors"
        >
          @flr_minibikes
        </a>{" "}
        and Remember Life is Better With a Mini Bike!
      </p>

      {/* Primary CTA Button */}
      <div className="mt-10">
        <Link
          href="/collections/all"
          className="inline-flex items-center justify-center gap-3 bg-white hover:bg-red-600 text-red-600 hover:text-white font-black text-base sm:text-lg uppercase tracking-widest px-8 sm:px-12 py-4 border-2 border-white hover:border-red-600 shadow-[0_0_20px_rgba(255,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,0,0,0.8)] transition-all duration-300"
        >
          <span>CLICK TO SHOP</span>
          <ArrowRight className="w-5 h-5 stroke-[3]" />
        </Link>
      </div>
    </section>
  );
}
