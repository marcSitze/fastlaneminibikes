import { Product } from "@/lib/types/ecommerce";
import { ProductCard } from "@/components/products/product-card";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  emptyMessage = "No products found in this collection.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 px-4 border border-zinc-900 bg-zinc-950">
        <p className="text-zinc-400 font-bold uppercase tracking-wider text-base">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
