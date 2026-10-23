import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/repositories/products";
import { ProductGrid } from "@/components/products/product-grid";
import { Search as SearchIcon } from "lucide-react";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolved = await searchParams;
  const q = typeof resolved.q === "string" ? resolved.q : "";

  return {
    title: q ? `Search: "${q}" | Fastlane Mini Bikes` : "Search | Fastlane Mini Bikes",
    description: "Search Fastlane Mini Bikes catalog for parts, complete bikes, and upgrades.",
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const resolved = await searchParams;
  const query = typeof resolved.q === "string" ? resolved.q : "";

  const { products } = await getProducts({
    search: query,
    limit: 50,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header & Form */}
      <div className="max-w-2xl mx-auto text-center space-y-4 mb-12">
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
          Search Products
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 font-bold uppercase tracking-wider">
          Find your mini bike parts, rollers, frames, and performance upgrades
        </p>

        <form action="/search" method="get" className="flex items-center relative mt-6">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search catalog (e.g. roller, 212cc, tire, exhaust)..."
            className="w-full bg-zinc-950 border border-zinc-700 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#ffd000] focus:ring-1 focus:ring-[#ffd000]"
          />
          <button
            type="submit"
            className="absolute right-3 text-zinc-400 hover:text-red-500 p-1"
            aria-label="Search"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
        </form>

        {query && (
          <p className="text-xs text-red-500 font-black uppercase tracking-widest pt-2">
            {products.length} {products.length === 1 ? "result" : "results"} found for &quot;{query}&quot;
          </p>
        )}
      </div>

      {/* Grid or Empty */}
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : query ? (
        <div className="text-center py-16 border border-zinc-900 bg-zinc-950 max-w-xl mx-auto p-8 space-y-4">
          <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
            No products match your search for &quot;{query}&quot;.
          </p>
          <div className="pt-2">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Popular Searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Roller Kit", "212cc", "Frame", "Exhaust", "Slick Tire", "PWK Carburetor"].map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="px-3 py-1 bg-zinc-900 hover:bg-red-600 text-zinc-300 hover:text-white text-xs font-bold uppercase border border-zinc-800 transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
