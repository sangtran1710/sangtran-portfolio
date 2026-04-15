"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ShowreelSection from "@/components/home/ShowreelSection";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ShowreelPageClient() {
  const { copy } = useLanguage();

  return (
    <div className="min-h-screen bg-zinc-950 pt-24">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <Link
          href="/"
          className="mb-2 inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          {copy.common.backToHome}
        </Link>
      </div>
      <ShowreelSection />
      <div className="mx-auto max-w-5xl px-6 pb-20">
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-zinc-500">
          <span>Real-time VFX</span>
          <span className="hidden text-zinc-700 sm:inline">·</span>
          <span>Unreal Engine 5</span>
          <span className="hidden text-zinc-700 sm:inline">·</span>
          <span>Houdini</span>
          <span className="hidden text-zinc-700 sm:inline">·</span>
          <span>Niagara</span>
          <span className="hidden text-zinc-700 sm:inline">·</span>
          <span>HLSL Shaders</span>
        </div>
      </div>
    </div>
  );
}
