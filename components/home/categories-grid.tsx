import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const CATEGORIES = [
  {
    title: "Complete Mini Bikes",
    handle: "complete-bikes",
    image: "https://cdn.shopify.com/s/files/1/0541/1605/7279/files/FullSizeRender.heic?v=1741872418&format=jpg&width=1200",
    desc: "Ready-to-ride stock and custom drag minibikes",
  },
  {
    title: "Roller Kits & Frames",
    handle: "roller-kits",
    image: "https://cdn.shopify.com/s/files/1/0541/1605/7279/files/FullSizeRender_8ea37b48-e72d-485b-b1fb-0adda3338f41.heic?v=1741874655&format=jpg&width=1200",
    desc: "5in and 6in rollers, 357 chassis kits",
  },
  {
    title: "Engines & Performance",
    handle: "engines",
    image: "https://cdn.shopify.com/s/files/1/0541/1605/7279/files/692DCA69-A584-486B-99EF-86CB371FCA8E.jpg?v=1682560676",
    desc: "212cc engines, billet rods, valve springs",
  },
  {
    title: "Carburetors & Fuel",
    handle: "fuel-system",
    image: "https://cdn.shopify.com/s/files/1/0541/1605/7279/files/1F940738-5F89-4906-BD05-316E6F8CC514.jpg?v=1683610646",
    desc: "28mm PWK carburetors, manifolds, pumps",
  },
  {
    title: "Exhaust Systems",
    handle: "exhausts",
    image: "https://cdn.shopify.com/s/files/1/0541/1605/7279/files/IMG-2248.heic?v=1741899134&format=jpg&width=1200",
    desc: "Low center & side exit racing trumpet exhausts",
  },
  {
    title: "Wheels & Tires",
    handle: "wheels-tires",
    image: "https://cdn.shopify.com/s/files/1/0541/1605/7279/files/75D69604-1C0A-4ECC-9C08-FCAD40990D0B.jpg?v=1683610781",
    desc: "Slicks, knobbies, Azusa rims, split sprockets",
  },
  {
    title: "Custom Seats & Controls",
    handle: "controls-seats",
    image: "https://cdn.shopify.com/s/files/1/0541/1605/7279/files/E8820DEE-D190-4ABC-857B-BF8D8D6E5F4B_1.jpg?v=1683610705",
    desc: "19in diamond stitched seats & 1/4 turn throttles",
  },
  {
    title: "Stickers & Merch",
    handle: "apparel",
    image: "https://cdn.shopify.com/s/files/1/0541/1605/7279/files/Untitled-3.png?v=1685589718",
    desc: "Official Fastlane decals & racing stickers",
  },
];

export function CategoriesGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
            Explore Categories
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-bold uppercase tracking-wider mt-1">
            Engineered for speed, durability, and track performance
          </p>
        </div>
        <Link
          href="/collections/all"
          className="text-xs sm:text-sm text-red-500 hover:text-white font-bold uppercase tracking-widest flex items-center gap-1 transition-colors"
        >
          <span>View All (44)</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.handle}
            href={`/collections/${cat.handle}`}
            className="group relative bg-[#0d0d0d] border border-zinc-800 hover:border-red-600 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] flex flex-col"
          >
            <div className="relative aspect-square w-full bg-black overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            </div>

            <div className="p-4 bg-zinc-950 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-white group-hover:text-red-500 transition-colors uppercase leading-snug">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-3 flex items-center text-xs font-bold text-red-500 group-hover:text-white transition-colors uppercase tracking-wider">
                <span>Shop Category</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
