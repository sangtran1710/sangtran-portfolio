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
    <section id="profile" className="border-t border-[#364156]/60 bg-[#1c212c]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:items-start">
          <div className="relative aspect-[4/5] w-full max-w-xs justify-self-center overflow-hidden rounded-lg border border-[#364156]/70 bg-[#161a23] lg:justify-self-start">
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
              <div className="flex h-full items-center justify-center text-sm text-slate-500">Portrait unavailable</div>
            )}
          </div>
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#5eb3ab]">
              {isVi ? "GIỚI THIỆU" : "ABOUT THE ARTIST"}
            </span>
            <h2 className="mt-2 text-3xl font-medium tracking-tight text-white sm:text-4xl">Henry Tran</h2>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-300">{profile.paragraph}</p>
            <Link href="/about" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition-colors hover:text-[#5eb3ab]">
              {isVi ? "Đọc thêm về kinh nghiệm" : "More about my experience"}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
