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
      badge: isVi ? "Unreal Engine 5 · Niagara" : "Unreal Engine 5 · Niagara",
      badgeIcon: Cpu,
      meta: isVi ? "Tối ưu overdraw & Shader" : "Overdraw optimization & Shaders",
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
      badge: isVi ? "WPF · Perforce Automation" : "WPF · Perforce Automation",
      badgeIcon: ShieldCheck,
      meta: isVi ? "Pipeline Toolkit & Asset QC" : "Pipeline Toolkit & Asset QC",
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
      badge: isVi ? "Blender · Python Tool" : "Blender · Python Tool",
      badgeIcon: Wrench,
      meta: isVi ? "Pipeline automation & FX UV" : "Pipeline automation & FX UV",
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
                <SpotlightCard className="flex h-full flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] transition-colors duration-300 hover:border-white/25">
                  <div>
                    <div className="relative aspect-video w-full overflow-hidden border-b border-white/10 bg-stone-900">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    <div className="p-6 sm:p-7">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded bg-white/10 px-2 py-0.5 text-[11px] font-medium tracking-wide text-white/90">
                          <Icon className="h-3 w-3 text-[#7db5b0]" />
                          {item.badge}
                        </span>
                        <span className="text-[11px] text-white/45">
                          {item.meta}
                        </span>
                      </div>

                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-[#a7d2ce]">
                        {item.title}
                      </h3>

                      <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-white/55">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0 sm:px-7 sm:pb-7">
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
