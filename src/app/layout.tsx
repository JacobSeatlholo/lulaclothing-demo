import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Lula Clothing Boutique — Proudly South African Womenswear (Improved Demo)",
  description:
    "Interactive conversion-focused demo concept for Lula Clothing. Dresses, co-ords, tops, bottoms, shoes & accessories — 100% designed and manufactured in South Africa. Free shipping over R1500.",
  keywords: [
    "Lula Clothing",
    "South African fashion",
    "womens dresses",
    "locally made clothing",
    "Umhlanga boutique",
    "shop local SA",
  ],
  openGraph: {
    title: "Lula Clothing Boutique — Improved Demo Concept",
    description:
      "A conversion-focused demo rebuild: quick add, size guidance, free-shipping progress, rewards and WhatsApp ordering.",
    siteName: "Lula Clothing Demo",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${figtree.variable} ${fraunces.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster position="bottom-center" richColors closeButton />
      </body>
    </html>
  );
}
