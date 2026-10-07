"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ruler, Truck, RefreshCcw, Flame, Plus, Check } from "lucide-react";
import { toast } from "sonner";
import { formatZAR, getProduct, relatedProducts, discountPct, type Product } from "@/lib/products";
import { useCart } from "@/lib/store";
import { SizeGuide } from "./size-guide";

export function QuickView() {
  const open = useCart((s) => s.quickViewOpen);
  const id = useCart((s) => s.quickViewId);
  const close = useCart((s) => s.closeQuickView);

  const product = useMemo(() => (id ? getProduct(id) : undefined), [id]);

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? close() : undefined)}>
      {product && <QuickViewBody key={product.id} product={product} />}
    </Dialog>
  );
}

function QuickViewBody({ product }: { product: Product }) {
  const close = useCart((s) => s.closeQuickView);
  const addToCart = useCart((s) => s.addToCart);
  const openQuickView = useCart((s) => s.openQuickView);

  const [size, setSize] = useState<string | null>(null);
  const [colorIdx, setColorIdx] = useState(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addedBundle, setAddedBundle] = useState<string[]>([]);

  const related = relatedProducts(product, 3);
  const pct = discountPct(product);
  const selectedColor = product.colors[colorIdx]?.name ?? "As shown";

  function add() {
    if (!size) {
      toast.error("Choose a size first", {
        description: "Not sure? Check the size guide — exchanges are free.",
      });
      return;
    }
    addToCart(product, size, selectedColor);
    toast.success("Added to basket", { description: `${product.title} · ${size} · ${selectedColor}` });
    close();
  }

  function addBundle(relId: string) {
    const rel = getProduct(relId);
    if (!rel) return;
    addToCart(rel, rel.sizes[Math.min(1, rel.sizes.length - 1)], rel.colors[0]?.name ?? "As shown");
    setAddedBundle((a) => [...a, relId]);
    toast.success("Pair added", { description: `${rel.title} added — style the full look.` });
  }

  return (
    <>
      <DialogContent className="max-w-3xl bg-cream p-0 gap-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">{product.title}</DialogTitle>
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[480px] bg-sand">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
            />
            {pct && (
              <span className="absolute left-3 top-3 rounded-full bg-clay px-3 py-1 text-xs font-bold text-white">
                Save {pct}% — {formatZAR(product.compareAt! - product.price)}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-7 flex flex-col">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{product.category}</p>
            <h2 className="font-display text-2xl font-semibold mt-1 leading-tight">{product.title}</h2>

            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-xl font-bold">{formatZAR(product.price)}</span>
              {product.compareAt && (
                <span className="text-sm text-muted-foreground line-through">{formatZAR(product.compareAt)}</span>
              )}
            </div>

            <p className="text-[13px] text-muted-foreground mt-3 leading-relaxed">{product.description}</p>

            {/* urgency */}
            {product.stock > 0 && product.stock <= 5 && (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-clay-soft border border-clay/30 px-3 py-2 text-[13px] text-clay font-medium">
                <Flame className="h-4 w-4" aria-hidden="true" />
                {product.stock <= 3
                  ? `Only ${product.stock} left in this colourway — selling fast!`
                  : "Selling fast in this colourway"}
              </div>
            )}

            {/* colours */}
            {product.colors.length > 0 && (
              <div className="mt-5">
                <p className="text-[13px] font-semibold mb-2">
                  Colour: <span className="font-normal text-muted-foreground">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setColorIdx(i)}
                      title={c.name}
                      aria-label={`Colour ${c.name}`}
                      aria-pressed={i === colorIdx}
                      className={`h-7 w-7 rounded-full border transition-transform hover:scale-110 ${
                        i === colorIdx ? "ring-2 ring-ink ring-offset-2 ring-offset-cream" : "border-border"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* sizes */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[13px] font-semibold">
                  Size {size && <span className="font-normal text-muted-foreground">· {size}</span>}
                </p>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="inline-flex items-center gap-1 text-[13px] font-medium text-clay hover:underline"
                >
                  <Ruler className="h-3.5 w-3.5" aria-hidden="true" /> Size guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`min-w-11 rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors ${
                      size === s
                        ? "bg-ink text-cream border-ink"
                        : "border-border bg-card hover:border-ink/40"
                    }`}
                    aria-pressed={size === s}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Button
              onClick={add}
              disabled={product.stock === 0}
              className="mt-6 h-12 rounded-full text-[15px] font-semibold bg-ink hover:bg-clay transition-colors"
            >
              {product.stock === 0 ? "Sold out — notify me" : `Add to basket · ${formatZAR(product.price)}`}
            </Button>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-muted-foreground">
              <div className="flex flex-col items-center gap-1 rounded-lg bg-card border border-border py-2.5">
                <Truck className="h-4 w-4 text-clay" aria-hidden="true" />
                Ships in 24h
              </div>
              <div className="flex flex-col items-center gap-1 rounded-lg bg-card border border-border py-2.5">
                <RefreshCcw className="h-4 w-4 text-clay" aria-hidden="true" />
                Free exchanges
              </div>
              <div className="flex flex-col items-center gap-1 rounded-lg bg-card border border-border py-2.5">
                <Check className="h-4 w-4 text-clay" aria-hidden="true" />
                Quality checked
              </div>
            </div>

            {/* complete the look */}
            <div className="mt-6 border-t border-border pt-4">
              <p className="text-[13px] font-semibold mb-2.5">Complete the look</p>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {related.map((r) => (
                  <div key={r.id} className="w-24 shrink-0">
                    <button
                      className="relative w-full aspect-[3/4] overflow-hidden rounded-lg bg-sand group"
                      onClick={() => openQuickView(r.id)}
                      aria-label={`View ${r.title}`}
                    >
                      <Image src={r.image} alt={r.title} fill sizes="96px" className="object-cover" />
                    </button>
                    <button
                      onClick={() => !addedBundle.includes(r.id) && addBundle(r.id)}
                      className={`mt-1.5 w-full rounded-md py-1 text-[10px] font-semibold flex items-center justify-center gap-0.5 transition-colors ${
                        addedBundle.includes(r.id)
                          ? "bg-clay-soft text-clay"
                          : "bg-ink text-cream hover:bg-clay"
                      }`}
                    >
                      {addedBundle.includes(r.id) ? (
                        <>Added <Check className="h-3 w-3" /></>
                      ) : (
                        <>+ {formatZAR(r.price)}</>
                      )}
                    </button>
                  </div>
                ))}
                <p className="sr-only">
                  <Plus aria-hidden="true" /> add-ons
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>

      <SizeGuide open={sizeGuideOpen} onOpenChange={setSizeGuideOpen} />
    </>
  );
}
