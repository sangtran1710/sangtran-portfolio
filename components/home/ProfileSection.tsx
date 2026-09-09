"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedProfile } from "@/lib/portfolio-content";
import { SOCIALS } from "@/data/portfolio";
import { ArrowUpRight, Github } from "lucide-react";

export default function ProfileSection() {
  const [avatarError, setAvatarError] = useState(false);
  const { locale } = useLanguage();
  const profile = getLocalizedProfile(locale);
  const isVi = locale === "vi";

  return (
    <section id="profile" className="border-t border-white/10 bg-[#0b0e12]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:items-start">
          <div className="relative aspect-[4/5] w-full max-w-xs justify-self-center overflow-hidden rounded-md bg-stone-900 lg:justify-self-start">
            {!avatarError ? (
              <Image
                src={profile.portraitImage}
                alt="Henry Tran"
                fill
                unoptimized
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-center"
                onError={() => setAvatarError(true)}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-stone-500">Portrait unavailable</div>
            )}
          </div>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">About</h2>
            <p className="mt-6 text-lg leading-8 text-stone-300">{profile.paragraph}</p>
            <div className="mt-6 flex flex-wrap items-center gap-2.5 text-xs text-[#7db5b0]">
              <span className="inline-flex items-center gap-1 font-medium bg-[#5c9d98]/10 px-2.5 py-1 rounded-full border border-[#5c9d98]/20">
                ★ 5.0 Upwork Client Rating
              </span>
              <span className="text-white/25">·</span>
              <span className="text-white/60">Unreal Engine Gameplay & Real-time VFX</span>
            </div>

            {/* GitHub Engineering Cadence / Frequency Card */}
            <div className="mt-8 rounded-xl border border-white/10 bg-[#0d1117] p-4 sm:p-5 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-white/80" />
                  <span className="text-xs font-medium text-white/90">
                    {isVi ? "Hoạt động GitHub & R&D" : "GitHub Activity & Development Cadence"}
                  </span>
                  <span className="relative flex h-2 w-2 ml-1">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                </div>
                <a
                  href={SOCIALS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-xs text-teal-400 transition-colors hover:text-teal-300"
                >
                  <span>github.com/sangtran1710</span>
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3.5 block overflow-hidden rounded-lg border border-white/5 bg-[#0d1117] transition-all hover:border-teal-500/40 hover:ring-1 hover:ring-teal-500/30"
                title={isVi ? "Xem hồ sơ GitHub của Henry Tran" : "View Henry Tran's GitHub profile"}
              >
                <Image
                  src="/images/github-contributions.png"
                  alt="Henry Tran GitHub Contribution Activity - 176 contributions in 2026"
                  width={852}
                  height={189}
                  className="w-full h-auto object-cover rounded-md"
                />
              </a>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-white/50">
                <span className="flex items-center gap-1.5 text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {isVi ? "Cập nhật shader & công cụ định kỳ" : "Active shader & tooling commits"}
                </span>
                <span className="font-medium text-emerald-400">176 contributions in 2026</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-b border-white/30 pb-1 text-sm font-medium text-white transition-colors hover:border-white hover:text-[#a7d2ce]"
              >
                LinkedIn
              </a>
              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-b border-white/30 pb-1 text-sm font-medium text-white transition-colors hover:border-white hover:text-[#a7d2ce]"
              >
                GitHub
              </a>
              <a
                href="/about#client-endorsements"
                className="inline-block border-b border-white/20 pb-1 text-sm font-medium text-white/70 transition-colors hover:border-white hover:text-white"
              >
                Client reviews →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
