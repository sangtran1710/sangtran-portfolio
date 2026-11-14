"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveHorizontal } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useCanHover } from "@/lib/use-media";
import { mediaUrl } from "@/lib/media";

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

const decodedImages = new Map<string, Promise<void>>();
function decodeStudyImage(src: string): Promise<void> {
  const cached = decodedImages.get(src);
  if (cached) return cached;
  const pending = new Promise<void>((resolve, reject) => {
    const image = new window.Image();
    const timeout = window.setTimeout(() => reject(new Error("Image load timed out")), 15000);
    image.onload = () => { image.decode().then(resolve, reject).finally(() => window.clearTimeout(timeout)); };
    image.onerror = () => { window.clearTimeout(timeout); reject(new Error("Image could not load")); };
    image.src = src;
  }).catch((error) => { decodedImages.delete(src); throw error; });
  decodedImages.set(src, pending);
  return pending;
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
        : "A closer look at the textures that give a growing fracture its shape and surface detail.",
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
      linkLabel: isVi ? "Đọc ghi chú pipeline" : "Explore the process",
    },
    {
      id: "fracture",
      tab: isVi ? "Dọn mesh phá hủy (Blender)" : "Fracture cleanup (Blender)",
      title: isVi ? "Từ mesh nặng đến emitter nhẹ" : "From heavy mesh to light emitters",
      summary: isVi
        ? "Tool Blender Python tự động tách mặt nứt và sinh card emitter tại tâm mỗi mảnh vỡ."
        : "A Blender tool I built to separate fracture seams and place effect emitters where each piece breaks.",
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
  const [showAnnotations, setShowAnnotations] = useState(false);
  const selectionRequest = useRef(0);
  const [pendingStudy, setPendingStudy] = useState<number | null>(null);
  const [imageError, setImageError] = useState(false);
  useEffect(() => () => { selectionRequest.current += 1; }, []);

  const warmStudy = (index: number) => Promise.all(studies[index].passes.map((pass) => decodeStudyImage(pass.image)));
  const selectStudy = async (index: number) => {
    const request = ++selectionRequest.current;
    if (index === studyIdx) { setPendingStudy(null); return; }
    setPendingStudy(index);
    setImageError(false);
    try {
      await warmStudy(index);
      if (request !== selectionRequest.current) return;
      setStudyIdx(index);
      setPassIdx(studies[index].mode === "wipe" ? 1 : 0);
      setSplit(50);
    } catch {
      if (request === selectionRequest.current) setImageError(true);
    } finally {
      if (request === selectionRequest.current) setPendingStudy(null);
    }
  };
  const selectPass = async (index: number) => {
    const request = ++selectionRequest.current;
    setPendingStudy(null);
    setImageError(false);
    try {
      await decodeStudyImage(studies[studyIdx].passes[index].image);
      if (request === selectionRequest.current) setPassIdx(index);
    } catch {
      if (request === selectionRequest.current) setImageError(true);
    }
  };
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
        : "Volumetric storm clouds and dynamic lightning.",
      image: "/assets/blog/stormfront/poster-wide.jpg",
      previewVideo: "/assets/blog/stormfront/storm-preview.mp4",
      crop: "object-center",
      link: "/blog/stormfront-volumetric-cloud-lightning",
    },
  ];

  return (
    <section id="technical-spotlight" className="scroll-mt-24 bg-section">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-sans text-4xl font-normal tracking-tight text-white">
            {copy.home.technicalSpotlight}
          </h2>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2" role="tablist" aria-label={isVi ? "Chọn nghiên cứu" : "Choose study"}>
            {studies.map((s, idx) => {
              const active = idx === studyIdx;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onMouseEnter={() => { void warmStudy(idx).catch(() => {}); }}
                  onFocus={() => { void warmStudy(idx).catch(() => {}); }}
                  onClick={() => { void selectStudy(idx); }}
                  className={`relative inline-flex min-h-11 items-center pb-2 text-[13px] font-medium transition-colors duration-200 focus-visible:outline-none ${
                    active ? "text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <span className="pointer-events-none relative z-10 select-none">{s.tab}</span>
                  {active && (
                    <motion.div
                      layoutId="study-tab-underline"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-primary"
                      transition={{ type: "spring", stiffness: 450, damping: 34 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <p role="status" className="sr-only">{imageError ? "Unable to load this preview. Please try again." : pendingStudy !== null ? "Loading preview" : ""}</p>
        <AnimatePresence mode="wait">
          <motion.div
            key={study.id}
            aria-busy={pendingStudy !== null}
            initial={prefersReducedMotion ? false : { opacity: 0.75, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0.8, y: -3 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.14, ease: "easeOut" }}
            className="mb-16 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start"
          >
          <div className="lg:col-start-2 lg:row-start-1">
            <h3 className="font-sans text-2xl font-normal tracking-tight text-white sm:text-4xl">
              {study.title}
            </h3>
            <p className="mt-2 text-[13px] font-sans text-muted-foreground">{study.tools}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{study.summary}</p>

            {/* Clickable 3-pass breakdown list */}
            <ul className="mt-6 divide-y divide-border/60 border-y border-border/60">
              {study.passes.map((pass, idx) => {
                const isBaseWipe = isWipe && idx === 0;
                const selected = !isBaseWipe && idx === passIdx;
                return (
                  <li key={pass.id}>
                    <button
                      type="button"
                      disabled={isBaseWipe}
                      onClick={() => { if (!isBaseWipe) void selectPass(idx); }}
                      aria-pressed={isBaseWipe ? undefined : selected}
                      className={`flex w-full appearance-none items-center justify-between gap-4 rounded-lg bg-transparent py-3.5 text-left transition-colors [-webkit-tap-highlight-color:transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/60 ${
                        isBaseWipe
                          ? "cursor-default"
                          : "cursor-pointer hover:bg-white/[0.02]"
                      }`}
                    >
                      <div className="min-w-0">
                        <span className={`block text-base font-normal ${selected ? "text-primary" : "text-white"}`}>
                          {pass.label}
                        </span>
                        <span className="mt-0.5 block text-[13px] text-muted-foreground">
                          {pass.note}
                        </span>
                      </div>
                      <span className="shrink-0 text-[13px] text-muted-foreground">
                        {isBaseWipe
                          ? (isVi ? "Trái" : "Left")
                          : selected
                            ? (isVi ? (isWipe ? "Phải" : "Đang xem") : (isWipe ? "Right" : "Active"))
                            : ""}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <Link
                href={study.href}
                className="inline-flex min-h-11 items-center text-base font-normal text-white underline-offset-4 hover:underline"
              >
                {study.linkLabel} →
              </Link>
              <button
                type="button"
                onClick={() => setShowAnnotations((prev) => !prev)}
                aria-pressed={showAnnotations}
                className={`inline-flex min-h-11 items-center rounded-md border px-3.5 py-2 text-[13px] font-medium transition-colors ${
                  showAnnotations
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border/80 bg-background/60 text-muted-foreground hover:text-white"
                }`}
              >
                {isVi
                  ? (showAnnotations ? "Ẩn chú thích" : "Chú thích kỹ thuật")
                  : (showAnnotations ? "Hide annotations" : "Annotations")}
              </button>
            </div>
          </div>
          <div className="lg:col-start-1 lg:row-start-1">
            {isWipe ? (
              <>
                <div
                  ref={viewportRef}
                  role="slider"
                  tabIndex={0}
                  aria-label={isVi ? "Kéo để so sánh texture" : "Drag to compare texture passes"}
                  aria-valuemin={3}
                  aria-valuemax={97}
                  aria-valuenow={Math.round(split)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowLeft") { e.preventDefault(); setSplit((s) => Math.max(3, s - 5)); }
                    if (e.key === "ArrowRight") { e.preventDefault(); setSplit((s) => Math.min(97, s + 5)); }
                  }}
                  onPointerDown={(e) => {
                    setDragging(true);
                    e.currentTarget.setPointerCapture(e.pointerId);
                    setSplitFromX(e.clientX);
                  }}
                  onPointerMove={(e) => dragging && setSplitFromX(e.clientX)}
                  onPointerUp={() => setDragging(false)}
                  onPointerCancel={() => setDragging(false)}
                  className="relative aspect-square w-full max-w-[540px] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-xl border border-border/80 bg-[#0B0E13] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
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
                  <span className="pointer-events-none absolute left-2.5 top-2.5 max-w-[44%] truncate rounded-md border border-white/10 bg-background/85 px-2.5 py-1 text-[13px] font-sans text-foreground backdrop-blur-sm">
                    {basePass.label}
                  </span>
                  <span className="pointer-events-none absolute right-2.5 top-2.5 max-w-[44%] truncate rounded-md border border-white/10 bg-background/85 px-2.5 py-1 text-[13px] font-sans text-white backdrop-blur-sm">
                    {activePass.label}
                  </span>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 w-px bg-white/70"
                    style={{ left: `${split}%` }}
                  >
                    <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border border-white/20 bg-background/90 text-white shadow-md backdrop-blur-sm">
                      <MoveHorizontal className="h-3.5 w-3.5" />
                    </div>
                  </div>
                  {showAnnotations && (
                    <svg
                      viewBox="0 0 540 540"
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 h-full w-full"
                    >
                      <g
                        fill="none"
                        stroke="#58cfc8"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {/* Crack front callout */}
                        <path d="M 110 158 Q 155 190 198 222" />
                        <path d="M 190 223 L 200 224 L 197 214" />
                        <circle cx="206" cy="230" r="14" strokeDasharray="4 4" />
                        {/* XYZ offset triad */}
                        <path d="M 375 370 L 375 322" />
                        <path d="M 370 330 L 375 320 L 380 330" />
                        <path d="M 375 370 L 423 370" />
                        <path d="M 415 365 L 425 370 L 415 375" />
                        <path d="M 375 370 L 345 398" />
                        <path d="M 346 389 L 343 400 L 354 397" />
                      </g>
                      <g fill="#58cfc8" fontSize="17" fontFamily="Inter, sans-serif">
                        <text x="42" y="146">Mask: growth front (0 → 1)</text>
                        <text x="282" y="426">RGB = XYZ offset, not just height</text>
                        <text x="382" y="325">Z</text>
                        <text x="430" y="374">X</text>
                        <text x="324" y="405">Y</text>
                      </g>
                    </svg>
                  )}
                </div>
              </>
            ) : (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border/80 bg-[#0B0E13]">
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
                {showAnnotations && (
                  <svg
                    viewBox="0 0 640 360"
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                  >
                    <g
                      fill="none"
                      stroke="#58cfc8"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M 195 105 Q 250 130 295 162" />
                      <path d="M 286 163 L 297 164 L 293 154" />
                      <polygon points="310,165 326,184 302,188" />
                      <path d="M 332 184 Q 395 215 445 235" />
                    </g>
                    <g fill="#58cfc8" fontSize="18" fontFamily="Inter, sans-serif">
                      <text x="48" y="94">Isolate break seam</text>
                      <text x="340" y="256">Triangle emitter at island centre</text>
                    </g>
                  </svg>
                )}
              </div>
            )}
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
              src={mediaUrl(item.previewVideo)}
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
          <p className="mt-2 text-base leading-relaxed text-muted-foreground [text-wrap:pretty]">{item.description}</p>
        </div>
      </article>
    </Link>
  );
}
