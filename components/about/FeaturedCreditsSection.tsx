"use client";

import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedAchievementCredits } from "@/lib/portfolio-content";

export default function FeaturedCreditsSection() {
  const { locale, copy } = useLanguage();
  const credits = getLocalizedAchievementCredits(locale);

  if (!credits.length) return null;

  return (
    <section id="featured-credits" className="mb-20">
      <h2 className="mb-2 font-sans text-2xl font-normal tracking-tight text-white sm:text-3xl">
        {copy.about.featuredCredits}
      </h2>
      <p className="mb-6 max-w-2xl text-sm leading-6 text-muted-foreground">
        {copy.about.featuredCreditsBody}
      </p>

      {/* Official MobyGames Verified Profile Card */}
      <div className="mb-10 overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-r from-section via-section/90 to-section/80 p-6 sm:p-8 shadow-lg">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-sans text-xs font-medium text-primary">
                MobyGames
              </span>
              <span className="font-sans text-xs text-muted-foreground">Moby ID: 1553845</span>
            </div>

            <h3 className="mt-3 font-sans text-2xl font-normal tracking-tight text-white sm:text-3xl">
              Tran Minh Sang · Game credits
            </h3>

            <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
              {locale === "vi"
                ? "Chứng thực hồ sơ nhà phát triển trên cơ sở dữ liệu game MobyGames quốc tế với 2 tựa game AAA từ Insomniac Games & PlayStation Studios."
                : "Find my game credits on MobyGames under Tran Minh Sang."}
            </p>

            <ul className="mt-4 space-y-1.5 text-xs sm:text-sm text-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="font-medium text-white">Marvel&apos;s Wolverine</span>
                <span className="text-muted-foreground">(2026) · Senior VFX Artists</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="font-medium text-white">Marvel&apos;s Spider-Man 2</span>
                <span className="text-muted-foreground">(2023) · FX Artists</span>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="https://www.mobygames.com/person/1553845/tran-minh-sang/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-xs sm:text-sm font-medium text-background transition-colors hover:bg-white"
              >
                <span>{locale === "vi" ? "Mở hồ sơ trên MobyGames" : "View MobyGames profile"}</span>
              </a>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border/80 bg-background/50 shadow-inner group">
            <Image
              src="/images/achivements/mobygames-profile.webp"
              alt="MobyGames Verified Profile — Tran Minh Sang"
              fill
              className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 320px"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {credits.map((item, index) => (
          <div key={`${item.image}-${index}`}>
            <article className="overflow-hidden rounded-xl border border-border bg-section transition-colors duration-200 hover:border-primary/60">
              <div className="relative aspect-[3/4] border-b border-border bg-background">
                <Image
                  src={item.image}
                  alt={item.title ?? "Credit"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {(item.title || item.subtitle) && (
                <div className="p-4">
                  {item.title && (
                    <p className="text-sm font-medium text-white">
                      {item.title}
                    </p>
                  )}
                  {item.subtitle && (
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              )}
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
