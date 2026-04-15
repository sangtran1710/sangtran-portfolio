"use client";

import { Github, Linkedin } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SOCIALS } from "@/data/portfolio";

export default function SocialStrip() {
  const { copy } = useLanguage();

  return (
    <div
      className="fixed bottom-5 right-5 z-40 hidden flex-col gap-2 rounded-full border border-stone-200 bg-[#fdf9f3] p-1.5 shadow-[0_12px_24px_rgba(15,23,42,0.08)] md:flex"
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
