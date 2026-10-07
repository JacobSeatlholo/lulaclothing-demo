"use client";

import Image from "next/image";
import { HeartHandshake, Scissors, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "12", label: "years crafting locally" },
  { value: "7", label: "local women employed" },
  { value: "100%", label: "made in South Africa" },
  { value: "4.9★", label: "average customer rating" },
];

export function StorySection() {
  return (
    <section id="story" className="mt-20 bg-ink text-cream" aria-label="Our story">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-3.5 py-1.5 text-xs font-semibold text-cream/90">
              <HeartHandshake className="h-3.5 w-3.5 text-clay" aria-hidden="true" />
              More than a boutique — a community
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight mt-5 leading-tight text-balance">
              When you wear Lula, seven families eat because of you.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-cream/75">
              Lula began 12 years ago with a simple belief: South African women deserve beautiful,
              flattering clothes made with pride at home. Today every piece is still designed,
              cut and sewn in-house at our Umhlanga studio — you can literally walk in and watch
              your garment being made.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-cream/75">
              Our team of seven talented local women sew each order with meticulous attention to
              detail. No mass production, no offshore factories — just quality fabrics chosen for
              our climate, and fits that make real women feel confident.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl bg-white/5 border border-white/10 px-3 py-4 text-center">
                  <p className="font-display text-2xl md:text-3xl font-semibold text-clay">{s.value}</p>
                  <p className="text-[11px] text-cream/70 mt-1 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="h-11 rounded-full bg-clay hover:bg-clay/85 text-white">
                <Scissors className="mr-2 h-4 w-4" aria-hidden="true" /> Visit the Umhlanga studio
              </Button>
              <span className="inline-flex items-center text-sm text-cream/60 self-center">
                <Sun className="mr-1.5 h-4 w-4 text-clay" aria-hidden="true" />
                Styles designed for SA summers, XS–XXXL
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] max-w-[480px] mx-auto overflow-hidden rounded-2xl">
              <Image
                src="https://cdn.shopify.com/s/files/1/0503/0572/8697/files/DSC058552.jpg?v=1786446116"
                alt="Kaftan Donna top — sewn in-house at the Lula Umhlanga studio"
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <blockquote className="absolute bottom-5 left-5 right-5 text-[13px] italic text-cream/95 font-display">
                “We employ 7 local ladies, who then feed their families. You are the reason they
                can. Thank you.” — Lisa, founder
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
