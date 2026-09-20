"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedExperiences } from "@/lib/portfolio-content";
import { Badge } from "@/components/ui/badge";
import { ArrowDownToLine } from "lucide-react";
import { SOCIALS } from "@/data/portfolio";

export default function ExperienceTimeline() {
  const { locale } = useLanguage();
  const experiences = getLocalizedExperiences(locale);
  const isVi = locale === "vi";

  return (
    <div className="space-y-0">
      {experiences.map((exp, i) => (
        <div key={i} className="relative flex gap-6">
          {/* Timeline indicator */}
          <div className="flex flex-col items-center">
            <div className="h-3 w-3 rounded-full bg-teal-500 mt-1.5 flex-shrink-0 ring-4 ring-teal-500/10" />
            {i < experiences.length - 1 && (
              <div className="mt-2 mb-0 w-px flex-1 bg-stone-300/80" />
            )}
          </div>

          {/* Content */}
          <div className={`pb-8 flex-1 ${i === experiences.length - 1 ? "pb-2" : ""}`}>
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
              <div>
                <h3 className="text-base font-semibold text-slate-900">{exp.role}</h3>
                <p className="text-sm font-medium text-[#4f8e89]">{exp.company}</p>
              </div>
              <Badge variant="outline" className="flex-shrink-0 border-stone-200 bg-white text-xs font-normal text-slate-700">
                {exp.duration}
              </Badge>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed mt-1">
              {exp.responsibilities[0]}
            </p>

            <p className="mt-2 text-xs font-mono text-slate-500">
              {exp.technologies}
            </p>
          </div>
        </div>
      ))}

      <div className="pt-3">
        <a
          href={SOCIALS.resume}
          download
          className="inline-flex items-center gap-2 text-xs font-medium text-[#4f8e89] hover:text-[#3d706c] transition-colors"
        >
          <ArrowDownToLine className="h-3.5 w-3.5" />
          <span>
            {isVi ? "Tải CV PDF để xem chi tiết đầy đủ trách nhiệm kỹ thuật →" : "Download full PDF resume for granular technical details →"}
          </span>
        </a>
      </div>
    </div>
  );
}
