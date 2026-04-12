"use client";

import { Github, Linkedin } from "lucide-react";
import { SOCIALS } from "@/data/portfolio";

export default function SocialStrip() {
  return (
    <div
      className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col gap-2 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,22,0.84),rgba(12,17,26,0.72))] p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl"
      aria-label="Social links"
    >
      <a
        href={SOCIALS.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="flex h-10 w-10 items-center justify-center rounded-full text-white/65 transition-all duration-200 hover:bg-white/10 hover:text-white"
      >
        <Github className="h-5 w-5" strokeWidth={1.5} />
      </a>
      <a
        href={SOCIALS.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="flex h-10 w-10 items-center justify-center rounded-full text-white/65 transition-all duration-200 hover:bg-white/10 hover:text-[#6bb7ff]"
      >
        <Linkedin className="h-5 w-5" strokeWidth={1.5} />
      </a>
    </div>
  );
}
