"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedProfile } from "@/lib/portfolio-content";
import { SOCIALS } from "@/data/portfolio";

export default function ProfileSection() {
  const [avatarError, setAvatarError] = useState(false);
  const { locale } = useLanguage();
  const profile = getLocalizedProfile(locale);

  return (
    <section id="profile" className="border-t border-white/10 bg-[#0b0e12]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[320px_1fr] lg:items-center lg:px-12 lg:py-24">
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
        <div className="max-w-2xl">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">About</h2>
          <p className="mt-6 text-lg leading-8 text-stone-300">{profile.paragraph}</p>
          <div className="mt-6 flex flex-wrap items-center gap-2.5 text-xs text-[#7db5b0]">
            <span className="inline-flex items-center gap-1 font-medium bg-[#5c9d98]/10 px-2.5 py-1 rounded-full border border-[#5c9d98]/20">
              ★ 5.0 Upwork Client Rating
            </span>
            <span className="text-white/25">·</span>
            <span className="text-white/60">Unreal Engine Gameplay & Real-time VFX</span>
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
              href="/about#client-endorsements"
              className="inline-block border-b border-white/20 pb-1 text-sm font-medium text-white/70 transition-colors hover:border-white hover:text-white"
            >
              Client reviews →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
