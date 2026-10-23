"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/utils";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Check, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, discountCode, setDiscountCode } = useCartStore();
  const [promoInput, setPromoInput] = useState(discountCode);
  const [promoApplied, setPromoApplied] = useState(Boolean(discountCode));
  const [promoError, setPromoError] = useState("");

  const subtotal = getSubtotal();

  // Promo calculation
  let discountAmount = 0;
  if (promoApplied && discountCode) {
    if (discountCode.toUpperCase() === "FASTLANE10") {
      discountAmount = subtotal * 0.1;
    } else if (discountCode.toUpperCase() === "MINI20") {
      discountAmount = Math.min(subtotal, 20);
    }
  }

  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shipping = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 14.99;
  const tax = Math.round((subtotal - discountAmount) * 0.075 * 100) / 100;
  const total = Math.max(0, subtotal - discountAmount + shipping + tax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    const code = promoInput.trim().toUpperCase();
    if (code === "FASTLANE10" || code === "MINI20") {
      setDiscountCode(code);
      setPromoApplied(true);
    } else {
      setPromoError("Invalid code. Try FASTLANE10 or MINI20.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
          Your Cart is Empty
        </h1>
        <p className="text-zinc-400 font-bold uppercase tracking-wider text-sm max-w-md mx-auto">
          Looks like you haven&apos;t added any mini bikes, roller kits, or racing parts to your cart yet.
        </p>
        <div>
          <Link
            href="/collections/all"
            className="btn-fastlane-primary inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider mb-8 pb-4 border-b border-zinc-800">
        Your Cart
      </h1>

      {/* Free Shipping Meter */}
      <div className="mb-8 p-4 bg-zinc-950 border border-zinc-800">
        {remainingForFreeShipping > 0 ? (
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-300">
            Add <span className="text-red-500 font-black">{formatPrice(remainingForFreeShipping)}</span> more of racing gear to qualify for <span className="text-white font-black">FREE SHIPPING</span>!
          </p>
        ) : (
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-green-400">
            🎉 Congratulations! Your order qualifies for <span className="underline">FREE SHIPPING</span>!
          </p>
        )}
        <div className="w-full bg-zinc-800 h-2 mt-2 rounded-full overflow-hidden">
          <div
            className="bg-red-600 h-full transition-all duration-500"
            style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="hidden sm:grid sm:grid-cols-12 text-xs font-bold uppercase tracking-wider text-zinc-400 pb-3 border-b border-zinc-800">
            <span className="col-span-6">Product</span>
            <span className="col-span-2 text-center">Price</span>
            <span className="col-span-2 text-center">Quantity</span>
            <span className="col-span-2 text-right">Total</span>
          </div>

          <div className="divide-y divide-zinc-900 border-b border-zinc-900">
            {items.map((item) => (
              <div key={item.variantId} className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* Product info */}
                <div className="sm:col-span-6 flex gap-4 items-center">
                  <div className="relative w-20 h-20 bg-zinc-950 border border-zinc-800 flex-shrink-0">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <Link
                      href={`/products/${item.handle}`}
                      className="font-bold text-white hover:text-red-500 text-sm uppercase transition-colors line-clamp-2"
                    >
                      {item.title}
                    </Link>
                    {item.variantTitle && item.variantTitle !== "Default Title" && (
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {item.variantTitle}
                      </p>
                    )}
                    <button
                      onClick={() => removeItem(item.variantId)}
                      className="text-zinc-500 hover:text-red-500 text-xs flex items-center gap-1 mt-2 uppercase font-bold transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="sm:col-span-2 text-left sm:text-center font-bold text-sm text-zinc-300">
                  <span className="sm:hidden text-xs text-zinc-500 mr-2">Price:</span>
                  {formatPrice(item.price)}
                </div>

                {/* Quantity */}
                <div className="sm:col-span-2 flex sm:justify-center">
                  <div className="flex items-center border border-zinc-800 bg-zinc-950">
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      className="p-1.5 text-zinc-400 hover:text-white"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      className="p-1.5 text-zinc-400 hover:text-white"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="sm:col-span-2 text-left sm:text-right font-black text-sm text-red-500">
                  <span className="sm:hidden text-xs text-zinc-500 mr-2">Total:</span>
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-between items-center">
            <Link
              href="/collections/all"
              className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="bg-zinc-950 border border-zinc-800 p-6 space-y-6 h-fit">
          <h2 className="text-base font-black text-white uppercase tracking-wider pb-3 border-b border-zinc-800">
            Order Summary
          </h2>

          {/* Promo code form */}
          <div>
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                Discount Code:
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="e.g. FASTLANE10"
                  className="flex-1 bg-black border border-zinc-700 px-3 py-2 text-xs text-white uppercase placeholder-zinc-500 focus:outline-none focus:border-[#ffd000]"
                />
                <button
                  type="submit"
                  className="bg-zinc-800 hover:bg-red-600 text-white px-4 py-2 text-xs font-bold uppercase transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <p className="text-xs text-red-400 mt-1">{promoError}</p>
              )}
              {promoApplied && discountCode && (
                <p className="text-xs text-green-400 mt-1 flex items-center gap-1 font-bold">
                  <Check className="w-3.5 h-3.5" />
                  Code {discountCode} applied!
                </p>
              )}
            </form>
          </div>

          {/* Cost breakdown */}
          <div className="space-y-3 pt-4 border-t border-zinc-800 text-xs font-bold uppercase tracking-wider">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span className="text-white font-bold">{formatPrice(subtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-green-400">
                <span>Discount ({discountCode})</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-zinc-400">
              <span>Estimated Shipping</span>
              <span className="text-white font-bold">
                {shipping === 0 ? "FREE" : formatPrice(shipping)}
              </span>
            </div>

            <div className="flex justify-between text-zinc-400">
              <span>Estimated Tax</span>
              <span className="text-white font-bold">{formatPrice(tax)}</span>
            </div>

            <div className="flex justify-between text-base font-black text-white pt-3 border-t border-zinc-800">
              <span>Estimated Total</span>
              <span className="text-red-500 text-xl font-black">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <Link
            href="/checkout"
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black uppercase text-sm tracking-widest py-4 shadow-[0_0_20px_rgba(255,0,0,0.5)] transition-all"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </Link>

          <p className="text-[11px] text-zinc-500 text-center uppercase tracking-wider">
            Taxes and shipping calculated at checkout.
          </p>
        </div>
      </div>
    </div>
  );
}
