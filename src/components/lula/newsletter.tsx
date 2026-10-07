"use client";

import { useEffect, useState } from "react";
import { Mail, X, PartyPopper } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const KEY = "lula-newsletter-seen";

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // show once per session after 8s, only if not seen
    try {
      if (sessionStorage.getItem(KEY)) return;
    } catch {
      /* storage unavailable — still show once */
    }
    const t = setTimeout(() => setOpen(true), 8000);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || email.length < 5) {
      toast.error("Please enter a valid email", { description: "E.g. you@example.co.za" });
      return;
    }
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
    toast.success("Welcome to the Lula family!", {
      description: "Your 10% welcome code: LULA10 — valid on your first order.",
    });
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? dismiss() : undefined)}>
      <DialogContent className="max-w-md bg-cream p-0 overflow-hidden gap-0 [&>button]:hidden">
        <DialogTitle className="sr-only">Get 10% off your first Lula order</DialogTitle>
        <div className="relative h-32 bg-ink flex items-center justify-center">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "url(https://cdn.shopify.com/s/files/1/0503/0572/8697/files/DSC03261-2.jpg?v=1695824958)",
              backgroundSize: "cover",
              backgroundPosition: "center 20%",
            }}
            aria-hidden="true"
          />
          <p className="relative font-display text-3xl text-cream font-semibold">
            lula<span className="text-clay">.</span>
          </p>
          <button
            onClick={dismiss}
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors"
            aria-label="Close welcome offer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 text-center">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-clay-soft border border-clay/25 px-3 py-1 text-xs font-semibold text-clay">
            <PartyPopper className="h-3.5 w-3.5" aria-hidden="true" /> Welcome offer
          </p>
          <h3 className="font-display text-2xl font-semibold mt-3 leading-tight">
            Get 10% off your first order
          </h3>
          <p className="text-[13px] text-muted-foreground mt-2 leading-relaxed">
            Join the list for early access to new drops, subscriber-only deals and styling tips.
            One email a week — the good kind.
          </p>
          <form onSubmit={subscribe} className="mt-5 flex gap-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <Input
              id="newsletter-email"
              type="email"
              placeholder="you@example.co.za"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-full bg-card"
            />
            <Button type="submit" className="h-11 rounded-full px-6 bg-ink hover:bg-clay transition-colors shrink-0">
              <Mail className="mr-1 h-4 w-4" aria-hidden="true" /> Get 10%
            </Button>
          </form>
          <button onClick={dismiss} className="mt-3 text-[12px] text-muted-foreground hover:underline">
            No thanks, I&apos;ll pay full price
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function NewsletterInline() {
  const [email, setEmail] = useState("");
  function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || email.length < 5) {
      toast.error("Please enter a valid email");
      return;
    }
    setEmail("");
    toast.success("You're in!", {
      description: "Your 10% welcome code: LULA10 — check your inbox.",
    });
  }
  return (
    <div>
      <h3 className="font-display text-lg font-semibold">Join the Lula list</h3>
      <p className="text-sm text-muted-foreground mt-1.5">
        10% off your first order, early access to new prints, subscriber-only deals.
      </p>
      <form onSubmit={subscribe} className="mt-4 flex gap-2 max-w-sm">
        <label htmlFor="footer-newsletter" className="sr-only">
          Email address
        </label>
        <Input
          id="footer-newsletter"
          type="email"
          placeholder="you@example.co.za"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-10 rounded-full bg-card"
        />
        <Button type="submit" className="h-10 rounded-full px-5 bg-clay hover:bg-clay/85 text-white shrink-0">
          Subscribe
        </Button>
      </form>
    </div>
  );
}
