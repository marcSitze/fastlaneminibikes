import Link from "next/link";
import { Product } from "@/lib/types/ecommerce";
import { ProductGrid } from "@/components/products/product-grid";
import { ArrowRight, Trophy } from "lucide-react";

interface FeaturedCollectionProps {
  products: Product[];
}

export function FeaturedCollection({ products }: FeaturedCollectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-zinc-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-red-500 text-xs font-bold uppercase tracking-widest mb-1">
            <Trophy className="w-3.5 h-3.5" />
            <span>TRACK &amp; DRAG TESTED</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
            Featured Mini Bikes &amp; Rollers
          </h2>
        </div>

        <Link
          href="/collections/all"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-red-500 hover:text-white font-bold uppercase tracking-widest transition-colors self-start sm:self-auto"
        >
          <span>See Full Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <ProductGrid products={products} />
    </section>
  );
}
