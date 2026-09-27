"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import SpotlightCard from "@/components/ui/SpotlightCard";

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
    <section id="technical-spotlight" className="border-t border-white/10 bg-[#070a0f]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mb-10 max-w-2xl">
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

                      <div className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    <div className="p-5 sm:p-6">
                      <h3 className="text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-[#a7d2ce]">
                        {item.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-xs sm:text-sm leading-relaxed text-white/55">
                        {item.description}
                      </p>

                    </div>
                  </div>

                </SpotlightCard>
              </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
