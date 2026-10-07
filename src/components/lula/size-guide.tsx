"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Ruler } from "lucide-react";

interface SizeGuideProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const clothesRows = [
  { size: "XS", sa: "30", bust: "80–84", waist: "62–66", hips: "88–92" },
  { size: "S", sa: "32", bust: "84–88", waist: "66–70", hips: "92–96" },
  { size: "M", sa: "34", bust: "88–92", waist: "70–74", hips: "96–100" },
  { size: "L", sa: "36", bust: "92–98", waist: "74–80", hips: "100–106" },
  { size: "XL", sa: "38", bust: "98–104", waist: "80–86", hips: "106–112" },
  { size: "XXL", sa: "40", bust: "104–110", waist: "86–92", hips: "112–118" },
  { size: "XXXL", sa: "42", bust: "110–116", waist: "92–98", hips: "118–124" },
];

const shoeRows = [
  { size: "3", eu: "35", foot: "22.0" },
  { size: "4", eu: "36", foot: "22.8" },
  { size: "5", eu: "37", foot: "23.7" },
  { size: "6", eu: "38", foot: "24.5" },
  { size: "7", eu: "39", foot: "25.4" },
  { size: "8", eu: "40", foot: "26.2" },
];

export function SizeGuide({ open, onOpenChange }: SizeGuideProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-cream max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <Ruler className="h-5 w-5 text-clay" aria-hidden="true" /> Find your size
          </DialogTitle>
          <DialogDescription>
            Between sizes? We recommend sizing up — and remember, exchanges are free.
          </DialogDescription>
        </DialogHeader>

        <h3 className="text-sm font-bold mt-2 mb-2">Clothing (cm)</h3>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-[13px]">
            <thead className="bg-sand text-left">
              <tr>
                <th className="px-3 py-2 font-semibold">Size</th>
                <th className="px-3 py-2 font-semibold">SA</th>
                <th className="px-3 py-2 font-semibold">Bust</th>
                <th className="px-3 py-2 font-semibold">Waist</th>
                <th className="px-3 py-2 font-semibold">Hips</th>
              </tr>
            </thead>
            <tbody>
              {clothesRows.map((r) => (
                <tr key={r.size} className="border-t border-border bg-card">
                  <td className="px-3 py-2 font-semibold">{r.size}</td>
                  <td className="px-3 py-2">{r.sa}</td>
                  <td className="px-3 py-2">{r.bust}</td>
                  <td className="px-3 py-2">{r.waist}</td>
                  <td className="px-3 py-2">{r.hips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-bold mt-5 mb-2">Shoes</h3>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-[13px]">
            <thead className="bg-sand text-left">
              <tr>
                <th className="px-3 py-2 font-semibold">SA size</th>
                <th className="px-3 py-2 font-semibold">EU</th>
                <th className="px-3 py-2 font-semibold">Foot length (cm)</th>
              </tr>
            </thead>
            <tbody>
              {shoeRows.map((r) => (
                <tr key={r.size} className="border-t border-border bg-card">
                  <td className="px-3 py-2 font-semibold">{r.size}</td>
                  <td className="px-3 py-2">{r.eu}</td>
                  <td className="px-3 py-2">{r.foot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Tip: Lula fits are true to size with generous stretch on knit and airflow styles. If you
          are between sizes or want extra length on pants, WhatsApp us — Lisa&apos;s team will help.
        </p>
      </DialogContent>
    </Dialog>
  );
}
