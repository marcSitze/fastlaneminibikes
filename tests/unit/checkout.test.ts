import { describe, it, expect } from "vitest";
import { calculateOrderServer, validateDiscountCode } from "@/lib/services/checkout";
import catalogData from "@/lib/data/products.json";

describe("Checkout and Pricing Service", () => {
  const inStockProduct = catalogData.products.find((p) => p.handle === "rlv-extreme-chain-gold-on-gold")!;
  const inStockVariant = inStockProduct.variants[0];

  const outOfStockProduct = catalogData.products.find((p) => p.handle === "6in-mini-bike-roller-kit")!;
  const outOfStockVariant = outOfStockProduct.variants[0];

  it("validates discount codes correctly", async () => {
    const valid10 = await validateDiscountCode("FASTLANE10");
    expect(valid10).not.toBeNull();
    expect(valid10?.percentOff).toBe(10);

    const valid20 = await validateDiscountCode("mini20");
    expect(valid20).not.toBeNull();
    expect(valid20?.amountOff).toBe(20);

    const invalid = await validateDiscountCode("NOTAREALCODE");
    expect(invalid).toBeNull();
  });

  it("calculates server-authoritative order subtotal and taxes accurately for in-stock item", async () => {
    // 4 items of RLV Chain = 4 * 45.99 = 183.96 (> 150 for free shipping)
    const calculation = await calculateOrderServer({
      items: [{ variantId: inStockVariant.id, quantity: 4 }],
    });

    expect(calculation.items.length).toBe(1);
    expect(calculation.subtotal).toBeCloseTo(inStockVariant.price * 4, 2);
    // Over $150 threshold => free shipping
    expect(calculation.shipping).toBe(0);
    expect(calculation.tax).toBeCloseTo(calculation.subtotal * 0.075, 1);
    expect(calculation.total).toBeCloseTo(calculation.subtotal + calculation.tax, 2);
  });

  it("applies 10% promo code reduction on subtotal", async () => {
    const calculation = await calculateOrderServer({
      items: [{ variantId: inStockVariant.id, quantity: 4 }],
      discountCode: "FASTLANE10",
    });

    const expectedDiscount = Math.round(calculation.subtotal * 0.1 * 100) / 100;
    expect(calculation.discountTotal).toBeCloseTo(expectedDiscount, 2);
  });

  it("applies shipping fee for orders under $150", async () => {
    // 1 item of RLV Chain = $45.99 (< 150)
    const calculation = await calculateOrderServer({
      items: [{ variantId: inStockVariant.id, quantity: 1 }],
    });

    expect(calculation.subtotal).toBe(45.99);
    expect(calculation.shipping).toBe(14.99);
    expect(calculation.total).toBeCloseTo(45.99 + 14.99 + (45.99 * 0.075), 1);
  });

  it("rejects orders containing out-of-stock items", async () => {
    await expect(
      calculateOrderServer({
        items: [{ variantId: outOfStockVariant.id, quantity: 1 }],
      })
    ).rejects.toThrow(/out of stock/i);
  });
});
