"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function TechnicalSpotlight() {
  const { locale, copy } = useLanguage();
  const isVi = locale === "vi";

  const spotlights = [
    {
      title: "Houdini Destruction",
      description: isVi
        ? "Từ mô phỏng phá hủy trong Houdini đến các asset gọn hơn cho real-time."
        : "Turning Houdini destruction sims into lighter assets for real-time use.",
      image: "/assets/blog/houdini-wolverine-destructibles/poster-rbd-bridge.webp",
      link: "/blog/houdini-destructibles-and-vfx-pipeline",
    },
    {
      title: "VFX Flow",
      description: isVi
        ? "Kiểm tra asset và chuẩn bị Perforce submission."
        : "Asset checks, validation, and Perforce submission in one tool.",
      image: "/projects/vfx-flow/showcase_asset_qc_ready.png",
      link: "/rnd/vfx-flow",
    },
    {
      title: "Fracture Mesh Prep",
      description: isVi
        ? "Tách fracture faces, tạo emitter mesh và FX UV."
        : "Fracture faces, emitter meshes, and procedural FX UV generation.",
      image: "/assets/blog/destructible-separate-mesh-tool/separated-crack-mesh.webp",
      link: "/blog/destructible-separate-mesh-tool",
    },
  ];

  return (
    <section id="technical-spotlight" className="border-t border-[#364156]/60 bg-[#1c212c]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mb-12 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#5eb3ab]">
            {isVi ? "NGHIÊN CỨU & CÔNG CỤ" : "R&D & TECHNICAL SPOTLIGHT"}
          </span>
          <h2 className="mt-2 text-3xl font-medium tracking-tight text-white sm:text-4xl">
            {copy.home.technicalSpotlight}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {spotlights.map((item) => (
            <Link
              key={item.title}
              href={item.link}
              className="group block h-full"
            >
              <article className="flex h-full flex-col">
                {/* Visual Showcase - Flat and crisp */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-[#364156]/70 bg-[#161a23] transition-colors duration-300 group-hover:border-[#5eb3ab]/60">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="pt-4">
                  <h3 className="text-lg sm:text-xl font-medium tracking-tight text-white transition-colors duration-200 group-hover:text-[#5eb3ab]">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-slate-300">
                    {item.description}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
