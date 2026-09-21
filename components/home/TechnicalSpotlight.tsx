"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Cpu, Wrench, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function TechnicalSpotlight() {
  const { locale, copy } = useLanguage();
  const isVi = locale === "vi";

  const spotlights = [
    {
      title: "Erlangmon VFX",
      badge: "Unreal Engine 5 · Niagara",
      badgeIcon: Cpu,
      meta: isVi ? "Tối ưu overdraw & Shader" : "Overdraw optimization & Shaders",
      visualCue: "Niagara Viewport · Shader Graph",
      chips: ["Mobile Overdraw Budget", "Cel-Shaded Master Material"],
      description: isVi
        ? "VFX nhân vật stylized trong UE5 với cel-shading và tối ưu overdraw mobile."
        : "Stylized character VFX in UE5 with custom cel-shading and mobile overdraw profiling.",
      image: "/projects/erlangmon-vfx/poster.jpg",
      link: "/rnd/erlangmon-vfx",
      actionText: copy.home.viewBreakdown,
      aspect: "aspect-video",
    },
    {
      title: "VFX Flow",
      badge: "WPF · Perforce Automation",
      badgeIcon: ShieldCheck,
      meta: isVi ? "Pipeline Toolkit & Asset QC" : "Pipeline Toolkit & Asset QC",
      visualCue: "WPF Desktop UI · Perforce P4 Gate",
      chips: ["8 Pre-Flight QC Checks", "Nightly Automated Shelves"],
      description: isVi
        ? "Bộ toolkit QC asset tự động và quản lý submit Perforce cho production AAA."
        : "Automated asset QC toolkit and Perforce submission pipeline for AAA production.",
      image: "/projects/vfx-flow/showcase_asset_qc_ready.png",
      link: "/rnd/vfx-flow",
      actionText: copy.home.viewBreakdown,
      aspect: "aspect-video",
    },
    {
      title: "Destructible Separate Mesh Tool",
      badge: "Blender · Python Tool",
      badgeIcon: Wrench,
      meta: isVi ? "Pipeline automation & FX UV" : "Pipeline automation & FX UV",
      visualCue: "Blender 3D Viewport · Centroid Emitter",
      chips: ["Centroid Extraction", "Lightweight FX UVs"],
      description: isVi
        ? "Script Python Blender tách tâm mảnh vỡ thành emitter mesh siêu nhẹ."
        : "Blender Python tool extracting fracture centroids into lightweight emitter meshes.",
      image: "/assets/blog/destructible-separate-mesh-tool/separated-crack-mesh.webp",
      link: "/blog/destructible-separate-mesh-tool",
      actionText: copy.home.viewToolBreakdown,
      aspect: "aspect-video",
    },
  ];

  return (
    <section id="technical-spotlight" className="border-t border-white/10 bg-[#070a0f]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            {copy.home.technicalSpotlight}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {spotlights.map((item) => {
            const Icon = item.badgeIcon;
            return (
              <Link
                key={item.title}
                href={item.link}
                className="group block h-full"
              >
                <SpotlightCard className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c1017]/50 transition-all duration-300 hover:border-white/20 hover:bg-[#0e131b]">
                  <div>
                    {/* Visual Showcase with In-Engine / DCC Viewport Cue */}
                    <div className="relative aspect-video w-full overflow-hidden border-b border-white/10 bg-zinc-950">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                      {/* Technical Viewport / Tool Cue Pill */}
                      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-md bg-black/75 px-2 py-0.5 text-[10px] font-mono text-zinc-300 backdrop-blur-md border border-white/10">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#7db5b0]" />
                        <span>{item.visualCue}</span>
                      </div>

                      <div className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-normal text-white/80">
                          <Icon className="h-3 w-3 text-[#7db5b0]" />
                          {item.badge}
                        </span>
                        <span className="text-[10px] font-mono text-white/40">
                          {item.meta}
                        </span>
                      </div>

                      <h3 className="mt-3 text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-[#a7d2ce]">
                        {item.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-xs sm:text-sm leading-relaxed text-white/55">
                        {item.description}
                      </p>

                      {/* Technical visual chips */}
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {item.chips.map((chip) => (
                          <span
                            key={chip}
                            className="rounded border border-white/5 bg-white/[0.02] px-2 py-0.5 text-[10px] font-mono text-white/50"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7db5b0] transition-colors group-hover:text-white">
                      {item.actionText}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </SpotlightCard>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
