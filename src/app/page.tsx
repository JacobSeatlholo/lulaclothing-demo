"use client";

import { useState } from "react";
import { AnnouncementBar } from "@/components/lula/announcement-bar";
import { Header } from "@/components/lula/header";
import { Hero } from "@/components/lula/hero";
import { TrustBadges } from "@/components/lula/trust-badges";
import { CategoryTiles } from "@/components/lula/category-tiles";
import { ProductGrid } from "@/components/lula/product-grid";
import { QuickView } from "@/components/lula/quick-view";
import { CartDrawer } from "@/components/lula/cart-drawer";
import { StorySection } from "@/components/lula/story-section";
import { Reviews } from "@/components/lula/reviews";
import { Rewards } from "@/components/lula/rewards";
import { InstagramSection } from "@/components/lula/instagram";
import { NewsletterPopup } from "@/components/lula/newsletter";
import { WhatsAppButton } from "@/components/lula/whatsapp-button";
import { Footer } from "@/components/lula/footer";
import { MobileCartBar } from "@/components/lula/mobile-cart-bar";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header search={search} onSearch={setSearch} category={category} onCategory={setCategory} />

      <main className="flex-1">
        <Hero />
        <TrustBadges />
        <CategoryTiles onSelect={setCategory} />
        <ProductGrid search={search} onSearch={setSearch} category={category} onCategory={setCategory} />
        <StorySection />
        <Reviews />
        <Rewards />
        <InstagramSection />
      </main>

      <Footer />

      {/* overlays */}
      <QuickView />
      <CartDrawer />
      <NewsletterPopup />
      <WhatsAppButton />
      <MobileCartBar />

      {/* demo tag */}
      <div className="fixed bottom-3 left-3 z-50 hidden md:block rounded-full bg-ink/85 text-cream backdrop-blur px-3.5 py-1.5 text-[11px] font-medium tracking-wide">
        Lula Clothing · conversion-focused demo concept
      </div>
    </div>
  );
}
