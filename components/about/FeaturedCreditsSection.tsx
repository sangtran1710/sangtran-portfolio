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
      <h2 className="mb-2 font-kanit text-2xl font-normal tracking-tight text-white sm:text-3xl">
        {copy.about.featuredCredits}
      </h2>
      <p className="mb-8 max-w-2xl text-sm leading-6 text-muted-foreground">
        {copy.about.featuredCreditsBody}
      </p>

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
