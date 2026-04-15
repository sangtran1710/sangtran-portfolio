"use client";

import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedAchievementCredits } from "@/lib/portfolio-content";

export default function FeaturedCreditsSection() {
  const { locale, copy } = useLanguage();
  const credits = getLocalizedAchievementCredits(locale);

  if (!credits.length) return null;

  return (
    <section id="featured-credits" className="mb-20">
      <TextReveal
        text={copy.about.featuredCredits}
        as="h2"
        className="mb-2 text-3xl font-semibold tracking-tight text-slate-900"
        offset={["start 0.9", "start 0.65"]}
      />
      <p className="mb-8 max-w-2xl text-sm leading-6 text-slate-600">
        {copy.about.featuredCreditsBody}
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {credits.map((item, index) => (
          <ScrollReveal
            key={`${item.image}-${index}`}
            variant="fadeUp"
            offset={["start 0.95", "start 0.75"]}
          >
            <article className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:border-stone-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <div className="relative aspect-[3/4] border-b border-stone-200 bg-stone-50">
                <Image
                  src={item.image}
                  alt={item.title ?? "Credit"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              {(item.title || item.subtitle) && (
                <div className="p-4">
                  {item.title && (
                    <p className="text-sm font-medium text-slate-900">
                      {item.title}
                    </p>
                  )}
                  {item.subtitle && (
                    <p className="mt-0.5 text-xs text-slate-500">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              )}
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
