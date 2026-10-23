import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/lib/types/ecommerce";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  discountCode: string;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  setDiscountCode: (code: string) => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      discountCode: "",

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (item, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.variantId === item.variantId
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity = Math.min(
              99,
              updated[existingIndex].quantity + quantity
            );
            return { items: updated, isOpen: true };
          }

          const newItem: CartItem = {
            ...item,
            quantity: Math.max(1, quantity),
          };

          return { items: [...state.items, newItem], isOpen: true };
        });
      },

      removeItem: (variantId: string) => {
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        }));
      },

      updateQuantity: (variantId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.variantId === variantId
              ? { ...item, quantity: Math.min(99, quantity) }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      setDiscountCode: (discountCode: string) => set({ discountCode }),

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
    }),
    {
      name: "fastlane_cart_storage",
      partialize: (state) => ({
        items: state.items,
        discountCode: state.discountCode,
      }),
    }
  )
);
