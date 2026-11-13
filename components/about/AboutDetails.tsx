"use client";

import Image from "next/image";
import ExperienceTimeline from "@/components/about/ExperienceTimeline";
import FeaturedCreditsSection from "@/components/about/FeaturedCreditsSection";
import ClientEndorsementsSection from "@/components/about/ClientEndorsementsSection";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedSkillGroups } from "@/lib/portfolio-content";

export default function AboutDetails() {
  const { locale, copy } = useLanguage();
  const skillGroups = getLocalizedSkillGroups(locale);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 text-muted-foreground">
      <section className="mb-16">
        <h2 className="mb-8 font-sans text-2xl font-normal tracking-tight text-white sm:text-4xl">
          {copy.about.experience}
        </h2>
        <ExperienceTimeline />
      </section>

      <section className="mb-16">
        <FeaturedCreditsSection />
      </section>

      <section className="mb-16">
        <ClientEndorsementsSection />
      </section>

      <section className="mb-16">
        <h3 className="mb-6 font-sans text-xl font-normal text-white">
          {copy.about.skillsAndTools}
        </h3>
        <dl className="divide-y divide-border/60 border-y border-border/60">
          {skillGroups.map((group) => (
            <div
              key={group.name}
              className="py-3.5 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-8"
            >
              <dt className="text-[13px] font-sans text-muted-foreground w-48 shrink-0">
                {group.name}
              </dt>
              <dd className="text-base text-white">
                {group.skills.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mb-12">
        <div className="mb-6">
          <h3 className="font-sans text-xl font-normal text-white">
            {locale === "vi" ? "Văn hóa Studio & Hoạt động nhóm" : "Studio Life & Team Culture"}
          </h3>
          <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
            {locale === "vi"
              ? "Những khoảnh khắc gắn kết cùng đồng đội tại Sparx* - A Virtuos Studio (2022–2023)."
              : "Moments of collaboration and milestones with the Sparx* - A Virtuos Studio crew (2022–2023)."}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-12 items-start">
          <figure className="md:col-span-7 flex flex-col">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-section">
              <Image
                src="/images/Portrait/sparx-teambuilding.webp"
                alt="Sparx* Studio Beach Team Building"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 650px"
              />
            </div>
            <figcaption className="pt-3">
              <h4 className="text-base font-normal text-white">
                {locale === "vi" ? "Team Building bãi biển" : "Studio Beach Team Building"}
              </h4>
              <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
                {locale === "vi"
                  ? "Tinh thần đồng đội và hoạt động bãi biển cùng anh em đội ngũ sản xuất và VFX tại Sparx* - A Virtuos Studio."
                  : "Team spirit & beach challenges with the Sparx* production & VFX crew."}
              </p>
            </figcaption>
          </figure>

          <div className="md:col-span-5 grid grid-cols-2 gap-4">
            <figure className="flex flex-col">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-section">
                <Image
                  src="/images/Portrait/sparx-birthday.webp"
                  alt="Sparx* Birthday Card"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 50vw, 250px"
                />
              </div>
              <figcaption className="pt-2.5">
                <h4 className="text-base font-normal text-white">
                  {locale === "vi" ? "Sinh nhật tại studio" : "Studio Birthday"}
                </h4>
                <p className="mt-0.5 text-[13px] text-muted-foreground leading-snug">
                  {locale === "vi"
                    ? "Món quà và lời chúc viết tay ấm áp từ đồng nghiệp."
                    : "Handwritten card & gift box from studio teammates."}
                </p>
              </figcaption>
            </figure>

            <figure className="flex flex-col">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-section">
                <Image
                  src="/images/Portrait/sparx-yearend.webp"
                  alt="Sparx* Year-End Gala"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 50vw, 250px"
                />
              </div>
              <figcaption className="pt-2.5">
                <h4 className="text-base font-normal text-white">
                  {locale === "vi" ? "Tiệc tất niên 2023" : "Year-End Gala 2023"}
                </h4>
                <p className="mt-0.5 text-[13px] text-muted-foreground leading-snug">
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
