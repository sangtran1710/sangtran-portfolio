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
    <section id="profile" className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:items-start">
          <div className="relative aspect-[4/5] w-full max-w-xs justify-self-center overflow-hidden rounded-lg border border-border/70 bg-section lg:justify-self-start">
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
              <div className="flex h-full items-center justify-center text-sm text-quiet">Portrait unavailable</div>
            )}
          </div>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">Henry Tran</h2>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">{profile.paragraph}</p>
            <Link href="/about" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {isVi ? "Đọc thêm về kinh nghiệm" : "More about my experience"}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
