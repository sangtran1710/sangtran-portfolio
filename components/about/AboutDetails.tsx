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

      {/* 4. Core Technical Skills & Software (Compact) */}
      <section className="mb-14">
        <h3 className="mb-4 text-xs font-mono uppercase tracking-widest text-[#4f8e89]">
          {copy.about.skillsAndTools}
        </h3>
        <div className="rounded-2xl border border-stone-200/90 bg-white p-4 sm:p-5 shadow-sm divide-y divide-stone-100">
          {skillGroups.map((group) => (
            <div
              key={group.name}
              className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
            >
              <span className="text-xs font-semibold text-slate-800 w-44 flex-shrink-0">
                {group.name}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-stone-200/70 bg-stone-50 px-2.5 py-0.5 text-xs text-slate-600 font-normal"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mb-14 h-px bg-stone-300/70" />

      {/* 5. Studio Life & Memories (Sparx* · 2022–2023) - Gentle Footnote */}
      <section className="mb-12">
        <div className="mb-6">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#4f8e89]">
            {locale === "vi" ? "Văn hóa Studio & Hoạt động nhóm" : "Studio Life & Team Culture"}
          </h3>
          <p className="mt-1 text-xs text-slate-500 leading-relaxed">
            {locale === "vi"
              ? "Những khoảnh khắc gắn kết cùng đồng đội tại Sparx* - A Virtuos Studio (2022–2023)."
              : "Moments of collaboration and milestones with the Sparx* - A Virtuos Studio crew (2022–2023)."}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-12 items-stretch">
          {/* Beach Team Building - 16:9 - spans 7 columns */}
          <figure className="md:col-span-7 flex flex-col overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-3 sm:p-4 shadow-sm">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-stone-100">
              <Image
                src="/images/Portrait/sparx-teambuilding.webp"
                alt="Sparx* Studio Beach Team Building"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 650px"
              />
            </div>
            <figcaption className="px-2 pt-3 pb-0.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4f8e89]">
                {locale === "vi" ? "Team Building bãi biển" : "Studio Beach Team Building"}
              </h4>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                {locale === "vi"
                  ? "Tinh thần đồng đội và hoạt động bãi biển cùng anh em đội ngũ sản xuất và VFX tại Sparx* - A Virtuos Studio."
                  : "Team spirit & beach challenges with the Sparx* production & VFX crew."}
              </p>
            </figcaption>
          </figure>

          {/* 2 Portrait Cards side by side in the remaining 5 columns */}
          <div className="md:col-span-5 grid grid-cols-2 gap-4">
            {/* Birthday Card */}
            <figure className="flex flex-col overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-2.5 sm:p-3 shadow-sm">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-stone-100">
                <Image
                  src="/images/Portrait/sparx-birthday.webp"
                  alt="Sparx* Birthday Card"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 50vw, 250px"
                />
              </div>
              <figcaption className="px-1 pt-2 pb-0.5">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#4f8e89]">
                  {locale === "vi" ? "Sinh nhật tại studio" : "Studio Birthday"}
                </h4>
                <p className="mt-0.5 text-[11px] text-slate-600 leading-snug">
                  {locale === "vi"
                    ? "Món quà và lời chúc viết tay ấm áp từ đồng nghiệp."
                    : "Handwritten card & gift box from studio teammates."}
                </p>
              </figcaption>
            </figure>

            {/* Year-End Gala */}
            <figure className="flex flex-col overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-2.5 sm:p-3 shadow-sm">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-stone-100">
                <Image
                  src="/images/Portrait/sparx-yearend.webp"
                  alt="Sparx* Year-End Gala"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 50vw, 250px"
                />
              </div>
              <figcaption className="px-1 pt-2 pb-0.5">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#4f8e89]">
                  {locale === "vi" ? "Tiệc tất niên 2023" : "Year-End Gala 2023"}
                </h4>
                <p className="mt-0.5 text-[11px] text-slate-600 leading-snug">
                  {locale === "vi"
                    ? "Ăn mừng hoàn thành các cột mốc dự án AAA lớn."
                    : "Celebrating AAA project wraps and milestone deliveries."}
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
}
