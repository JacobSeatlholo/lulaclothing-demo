"use client";

import { Gift, Star, Crown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Star,
    title: "Earn points every rand",
    text: "R1 spent = 1 point. Points stack on every order, online and in-store.",
  },
  {
    icon: Gift,
    title: "Redeem instantly",
    text: "R100 off, free shipping or early access to limited prints — your choice.",
  },
  {
    icon: Crown,
    title: "Unlock VIP perks",
    text: "Lula Insiders get birthday treats, exclusive previews and members-only styles.",
  },
];

export function Rewards() {
  return (
    <section id="rewards" className="mx-auto max-w-7xl px-4 pt-20" aria-label="Lula Rewards loyalty programme">
      <div className="rounded-3xl bg-clay-soft border border-clay/20 px-6 py-10 md:px-12 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-clay">
              <Gift className="h-3.5 w-3.5" aria-hidden="true" /> Lula Rewards
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mt-4 leading-tight">
              Every rand you spend brings something beautiful back
            </h2>
            <p className="text-sm md:text-[15px] text-muted-foreground mt-3 leading-relaxed">
              Join 3,000+ members earning points on every order. It&apos;s free to join, points
              never expire, and you get R50 just for signing up.
            </p>
            <Button className="mt-6 h-11 rounded-full bg-clay hover:bg-clay/85 text-white">
              Join free · get R50 <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          <div className="space-y-3">
            {steps.map((s, i) => (
              <div key={s.title} className="flex items-start gap-3.5 rounded-xl bg-white/70 backdrop-blur p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-clay text-white font-display font-semibold">
                  <s.icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[14px] font-semibold">
                    <span className="text-clay mr-1.5">{i + 1}.</span>
                    {s.title}
                  </p>
                  <p className="text-[13px] text-muted-foreground mt-0.5 leading-snug">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
