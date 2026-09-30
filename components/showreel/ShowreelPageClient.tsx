"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ShowreelSection from "@/components/home/ShowreelSection";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ShowreelPageClient() {
  const { copy } = useLanguage();

  return (
    <div className="min-h-screen bg-[#1c212c] pt-24">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <Link
          href="/"
          className="mb-2 inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          {copy.common.backToHome}
        </Link>
      </div>
      <ShowreelSection headingLevel="h1" />
    </div>
  );
}
