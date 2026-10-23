"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    src: "https://i.shgcdn.com/a330c64d-adf3-4bc8-a039-513e9c67687a/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
    alt: "Custom Fastlane Mini Bike Build with Gold Chain and 6in Tires",
  },
  {
    id: 2,
    src: "https://i.shgcdn.com/5386435c-3d50-4bfb-bdd3-f5afcf0fc2d2/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
    alt: "Fastlane Racing Mini Bike Chassis with Chrome Exhaust",
  },
  {
    id: 3,
    src: "https://i.shgcdn.com/182edf6d-9ae2-468e-928d-bb08c54d64b7/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
    alt: "High Performance 212cc Mini Bike with Custom Seat",
  },
  {
    id: 4,
    src: "https://i.shgcdn.com/f346552e-357a-4eb4-8f5c-c4b51c63df9b/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
    alt: "Fastlane Drag Mini Bike with Center Exit Exhaust",
  },
  {
    id: 5,
    src: "https://i.shgcdn.com/7374cf77-1604-4e3d-97f4-4d52527bc2a1/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
    alt: "Fastlane Mini Bike Stunt and Track Setup",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 my-6 sm:my-10">
      {/* Top Banner Accent */}
      <div className="relative w-full aspect-[16/7] sm:aspect-[21/9] mb-4 overflow-hidden border border-zinc-900 bg-zinc-950">
        <Image
          src="https://i.shgcdn.com/18e0bf8e-bb7a-4274-bcf0-ea81007c9b3d/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
          alt="Fastlane Mini Bikes Header Banner"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-contain"
        />
      </div>

      {/* Main Slideshow Container */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden border-2 border-red-600/80 shadow-[0_0_25px_rgba(255,0,0,0.35)] bg-black">
        {/* Slides */}
        {SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain"
              priority={idx === 0}
            />
          </div>
        ))}

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 text-red-600 hover:text-white hover:bg-black/70 border border-transparent hover:border-red-600 transition-all rounded-none"
        >
          <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 text-red-600 hover:text-white hover:bg-black/70 border border-transparent hover:border-red-600 transition-all rounded-none"
        >
          <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 inset-x-0 z-20 flex justify-center gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 transition-all ${
                idx === current
                  ? "w-8 bg-red-600 shadow-[0_0_8px_#ff0000]"
                  : "w-2.5 bg-zinc-600 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
