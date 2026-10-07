"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { categories, products } from "@/lib/products";

const tileImages: Record<string, { img: string; count: number }> = {
  Dresses: {
    img: "https://cdn.shopify.com/s/files/1/0503/0572/8697/files/DSC060442.jpg?v=1786447060",
    count: 0,
  },
  "Co-ord Sets": {
    img: "https://cdn.shopify.com/s/files/1/0503/0572/8697/files/IMG_83813.jpg?v=1791112143",
    count: 0,
  },
  Tops: {
    img: "https://cdn.shopify.com/s/files/1/0503/0572/8697/files/IMG_0833.jpg?v=1788598103",
    count: 0,
  },
  Shoes: {
    img: "https://cdn.shopify.com/s/files/1/0503/0572/8697/files/2B2E6BD5-0768-4368-866A-AC0A10A8A536.png?v=1790850203",
    count: 0,
  },
};

for (const c of Object.keys(tileImages)) {
  tileImages[c].count = products.filter((p) => p.category === c).length;
}

export function CategoryTiles({ onSelect }: { onSelect: (c: string) => void }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-12" aria-label="Shop by category">
      <div className="flex items-end justify-between mb-5">
        <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
          Shop by category
        </h2>
        <span className="text-sm text-muted-foreground hidden sm:block">
          Styles for every occasion, made for our climate
        </span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {Object.entries(tileImages).map(([cat, t], i) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className="group relative overflow-hidden rounded-2xl bg-sand text-left focus-visible:outline-2 focus-visible:outline-clay"
            style={{ aspectRatio: i === 0 ? "3/4" : "3/4" }}
            aria-label={`Shop ${cat}`}
          >
            <Image
              src={t.img}
              alt={`${cat} collection`}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
              <div className="text-white">
                <p className="font-display text-lg md:text-xl font-semibold leading-tight">{cat}</p>
                <p className="text-xs text-white/80">{t.count} styles</p>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur text-white transition-all group-hover:bg-clay">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
