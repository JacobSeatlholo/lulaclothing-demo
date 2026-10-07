"use client";

import { useEffect, useState } from "react";
import { Truck, Sparkles, RefreshCcw, MapPin } from "lucide-react";

const messages = [
  { icon: Truck, text: "FREE SHIPPING on orders over R1500" },
  { icon: Sparkles, text: "New Spring styles just dropped — shop New In" },
  { icon: RefreshCcw, text: "Easy size exchanges — we'll swap it, no fuss" },
  { icon: MapPin, text: "100% designed & made in Umhlanga, South Africa" },
];

export function AnnouncementBar() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % messages.length), 4000);
    return () => clearInterval(t);
  }, []);

  const Active = messages[idx].icon;

  return (
    <div className="bg-ink text-cream text-[13px]" role="region" aria-label="Store announcements">
      <div className="mx-auto max-w-7xl px-4 h-9 flex items-center justify-center overflow-hidden">
        <div key={idx} className="flex items-center gap-2 animate-in fade-in slide-in-from-bottom-1 duration-500">
          <Active className="h-3.5 w-3.5 text-clay" aria-hidden="true" />
          <span className="tracking-wide font-medium">{messages[idx].text}</span>
        </div>
      </div>
    </div>
  );
}
