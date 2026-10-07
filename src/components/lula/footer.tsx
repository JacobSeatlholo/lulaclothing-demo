"use client";

import { MapPin, Mail, Phone, Instagram, ShieldCheck } from "lucide-react";
import { NewsletterInline } from "./newsletter";

const columns = [
  {
    title: "Shop",
    links: ["New In", "Dresses", "Co-ord Sets", "Tops", "Bottoms", "Shoes", "Sale", "Gift Cards"],
  },
  {
    title: "Help",
    links: ["Size Guide", "Shipping & Delivery", "Returns & Exchanges", "Track My Order", "FAQs", "WhatsApp Us"],
  },
  {
    title: "About",
    links: ["Our Story", "Made Local Impact", "Visit the Studio", "Wholesale", "Corporate Orders", "Contact Us"],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-sand/60">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-5">
          {/* brand + newsletter */}
          <div className="md:col-span-2">
            <p className="font-display text-3xl font-semibold tracking-tight">
              lula<span className="text-clay">.</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs leading-relaxed">
              Effortless womenswear designed and made with pride in Umhlanga, South Africa.
              Love what you wear.
            </p>
            <div className="mt-6">
              <NewsletterInline />
            </div>
            <div className="mt-6 flex items-center gap-4 text-muted-foreground">
              <a
                href="https://www.instagram.com/lulaclothingza"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-clay transition-colors"
                aria-label="Lula on Instagram"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://wa.me/27834485297"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-clay transition-colors"
                aria-label="Lula on WhatsApp"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href="mailto:lisa@lulaclothing.co.za" className="hover:text-clay transition-colors" aria-label="Email Lula">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* link columns */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-foreground/80">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#shop" className="text-sm text-muted-foreground hover:text-clay transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* contact strip */}
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-xl bg-card border border-border px-5 py-4 text-[13px]">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-clay" aria-hidden="true" />
            Showroom: Umhlanga, KwaZulu-Natal — walk-ins welcome
          </span>
          <span className="inline-flex items-center gap-2">
            <Phone className="h-4 w-4 text-clay" aria-hidden="true" /> +27 83 448 5297
          </span>
          <span className="inline-flex items-center gap-2">
            <Mail className="h-4 w-4 text-clay" aria-hidden="true" /> lisa@lulaclothing.co.za
          </span>
          <span className="ml-auto text-muted-foreground">Mon–Fri 8:30–16:30 · Sat 9:00–13:00</span>
        </div>

        {/* payments + legal */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["Visa", "Mastercard", "PayFast", "PayShap", "SnapScan", "Mobicred", "Yoco"].map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1.5 text-[11px] font-medium"
              >
                <ShieldCheck className="h-3 w-3 text-clay" aria-hidden="true" />
                {p}
              </span>
            ))}
          </div>
          <p className="text-center md:text-right">
            © {new Date().getFullYear()} Lula Clothing Boutique · Improved demo concept ·{" "}
            <a href="#top" className="hover:text-clay">Terms</a> ·{" "}
            <a href="#top" className="hover:text-clay">Privacy (POPIA)</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
