"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveHorizontal } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useCanHover } from "@/lib/use-media";

interface Pass {
  id: string;
  label: string;
  image: string;
  note: string;
}

interface Study {
  id: string;
  tab: string;
  title: string;
  summary: string;
  tools: string;
  /** "wipe": passes share one camera/UV space, so a split slider is meaningful. "steps": show one pass at a time. */
  mode: "wipe" | "steps";
  passes: Pass[];
  href: string;
  linkLabel: string;
}

export default function TechnicalSpotlight() {
  const { locale, copy } = useLanguage();
  const isVi = locale === "vi";
  const prefersReducedMotion = Boolean(useReducedMotion());

  const studies: Study[] = [
    {
      id: "cops",
      tab: isVi ? "Bake vết nứt (Houdini COPs)" : "Crack bake (Houdini COPs)",
      title: isVi ? "Một vết nứt, ba texture" : "One crack, three textures",
      summary: isVi
        ? "Bake vector displacement và tangent normal trong Houdini COPs cho vết nứt toác bề mặt."
        : "Vector displacement and tangent normal bakes for directional fracture surfaces.",
      tools: "Houdini COPs",
      mode: "wipe",
      passes: [
        {
          id: "c",
          label: "Base Color + Mask",
          image: "/assets/blog/houdini-wolverine-destructibles/crack_mesh_growing_crack_c.webp",
          note: isVi ? "Mask lan vết nứt" : "Crack growth mask",
        },
        {
          id: "n",
          label: "Tangent Normal",
          image: "/assets/blog/houdini-wolverine-destructibles/crack_mesh_growing_crack_n.webp",
          note: isVi ? "Chi tiết sáng tối của mảnh vỡ" : "Shard lighting detail",
        },
        {
          id: "disp",
          label: "Vector Displacement",
          image: "/assets/blog/houdini-wolverine-destructibles/crack_mesh_growing_crack_disp_m.webp",
          note: isVi ? "Offset XYZ, không chỉ chiều cao" : "XYZ offset, not just height",
        },
      ],
      href: "/blog/houdini-destructibles-and-vfx-pipeline",
      linkLabel: isVi ? "Đọc ghi chú pipeline" : "Read the pipeline notes",
    },
    {
      id: "fracture",
      tab: isVi ? "Dọn mesh phá hủy (Blender)" : "Fracture cleanup (Blender)",
      title: isVi ? "Từ mesh nặng đến emitter nhẹ" : "From heavy mesh to light emitters",
      summary: isVi
        ? "Tool Blender Python tự động tách mặt nứt và sinh card emitter tại tâm mỗi mảnh vỡ."
        : "Automated Blender Python tool isolating fracture seams and generating center emitter cards.",
      tools: "Blender · Python",
      mode: "steps",
      passes: [
        {
          id: "raw",
          label: isVi ? "1. Chọn material nứt" : "1. Pick fracture material",
          image: "/assets/blog/destructible-separate-mesh-tool/destructible-material-selected.webp",
          note: isVi ? "Mesh gốc, viền vàng là mặt nứt" : "Source mesh, break faces in yellow",
        },
        {
          id: "seams",
          label: isVi ? "2. Tách mặt nứt" : "2. Isolate break faces",
          image: "/assets/blog/destructible-separate-mesh-tool/separated-crack-mesh.webp",
          note: isVi ? "Đã bỏ vỏ ngoài" : "Outer shell removed",
        },
        {
          id: "cards",
          label: isVi ? "3. Emitter card" : "3. Emitter cards",
          image: "/assets/blog/destructible-separate-mesh-tool/vfx-emitter-generated.webp",
          note: isVi ? "Card tam giác ở tâm mỗi mảnh" : "Triangle cards at island centres",
        },
      ],
      href: "/blog/destructible-separate-mesh-tool",
      linkLabel: isVi ? "Đọc về tool" : "Read about the tool",
    },
  ];

  const [studyIdx, setStudyIdx] = useState(0);
  const [passIdx, setPassIdx] = useState(1);
  const [split, setSplit] = useState(50);
  const [dragging, setDragging] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const study = studies[studyIdx] ?? studies[0];
  const isWipe = study.mode === "wipe";
  const basePass = study.passes[0];
  const activePass = study.passes[passIdx] ?? study.passes[0];

  const setSplitFromX = (clientX: number) => {
    const rect = viewportRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplit(Math.max(3, Math.min(97, pct)));
  };

  const spotlights = [
    {
      title: "Houdini Destruction",
      description: isVi
        ? "Tối ưu mô phỏng phá hủy Houdini cho real-time."
        : "Houdini destruction sims converted for real-time.",
      image: "/assets/blog/houdini-wolverine-destructibles/poster-prop-destruction.webp",
      previewVideo: "/assets/blog/houdini-wolverine-destructibles/prop-preview.mp4",
      crop: "object-center",
      link: "/blog/houdini-destructibles-and-vfx-pipeline",
    },
    {
      title: "VFX Flow",
      description: isVi
        ? "Kiểm tra asset và Perforce submission pipeline."
        : "Perforce asset validation and submission tool.",
      image: "/projects/vfx-flow/showcase_asset_qc_ready.png",
      previewVideo: "/projects/vfx-flow/showcase.mp4",
      crop: "object-center",
      link: "/rnd/vfx-flow",
    },
    {
      title: "Stormfront",
      description: isVi
        ? "Mây thể tích và tia chớp hai nhịp trong Unreal Engine."
        : "Volumetric storm clouds and dynamic lightning in Unreal.",
      image: "/assets/blog/stormfront/poster-wide.jpg",
      previewVideo: "/assets/blog/stormfront/storm-preview.mp4",
      crop: "object-center",
      link: "/blog/stormfront-volumetric-cloud-lightning",
    },
  ];

  return (
    <section id="technical-spotlight" className="scroll-mt-24 border-b border-border bg-section">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
          <h2 className="font-kanit text-3xl font-normal tracking-tight text-white sm:text-4xl">
            {copy.home.technicalSpotlight}
          </h2>
          <div className="flex flex-wrap gap-1.5 rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-md shadow-inner" role="tablist" aria-label={isVi ? "Chọn nghiên cứu" : "Choose study"}>
            {studies.map((s, idx) => {
              const active = idx === studyIdx;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setStudyIdx(idx);
                    setPassIdx(s.mode === "wipe" ? 1 : 0);
                    setSplit(50);
                  }}
                  className={`relative rounded-full px-5 py-2 text-xs sm:text-sm font-medium transition-colors duration-200 focus-visible:outline-none ${
                    active ? "text-white font-semibold" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="study-tab-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.14] border border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.5),0_0_16px_rgba(88,207,200,0.2)]"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{s.tab}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={study.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mb-16 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start"
          >
          <div>
            {/* Pass buttons */}
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
              {isWipe && (
                <span className="mr-1 font-mono text-muted-foreground">
                  {isVi ? "Trái:" : "Left:"} <span className="text-white font-medium">{basePass.label}</span>
                  <span className="mx-2 text-muted-foreground/30">|</span>
                  {isVi ? "Phải:" : "Right:"}
                </span>
              )}
              <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md shadow-inner">
                {study.passes.map((pass, idx) => {
                  if (isWipe && idx === 0) return null;
                  const selected = idx === passIdx;
                  return (
                    <button
                      key={pass.id}
                      type="button"
                      onClick={() => setPassIdx(idx)}
                      aria-pressed={selected}
                      className={`relative rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors duration-200 focus-visible:outline-none ${
                        selected ? "text-primary font-medium" : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {selected && (
                        <motion.div
                          layoutId="pass-tab-pill"
                          className="absolute inset-0 rounded-full bg-primary/15 border border-primary/30 shadow-[0_0_12px_rgba(88,207,200,0.2)]"
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{pass.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {isWipe ? (
              <>
                <div
                  ref={viewportRef}
                  onPointerDown={(e) => {
                    setDragging(true);
                    e.currentTarget.setPointerCapture(e.pointerId);
                    setSplitFromX(e.clientX);
                  }}
                  onPointerMove={(e) => dragging && setSplitFromX(e.clientX)}
                  onPointerUp={() => setDragging(false)}
                  onPointerCancel={() => setDragging(false)}
                  className="relative aspect-[16/10] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-sm border border-border bg-[#11151c]"
                >
                  <Image
                    src={activePass.image}
                    alt={activePass.label}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-contain"
                    draggable={false}
                  />
                  <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
                    <Image
                      src={basePass.image}
                      alt={basePass.label}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-contain"
                      draggable={false}
                    />
                  </div>
                  <span className="pointer-events-none absolute left-3 top-3 rounded-sm bg-background/90 px-2 py-0.5 text-[11px] font-mono text-foreground">
                    {basePass.label}
                  </span>
                  <span className="pointer-events-none absolute right-3 top-3 rounded-sm bg-background/90 px-2 py-0.5 text-[11px] font-mono text-primary">
                    {activePass.label}
                  </span>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 w-px bg-primary"
                    style={{ left: `${split}%` }}
                  >
                    <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-sm border border-primary bg-background text-primary">
                      <MoveHorizontal className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                <label className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="shrink-0">{isVi ? "So sánh" : "Compare"}</span>
                  <input
                    type="range"
                    min={3}
                    max={97}
                    value={Math.round(split)}
                    onChange={(e) => setSplit(Number(e.target.value))}
                    className="h-1.5 w-full cursor-pointer accent-[#5eb3ab]"
                  />
                </label>
              </>
            ) : (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-border bg-[#11151c]">
                {study.passes.map((pass, idx) => (
                  <Image
                    key={pass.id}
                    src={pass.image}
                    alt={pass.label}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className={`object-contain transition-opacity duration-300 motion-reduce:transition-none ${
                      idx === passIdx ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
            )}
            <p className="mt-2 text-xs text-muted-foreground">{activePass.note}</p>
          </div>

          <div className="lg:pt-10">
            <p className="text-xs font-mono text-primary">{study.tools}</p>
            <h3 className="mt-2 font-kanit text-2xl font-normal tracking-tight text-white sm:text-3xl">
              {study.title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{study.summary}</p>
            <Link
              href={study.href}
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white transition-colors hover:text-primary hover:underline underline-offset-4"
            >
              {study.linkLabel}
            </Link>
          </div>
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {spotlights.map((item) => (
            <SpotlightCard key={item.title} item={item} prefersReducedMotion={prefersReducedMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SpotlightCard({
  item,
  prefersReducedMotion,
}: {
  item: { title: string; description: string; image: string; previewVideo: string; crop: string; link: string };
  prefersReducedMotion: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hovering, setHovering] = useState(false);
  const [ready, setReady] = useState(false);
  const canHover = useCanHover();

  const enter = () => {
    setHovering(true);
    if (!prefersReducedMotion && canHover && videoRef.current) {
      videoRef.current.currentTime = 0;
      void videoRef.current.play().catch(() => {});
    }
  };
  const leave = () => {
    setHovering(false);
    videoRef.current?.pause();
  };

  const showVideo = hovering && ready && !prefersReducedMotion && canHover;

  return (
    <Link href={item.link} onMouseEnter={enter} onMouseLeave={leave} onFocus={enter} onBlur={leave} className="group block h-full">
      <article className="flex h-full flex-col">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border/80 bg-background transition-all duration-300 group-hover:border-primary/60 group-hover:shadow-lg">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className={`object-cover transition-opacity duration-300 ${item.crop} ${showVideo ? "opacity-0" : "opacity-100"}`}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {!prefersReducedMotion && canHover && (
            <video
              ref={videoRef}
              src={item.previewVideo}
              muted
              loop
              playsInline
              preload="none"
              onCanPlay={() => setReady(true)}
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                showVideo ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>
        <div className="pt-4">
          <h3 className="text-lg font-medium tracking-tight text-white transition-colors duration-200 group-hover:text-primary sm:text-xl">
            {item.title}
          </h3>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">{item.description}</p>
        </div>
      </article>
    </Link>
  );
}
