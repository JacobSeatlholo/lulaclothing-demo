"use client";

import { Truck, ShieldCheck, RefreshCcw, MapPin, CreditCard, MessageCircle } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free shipping over R1500",
    sub: "Nationwide courier · 2–4 days",
  },
  {
    icon: RefreshCcw,
    title: "Easy size exchanges",
    sub: "Wrong size? We swap it free",
  },
  {
    icon: CreditCard,
    title: "Pay your way",
    sub: "PayFast · PayShap · SnapScan · Mobicred",
  },
  {
    icon: MapPin,
    title: "Made in Umhlanga",
    sub: "Every garment sewn in-house",
  },
];

export function TrustBadges() {
  return (
    <section aria-label="Why shop with Lula" className="border-y border-border bg-sand/60">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {badges.map((b) => (
            <li key={b.title} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-clay-soft text-clay">
                <b.icon className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[13px] font-semibold leading-tight">{b.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{b.sub}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function WhatsappHelper() {
  return (
    <div className="hidden md:flex items-center gap-2 text-[13px] text-muted-foreground">
      <MessageCircle className="h-4 w-4 text-clay" aria-hidden="true" />
      Prefer to order on WhatsApp? We&apos;re online.
    </div>
  );
}
