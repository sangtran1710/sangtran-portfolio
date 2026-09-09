"use client";

import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ExperienceTimeline from "@/components/about/ExperienceTimeline";
import FeaturedCreditsSection from "@/components/about/FeaturedCreditsSection";
import ClientEndorsementsSection from "@/components/about/ClientEndorsementsSection";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SOCIALS } from "@/data/portfolio";
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
          {about.bio.map((paragraph, index) => (
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

      <ClientEndorsementsSection />

      <div className="mb-20 h-px bg-stone-300/70" />

      <FeaturedCreditsSection />

      <div className="mb-20 h-px bg-stone-300/70" />

      {/* GitHub Development Cadence */}
      <section className="mb-20">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              {locale === "vi" ? "Tần suất Phát triển & R&D" : "Development Cadence & R&D"}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {locale === "vi"
                ? "Theo dõi tiến độ commit code, công cụ Python và shader thực tế trên GitHub."
                : "Tracking consistent real-time shader, Python tooling, and engine pipeline commits on GitHub."}
            </p>
          </div>
          <a
            href={SOCIALS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#4f8e89] transition-colors hover:text-[#3d706c]"
          >
            <Github className="h-4 w-4" />
            <span>github.com/sangtran1710</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <a
          href={SOCIALS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group block overflow-hidden rounded-2xl border border-stone-800 bg-[#0d1117] p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all hover:border-teal-500/50 hover:shadow-[0_18px_40px_rgba(15,23,42,0.14)] sm:p-6"
        >
          <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Active Technical Production Cadence
            </span>
            <span className="font-semibold text-emerald-400">176 contributions in 2026</span>
          </div>
          <div className="overflow-hidden rounded-lg">
            <Image
              src="/images/github-contributions.png"
              alt="Henry Tran GitHub Contribution Activity - 176 contributions in 2026"
              width={852}
              height={189}
              className="w-full h-auto object-cover"
            />
          </div>
        </a>
      </section>

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
