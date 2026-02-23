import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import IgamingSection from "@/components/igaming/IgamingSection";

export const metadata: Metadata = {
  title: "iGaming & Live Casino",
  description:
    "Live casino and iGaming-style VFX — broadcast overlays, win callouts, and real-time motion graphics for readability and polish.",
};

export default function IgamingPage() {
  return (
    <div className="min-h-screen pt-14 bg-[#0c0a09]">
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-amber-200/80 hover:text-amber-200 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
      <IgamingSection />
    </div>
  );
}
