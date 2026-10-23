import { formatPrice } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  comparePrice?: number | null;
  minPrice?: number;
  maxPrice?: number;
  className?: string;
}

export function PriceDisplay({
  price,
  comparePrice,
  minPrice,
  maxPrice,
  className = "",
}: PriceDisplayProps) {
  const isRange = minPrice !== undefined && maxPrice !== undefined && minPrice < maxPrice;

  return (
    <div className={`flex items-baseline gap-2 ${className}`}>
      {comparePrice && comparePrice > price && (
        <span className="text-zinc-500 line-through text-xs sm:text-sm font-medium">
          {formatPrice(comparePrice)}
        </span>
      )}

      <span className="text-red-500 font-bold text-sm sm:text-base tracking-wide">
        {isRange ? `From ${formatPrice(minPrice)}` : formatPrice(price)}
      </span>
    </div>
  );
}
