"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/utils";
import { Lock, CreditCard } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart, discountCode, setDiscountCode } = useCartStore();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "CA",
    postalCode: "",
    country: "US",
  });

  const [paymentMethod, setPaymentMethod] = useState<"CARD" | "PAYPAL" | "SHOP_PAY">("CARD");
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("123");

  const [promoInput, setPromoInput] = useState(discountCode);
  const [promoApplied, setPromoApplied] = useState(Boolean(discountCode));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const subtotal = getSubtotal();

  let discountAmount = 0;
  if (promoApplied && discountCode) {
    if (discountCode.toUpperCase() === "FASTLANE10") {
      discountAmount = subtotal * 0.1;
    } else if (discountCode.toUpperCase() === "MINI20") {
      discountAmount = Math.min(subtotal, 20);
    }
  }

  const shipping = subtotal >= 150 || items.length === 0 ? 0 : 14.99;
  const tax = Math.round((subtotal - discountAmount) * 0.075 * 100) / 100;
  const total = Math.max(0, subtotal - discountAmount + shipping + tax);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === "FASTLANE10" || code === "MINI20") {
      setDiscountCode(code);
      setPromoApplied(true);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shippingAddress: formData,
          items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
          discountCode: promoApplied ? discountCode : undefined,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to process order.");
      }

      // Clear cart & navigate to order confirmation
      clearCart();
      router.push(`/order-confirmation/${data.orderId}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-black text-white uppercase">Your cart is empty</h1>
        <p className="text-zinc-400 text-sm">Please add items to your cart before proceeding to checkout.</p>
        <Link href="/collections/all" className="btn-fastlane-primary inline-block">
          Shop Minibikes
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-800">
        <div>
          <Link href="/" className="text-lg font-black tracking-widest text-white uppercase hover:text-red-500">
            Fastlane Mini Bikes
          </Link>
          <span className="text-zinc-500 mx-2">/</span>
          <span className="text-xs font-bold uppercase tracking-wider text-red-500">
            Secure Checkout
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 uppercase">
          <Lock className="w-3.5 h-3.5 text-green-500" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Checkout Form */}
        <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-white pb-2 border-b border-zinc-800">
              1. Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="racer@example.com"
                  className="w-full bg-zinc-950 border border-zinc-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ffd000]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 000-0000"
                  className="w-full bg-zinc-950 border border-zinc-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ffd000]"
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-white pb-2 border-b border-zinc-800">
              2. Shipping Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-950 border border-zinc-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ffd000]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-950 border border-zinc-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ffd000]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                Street Address *
              </label>
              <input
                type="text"
                name="address1"
                required
                value={formData.address1}
                onChange={handleInputChange}
                placeholder="1234 Race Track Ave"
                className="w-full bg-zinc-950 border border-zinc-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ffd000]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                Apartment, Suite, Unit (optional)
              </label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleInputChange}
                placeholder="Unit B"
                className="w-full bg-zinc-950 border border-zinc-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ffd000]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-950 border border-zinc-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ffd000]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-950 border border-zinc-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ffd000]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-950 border border-zinc-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ffd000]"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-white pb-2 border-b border-zinc-800">
              3. Payment Method
            </h2>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("CARD")}
                className={`py-3 px-2 border text-xs font-bold uppercase tracking-wider transition-all ${
                  paymentMethod === "CARD"
                    ? "border-red-600 bg-red-950/30 text-white shadow-[0_0_10px_rgba(255,0,0,0.3)]"
                    : "border-zinc-800 bg-zinc-950 text-zinc-400"
                }`}
              >
                Credit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("PAYPAL")}
                className={`py-3 px-2 border text-xs font-bold uppercase tracking-wider transition-all ${
                  paymentMethod === "PAYPAL"
                    ? "border-red-600 bg-red-950/30 text-white shadow-[0_0_10px_rgba(255,0,0,0.3)]"
                    : "border-zinc-800 bg-zinc-950 text-zinc-400"
                }`}
              >
                PayPal
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("SHOP_PAY")}
                className={`py-3 px-2 border text-xs font-bold uppercase tracking-wider transition-all ${
                  paymentMethod === "SHOP_PAY"
                    ? "border-red-600 bg-red-950/30 text-white shadow-[0_0_10px_rgba(255,0,0,0.3)]"
                    : "border-zinc-800 bg-zinc-950 text-zinc-400"
                }`}
              >
                Shop Pay
              </button>
            </div>

            {paymentMethod === "CARD" && (
              <div className="p-4 bg-zinc-950 border border-zinc-800 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-black border border-zinc-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ffd000]"
                    />
                    <CreditCard className="w-4 h-4 text-zinc-400 absolute right-3 top-2.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                      Expiration (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-black border border-zinc-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ffd000]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                      Security Code (CVC)
                    </label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full bg-black border border-zinc-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ffd000]"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod !== "CARD" && (
              <div className="p-4 bg-zinc-950 border border-zinc-800 text-xs text-zinc-300">
                You will be redirected to complete your {paymentMethod === "PAYPAL" ? "PayPal" : "Shop Pay"} authentication securely upon submitting this order.
              </div>
            )}
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs font-bold">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase text-sm tracking-widest shadow-[0_0_20px_rgba(255,0,0,0.6)] transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Processing Order..." : `Pay ${formatPrice(total)} Now`}
          </button>
        </form>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 p-6 space-y-6 h-fit">
          <h2 className="text-base font-black text-white uppercase tracking-wider pb-3 border-b border-zinc-800">
            Order Review ({items.length} items)
          </h2>

          {/* Items list */}
          <div className="space-y-4 max-h-72 overflow-y-auto pr-2 divide-y divide-zinc-900">
            {items.map((it) => (
              <div key={it.variantId} className="pt-3 first:pt-0 flex gap-3 items-center">
                <div className="relative w-14 h-14 bg-black border border-zinc-800 flex-shrink-0">
                  {it.image && (
                    <Image
                      src={it.image}
                      alt={it.title}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  )}
                  <span className="absolute -top-1.5 -right-1.5 bg-zinc-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {it.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-xs text-white uppercase truncate">
                    {it.title}
                  </p>
                  {it.variantTitle && it.variantTitle !== "Default Title" && (
                    <p className="text-[11px] text-zinc-400">{it.variantTitle}</p>
                  )}
                </div>
                <div className="text-xs font-bold text-red-500">
                  {formatPrice(it.price * it.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Promo code */}
          <div className="pt-4 border-t border-zinc-800">
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Promo code (FASTLANE10)"
                className="flex-1 bg-black border border-zinc-700 px-3 py-1.5 text-xs text-white uppercase focus:outline-none focus:border-[#ffd000]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold uppercase text-white"
              >
                Apply
              </button>
            </form>
          </div>

          {/* Cost details */}
          <div className="space-y-2 text-xs font-bold uppercase tracking-wider pt-4 border-t border-zinc-800">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span className="text-white">{formatPrice(subtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-green-400">
                <span>Discount ({discountCode})</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-zinc-400">
              <span>Shipping</span>
              <span className="text-white">
                {shipping === 0 ? "FREE" : formatPrice(shipping)}
              </span>
            </div>

            <div className="flex justify-between text-zinc-400">
              <span>Estimated Tax</span>
              <span className="text-white">{formatPrice(tax)}</span>
            </div>

            <div className="flex justify-between text-base font-black text-white pt-3 border-t border-zinc-800">
              <span>Total Due</span>
              <span className="text-red-500 text-xl font-black">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
