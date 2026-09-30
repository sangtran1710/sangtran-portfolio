"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

interface SpecItem {
  labelEn: string;
  labelVi: string;
  valueEn: string;
  valueVi: string;
}

const SPECS: SpecItem[] = [
  {
    labelEn: "Discipline",
    labelVi: "Chuyên môn",
    valueEn: "Real-Time VFX · Shaders · Tech Art",
    valueVi: "Kỹ xảo Thời gian thực · Shader · Tech Art",
  },
  {
    labelEn: "Core Engine Stack",
    labelVi: "Công nghệ lõi",
    valueEn: "Unreal Engine 5 · Niagara · HLSL · Houdini",
    valueVi: "Unreal Engine 5 · Niagara · HLSL · Houdini",
  },
  {
    labelEn: "Shipped Productions",
    labelVi: "Dự án Sản xuất",
    valueEn: "Marvel's Wolverine · Spider-Man 2 · Fortnite",
    valueVi: "Marvel's Wolverine · Spider-Man 2 · Fortnite",
  },
  {
    labelEn: "Pipeline & Systems",
    labelVi: "Hệ thống Pipeline",
    valueEn: "Perforce Tooling · GPU Optimization · Python",
    valueVi: "Công cụ Perforce · Tối ưu GPU · Python",
  },
];

export default function QuickSpecSheet() {
  const { locale } = useLanguage();
  const isVi = locale === "vi";

  return (
    <section
      aria-label="Studio Technical Specifications"
      className="border-y border-[#364156]/50 bg-[#161a23]/50 text-white"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {SPECS.map((spec) => (
            <div key={spec.labelEn} className="flex flex-col">
              <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-400">
                {isVi ? spec.labelVi : spec.labelEn}
              </span>
              <p className="mt-1 text-xs sm:text-[13px] font-medium tracking-tight text-slate-200">
                {isVi ? spec.valueVi : spec.valueEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
