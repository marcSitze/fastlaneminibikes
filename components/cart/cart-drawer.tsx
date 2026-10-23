"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-black border-l border-red-600/50 shadow-[0_0_25px_rgba(255,0,0,0.4)] flex flex-col justify-between animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-red-500" />
              <h2 className="font-bold text-lg text-white uppercase tracking-wider">
                Your Shopping Cart
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="text-zinc-400 hover:text-white p-1"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-zinc-900">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-zinc-900 flex items-center justify-center text-zinc-600 border border-zinc-800">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-zinc-400 font-bold uppercase tracking-wider text-sm">
                  Your cart is currently empty
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={closeCart}
                >
                  <Link href="/collections/all">Start Shopping</Link>
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.variantId} className="pt-4 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 bg-zinc-900 border border-zinc-800 flex-shrink-0 overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-700 text-xs">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        href={`/products/${item.handle}`}
                        onClick={closeCart}
                        className="font-bold text-white hover:text-red-500 text-sm leading-snug line-clamp-2 transition-colors"
                      >
                        {item.title}
                      </Link>
                      {item.variantTitle && item.variantTitle !== "Default Title" && (
                        <p className="text-xs text-zinc-400 mt-0.5">
                          Option: {item.variantTitle}
                        </p>
                      )}
                      <p className="text-sm font-bold text-red-500 mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Quantity & Delete */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-zinc-800 bg-zinc-900">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="p-1 text-zinc-400 hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="p-1 text-zinc-400 hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-zinc-500 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-zinc-950 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400 font-bold uppercase tracking-wider">
                  Subtotal
                </span>
                <span className="font-extrabold text-white text-lg">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Shipping, taxes, and discounts calculated at checkout.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="flex items-center justify-center py-3 px-4 border border-zinc-700 hover:border-red-600 text-white font-bold uppercase text-xs tracking-wider transition-colors text-center"
                >
                  View Cart
                </Link>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-1.5 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase text-xs tracking-wider shadow-[0_0_12px_rgba(255,0,0,0.5)] transition-all text-center"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="text-center pt-1">
                <button
                  onClick={closeCart}
                  className="text-xs text-zinc-400 hover:text-white underline uppercase tracking-wider"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
