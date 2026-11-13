"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedProfile, getLocalizedSite } from "@/lib/portfolio-content";
import { SOCIALS } from "@/data/portfolio";

export default function ProfileSection() {
  const [avatarError, setAvatarError] = useState(false);
  const { locale } = useLanguage();
  const profile = getLocalizedProfile(locale);
  const site = getLocalizedSite(locale);
  const isVi = locale === "vi";

  return (
    <section id="profile" className="bg-section/40">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <h2 className="mb-10 font-sans text-4xl font-normal tracking-tight text-white">
          About me
        </h2>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* Left: Portrait + concise bio */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="relative aspect-[4/5] w-40 sm:w-44 shrink-0 overflow-hidden rounded-xl bg-section">
              {!avatarError ? (
                <Image
                  src={profile.portraitImage}
                  alt="Henry Tran"
                  fill
                  unoptimized
                  priority
                  sizes="176px"
                  className="object-cover object-center"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <div className="flex h-full items-center justify-center font-sans text-sm text-muted-foreground">
                  HT
                </div>
              )}
            </div>

            <div className="space-y-4">
              <p className="font-sans text-[18px] leading-relaxed text-white">
                {profile.paragraph}
              </p>
              <p className="font-sans text-[18px] leading-relaxed text-muted-foreground">
                {isVi
                  ? "Senior VFX Artist tại TP. Hồ Chí Minh · Unreal Engine, Niagara & Houdini."
                  : "Senior VFX Artist in Ho Chi Minh City · Unreal Engine, Niagara & Houdini."}
              </p>
              <div>
                <Link
                  href="/about"
                  className="font-sans text-base text-white underline-offset-4 hover:underline"
                >
                  {isVi ? "Đọc thêm về kinh nghiệm" : "Read more about my work"}
                </Link>
              </div>
            </div>
          </div>

          {/* Right: 2-line credits list */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <h3 className="mb-4 font-sans text-xl font-normal text-white">
                {isVi ? "Dự án đã ghi danh" : "Credits"}
              </h3>
              <ul className="divide-y divide-border/60 font-sans text-base">
                <li className="flex items-baseline justify-between gap-4 py-3">
                  <span className="text-white">Marvel&apos;s Wolverine</span>
                  <span className="text-muted-foreground">Senior VFX Artist · 2026</span>
                </li>
                <li className="flex items-baseline justify-between gap-4 py-3">
                  <span className="text-white">Marvel&apos;s Spider-Man 2</span>
                  <span className="text-muted-foreground">FX Artist · 2023</span>
                </li>
              </ul>
              <div className="mt-4">
                <a
                  href="https://www.mobygames.com/person/1553845/tran-minh-sang/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[13px] text-muted-foreground underline-offset-4 hover:text-white hover:underline"
                >
                  MobyGames (ID 1553845)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Single primary action: large email */}
        <div className="mt-14">
          <a
            id="contact"
            href={`mailto:${site.email}`}
            className="inline-block max-w-full break-all font-sans text-[clamp(1.25rem,5vw,2.25rem)] font-normal tracking-tight text-white underline-offset-8 hover:text-primary hover:underline"
          >
            {site.email}
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 pt-8">
          <div className="flex flex-wrap items-center gap-6 font-sans text-[13px]">
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline-offset-4 hover:text-white hover:underline"
            >
              LinkedIn
            </a>
            <a
              href={SOCIALS.artstation}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline-offset-4 hover:text-white hover:underline"
            >
              ArtStation
            </a>
            <a
              href="https://www.mobygames.com/person/1553845/tran-minh-sang/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline-offset-4 hover:text-white hover:underline"
            >
              MobyGames
            </a>
            <a
              href={SOCIALS.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline-offset-4 hover:text-white hover:underline"
            >
              Behance
            </a>
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline-offset-4 hover:text-white hover:underline"
            >
              GitHub
            </a>
          </div>

          <div className="font-sans text-[13px] text-muted-foreground">
            {isVi ? "TP. Hồ Chí Minh · GMT+7" : "Ho Chi Minh City, Vietnam · APAC (GMT+7)"}
          </div>
        </div>
      </div>
    </section>
  );
}
