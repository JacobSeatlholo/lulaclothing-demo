# Lula Clothing — Improved Demo

A **conversion-focused demo rebuild** of [lulaclothing.co.za](https://lulaclothing.co.za), built with Next.js 16, TypeScript, Tailwind CSS 4 and shadcn/ui. It uses **Lula's real product catalogue and imagery** (pulled from their live Shopify store) to demonstrate, side by side, what is missing on the current site and how each gap can be closed to increase engagement and conversion.

> This is a concept demo — cart checkout is simulated. No real orders are processed.

---

## 1. Audit — what the current site is missing

Lula has a great foundation: a real factory story (7 local artisans in Umhlanga), loyal customers, quality products at R250–R1100, and a Shopify store with loyalty (Smile.io) and chat already installed. But several conversion levers are unused:

| # | Gap on current site | Why it costs sales |
|---|---------------------|--------------------|
| 1 | **No quick add-to-cart** on product cards | Every product requires a page visit — friction on mobile kills impulse buys |
| 2 | **No colour swatches on cards** | Products have up to 6 colourways; shoppers can't see variety without clicking |
| 3 | **No urgency or scarcity cues** | Stock-outs (e.g. sold-out PJs) show no "low stock" nudge anywhere |
| 4 | **No size guide at decision point** | Sizes vary per product (S–XXL vs XS–XXXL vs shoe 3–8); uncertainty = abandoned carts & returns |
| 5 | **No free-shipping progress bar** | "Free over R1500" is only in a banner; shoppers never pushed to add one more item |
| 6 | **Reviews only on homepage** | No ratings on product cards/pages where purchase decisions happen |
| 7 | **No WhatsApp ordering** | In SA, WhatsApp commerce is huge; the phone number exists but isn't click-to-chat |
| 8 | **Newsletter has no incentive** | "Subscribe now" converts poorly vs. "10% off your first order" |
| 9 | **Loyalty programme invisible** | Smile.io loads in the background but is never promoted in the UX |
| 10 | **No cross-sells / "complete the look"** | Co-ord sets & tops+bottoms pairings are natural AOV builders |
| 11 | **No local payment trust badges** | PayFast / PayShap / SnapScan / Mobicred reassurance missing at checkout |
| 12 | **The story is buried** | The "7 local ladies, 12 years" story is the brand's strongest asset — it's a footer paragraph |
| 13 | **No wishlist / save for later** | Browsers leave with no capture mechanism |
| 14 | **No exit-intent / welcome offer** | No capture moment for first-time visitors |
| 15 | **Weak hero offer** | "LOVE WHAT YOU WEAR" is brand-led, not offer- or action-led |

## 2. What this demo adds (mapped to the gaps)

Every feature below is live and clickable in the demo:

- **Rotating announcement bar** — free shipping, new drops, exchanges, local manufacture (Gap 5, 15)
- **Offer-led hero** with social proof (4.9★, 1,200+ customers) and trust chips (Gap 15)
- **Trust badge row** — shipping, exchanges, local payments, made-in-Umhlanga (Gap 11)
- **Category tiles** with live product counts (Gap 2, engagement)
- **Product grid with search, category filter & sort** (engagement)
- **Product cards**: hover second image, **quick add with inline size picker**, **colour swatches**, wishlist, **low-stock urgency** ("Only 2 left"), sale badges, ratings (Gaps 1, 2, 3, 6, 13)
- **Quick-view modal**: colour/size selectors, **size guide with SA sizing tables**, stock urgency, shipping/exchange reassurance, **"Complete the look" cross-sell** (Gaps 4, 10)
- **Cart drawer with free-shipping progress bar**, **"pairs well with" upsells**, payment trust badges (Gaps 5, 10, 11)
- **Story section** with impact stats — 12 years, 7 artisans, 100% local (Gap 12)
- **Verified review cards** using real testimonials from the live site (Gap 6)
- **Lula Rewards** loyalty teaser with earn/redeem/VIP steps (Gap 9)
- **Shop-the-gram** Instagram grid (engagement)
- **Newsletter popup + inline footer form** with 10% welcome offer (Gap 8, 14)
- **Floating WhatsApp button** — pre-filled chat to Lisa's number, shows basket count (Gap 7)
- **Sticky mobile basket bar** with running subtotal (mobile conversion)
- **Recently viewed** strip (engagement)

## 3. Run it

```bash
bun install     # or npm install / pnpm install
bun run dev     # or npm run dev
```

Then open http://localhost:3000.

Product data lives in `src/data/products.json` (generated from the live Shopify `/products.json` feed) and is typed/served via `src/lib/products.ts`.

## 4. Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4 + shadcn/ui (Sheet, Dialog, Progress, Toaster…)
- Zustand for cart / wishlist / recently-viewed state
- next/font with the brand's own faces (Figtree + Fraunces)
- Imagery hot-linked from Lula's Shopify CDN

## 5. Suggested next steps for production

1. Port the highest-impact features to the existing Shopify theme first: quick add, swatches, size guide, free-shipping progress bar and WhatsApp button are all low-effort/high-ROI there.
2. Put ratings on product cards (Judge.me / Shopify Product Reviews) and badges on cards.
3. Move the maker story into a homepage section with the impact stats.
4. Turn on Smile.io on-site widgets and promote "Join free · get R50".
5. Add PayFast/PayShap/SnapScan/Mobicred badges to cart + checkout.
6. A/B test the 10%-off welcome popup vs. exit-intent only.

---

Built as a working demo concept. All product data and photos © Lula Clothing Boutique.
