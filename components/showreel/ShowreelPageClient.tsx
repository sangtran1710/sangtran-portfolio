"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  Youtube,
  ArrowLeft,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { HERO } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface CueItem {
  time: number;
  timecode: string;
  duration: string;
  title: string;
  client: string;
  roleEn: string;
  roleVi: string;
  descEn: string;
  descVi: string;
  tools: string[];
  thumbnail: string;
}

const CUE_ITEMS: CueItem[] = [
  {
    time: 0,
    timecode: "00:00",
    duration: "14s",
    title: "Fortnite – Remix: The Finale",
    client: "Epic Games",
    roleEn: "Real-time Event VFX",
    roleVi: "Kỹ xảo Sự kiện Trực tiếp",
    descEn: "Live event stylized VFX, cosmic rifts, beam lasers, and particle optimization for millions of concurrent players.",
    descVi: "Kỹ xảo stylized sự kiện trực tiếp, chùm tia năng lượng, vết nứt vũ trụ và tối ưu particle cho hàng triệu người chơi.",
    tools: ["Unreal Engine", "Niagara"],
    thumbnail: "/images/showreel/shot-01-fortnite.webp",
  },
  {
    time: 14,
    timecode: "00:14",
    duration: "10s",
    title: "Marvel's Wolverine",
    client: "Insomniac Games / Sony",
    roleEn: "Senior VFX Artist",
    roleVi: "Senior VFX Artist",
    descEn: "Helicopter structural crash, rigid body destruction shards, high-velocity sparks, volumetric smoke and fire simulations.",
    descVi: "Va chạm máy bay trực thăng, mô phỏng phá hủy cấu trúc RBD, tia lửa vận tốc cao, khói và lửa thể tích.",
    tools: ["Proprietary Engine", "Houdini RBD", "HLSL"],
    thumbnail: "/images/showreel/shot-02-wolverine.webp",
  },
  {
    time: 24,
    timecode: "00:24",
    duration: "8s",
    title: "New World: Aeternum",
    client: "Amazon Games",
    roleEn: "Character & Combat VFX",
    roleVi: "Kỹ xảo Nhân vật & Chiến đấu",
    descEn: "Arcane ground decals, character aura emission, glowing runic shaders, and fluid combat impact effects.",
    descVi: "Decal ma thuật dưới sàn, phát quang nhân vật, shader cổ ngữ và hiệu ứng va chạm chiến đấu.",
    tools: ["Unreal Engine", "Houdini"],
    thumbnail: "/images/showreel/shot-03-magic.webp",
  },
  {
    time: 32,
    timecode: "00:32",
    duration: "9s",
    title: "Dynamic Wetness & Surface VFX",
    client: "Real-Time R&D",
    roleEn: "Shader & Technical Art",
    roleVi: "Shader & Technical Art",
    descEn: "Procedural wetness footprints, dynamic puddle ripples, surface deformation, and splat map blending.",
    descVi: "Dấu chân ướt procedural, gợn sóng vũng nước động, biến dạng bề mặt và hòa trộn splat map.",
    tools: ["HLSL", "Real-Time Shaders"],
    thumbnail: "/images/showreel/shot-04-wetness.webp",
  },
];

