"use client";

import { useState, useMemo } from "react";
import { Product, Category } from "@/lib/types/ecommerce";
import { ProductGrid } from "@/components/products/product-grid";
import { ArrowUpDown } from "lucide-react";

interface CollectionViewProps {
  initialProducts: Product[];
  categories: Category[];
  currentCategoryHandle?: string;
  collectionTitle: string;
}

export function CollectionView({
  initialProducts,
  categories,
  currentCategoryHandle = "all",
  collectionTitle,
}: CollectionViewProps) {
  const [selectedCategory, setSelectedCategory] = useState(currentCategoryHandle);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [searchFilter, setSearchFilter] = useState("");

  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    // Category filter
    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category?.handle.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Keyword filter
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.variants.some((v) => v.title.toLowerCase().includes(q) || (v.sku && v.sku.toLowerCase().includes(q)))
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.minPrice - b.minPrice);
        break;
      case "price-desc":
        list.sort((a, b) => b.minPrice - a.minPrice);
        break;
      case "title-asc":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        list.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "best-selling":
        list.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      case "featured":
      default:
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return list;
  }, [initialProducts, selectedCategory, sortBy, searchFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Collection Header matching Debut theme */}
      <div className="pb-6 mb-8 border-b border-zinc-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
              {collectionTitle}
            </h1>
            <p className="text-xs text-red-500 font-extrabold uppercase tracking-widest mt-1">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </p>
          </div>

          {/* Controls: Search & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter in collection..."
              className="bg-black border border-zinc-700 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ffd000] focus:ring-1 focus:ring-[#ffd000]"
            />

            <div className="flex items-center gap-2 bg-black border border-zinc-700 px-3 py-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
              <label htmlFor="sort-select" className="text-xs text-zinc-400 uppercase font-bold">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black text-white text-xs font-bold uppercase focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="best-selling">Best Selling</option>
                <option value="title-asc">Alphabetically, A-Z</option>
                <option value="title-desc">Alphabetically, Z-A</option>
                <option value="price-asc">Price, low to high</option>
                <option value="price-desc">Price, high to low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 scrollbar-none pb-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors border ${
              selectedCategory === "all"
                ? "bg-red-600 text-white border-red-600 shadow-[0_0_10px_rgba(255,0,0,0.5)]"
                : "bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600"
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.handle}
              onClick={() => setSelectedCategory(cat.handle)}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors border ${
                selectedCategory === cat.handle
                  ? "bg-red-600 text-white border-red-600 shadow-[0_0_10px_rgba(255,0,0,0.5)]"
                  : "bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <ProductGrid
        products={filteredProducts}
        emptyMessage="No products match your selected filters. Try choosing another category."
      />
    </div>
  );
}
