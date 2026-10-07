"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X, Heart, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { categories, products, getProduct } from "@/lib/products";
import { useCart } from "@/lib/store";
import { ProductCard } from "./product-card";

type Sort = "featured" | "price-asc" | "price-desc" | "newest";

interface ProductGridProps {
  search: string;
  onSearch: (v: string) => void;
  category: string;
  onCategory: (c: string) => void;
}

export function ProductGrid({ search, onSearch, category, onCategory }: ProductGridProps) {
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [sort, setSort] = useState<Sort>("featured");
  const wishlist = useCart((s) => s.wishlist);

  const list = useMemo(() => {
    let l = [...products];
    if (category !== "All") l = l.filter((p) => p.category === category);
    if (showWishlistOnly) l = l.filter((p) => wishlist.includes(p.id));
    const q = search.trim().toLowerCase();
    if (q) {
      l = l.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.colors.some((c) => c.name.toLowerCase().includes(q))
      );
    }
    switch (sort) {
      case "price-asc":
        l.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        l.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        l.sort((a, b) => Number(b.badges.includes("New")) - Number(a.badges.includes("New")));
        break;
      default:
        l.sort((a, b) => b.stock - a.stock);
    }
    return l;
  }, [search, category, sort, showWishlistOnly, wishlist]);

  return (
    <section id="shop" className="mx-auto max-w-7xl px-4 pt-14" aria-label="Shop all products">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
            {showWishlistOnly ? "Your wishlist" : category === "All" ? "New in & loved" : category}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {list.length} style{list.length === 1 ? "" : "s"}
            {search && <> matching “{search}”</>} · tap any style to preview
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={showWishlistOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setShowWishlistOnly((v) => !v)}
            className={`rounded-full h-9 ${showWishlistOnly ? "bg-ink text-cream hover:bg-ink/85" : ""}`}
            aria-pressed={showWishlistOnly}
          >
            <Heart className={`h-3.5 w-3.5 mr-1.5 ${showWishlistOnly ? "fill-cream" : ""}`} aria-hidden="true" />
            Wishlist ({wishlist.length})
          </Button>
          <label className="sr-only" htmlFor="sort-select">Sort products</label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-9 rounded-full border border-input bg-card px-3 text-sm focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
      </div>

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mb-6" role="tablist" aria-label="Filter by category">
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={category === c}
            onClick={() => onCategory(c)}
            className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
              category === c
                ? "bg-ink text-cream"
                : "bg-card border border-border hover:border-ink/30"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="py-20 text-center">
          <SlidersHorizontal className="mx-auto h-8 w-8 text-muted-foreground mb-3" aria-hidden="true" />
          <p className="font-semibold">Nothing matches your filters</p>
          <p className="text-sm text-muted-foreground mt-1">Try clearing the search or picking another category.</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 rounded-full"
            onClick={() => {
              onSearch("");
              onCategory("All");
              setShowWishlistOnly(false);
            }}
          >
            <X className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" /> Clear all
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* Recently viewed */}
      <RecentlyViewed />
    </section>
  );
}

function RecentlyViewed() {
  const recent = useCart((s) => s.recentlyViewed);
  const items = recent.map((id) => getProduct(id)).filter(Boolean).slice(0, 4);
  if (items.length === 0) return null;
  return (
    <div className="mt-16 pt-8 border-t border-border">
      <div className="flex items-center gap-2 mb-4">
        <ArrowUpDown className="h-4 w-4 text-clay" aria-hidden="true" />
        <h3 className="font-display text-lg font-semibold">Recently viewed</h3>
        <Badge variant="secondary" className="text-[10px]">Keeps you browsing</Badge>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((p) => p && <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
