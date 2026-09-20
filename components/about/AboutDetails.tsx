"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import ExperienceTimeline from "@/components/about/ExperienceTimeline";
import FeaturedCreditsSection from "@/components/about/FeaturedCreditsSection";
import ClientEndorsementsSection from "@/components/about/ClientEndorsementsSection";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedSkillGroups } from "@/lib/portfolio-content";

export default function AboutDetails() {
  const { locale, copy } = useLanguage();
  const skillGroups = getLocalizedSkillGroups(locale);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 text-slate-700">
      {/* 1. Production Experience */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {copy.about.experience}
        </h2>
        <ExperienceTimeline />
      </section>

      <div className="mb-16 h-px bg-stone-300/70" />

      {/* 2. Featured Production Credits */}
      <FeaturedCreditsSection />

      <div className="mb-16 h-px bg-stone-300/70" />

      {/* 3. Client Endorsements */}
      <ClientEndorsementsSection />

      <div className="mb-16 h-px bg-stone-300/70" />

      {/* 4. Core Technical Skills & Software */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {copy.about.skillsAndTools}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.name}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
            >
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#4f8e89]">
                {group.name}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="rounded-full border border-stone-200 bg-stone-50 text-xs font-normal text-slate-700"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mb-16 h-px bg-stone-300/70" />

      {/* 5. Personal Note */}
      <section className="mb-12">
        <figure className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-3 sm:p-4 shadow-[0_12px_36px_rgba(15,23,42,0.05)]">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100">
            <Image
              src="/images/Portrait/family-winter.webp"
              alt="Henry Tran with family"
              fill
              unoptimized
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          <figcaption className="px-2 pt-3.5 pb-1">
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal text-center">
              {locale === "vi"
                ? "Tôi thích nhất những cảm giác thế này cùng gia đình, ngắm nhìn thiên nhiên sau nhiều giờ làm việc chăm chỉ."
                : "My favorite moments with family — taking in nature and recharging after long hours of dedicated work."}
            </p>
          </figcaption>
        </figure>
      </section>
    </div>
  );
}
