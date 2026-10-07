"use client";

import { MessageCircle } from "lucide-react";
import { useCart } from "@/lib/store";

export function WhatsAppButton() {
  const cartCount = useCart((s) => s.cartCount());

  return (
    <a
      href="https://wa.me/27834485297?text=Hi%20Lisa!%20I%27m%20shopping%20on%20the%20Lula%20demo%20and%20have%20a%20question."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3.5 text-white shadow-xl shadow-black/20 transition-transform hover:scale-105 active:scale-95"
      aria-label="Chat with Lula on WhatsApp"
    >
      <MessageCircle className="h-5 w-5 fill-white" aria-hidden="true" />
      <span className="hidden sm:block text-sm font-semibold leading-none">
        Order on WhatsApp
        {cartCount > 0 && (
          <span className="block text-[10px] font-normal opacity-90 mt-0.5">
            {cartCount} item{cartCount === 1 ? "" : "s"} in basket
          </span>
        )}
      </span>
    </a>
  );
}
