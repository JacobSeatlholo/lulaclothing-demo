"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2, Truck, ShieldCheck, PartyPopper, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { FREE_SHIPPING_THRESHOLD, formatZAR, products, type Product } from "@/lib/products";
import { useCart } from "@/lib/store";

export function CartDrawer() {
  const open = useCart((s) => s.cartOpen);
  const setOpen = useCart((s) => s.setCartOpen);
  const cart = useCart((s) => s.cart);
  const updateQty = useCart((s) => s.updateQty);
  const removeFromCart = useCart((s) => s.removeFromCart);
  const subtotal = useCart((s) => s.subtotal());
  const addToCart = useCart((s) => s.addToCart);

  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const freeShip = remaining === 0 && cart.length > 0;

  /** Upsell: cheapest available tops/shoes not already in cart */
  const upsells: Product[] = useMemo(() => {
    const inCart = new Set(cart.map((l) => l.productId));
    return products
      .filter((p) => p.stock > 0 && !inCart.has(p.id) && (p.category === "Tops" || p.category === "Shoes"))
      .sort((a, b) => a.price - b.price)
      .slice(0, 2);
  }, [cart]);

  function checkout() {
    toast.success("Demo checkout", {
      description:
        "In production this opens your secure PayFast / Shopify checkout. This demo proves the flow.",
    });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-cream p-0 flex flex-col">
        <SheetTitle className="px-5 pt-5 font-display text-xl">Your basket</SheetTitle>

        {/* Free shipping progress */}
        <div className="px-5 pt-3">
          <div className="rounded-xl border border-border bg-card p-3.5">
            <div className="flex items-center gap-2 text-[13px]">
              <Truck className={`h-4 w-4 ${freeShip ? "text-green-700" : "text-clay"}`} aria-hidden="true" />
              {freeShip ? (
                <span className="font-semibold text-green-700">
                  You&apos;ve unlocked FREE shipping! <PartyPopper className="inline h-3.5 w-3.5" aria-hidden="true" />
                </span>
              ) : cart.length > 0 ? (
                <span>
                  Add <strong className="text-clay">{formatZAR(remaining)}</strong> more for free shipping
                </span>
              ) : (
                <span className="text-muted-foreground">
                  Free shipping on orders over <strong>{formatZAR(FREE_SHIPPING_THRESHOLD)}</strong>
                </span>
              )}
            </div>
            <Progress
              value={progress}
              className="mt-2.5 h-1.5 bg-sand [&>div]:bg-clay"
              aria-label="Free shipping progress"
            />
          </div>
        </div>

        {/* Lines */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="h-16 w-16 rounded-full bg-sand flex items-center justify-center mb-4">
                <X className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
              </div>
              <p className="font-semibold">Your basket is empty</p>
              <p className="text-sm text-muted-foreground mt-1 max-w-[240px]">
                Beautiful pieces are waiting. Start with our new spring dresses.
              </p>
              <Button className="mt-5 rounded-full bg-ink hover:bg-ink/85" onClick={() => setOpen(false)}>
                Continue shopping
              </Button>
            </div>
          ) : (
            cart.map((l) => (
              <div key={l.key} className="flex gap-3 rounded-xl border border-border bg-card p-3">
                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-sand">
                  <Image src={l.image} alt={l.title} fill sizes="80px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold leading-snug truncate">{l.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {l.size} · {l.color}
                  </p>
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQty(l.key, l.qty - 1)}
                        className="h-7 w-7 rounded-full border border-border flex items-center justify-center hover:bg-sand"
                        aria-label={`Decrease quantity of ${l.title}`}
                      >
                        <Minus className="h-3 w-3" aria-hidden="true" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{l.qty}</span>
                      <button
                        onClick={() => updateQty(l.key, l.qty + 1)}
                        className="h-7 w-7 rounded-full border border-border flex items-center justify-center hover:bg-sand"
                        aria-label={`Increase quantity of ${l.title}`}
                      >
                        <Plus className="h-3 w-3" aria-hidden="true" />
                      </button>
                    </div>
                    <p className="text-[14px] font-semibold">{formatZAR(l.price * l.qty)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(l.key)}
                  className="self-start text-muted-foreground hover:text-destructive transition-colors"
                  aria-label={`Remove ${l.title} from basket`}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ))
          )}

          {/* Upsell */}
          {cart.length > 0 && upsells.length > 0 && (
            <div className="rounded-xl border border-dashed border-clay/40 bg-clay-soft/50 p-3.5">
              <p className="text-[13px] font-semibold mb-2.5">Pairs well with your picks</p>
              <div className="space-y-2.5">
                {upsells.map((u) => (
                  <div key={u.id} className="flex items-center gap-2.5">
                    <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded-md bg-sand">
                      <Image src={u.image} alt={u.title} fill sizes="40px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{u.title}</p>
                      <p className="text-[11px] text-muted-foreground">{formatZAR(u.price)}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 rounded-full text-xs border-clay/40 text-clay hover:bg-clay hover:text-white"
                      onClick={() => {
                        addToCart(u, u.sizes[Math.min(1, u.sizes.length - 1)], u.colors[0]?.name ?? "As shown");
                        toast.success("Added to basket", { description: u.title });
                      }}
                    >
                      <Plus className="h-3 w-3 mr-0.5" aria-hidden="true" /> Add
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-border bg-card px-5 py-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-lg font-bold">{formatZAR(subtotal)}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              {freeShip ? "Free courier shipping applied at checkout" : "Shipping calculated at checkout · Free over R1500"}
            </p>
            <Button
              onClick={checkout}
              className="w-full h-12 rounded-full text-[15px] font-semibold bg-ink hover:bg-clay transition-colors"
            >
              Secure checkout · {formatZAR(subtotal)}
            </Button>
            <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" aria-hidden="true" /> PayFast
              </span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" aria-hidden="true" /> PayShap
              </span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" aria-hidden="true" /> SnapScan
              </span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" aria-hidden="true" /> Mobicred
              </span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
