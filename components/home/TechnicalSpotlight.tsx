"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Cpu, Wrench, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function TechnicalSpotlight() {
  const { locale, copy } = useLanguage();
  const isVi = locale === "vi";

  const spotlights = [
    {
      title: "Erlangmon VFX",
      badge: isVi ? "Unreal Engine 5 · Niagara" : "Unreal Engine 5 · Niagara",
      badgeIcon: Cpu,
      meta: isVi ? "Tối ưu overdraw & Shader mobile" : "Overdraw optimization & Mobile shading",
      description: isVi
        ? "Case study hoàn chỉnh về effect nhân vật stylized trong Unreal Engine: unlit cel-shading master material, timing offset 1.31s theo animation, và tối ưu overdraw cho game mobile."
        : "A complete stylized character VFX pipeline in Unreal Engine: unlit cel-shading master material, 1.31s animation timing sync, and aggressive overdraw profiling for mobile performance.",
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
        ? "Bộ toolkit pipeline tự động hóa quy trình kiểm tra chất lượng (QC) asset, bảo vệ thư viện dùng chung (/fx_library/), và quản lý submit Perforce cho quy trình sản xuất game AAA."
        : "A production pipeline toolkit and automated quality gatekeeper engineered to eliminate asset submission rejections, protect shared repositories, and streamline Perforce changelists.",
      image: "/projects/vfx-flow/showcase_asset_qc_ready.png",
      link: "/rnd/vfx-flow",
      actionText: copy.home.viewBreakdown,
      aspect: "aspect-video",
    },
    {
      title: "Destructible Separate Mesh Tool",
      badge: isVi ? "Blender · Python Tool" : "Blender · Python Tool",
      badgeIcon: Wrench,
      meta: isVi ? "Pipeline automation & FX UV" : "Pipeline automation & FX UV prep",
      description: isVi
        ? "Công cụ Python viết cho Blender giúp cô lập material vết nứt destructible, tự động tạo emitter mesh siêu nhẹ từ tâm các mảnh vỡ, và chuẩn bị FX UV layout để test panner/noise trước khi export."
        : "A custom Blender Python tool that extracts fracture materials, automatically generates lightweight emitter meshes from piece centroids, and preps directional FX UV layouts before export.",
      image: "/assets/blog/destructible-separate-mesh-tool/separated-crack-mesh.webp",
      link: "/blog/destructible-separate-mesh-tool",
      actionText: copy.home.viewToolBreakdown,
      aspect: "aspect-video",
    },
  ];

  return (
    <section id="technical-spotlight" className="border-t border-white/10 bg-[#070a0f]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            {copy.home.technicalSpotlight}
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/55">
            {copy.home.technicalSpotlightBody}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {spotlights.map((item) => {
            const Icon = item.badgeIcon;
            return (
              <Link
                key={item.title}
                href={item.link}
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.04]"
              >
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

                    <p className="mt-3 text-sm leading-6 text-white/60">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 sm:px-7 sm:pb-7">
                  <span className="inline-flex items-center gap-2 border border-white/45 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors group-hover:border-[#7db5b0] group-hover:bg-[#7db5b0] group-hover:text-[#071015]">
                    {item.actionText}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
