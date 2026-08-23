"use client";

import { Badge } from "@/components/ui/badge";
import ExperienceTimeline from "@/components/about/ExperienceTimeline";
import FeaturedCreditsSection from "@/components/about/FeaturedCreditsSection";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  getLocalizedAbout,
  getLocalizedSkillGroups,
} from "@/lib/portfolio-content";

export default function AboutDetails() {
  const { locale, copy } = useLanguage();
  const about = getLocalizedAbout(locale);
  const skillGroups = getLocalizedSkillGroups(locale);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 text-slate-700">
      <section className="mb-20">
        <h2 className="mb-8 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {about.title}
        </h2>
        <div className="max-w-3xl space-y-5">
          {about.bio.slice(1).map((paragraph, index) => (
            <p
              key={index}
              className="text-base leading-8 text-slate-700 sm:text-[17px]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <div className="mb-20 h-px bg-stone-300/70" />

      <section className="mb-20">
        <h2 className="mb-10 text-3xl font-semibold tracking-tight text-slate-900">
          {copy.about.experience}
        </h2>
        <ExperienceTimeline />
      </section>

      <div className="mb-20 h-px bg-stone-300/70" />

      <FeaturedCreditsSection />

      <div className="mb-20 h-px bg-stone-300/70" />

      <section className="mb-20">
        <h2 className="mb-10 text-3xl font-semibold tracking-tight text-slate-900">
          {copy.about.skillsAndTools}
        </h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.name}>
              <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:border-stone-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {group.name}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="rounded-full border border-stone-200 bg-stone-50 text-xs font-normal text-slate-700 transition-colors hover:bg-stone-100"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
