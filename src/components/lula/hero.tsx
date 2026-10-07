"use client";

import Image from "next/image";
import { ArrowRight, Star, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  function shop() {
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  }
  function story() {
    document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="top" className="relative overflow-hidden bg-cream">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-14 md:pt-16 md:pb-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Copy */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-clay-soft border border-clay/25 px-3.5 py-1.5 text-xs font-semibold text-clay mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-clay animate-pulse-soft" aria-hidden="true" />
              Proudly made in South Africa · Spring collection live
            </div>

            <h1 className="font-display text-4xl md:text-[56px] leading-[1.05] font-semibold tracking-tight text-balance">
              Effortless style that feels{" "}
              <span className="italic text-clay">made for you</span> — because it is.
            </h1>

            <p className="mt-5 text-[15px] md:text-base leading-relaxed text-muted-foreground">
              Every Lula piece is designed and sewn in-house at our Umhlanga studio by our team
              of seven local artisans. Beautiful fabrics, flattering fits for SA summers, and
              sizes XS–XXXL — with easy exchanges if you&apos;re between sizes.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={shop} className="h-12 px-7 text-[15px] rounded-full bg-ink hover:bg-ink/85">
                Shop New In <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
              </Button>
              <Button size="lg" variant="outline" onClick={story} className="h-12 px-7 text-[15px] rounded-full border-ink/20">
                Our Story
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="flex text-clay" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-clay" />
                  ))}
                </span>
                <strong className="text-foreground font-semibold">4.9</strong> from 1,200+ happy customers
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-clay" aria-hidden="true" /> Free shipping over R1500
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-clay" aria-hidden="true" /> Secure local payments
              </span>
            </div>
          </div>

          {/* Imagery */}
          <div className="relative">
            <div className="relative aspect-[4/5] w-full max-w-[520px] mx-auto overflow-hidden rounded-2xl bg-sand">
              <Image
                src="https://cdn.shopify.com/s/files/1/0503/0572/8697/files/IMG_83763.jpg?v=1791117044"
                alt="Ella shorts set with off the shoulder top — new from the Lula spring collection"
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-white/90 backdrop-blur px-4 py-3">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">New in</p>
                  <p className="text-sm font-semibold">Ella shorts set · R780</p>
                </div>
                <Button size="sm" onClick={shop} className="rounded-full bg-ink hover:bg-ink/85">
                  Shop now
                </Button>
              </div>
            </div>

            {/* floating cards */}
            <div className="hidden md:flex absolute -left-4 top-8 items-center gap-3 rounded-xl bg-white shadow-lg shadow-ink/5 border border-border px-4 py-3 animate-in fade-in slide-in-from-left duration-700">
              <div className="relative h-12 w-10 overflow-hidden rounded-md bg-sand">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0503/0572/8697/files/DSC03261-2.jpg?v=1695824958"
                  alt="Malia maxi dress"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold">Malia maxi dress</p>
                <p className="text-[11px] text-muted-foreground">6 colours · R680</p>
              </div>
            </div>
            <div className="hidden md:flex absolute -right-2 bottom-24 flex-col gap-1 rounded-xl bg-ink text-cream shadow-lg px-4 py-3 animate-in fade-in slide-in-from-right duration-700">
              <p className="text-[11px] uppercase tracking-wider text-cream/70">Made by hand</p>
              <p className="text-sm font-semibold">7 artisans · 100% local</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
