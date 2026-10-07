"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/store";
import { formatZAR } from "@/lib/products";

export function MobileCartBar() {
  const cart = useCart((s) => s.cart);
  const subtotal = useCart((s) => s.subtotal());
  const setCartOpen = useCart((s) => s.setCartOpen);
  const count = useCart((s) => s.cartCount());

  if (cart.length === 0) return null;

  return (
    <button
      onClick={() => setCartOpen(true)}
      className="md:hidden fixed bottom-4 inset-x-4 z-50 flex items-center justify-between rounded-full bg-ink text-cream px-5 py-3.5 shadow-xl shadow-black/25 active:scale-[0.98] transition-transform"
      aria-label={`Open basket, ${count} items, subtotal ${formatZAR(subtotal)}`}
    >
      <span className="flex items-center gap-2 text-sm font-semibold">
        <ShoppingBag className="h-4.5 w-4.5" aria-hidden="true" />
        {count} item{count === 1 ? "" : "s"}
      </span>
      <span className="text-sm font-bold">View basket · {formatZAR(subtotal)}</span>
    </button>
  );
}
