"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedProfile } from "@/lib/portfolio-content";

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
            <Link href="/about" className="mt-8 inline-block border-b border-white/30 pb-1 text-sm font-medium text-white transition-colors hover:border-white hover:text-[#a7d2ce]">
              {isVi ? "Đọc thêm" : "More about me"} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
