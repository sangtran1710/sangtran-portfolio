"use client";

import { Github, Linkedin } from "lucide-react";
import { SOCIALS } from "@/data/portfolio";

export default function SocialStrip() {
  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col gap-2 p-1.5 rounded-2xl bg-white/95 dark:bg-zinc-800/95 shadow-lg border border-zinc-200/80 dark:border-zinc-700/80 backdrop-blur-sm"
      aria-label="Social links"
    >
      <a
        href={SOCIALS.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-700/80 transition-all duration-200"
      >
        <Github className="h-5 w-5" strokeWidth={1.5} />
      </a>
      <a
        href={SOCIALS.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-600 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 dark:text-zinc-300 dark:hover:text-[#0A66C2] dark:hover:bg-[#0A66C2]/10 transition-all duration-200"
      >
        <Linkedin className="h-5 w-5" strokeWidth={1.5} />
      </a>
    </div>
  );
}
