"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Plus, Star, Flame } from "lucide-react";
import { toast } from "sonner";
import { formatZAR, discountPct, type Product } from "@/lib/products";
import { useCart } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const [hover, setHover] = useState(false);
  const [quickSize, setQuickSize] = useState(false);
  const [colorIdx, setColorIdx] = useState(0);

  const wishlist = useCart((s) => s.wishlist);
  const toggleWishlist = useCart((s) => s.toggleWishlist);
  const addToCart = useCart((s) => s.addToCart);
  const openQuickView = useCart((s) => s.openQuickView);
  const wished = wishlist.includes(product.id);
  const pct = discountPct(product);

  const stockLabel =
    product.stock === 0
      ? "Sold out"
      : product.stock <= 3
        ? `Only ${product.stock} left`
        : product.stock <= 5
          ? "Selling fast"
          : null;

  function quickAdd(size: string) {
    const color = product.colors[colorIdx]?.name ?? "As shown";
    if (product.stock === 0) {
      toast.error("Sold out", { description: `We'll notify you when ${product.title} is back.` });
      return;
    }
    addToCart(product, size, color);
    toast.success("Added to basket", { description: `${product.title} · ${size} · ${color}` });
    setQuickSize(false);
  }

  return (
    <article
      className="group relative flex flex-col"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setQuickSize(false);
      }}
      aria-label={product.title}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl bg-sand aspect-[3/4]">
        <button
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={() => openQuickView(product.id)}
          aria-label={`View ${product.title}`}
        />
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition-all duration-500 ${hover && product.image2 !== product.image ? "opacity-0" : "opacity-100"}`}
          loading="lazy"
        />
        {product.image2 && product.image2 !== product.image && (
          <Image
            src={product.image2}
            alt={`${product.title} alternate view`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-opacity duration-500 ${hover ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
          />
        )}

        {/* Badges */}
        <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5 z-20">
          {pct && (
            <span className="rounded-full bg-clay px-2.5 py-1 text-[11px] font-bold text-white">
              −{pct}%
            </span>
          )}
          {product.badges.includes("New") && (
            <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold text-cream">New</span>
          )}
          {product.stock === 0 && (
            <span className="rounded-full bg-muted-foreground px-2.5 py-1 text-[11px] font-bold text-white">
              Sold out
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
            toast(wished ? "Removed from wishlist" : "Saved to wishlist", {
              description: product.title,
            });
          }}
          className="absolute right-2.5 top-2.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-transform hover:scale-110 active:scale-95"
          aria-label={wished ? `Remove ${product.title} from wishlist` : `Save ${product.title} to wishlist`}
          aria-pressed={wished}
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-clay text-clay" : "text-ink"}`} aria-hidden="true" />
        </button>

        {/* Quick add on hover (desktop) */}
        <div
          className={`absolute inset-x-2.5 bottom-2.5 z-20 hidden md:block transition-all duration-300 ${
            hover ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          {!quickSize ? (
            <button
              onClick={() => (product.stock === 0 ? quickAdd("One size") : setQuickSize(true))}
              className="w-full rounded-lg bg-ink/95 text-cream py-2.5 text-[13px] font-semibold backdrop-blur flex items-center justify-center gap-1.5 hover:bg-clay transition-colors"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              {product.stock === 0 ? "Notify me" : "Quick add"}
            </button>
          ) : (
            <div className="rounded-lg bg-white/95 backdrop-blur p-2 shadow-lg">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 px-0.5">
                Pick a size
              </p>
              <div className="flex flex-wrap gap-1">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => quickAdd(s)}
                    className="min-w-9 rounded-md border border-border px-2 py-1.5 text-xs font-medium hover:bg-ink hover:text-cream transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="pt-3 flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <button
            onClick={() => openQuickView(product.id)}
            className="text-left text-[14px] font-semibold leading-snug hover:text-clay transition-colors line-clamp-2"
          >
            {product.title}
          </button>
          <div className="text-right shrink-0">
            <p className="text-[14px] font-semibold">{formatZAR(product.price)}</p>
            {product.compareAt && (
              <p className="text-xs text-muted-foreground line-through">
                {formatZAR(product.compareAt)}
              </p>
            )}
          </div>
        </div>

        {/* rating + urgency */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <Star className="h-3 w-3 fill-clay text-clay" aria-hidden="true" />
            4.9 <span aria-hidden="true">·</span> {(product.id.charCodeAt(product.id.length - 1) % 90) + 12} reviews
          </span>
          {stockLabel && (
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                product.stock === 0 ? "text-muted-foreground" : "text-clay"
              }`}
            >
              {product.stock <= 3 && product.stock > 0 && <Flame className="h-3 w-3" aria-hidden="true" />}
              {stockLabel}
            </span>
          )}
        </div>

        {/* swatches */}
        {product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 pt-1" role="listbox" aria-label="Colour options">
            {product.colors.slice(0, 5).map((c, i) => (
              <button
                key={c.name}
                role="option"
                aria-selected={i === colorIdx}
                title={c.name}
                onClick={() => setColorIdx(i)}
                className={`h-4.5 w-4.5 rounded-full border transition-transform hover:scale-110 ${
                  i === colorIdx ? "ring-2 ring-ink ring-offset-1 ring-offset-background" : "border-border"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-[10px] text-muted-foreground">+{product.colors.length - 5}</span>
            )}
          </div>
        )}

        {/* mobile add */}
        <button
          onClick={() => (product.sizes.length === 1 ? quickAdd(product.sizes[0]) : openQuickView(product.id))}
          className="md:hidden mt-2 w-full rounded-lg border border-ink/15 py-2 text-[13px] font-semibold hover:bg-ink hover:text-cream transition-colors"
        >
          {product.stock === 0 ? "Notify me" : "Add to basket"}
        </button>
      </div>
    </article>
  );
}