export default function ShowreelPageClient() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasError, setHasError] = useState(false);

  const { locale, copy } = useLanguage();
  const isVi = locale === "vi";

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => setHasError(true));
    setPlaying(true);
    setStarted(true);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const seekTo = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = seconds;
    if (video.paused) {
      video.play().catch(() => setHasError(true));
      setPlaying(true);
      setStarted(true);
    }
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };
    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  const getActiveCueIndex = () => {
    for (let i = CUE_ITEMS.length - 1; i >= 0; i--) {
      if (currentTime >= CUE_ITEMS[i].time) {
        return i;
      }
    }
    return 0;
  };

  const activeCueIndex = getActiveCueIndex();

  return (
    <div className="relative min-h-screen bg-[#1c212c] pt-24 pb-24 text-white">
      {/* Cinematic Ambient Backlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[650px] overflow-hidden">
        <div className="absolute left-1/2 top-10 h-[450px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(94,179,171,0.14),transparent_65%)] blur-3xl" />
        <div className="absolute left-1/3 top-36 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.06),transparent_65%)] blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 transition-colors hover:text-[#5eb3ab]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {copy.common.backToHome}
          </Link>
        </div>

        {/* Theatrical Page Header */}
        <header className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.24em] text-[#5eb3ab]">
                {isVi ? "KỸ XẢO THỜI GIAN THỰC & SHADER" : "REAL-TIME VFX SHOWREEL"}
              </span>
              <h1 className="mt-2 font-kanit text-4xl font-normal tracking-tight text-white sm:text-5xl lg:text-6xl">
                {isVi ? "Reel Sản Xuất 2025" : "Production Reel 2025"}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={HERO.showreelYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-[#364156] bg-[#232a38]/80 px-4 py-2 text-xs font-mono font-medium text-slate-200 backdrop-blur-sm transition-colors hover:border-[#5eb3ab] hover:text-white"
              >
                <Youtube className="h-4 w-4 text-red-500" />
                <span>YouTube 4K</span>
                <ExternalLink className="h-3 w-3 text-slate-400" />
              </a>
            </div>
          </div>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">
            {isVi
              ? "Tuyển tập 41 giây kỹ xảo gameplay, mô phỏng phá hủy và shader tùy biến trên engine độc quyền và Unreal Engine 5 cho Marvel's Wolverine, Spider-Man 2 và Fortnite."
              : "A curated 41-second demonstration of in-engine gameplay VFX, destruction simulations, and custom Niagara/HLSL shaders across Marvel's Wolverine, Spider-Man 2, and Fortnite."}
          </p>

          {/* Quick Reel Specs Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-[#364156]/50 py-3 text-xs font-mono text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#5eb3ab]" />
              {isVi ? "Thời lượng:" : "Runtime:"} <span className="text-slate-200">00:41</span>
            </span>
            <span className="text-slate-600">/</span>
            <span>
              {isVi ? "Định dạng:" : "Format:"} <span className="text-slate-200">4K 60FPS</span>
            </span>
            <span className="text-slate-600">/</span>
            <span>
              {isVi ? "Công nghệ lõi:" : "Core Tech:"}{" "}
              <span className="text-slate-200">Unreal Engine 5 · Niagara · Houdini · HLSL</span>
            </span>
          </div>
        </header>

        {/* Cinema Video Theater Player */}
        <section ref={playerRef} className="relative mb-14">
          {/* Ambient Video Halo */}
          <div className="pointer-events-none absolute -inset-3 -z-10 rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(94,179,171,0.20),rgba(28,33,44,0)_70%)] blur-xl" />

          <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-[#364156] bg-[#161a23] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] ring-1 ring-white/10">
            {hasError ? (
              <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                <p className="mb-4 text-sm text-slate-400">
                  {copy.common.videoUnavailable}
                </p>
                <a
                  href={HERO.showreelYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-500"
                >
                  <Youtube className="h-4 w-4" />
                  {copy.common.watchOnYoutube}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={HERO.showreelUrl}
                  playsInline
                  loop
                  controls={started}
                  preload="metadata"
                  className="h-full w-full object-cover"
                  onError={() => setHasError(true)}
                />

                {!started && (
                  <button
                    type="button"
                    onClick={handlePlay}
                    aria-label={copy.common.playShowreelVideo}
                    className="group/poster absolute inset-0 flex cursor-pointer items-center justify-center"
                  >
                    <Image
                      src="/images/optimized/showreel-fortnite-poster.jpg"
                      alt="Showreel Poster"
                      fill
                      priority
                      className="object-cover transition-transform duration-700 ease-out group-hover/poster:scale-[1.015]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161a23]/80 via-transparent to-[#161a23]/30" />

                    {/* Premium Glassmorphic Play Trigger */}
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white shadow-2xl backdrop-blur-md transition-all duration-300 group-hover/poster:scale-110 group-hover/poster:border-[#5eb3ab] group-hover/poster:bg-[#5eb3ab] group-hover/poster:text-slate-900 group-hover/poster:shadow-[#5eb3ab]/40">
                        <Play className="ml-1 h-8 w-8 fill-current" />
                      </div>
                      <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/80 transition-colors group-hover/poster:text-white">
                        {isVi ? "Phát Showreel (00:41)" : "Play Showreel (00:41)"}
                      </span>
                    </div>
                  </button>
                )}

                {started && (
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="pointer-events-auto absolute bottom-14 left-4 right-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-mono text-white backdrop-blur-md transition-colors hover:bg-white/30"
                      >
                        {playing ? <Pause className="h-3.5 w-3.5 fill-white" /> : <Play className="h-3.5 w-3.5 fill-white" />}
                        {playing ? "PAUSE" : "PLAY"}
                      </button>
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-2 text-xs font-mono text-white backdrop-blur-md transition-colors hover:bg-white/30"
                      >
                        {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Interactive Cue Sheet & Breakdown Table */}
        <section className="mb-16">
          <div className="mb-6 flex items-baseline justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#5eb3ab]">
                {isVi ? "BẢNG PHÂN CẢNH CHI TIẾT" : "REEL CUE SHEET & TIMESTAMPS"}
              </span>
              <h2 className="mt-1 font-kanit text-2xl font-normal text-white sm:text-3xl">
                {isVi ? "Chi tiết từng shot và vai trò thực tế" : "Shot Breakdown & Contributions"}
              </h2>
            </div>
            <p className="hidden text-xs font-mono text-slate-400 sm:block">
              {isVi ? "Nhấp vào mốc giờ để tua đến shot" : "Click timestamp to jump video"}
            </p>
          </div>

          <div className="space-y-3">
            {CUE_ITEMS.map((item, index) => {
              const isActive = started && activeCueIndex === index;

              return (
                <div
                  key={item.title}
                  onClick={() => seekTo(item.time)}
                  className={cn(
                    "group relative flex cursor-pointer flex-col gap-4 rounded-lg border p-4 sm:p-5 transition-all duration-200 md:flex-row md:items-center md:justify-between",
                    isActive
                      ? "border-[#5eb3ab] bg-[#232a38] shadow-md shadow-[#5eb3ab]/10"
                      : "border-[#364156]/70 bg-[#161a23]/90 hover:border-[#4b5a75] hover:bg-[#232a38]"
                  )}
                >
                  <div className="flex items-start gap-4">
                    {/* Timestamp Trigger */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        seekTo(item.time);
                      }}
                      className={cn(
                        "flex items-center gap-1.5 rounded border px-2.5 py-1 text-xs font-mono font-medium transition-colors shrink-0",
                        isActive
                          ? "border-[#5eb3ab] bg-[#5eb3ab]/20 text-[#5eb3ab]"
                          : "border-[#364156] bg-[#1c212c] text-slate-300 group-hover:border-[#5eb3ab] group-hover:text-white"
                      )}
                    >
                      <Play className="h-3 w-3 fill-current" />
                      <span>{item.timecode}</span>
                    </button>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-medium text-white transition-colors group-hover:text-[#5eb3ab]">
                          {item.title}
                        </h3>
                        <span className="text-slate-600">·</span>
                        <span className="text-xs font-mono text-slate-400">{item.client}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-xs font-mono text-[#5eb3ab]/90">
                          {isVi ? item.roleVi : item.roleEn}
                        </span>
                      </div>
                      <p className="mt-1 text-xs sm:text-sm text-slate-300">
                        {isVi ? item.descVi : item.descEn}
                      </p>
                    </div>
                  </div>

                  {/* Tech stack inline */}
                  <div className="flex items-center gap-2 pl-14 md:pl-0 shrink-0">
                    <span className="text-[11px] font-mono text-slate-400">
                      {item.tools.join(" · ")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* High-Resolution Key Stills Gallery */}
        <section className="mb-16">
          <div className="mb-6">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#5eb3ab]">
              {isVi ? "HÌNH ẢNH RENDER ĐỘ PHÂN GIẢI CAO" : "FRAME BREAKDOWN GALLERY"}
            </span>
            <h2 className="mt-1 font-kanit text-2xl font-normal text-white sm:text-3xl">
              {isVi ? "Các khung hình tiêu biểu trong Reel" : "Featured Keyframe Captures"}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CUE_ITEMS.map((item) => (
              <div
                key={item.title}
                onClick={() => seekTo(item.time)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[#364156]/70 bg-[#161a23] transition-colors duration-300 group-hover:border-[#5eb3ab]/60">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-mono text-slate-200">
                    <Play className="h-2.5 w-2.5 fill-current text-[#5eb3ab]" />
                    <span>{item.timecode}</span>
                  </div>
                </div>
                <h4 className="mt-2 text-xs font-medium text-white transition-colors group-hover:text-[#5eb3ab]">
                  {item.title}
                </h4>
                <p className="text-[11px] font-mono text-slate-400">
                  {item.client}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Studio Production Footer & Portfolio CTA */}
        <section className="rounded-xl border border-[#364156]/60 bg-[#161a23]/60 p-8 text-center sm:p-10">
          <Sparkles className="mx-auto h-6 w-6 text-[#5eb3ab]" />
          <h3 className="mt-3 font-kanit text-xl font-normal text-white sm:text-2xl">
            {isVi ? "Tìm hiểu sâu hơn về từng dự án" : "Explore Complete Case Studies & R&D"}
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-300">
            {isVi
              ? "Tất cả hình ảnh và video đều là realtime capture trong engine. Xem chi tiết các bài viết phân tích kỹ thuật và pipeline tool hoàn chỉnh trong danh mục dự án."
              : "All footage represents real-time engine captures and in-engine cinematics. Explore in-depth architectural breakdowns, Niagara emitter setups, and HLSL code."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-md bg-[#5eb3ab] px-5 py-2.5 text-xs font-mono font-medium text-[#161a23] transition-colors hover:bg-[#72c7bf]"
            >
              {isVi ? "Xem danh mục dự án" : "View All Projects"}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 rounded-md border border-[#364156] bg-[#232a38] px-5 py-2.5 text-xs font-mono font-medium text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
            >
              {isVi ? "Đọc ghi chép R&D" : "Read Technical Notes"}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
