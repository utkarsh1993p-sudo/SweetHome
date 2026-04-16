import { create } from "zustand";
import type { CartItem, MenuItem } from "@/lib/types";

interface CartState {
  items: CartItem[];
  tableNumber: number | null;
  setTableNumber: (n: number) => void;
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalAmount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  tableNumber: null,

  setTableNumber: (n) => set({ tableNumber: n }),

  addItem: (menuItem) => {
    const existing = get().items.find((i) => i.menuItem.id === menuItem.id);
    if (existing) {
      set({
        items: get().items.map((i) =>
          i.menuItem.id === menuItem.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      });
    } else {
      set({ items: [...get().items, { menuItem, quantity: 1 }] });
    }
  },

  removeItem: (itemId) =>
    set({ items: get().items.filter((i) => i.menuItem.id !== itemId) }),

  updateQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(itemId);
      return;
    }
    set({
      items: get().items.map((i) =>
        i.menuItem.id === itemId ? { ...i, quantity } : i
      ),
    });
  },

  clearCart: () => set({ items: [] }),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalAmount: () =>
    get().items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0),
}));
