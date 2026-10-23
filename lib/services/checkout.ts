import { getProducts } from "@/lib/repositories/products";
import { CartItem, DiscountCode, OrderCalculation, ShippingAddress } from "@/lib/types/ecommerce";

const VALID_DISCOUNTS: Record<string, DiscountCode> = {
  FASTLANE10: {
    code: "FASTLANE10",
    percentOff: 10,
    valid: true,
    description: "10% off your entire order",
  },
  MINI20: {
    code: "MINI20",
    amountOff: 20.0,
    valid: true,
    description: "$20 off your entire order",
  },
};

export async function validateDiscountCode(rawCode?: string): Promise<DiscountCode | null> {
  if (!rawCode) return null;
  const normalized = rawCode.trim().toUpperCase();
  const found = VALID_DISCOUNTS[normalized];
  if (found) return found;
  return null;
}

export async function calculateOrderServer({
  items,
  discountCode,
}: {
  items: { variantId: string; quantity: number }[];
  discountCode?: string;
}): Promise<OrderCalculation> {
  const { products } = await getProducts({ limit: 100 });

  // Map of variantId -> variant details
  const verifiedItems: CartItem[] = [];

  for (const item of items) {
    let foundVariant = null;
    let foundProduct = null;

    for (const p of products) {
      const v = p.variants.find((variant) => variant.id === item.variantId);
      if (v) {
        foundVariant = v;
        foundProduct = p;
        break;
      }
    }

    if (!foundVariant || !foundProduct) {
      throw new Error(`Item variant ${item.variantId} not found in catalog.`);
    }

    if (!foundVariant.available) {
      throw new Error(`Product "${foundProduct.title}" (${foundVariant.title}) is currently out of stock.`);
    }

    verifiedItems.push({
      id: `${foundProduct.id}-${foundVariant.id}`,
      productId: foundProduct.id,
      variantId: foundVariant.id,
      title: foundProduct.title,
      variantTitle: foundVariant.title,
      price: foundVariant.price,
      comparePrice: foundVariant.comparePrice,
      image: foundProduct.images[0]?.src || "",
      quantity: Math.max(1, Math.min(item.quantity, 99)),
      handle: foundProduct.handle,
    });
  }

  // Authoritative Subtotal calculation
  const subtotal = verifiedItems.reduce((acc, it) => acc + it.price * it.quantity, 0);

  // Discount calculation
  let discountTotal = 0;
  const discount = await validateDiscountCode(discountCode);
  if (discount) {
    if (discount.percentOff) {
      discountTotal = (subtotal * discount.percentOff) / 100;
    } else if (discount.amountOff) {
      discountTotal = Math.min(subtotal, discount.amountOff);
    }
  }

  // Shipping calculation
  const netSubtotal = Math.max(0, subtotal - discountTotal);
  const shipping = netSubtotal > 150 ? 0 : 14.99;

  // Tax: 7.5%
  const tax = Math.round(netSubtotal * 0.075 * 100) / 100;

  // Final Total
  const total = Math.round((netSubtotal + shipping + tax) * 100) / 100;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    discountTotal: Math.round(discountTotal * 100) / 100,
    shipping,
    tax,
    total,
    items: verifiedItems,
    discount,
  };
}

export async function processOrderCheckout({
  shippingAddress,
  items,
  discountCode,
  paymentMethod,
}: {
  shippingAddress: ShippingAddress;
  items: { variantId: string; quantity: number }[];
  discountCode?: string;
  paymentMethod: "CARD" | "PAYPAL" | "SHOP_PAY";
}) {
  const calculation = await calculateOrderServer({ items, discountCode });

  const orderId = "FLMB-" + Math.floor(100000 + Math.random() * 900000);

  return {
    success: true,
    orderId,
    orderNumber: orderId,
    status: "PAID",
    createdAt: new Date().toISOString(),
    calculation,
    shippingAddress,
    paymentMethod,
  };
}
