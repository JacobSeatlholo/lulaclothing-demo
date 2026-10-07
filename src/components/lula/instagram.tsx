"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";

const gramImages = [
  "https://cdn.shopify.com/s/files/1/0503/0572/8697/files/IMG_83993.jpg?v=1791119572",
  "https://cdn.shopify.com/s/files/1/0503/0572/8697/files/494F2CB4-FF15-456A-AB97-973BD3590EBC.png?v=1791110441",
  "https://cdn.shopify.com/s/files/1/0503/0572/8697/files/2B2E6BD5-0768-4368-866A-AC0A10A8A536.png?v=1790850203",
  "https://cdn.shopify.com/s/files/1/0503/0572/8697/files/59F853CE-86E6-46C2-8434-4E4FBF4172F2_77079a54-05df-4482-89c6-9984ac4a0c14.png?v=1789903910",
  "https://cdn.shopify.com/s/files/1/0503/0572/8697/files/92D4471F-402C-4A08-A726-2E0412BDC5D8.jpg?v=1789899278",
  "https://cdn.shopify.com/s/files/1/0503/0572/8697/files/EA826897-2B40-4347-B73B-115E949A9CFE.png?v=1789535909",
];

export function InstagramSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20" aria-label="Lula on Instagram">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
          Worn and loved <span className="italic text-clay">@lulaclothingza</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Tag us in your Lula look — we feature our favourites every Friday.
        </p>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
        {gramImages.map((src, i) => (
          <a
            key={src}
            href="https://www.instagram.com/lulaclothingza"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-xl bg-sand"
            aria-label={`View Instagram post ${i + 1}`}
          >
            <Image
              src={src}
              alt={`Lula Clothing on Instagram — look ${i + 1}`}
              fill
              sizes="(max-width: 768px) 33vw, 16vw"
              className="object-cover transition-transform duration-500 group-hover:scale-108"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors group-hover:bg-ink/40">
              <Instagram className="h-6 w-6 text-white opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
