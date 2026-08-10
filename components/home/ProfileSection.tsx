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
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-12 lg:py-24">
        <div className="relative aspect-[4/5] max-w-md overflow-hidden rounded-md bg-stone-900">
          {!avatarError ? (
            <Image
              src={profile.portraitImage}
              alt="Henry Tran"
              fill
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
          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block border-b border-white/30 pb-1 text-sm font-medium text-white transition-colors hover:border-white hover:text-[#a7d2ce]"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
