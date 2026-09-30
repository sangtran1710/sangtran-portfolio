"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function TechnicalSpotlight() {
  const { locale, copy } = useLanguage();
  const isVi = locale === "vi";

  const spotlights = [
    {
      title: "Houdini Destruction",
      description: isVi
        ? "RBD sim thành shards và atlas dùng trong runtime."
        : "RBD sims into runtime shards and atlases.",
      image: "/assets/blog/houdini-wolverine-destructibles/poster-rbd-bridge.webp",
      link: "/blog/houdini-destructibles-and-vfx-pipeline",
    },
    {
      title: "VFX Flow",
      description: isVi
        ? "Kiểm tra asset và chuẩn bị Perforce submission."
        : "Asset checks and Perforce submission in one tool.",
      image: "/projects/vfx-flow/showcase_asset_qc_ready.png",
      link: "/rnd/vfx-flow",
    },
    {
      title: "Fracture Mesh Prep",
      description: isVi
        ? "Tách fracture faces, tạo emitter mesh và FX UV."
        : "Fracture faces, emitter meshes, and FX UVs.",
      image: "/assets/blog/destructible-separate-mesh-tool/separated-crack-mesh.webp",
      link: "/blog/destructible-separate-mesh-tool",
    },
  ];

  return (
    <section id="technical-spotlight" className="border-t border-[#242b38] bg-[#0e1117]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mb-10 max-w-2xl">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#5eb3ab]">
              {"// R&D SPOTLIGHT"}
            </span>
          </div>
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            {copy.home.technicalSpotlight}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {spotlights.map((item) => (
            <Link
              key={item.title}
              href={item.link}
              className="group block h-full"
            >
              <div className="flex h-full flex-col justify-between overflow-hidden rounded-lg border border-[#242b38] bg-[#151921] transition-colors duration-200 hover:border-[#3b475c] hover:bg-[#181d27]">
                <div>
                  {/* Visual Showcase - Clear and crisp */}
                  <div className="relative aspect-video w-full overflow-hidden border-b border-[#242b38] bg-[#0e1117]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    <div className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded border border-white/20 bg-black/70 text-slate-300 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:text-white">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-medium tracking-tight text-white transition-colors group-hover:text-[#5eb3ab]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
