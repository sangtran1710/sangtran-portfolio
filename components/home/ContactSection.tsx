"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedSite } from "@/lib/portfolio-content";
import { SOCIALS } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  const { locale } = useLanguage();
  const site = getLocalizedSite(locale);
  const isVi = locale === "vi";

  return (
    <section id="contact" className="border-t border-white/10 bg-[#070a0f]">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        {/* Visual Anchor: Availability Indicator */}
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-mono text-teal-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
          </span>
          <span>
            {isVi
              ? "Sẵn sàng cho các cơ hội hợp tác remote & freelance"
              : "Available for remote collaboration & freelance"}
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="text-3xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
              {isVi ? "Cùng tạo nên điều đặc biệt." : "Let's build something memorable."}
            </h2>
            <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-white/55">
              {isVi
                ? "Chuyên về real-time gameplay VFX, shader tùy biến và tối ưu hiệu năng engine cho game console, PC và cinematic."
                : "Specializing in real-time gameplay VFX, custom shaders, and in-engine performance profiling for console, PC, and cinematic productions."}
            </p>

            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-block border-b-2 border-white/30 pb-2 font-mono text-2xl font-medium tracking-tight text-white transition-all hover:border-[#7db5b0] hover:text-[#a7d2ce] sm:text-4xl"
            >
              {site.email}
            </a>
          </div>

          <div className="lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-10">
            <p className="text-xs font-mono uppercase tracking-widest text-[#7db5b0] mb-4">
              {isVi ? "Kênh kết nối trực tiếp" : "Direct Channels"}
            </p>
            <div className="flex flex-col gap-3 text-sm font-medium text-white/70">
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between transition-colors hover:text-white"
              >
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white transition-colors" />
              </a>
              <a
                href={SOCIALS.resume}
                download
                className="group flex items-center justify-between transition-colors hover:text-white"
              >
                <span>Download Resume (PDF)</span>
                <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white transition-colors" />
              </a>
              <a
                href="/contact"
                className="group flex items-center justify-between transition-colors hover:text-white"
              >
                <span>Contact details</span>
                <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
