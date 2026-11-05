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
    <section id="profile" className="border-t border-border bg-gradient-to-b from-background via-section/30 to-background">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        {/* Editorial Contact Header */}
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 font-mono text-xs text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span>
              {isVi ? "Sẵn sàng cho dự án AAA & Hợp đồng Technical VFX" : "Available for AAA Production & Senior VFX Roles"}
            </span>
          </div>

          <h2 className="font-kanit text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.08]">
            {isVi ? (
              <>
                Kiến tạo hiệu ứng VFX & Shader <span className="text-primary italic">chuyên sâu</span> cho game.
              </>
            ) : (
              <>
                Crafting high-impact real-time VFX & <span className="text-primary italic">engine shaders</span> for games.
              </>
            )}
          </h2>

          <div className="mt-8">
            <a
              id="contact"
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-2 font-kanit text-lg xs:text-2xl sm:text-3xl lg:text-4xl font-normal text-white transition-colors hover:text-primary"
            >
              <span className="border-b border-primary/40 pb-0.5 transition-colors group-hover:border-primary">
                {site.email}
              </span>
            </a>
          </div>
        </div>

        {/* Bento Identity & Verified Credentials */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_1fr]">
          {/* Card 1: Artist Bio & Experience */}
          <div className="rounded-2xl border border-border/80 bg-section/70 p-6 sm:p-8 backdrop-blur-sm transition-colors hover:border-border-hover">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-2xl border border-border/80 bg-background shadow-md">
                {!avatarError ? (
                  <Image
                    src={profile.portraitImage}
                    alt="Henry Tran"
                    fill
                    unoptimized
                    priority
                    sizes="112px"
                    className="object-cover object-center"
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center font-mono text-xs text-muted-foreground">HT</div>
                )}
              </div>

              <div>
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <h3 className="font-kanit text-2xl font-normal text-white">Henry Tran</h3>
                  <span className="font-mono text-xs font-medium text-primary">Tran Minh Sang</span>
                </div>
                <p className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground">
                  {isVi ? "Senior VFX Artist · TP. Hồ Chí Minh, Việt Nam" : "Senior VFX Artist · Ho Chi Minh City, Vietnam"}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {profile.paragraph}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/50 pt-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-white transition-colors hover:text-primary hover:underline underline-offset-4"
              >
                <span>{isVi ? "Đọc chi tiết kinh nghiệm & kỹ năng" : "Full background & studio experience"}</span>
              </Link>
              <span className="font-mono text-xs text-muted-foreground/60">
                Unreal Engine · Niagara · Houdini
              </span>
            </div>
          </div>

          {/* Card 2: MobyGames Verified Industry Proof */}
          <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-section/90 via-section/50 to-primary/5 p-6 sm:p-8 backdrop-blur-sm transition-all hover:border-primary/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#3db3ff] animate-pulse" />
                  <span className="font-mono text-xs font-medium text-white tracking-wide">
                    MobyGames Verified
                  </span>
                </div>
                <span className="font-mono text-[11px] text-muted-foreground">ID: 1553845</span>
              </div>

              <h4 className="mt-4 font-kanit text-xl font-normal text-white">
                Official Industry Credits
              </h4>

              <ul className="mt-4 space-y-2.5 font-mono text-xs">
                <li className="flex items-start justify-between gap-2 border-b border-border/40 pb-2">
                  <span className="text-white font-medium">Marvel&apos;s Wolverine</span>
                  <span className="text-primary text-right font-medium">Senior VFX Artist (2026)</span>
                </li>
                <li className="flex items-start justify-between gap-2">
                  <span className="text-white font-medium">Marvel&apos;s Spider-Man 2</span>
                  <span className="text-muted-foreground text-right">FX Artist (2023)</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
              <span className="text-xs text-muted-foreground">
                {isVi ? "Cơ sở dữ liệu game quốc tế" : "Verified Video Game Database"}
              </span>
              <a
                href="https://www.mobygames.com/person/1553845/tran-minh-sang/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] hover:bg-primary hover:text-background px-3.5 py-1.5 text-xs font-medium text-white transition-all"
              >
                <span>View Profile</span>
              </a>
            </div>
          </div>
        </div>

        {/* Clean Framer Social Channels Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-border/60 pt-8">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs">
            <span className="text-muted-foreground uppercase tracking-wider">
              {isVi ? "Kết nối:" : "Connect:"}
            </span>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-white transition-colors duration-200"
              >
                LinkedIn
              </a>
              <a
                href={SOCIALS.artstation}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-white transition-colors duration-200"
              >
                ArtStation
              </a>
              <a
                href="https://www.mobygames.com/person/1553845/tran-minh-sang/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-white transition-colors duration-200"
              >
                MobyGames
              </a>
              <a
                href={SOCIALS.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-white transition-colors duration-200"
              >
                Behance
              </a>
              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-white transition-colors duration-200"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="font-mono text-xs text-muted-foreground/60">
            {isVi ? "TP. Hồ Chí Minh · Múi giờ GMT+7" : "Ho Chi Minh City · GMT+7"}
          </div>
        </div>
      </div>
    </section>
  );
}
