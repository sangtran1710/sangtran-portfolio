"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedSkillGroups } from "@/lib/portfolio-content";

const TOP_SKILLS = [
  "Niagara (UE5)",
  "Houdini VFX",
  "HLSL",
  "Unreal Engine 5",
  "Python",
  "Blender",
  "Substance Designer",
  "After Effects",
  "Maya",
  "VEX",
  "PBR Workflows",
  "Pipeline Automation",
];

export default function SkillsSnapshot() {
  const { locale } = useLanguage();
  const isVi = locale === "vi";
  
  const heading = isVi ? "Kỹ năng chính" : "Core Skills";
  const kicker = isVi ? "Bộ công cụ" : "Toolkit";
  const linkText = isVi ? "Xem hồ sơ đầy đủ" : "Full profile";
  
  const displayGroups = getLocalizedSkillGroups(locale).slice(0, 3);

  return (
    <section id="skills" className="relative border-t border-stone-200 bg-[#fbf9f5] scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4f8e89] mb-2">
              {kicker}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">{heading}</h2>
          </div>
          <Link
            href="/about"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#4f8e89] hover:text-slate-900 transition-colors"
          >
            {linkText}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Skill chips */}
        <div className="flex flex-wrap gap-2">
          {TOP_SKILLS.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="px-3 py-1.5 text-sm font-normal border-stone-200 bg-white text-slate-700 hover:border-[#5c9d98] hover:text-[#5c9d98] transition-colors cursor-default"
            >
              {skill}
            </Badge>
          ))}
        </div>

        {/* Skill categories breakdown */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayGroups.map((group) => (
            <div key={group.name} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#4f8e89] mb-3">
                {group.name}
              </h3>
              <ul className="space-y-2">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5c9d98] flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
