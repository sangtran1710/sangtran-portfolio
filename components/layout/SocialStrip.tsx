"use client";

import { Github, Linkedin } from "lucide-react";
import { SOCIALS } from "@/data/portfolio";

export default function SocialStrip() {
  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col gap-4 text-zinc-400 hover:text-zinc-100 transition-colors"
      aria-label="Social links"
    >
      <a
        href={SOCIALS.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="p-2 rounded-md hover:bg-white/5 transition-colors"
      >
        <Github className="h-5 w-5" />
      </a>
      <a
        href={SOCIALS.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="p-2 rounded-md hover:bg-white/5 transition-colors"
      >
        <Linkedin className="h-5 w-5" />
      </a>
    </div>
  );
}
