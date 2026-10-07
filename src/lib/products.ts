import rawProducts from "@/data/products.json";

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  shopifyId: number;
  handle: string;
  title: string;
  category: string;
  price: number;
  compareAt: number | null;
  image: string;
  image2: string;
  colors: ColorOption[];
  sizes: string[];
  stock: number;
  fabric: string;
  description: string;
  badges: string[];
}

export const products: Product[] = rawProducts as Product[];

export const categories = [
  "All",
  "Dresses",
  "Co-ord Sets",
  "Tops",
  "Bottoms",
  "Kaftans",
  "Lounge & Sleep",
  "Shoes",
];

export const FREE_SHIPPING_THRESHOLD = 1500;

export function formatZAR(value: number): string {
  return `R${value.toLocaleString("en-ZA", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function discountPct(p: Product): number | null {
  if (!p.compareAt || p.compareAt <= p.price) return null;
  return Math.round(((p.compareAt - p.price) / p.compareAt) * 100);
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Cross-sell picks: same category first, then tops to complete an outfit. */
export function relatedProducts(p: Product, n = 4): Product[] {
  const pool = products.filter((x) => x.id !== p.id && x.stock > 0);
  const same = pool.filter((x) => x.category === p.category);
  const tops = pool.filter((x) => x.category === "Tops" || x.category === "Shoes");
  const rest = pool.filter((x) => !same.includes(x) && !tops.includes(x));
  return [...same, ...tops, ...rest].slice(0, n);
}

export const heroImages = [
  "https://cdn.shopify.com/s/files/1/0503/0572/8697/files/DSC03261-2.jpg?v=1695824958",
  "https://cdn.shopify.com/s/files/1/0503/0572/8697/files/IMG_83763.jpg?v=1791117044",
  "https://cdn.shopify.com/s/files/1/0503/0572/8697/files/DSC060442.jpg?v=1786447060",
];
