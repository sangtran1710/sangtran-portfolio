"use client";

import { Github, Linkedin } from "lucide-react";
import { SOCIALS } from "@/data/portfolio";

export default function SocialStrip() {
  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 text-zinc-400 hover:text-zinc-100 transition-colors duration-200"
      aria-label="Social links"
    >
      <a
        href={SOCIALS.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all duration-200 hover:scale-110 active:scale-95 motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
      >
        <Github className="h-5 w-5" strokeWidth={1.5} />
      </a>
      <a
        href={SOCIALS.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all duration-200 hover:scale-110 active:scale-95 motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
      >
        <Linkedin className="h-5 w-5" strokeWidth={1.5} />
      </a>
    </div>
  );
}
