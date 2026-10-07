"use client";

import { create } from "zustand";
import { FREE_SHIPPING_THRESHOLD, type Product } from "@/lib/products";

export interface CartLine {
  key: string;
  productId: string;
  title: string;
  price: number;
  image: string;
  size: string;
  color: string;
  qty: number;
}

interface CartState {
  cart: CartLine[];
  wishlist: string[];
  recentlyViewed: string[];
  cartOpen: boolean;
  quickViewId: string | null;
  quickViewOpen: boolean;
  addToCart: (p: Product, size: string, color: string, qty?: number) => void;
  removeFromCart: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  markViewed: (id: string) => void;
  setCartOpen: (open: boolean) => void;
  openQuickView: (id: string) => void;
  closeQuickView: () => void;
  subtotal: () => number;
  cartCount: () => number;
  freeShippingRemaining: () => number;
}

export const useCart = create<CartState>((set, get) => ({
  cart: [],
  wishlist: [],
  recentlyViewed: [],
  cartOpen: false,
  quickViewId: null,
  quickViewOpen: false,

  addToCart: (p, size, color, qty = 1) => {
    const key = `${p.id}|${size}|${color}`;
    const existing = get().cart.find((l) => l.key === key);
    if (existing) {
      set({
        cart: get().cart.map((l) =>
          l.key === key ? { ...l, qty: Math.min(l.qty + qty, 10) } : l
        ),
      });
    } else {
      set({
        cart: [
          ...get().cart,
          {
            key,
            productId: p.id,
            title: p.title,
            price: p.price,
            image: p.image,
            size,
            color,
            qty,
          },
        ],
      });
    }
    set({ cartOpen: true });
  },

  removeFromCart: (key) => set({ cart: get().cart.filter((l) => l.key !== key) }),

  updateQty: (key, qty) => {
    if (qty <= 0) {
      set({ cart: get().cart.filter((l) => l.key !== key) });
    } else {
      set({
        cart: get().cart.map((l) => (l.key === key ? { ...l, qty: Math.min(qty, 10) } : l)),
      });
    }
  },

  clearCart: () => set({ cart: [] }),

  toggleWishlist: (id) =>
    set({
      wishlist: get().wishlist.includes(id)
        ? get().wishlist.filter((w) => w !== id)
        : [...get().wishlist, id],
    }),

  markViewed: (id) =>
    set({
      recentlyViewed: [id, ...get().recentlyViewed.filter((x) => x !== id)].slice(0, 8),
    }),

  setCartOpen: (open) => set({ cartOpen: open }),

  openQuickView: (id) => set({ quickViewId: id, quickViewOpen: true }),
  closeQuickView: () => set({ quickViewOpen: false }),

  subtotal: () => get().cart.reduce((s, l) => s + l.price * l.qty, 0),
  cartCount: () => get().cart.reduce((s, l) => s + l.qty, 0),
  freeShippingRemaining: () =>
    Math.max(FREE_SHIPPING_THRESHOLD - get().subtotal(), 0),
}));
