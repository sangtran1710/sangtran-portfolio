"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedExperiences } from "@/lib/portfolio-content";
import { Badge } from "@/components/ui/badge";

export default function ExperienceTimeline() {
  const { locale } = useLanguage();
  const experiences = getLocalizedExperiences(locale);

  return (
    <div className="space-y-0">
      {experiences.map((exp, i) => (
        <div key={i} className="relative flex gap-6">
          {/* Timeline line */}
          <div className="flex flex-col items-center">
            <div className="h-3 w-3 rounded-full bg-teal-500 mt-1 flex-shrink-0 ring-4 ring-teal-500/10" />
            {i < experiences.length - 1 && (
              <div className="mt-2 mb-0 w-px flex-1 bg-stone-300/80" />
            )}
          </div>

          {/* Content */}
          <div className={`pb-10 flex-1 ${i === experiences.length - 1 ? "pb-0" : ""}`}>
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-[1.02rem] font-semibold text-slate-900">{exp.role}</h3>
                <p className="text-sm font-medium text-[#4f8e89]">{exp.company}</p>
              </div>
              <Badge variant="outline" className="flex-shrink-0 border-stone-200 bg-white text-xs font-normal text-slate-700">
                {exp.duration}
              </Badge>
            </div>

            <ul className="mt-3 space-y-2">
              {exp.responsibilities.map((item, j) => (
                <li key={j} className="flex gap-2.5 text-sm leading-relaxed text-slate-700">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-stone-400" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-3 text-xs text-slate-600">
              {exp.technologies}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
