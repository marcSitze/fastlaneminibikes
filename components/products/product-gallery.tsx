"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductImage } from "@/lib/types/ecommerce";

interface ProductGalleryProps {
  images: ProductImage[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-600 text-sm">
        No image available
      </div>
    );
  }

  const activeImage = images[selectedIndex] || images[0];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full bg-black border-2 border-zinc-800 hover:border-red-600/60 overflow-hidden shadow-[0_0_20px_rgba(255,0,0,0.15)] transition-all">
        <Image
          src={activeImage.src}
          alt={activeImage.alt || title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 h-20 flex-shrink-0 bg-zinc-950 border-2 overflow-hidden transition-all ${
                idx === selectedIndex
                  ? "border-red-600 shadow-[0_0_10px_rgba(255,0,0,0.5)]"
                  : "border-zinc-800 hover:border-zinc-600"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt || `${title} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
