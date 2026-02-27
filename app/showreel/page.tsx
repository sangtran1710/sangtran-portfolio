import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ShowreelSection from "@/components/home/ShowreelSection";

export const metadata: Metadata = {
  title: "Showreel",
  description: "VFX Reel 2025 — Real-time VFX · AAA · Cinematic",
};

export default function ShowreelPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-24">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors mb-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
      <ShowreelSection />
      {/* Credits / info strip */}
      <div className="mx-auto max-w-5xl px-6 pb-20">
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-zinc-500">
          <span>Real-time VFX</span>
          <span className="hidden sm:inline text-zinc-700">·</span>
          <span>Unreal Engine 5</span>
          <span className="hidden sm:inline text-zinc-700">·</span>
          <span>Houdini</span>
          <span className="hidden sm:inline text-zinc-700">·</span>
          <span>Niagara</span>
          <span className="hidden sm:inline text-zinc-700">·</span>
          <span>HLSL Shaders</span>
        </div>
      </div>
    </div>
  );
}
