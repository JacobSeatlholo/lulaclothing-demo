"use client";

import { Star, BadgeCheck } from "lucide-react";

const reviews = [
  {
    name: "Michelle Botha",
    location: "Verified buyer · Durban",
    rating: 5,
    text: "I have more Lula items in my cupboard than anything else. SO stylish, classic, timeless and incredibly flattering! I love that you constantly create new items in new fabrics. And the quality is fabulous — Lula is my first choice for shopping!",
    item: "Malia maxi dress",
  },
  {
    name: "Judy Hide",
    location: "Verified buyer · Umhlanga",
    rating: 5,
    text: "Lula is my go-to for any occasion. Great quality, fast and friendly service, and Lisa is always helpful. Thank you for making online fashion shopping so easy!",
    item: "Linen Sicily shorts set",
  },
  {
    name: "Cecelia Jefferies",
    location: "Verified buyer · Cape Town",
    rating: 5,
    text: "Lula always goes the extra mile — extra length on pants, alternate fabric choices when I ask. Lisa is always willing to help. Shop local and see how you feel!",
    item: "Capri linen pants",
  },
  {
    name: "Altima Marx",
    location: "Verified buyer · Johannesburg",
    rating: 5,
    text: "I absolutely love Lula's dresses — so flattering and stylish! Great quality and service every single time.",
    item: "Steff dress",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-7xl px-4 pt-20" aria-label="Customer reviews">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-clay-soft border border-clay/25 px-3.5 py-1.5 text-xs font-semibold text-clay">
          <Star className="h-3.5 w-3.5 fill-clay" aria-hidden="true" />
          4.9 average · 1,200+ reviews
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mt-4">
          Women who found their fit
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Real reviews from verified Lula customers — unedited, unprompted, and the reason our
          regulars come back season after season.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews.map((r) => (
          <figure key={r.name} className="flex flex-col rounded-2xl border border-border bg-card p-5">
            <div className="flex text-clay mb-3" aria-label={`${r.rating} out of 5 stars`}>
              {[...Array(r.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-clay" aria-hidden="true" />
              ))}
            </div>
            <blockquote className="text-[13px] leading-relaxed text-foreground/85 flex-1">
              “{r.text}”
            </blockquote>
            <figcaption className="mt-4 pt-3 border-t border-border">
              <p className="text-[13px] font-semibold flex items-center gap-1.5">
                {r.name}
                <BadgeCheck className="h-3.5 w-3.5 text-clay" aria-hidden="true" />
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {r.location} · bought {r.item}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
