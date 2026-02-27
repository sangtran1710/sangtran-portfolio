import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RndSection from "@/components/home/RndSection";

export const metadata: Metadata = {
  title: "R&D / Commercial Works",
  description: "Personal experiments, motion graphics, and commercial productions.",
};

export default function RndPage() {
  return (
    <div className="min-h-screen pt-24 bg-slate-50">
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
      <RndSection />
    </div>
  );
}
