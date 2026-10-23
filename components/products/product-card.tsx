"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types/ecommerce";
import { PriceDisplay } from "@/components/products/price-display";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cartStore";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const primaryImage = product.images[0]?.src || "";
  const isAvailable = product.variants.some((v) => v.available);
  const defaultVariant = product.variants[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!defaultVariant || !isAvailable) return;

    addItem({
      id: `${product.id}-${defaultVariant.id}`,
      productId: product.id,
      variantId: defaultVariant.id,
      title: product.title,
      variantTitle: defaultVariant.title,
      price: defaultVariant.price,
      comparePrice: defaultVariant.comparePrice,
      image: primaryImage,
      handle: product.handle,
    });
  };

  return (
    <div className="group relative bg-[#0a0a0a] border border-zinc-900 hover:border-red-600/70 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-[0_4px_20px_rgba(255,0,0,0.25)]">
      <div>
        {/* Image wrapper */}
        <Link href={`/products/${product.handle}`} className="block relative aspect-square bg-zinc-950 overflow-hidden">
          {primaryImage ? (
            <Image
              src={primaryImage}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-700 text-xs">
              No Image
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {!isAvailable && <Badge variant="soldOut">Sold out</Badge>}
            {product.variants.some((v) => v.comparePrice && v.comparePrice > v.price) && (
              <Badge variant="sale">Sale</Badge>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="p-4 space-y-1.5">
          <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">
            {product.vendor || "Fastlane Mini Bikes"}
          </p>

          <h3 className="font-bold text-white group-hover:text-red-500 text-sm leading-tight line-clamp-2 transition-colors">
            <Link href={`/products/${product.handle}`}>{product.title}</Link>
          </h3>

          <PriceDisplay
            price={product.minPrice}
            comparePrice={defaultVariant?.comparePrice}
            minPrice={product.minPrice}
            maxPrice={product.maxPrice}
            className="pt-1"
          />
        </div>
      </div>

      {/* Action button */}
      <div className="p-4 pt-0">
        {isAvailable ? (
          <button
            onClick={handleQuickAdd}
            className="w-full py-2 px-3 border border-zinc-800 group-hover:border-red-600 bg-zinc-950 group-hover:bg-red-600 text-white font-bold uppercase text-xs tracking-wider transition-all duration-200"
          >
            {product.variants.length > 1 ? "Choose Options" : "Add to Cart"}
          </button>
        ) : (
          <button
            disabled
            className="w-full py-2 px-3 border border-zinc-900 bg-zinc-950 text-zinc-600 font-bold uppercase text-xs tracking-wider cursor-not-allowed"
          >
            Sold Out
          </button>
        )}
      </div>
    </div>
  );
}
