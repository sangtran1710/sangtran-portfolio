"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, ShieldCheck, Mail } from "lucide-react";
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
    <section id="profile" className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid items-start gap-8 sm:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr] lg:gap-16">
          <div className="relative aspect-[4/5] w-44 overflow-hidden rounded-lg border border-border bg-section sm:w-full">
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
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">Henry Tran</h2>
              <span className="font-mono text-sm font-medium text-primary">Tran Minh Sang</span>
            </div>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">{profile.paragraph}</p>

            {/* MobyGames Verified Trust Badge */}
            <div className="mt-6 rounded-lg border border-border bg-section/80 p-4 transition-colors hover:border-primary/50">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-white">
                        {isVi ? "Xác thực tín nhiệm MobyGames" : "MobyGames Verified Credits"}
                      </span>
                      <span className="rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-medium text-primary">
                        {isVi ? "Hồ sơ chính thức" : "Official Record"}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Marvel&apos;s Wolverine (Senior VFX) · Marvel&apos;s Spider-Man 2 (FX Artist)
                    </p>
                  </div>
                </div>

                <a
                  href="https://www.mobygames.com/person/1553845/tran-minh-sang/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 self-start sm:self-auto rounded-md border border-border bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-primary hover:bg-primary hover:text-background"
                >
                  <span>{isVi ? "Xem profile MobyGames" : "View on MobyGames"}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {isVi ? "Đọc thêm về kinh nghiệm" : "More about my experience"}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            {/* Contact Email & Socials */}
            <div className="mt-8 border-t border-border/60 pt-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {isVi ? "Liên hệ & Kết nối chuyên nghiệp" : "Get in touch & Connect"}
              </p>

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <a
                  id="contact"
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 break-all text-xl font-medium text-primary transition-colors hover:text-white sm:text-2xl"
                >
                  <Mail className="h-5 w-5 shrink-0" />
                  <span>{site.email}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>

                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={SOCIALS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-border bg-section px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-white"
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href={SOCIALS.artstation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-border bg-section px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-white"
                  >
                    ArtStation ↗
                  </a>
                  <a
                    href="https://www.mobygames.com/person/1553845/tran-minh-sang/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-border bg-section px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-white"
                  >
                    MobyGames ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
