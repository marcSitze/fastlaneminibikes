import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "@/stores/cartStore";

describe("Zustand Cart Store", () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it("starts with an empty cart", () => {
    const { items, getItemCount, getSubtotal } = useCartStore.getState();
    expect(items.length).toBe(0);
    expect(getItemCount()).toBe(0);
    expect(getSubtotal()).toBe(0);
  });

  it("adds an item to the cart and updates item count and subtotal", () => {
    useCartStore.getState().addItem({
      id: "prod-1-var-1",
      productId: "prod-1",
      variantId: "var-1",
      title: "6in Mini Bike Roller Kit",
      variantTitle: "Default",
      price: 749.99,
      image: "/test.jpg",
      handle: "6in-mini-bike-roller-kit",
    }, 1);

    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.getItemCount()).toBe(1);
    expect(state.getSubtotal()).toBe(749.99);
  });

  it("increments quantity when the same variant is added again", () => {
    const item = {
      id: "prod-1-var-1",
      productId: "prod-1",
      variantId: "var-1",
      title: "6in Mini Bike Roller Kit",
      variantTitle: "Default",
      price: 749.99,
      image: "/test.jpg",
      handle: "6in-mini-bike-roller-kit",
    };

    useCartStore.getState().addItem(item, 1);
    useCartStore.getState().addItem(item, 2);

    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(3);
    expect(state.getItemCount()).toBe(3);
    expect(state.getSubtotal()).toBeCloseTo(749.99 * 3, 2);
  });

  it("removes an item from the cart", () => {
    useCartStore.getState().addItem({
      id: "prod-1-var-1",
      productId: "prod-1",
      variantId: "var-1",
      title: "6in Mini Bike Roller Kit",
      variantTitle: "Default",
      price: 749.99,
      image: "/test.jpg",
      handle: "6in-mini-bike-roller-kit",
    }, 1);

    useCartStore.getState().removeItem("var-1");
    expect(useCartStore.getState().items.length).toBe(0);
    expect(useCartStore.getState().getItemCount()).toBe(0);
  });
});
