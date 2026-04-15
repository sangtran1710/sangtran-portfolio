"use client";

import { Github, Linkedin } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SOCIALS } from "@/data/portfolio";

export default function SocialStrip() {
  const { copy } = useLanguage();

  return (
    <div
      className="fixed bottom-4 right-4 z-40 hidden md:flex flex-col gap-1.5 rounded-full border border-stone-200/90 bg-[rgba(255,251,245,0.9)] p-1 shadow-[0_10px_22px_rgba(15,23,42,0.07)] backdrop-blur-md"
      aria-label={copy.common.socialLinks}
    >
      <a
        href={SOCIALS.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-all duration-200 hover:bg-stone-100 hover:text-slate-900"
      >
        <Github className="h-4.5 w-4.5" strokeWidth={1.5} />
      </a>
      <a
        href={SOCIALS.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-all duration-200 hover:bg-stone-100 hover:text-[#0A66C2]"
      >
        <Linkedin className="h-4.5 w-4.5" strokeWidth={1.5} />
      </a>
    </div>
  );
}
