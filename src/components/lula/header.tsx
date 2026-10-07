"use client";

import { useState } from "react";
import { Search, Heart, ShoppingBag, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/store";
import { categories } from "@/lib/products";

interface HeaderProps {
  search: string;
  onSearch: (v: string) => void;
  category: string;
  onCategory: (c: string) => void;
}

export function Header({ search, onSearch, category, onCategory }: HeaderProps) {
  const cartCount = useCart((s) => s.cartCount());
  const wishlistCount = useCart((s) => s.wishlist.length);
  const setCartOpen = useCart((s) => s.setCartOpen);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navCats = categories.filter((c) => c !== "All");

  function scrollToShop(cat?: string) {
    if (cat) onCategory(cat);
    setMobileOpen(false);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center gap-3">
          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-cream">
              <SheetTitle className="font-display text-2xl">Lula</SheetTitle>
              <nav className="mt-4 flex flex-col gap-1" aria-label="Mobile navigation">
                {navCats.map((c) => (
                  <button
                    key={c}
                    onClick={() => scrollToShop(c)}
                    className={`text-left px-3 py-2.5 rounded-lg text-[15px] transition-colors hover:bg-sand ${
                      category === c ? "bg-sand font-semibold" : ""
                    }`}
                  >
                    {c}
                  </button>
                ))}
                <div className="h-px bg-border my-2" />
                <a href="#story" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-lg hover:bg-sand">
                  Our Story
                </a>
                <a href="#rewards" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-lg hover:bg-sand">
                  Lula Rewards
                </a>
                <a href="#reviews" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-lg hover:bg-sand">
                  Reviews
                </a>
              </nav>
              <div className="absolute bottom-4 left-5 right-5 text-xs text-muted-foreground">
                Free shipping over R1500 · Easy exchanges
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <a
            href="#top"
            className="font-display text-[26px] font-semibold tracking-tight mr-1"
            aria-label="Lula Clothing home"
          >
            lula<span className="text-clay">.</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 ml-4" aria-label="Categories">
            {navCats.slice(0, 6).map((c) => (
              <button
                key={c}
                onClick={() => scrollToShop(c)}
                className={`px-3 py-2 text-sm rounded-full transition-colors hover:bg-sand ${
                  category === c ? "bg-ink text-cream hover:bg-ink" : ""
                }`}
              >
                {c}
              </button>
            ))}
            <a href="#story" className="px-3 py-2 text-sm rounded-full hover:bg-sand">Our Story</a>
          </nav>

          <div className="flex-1" />

          {/* Search */}
          <div className="hidden lg:block relative w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Input
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search styles…"
              className="pl-9 h-9 rounded-full bg-card border-border"
              aria-label="Search products"
            />
          </div>

          {/* Rewards chip */}
          <a
            href="#rewards"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-clay/40 bg-clay-soft px-3 py-1.5 text-xs font-semibold text-clay hover:bg-clay hover:text-white transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Rewards
          </a>

          {/* Wishlist */}
          <Button variant="ghost" size="icon" className="relative" aria-label={`Wishlist, ${wishlistCount} items`}>
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 rounded-full bg-clay text-[10px] font-bold text-white flex items-center justify-center px-0.5">
                {wishlistCount}
              </span>
            )}
          </Button>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setCartOpen(true)}
            aria-label={`Basket, ${cartCount} items`}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 rounded-full bg-clay text-[10px] font-bold text-white flex items-center justify-center px-0.5 animate-in zoom-in duration-200">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="lg:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search dresses, tops, sandals…"
            className="pl-9 h-10 rounded-full bg-card border-border"
            aria-label="Search products"
          />
          {search && (
            <button
              onClick={() => onSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
