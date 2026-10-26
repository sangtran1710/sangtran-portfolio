"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedProfile, getLocalizedSite } from "@/lib/portfolio-content";

export default function ProfileSection() {
  const [avatarError, setAvatarError] = useState(false);
  const { locale } = useLanguage();
  const profile = getLocalizedProfile(locale);
  const site = getLocalizedSite(locale);
  const isVi = locale === "vi";

  return (
    <section id="profile" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid items-center gap-8 sm:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr] lg:gap-16">
          <div className="relative aspect-[4/5] w-44 overflow-hidden rounded-lg bg-section sm:w-full">
            {!avatarError ? (
              <Image
                src={profile.portraitImage}
                alt="Henry Tran"
                fill
                unoptimized
                priority
                sizes="(max-width: 640px) 176px, (max-width: 1024px) 180px, 220px"
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
            <a
              id="contact"
              href={`mailto:${site.email}`}
              className="mt-8 flex w-fit max-w-full items-center gap-2 break-all text-lg font-medium text-primary transition-colors hover:text-white sm:text-2xl"
            >
              {site.email}<span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
