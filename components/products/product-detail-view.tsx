"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, ProductVariant } from "@/lib/types/ecommerce";
import { ProductGallery } from "@/components/products/product-gallery";
import { PriceDisplay } from "@/components/products/price-display";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import {
  Truck,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Plus,
  Minus,
  ChevronRight,
} from "lucide-react";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      id: "default",
      title: "Default",
      price: product.minPrice,
      available: true,
    }
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    if (!selectedVariant.available) return;

    addItem(
      {
        id: `${product.id}-${selectedVariant.id}`,
        productId: product.id,
        variantId: selectedVariant.id,
        title: product.title,
        variantTitle: selectedVariant.title,
        price: selectedVariant.price,
        comparePrice: selectedVariant.comparePrice,
        image: product.images[0]?.src || "",
        handle: product.handle,
      },
      quantity
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-8">
        <Link href="/" className="hover:text-red-500 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/collections/all" className="hover:text-red-500 transition-colors">
          Products
        </Link>
        {product.category && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href={`/collections/${product.category.handle}`}
              className="hover:text-red-500 transition-colors"
            >
              {product.category.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        <span className="text-white truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Gallery Column */}
        <ProductGallery images={product.images} title={product.title} />

        {/* Product Info Column */}
        <div className="space-y-6">
          <div>
            <p className="text-xs text-red-500 font-extrabold uppercase tracking-widest mb-1">
              {product.vendor || "Fastlane Mini Bikes"}
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider leading-tight">
              {product.title}
            </h1>
          </div>

          {/* Pricing & Availability */}
          <div className="flex items-center gap-4 py-3 border-y border-zinc-800">
            <PriceDisplay
              price={selectedVariant.price}
              comparePrice={selectedVariant.comparePrice}
              className="text-2xl font-black"
            />

            {selectedVariant.available ? (
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-400 bg-green-950/40 border border-green-800/60 px-2.5 py-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>In Stock &amp; Ready to Ship</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/40 border border-red-800/60 px-2.5 py-1">
                <XCircle className="w-3.5 h-3.5" />
                <span>Sold Out</span>
              </div>
            )}
          </div>

          {/* Variant Selector */}
          {product.variants.length > 1 && (
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                Select Option / Variant:
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-all ${
                      v.id === selectedVariant.id
                        ? "bg-red-600 text-white border-red-600 shadow-[0_0_12px_rgba(255,0,0,0.5)]"
                        : "bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-600"
                    }`}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-zinc-700 bg-black">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-3 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-white min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                  className="px-3 py-3 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1">
                <Button
                  variant="primary"
                  size="lg"
                  disabled={!selectedVariant.available}
                  onClick={handleAddToCart}
                  className="w-full text-sm font-black tracking-widest shadow-[0_0_20px_rgba(255,0,0,0.4)]"
                >
                  {added
                    ? "✓ Added to Cart!"
                    : selectedVariant.available
                    ? "Add to Cart"
                    : "Sold Out"}
                </Button>
              </div>
            </div>
          </div>

          {/* Shipping & Handling Notice matching reference */}
          <div className="p-4 bg-zinc-950 border border-zinc-900 space-y-3">
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-zinc-300 leading-relaxed">
                <span className="font-bold text-white uppercase block">
                  Processing &amp; Delivery:
                </span>
                Orders will be shipped within 1-7 business days following payment and order processing. Fast Lane Mini Bikes LLC guarantees secure packaging and fast handling.
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-zinc-900 text-xs text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-zinc-500" />
              <span>Authentic Fastlane Mini Bikes racing grade components.</span>
            </div>
          </div>

          {/* Description Section */}
          <div className="pt-4 border-t border-zinc-800 space-y-3">
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Product Description
            </h3>
            <div className="text-sm text-zinc-300 leading-relaxed font-normal whitespace-pre-line">
              {product.description}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 pt-12 border-t-2 border-zinc-900">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
              You May Also Like
            </h2>
            <Link
              href="/collections/all"
              className="text-xs font-bold text-red-500 hover:text-white uppercase tracking-wider"
            >
              Browse All
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.handle}`}
                className="group bg-zinc-950 border border-zinc-900 hover:border-red-600 p-3 flex flex-col justify-between transition-all"
              >
                <div className="relative aspect-square w-full bg-black mb-3 overflow-hidden">
                  {rel.images[0]?.src && (
                    <Image
                      src={rel.images[0].src}
                      alt={rel.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-white group-hover:text-red-500 text-xs uppercase line-clamp-1 transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-red-500 font-bold text-xs mt-1">
                    ${rel.minPrice.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
