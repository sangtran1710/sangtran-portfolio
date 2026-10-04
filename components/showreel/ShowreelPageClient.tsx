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
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { HERO } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface ShotCue {
  time: number;
  timecode: string;
  title: string;
  client: string;
  tools: string;
  thumbnail: string;
}

const SHOTS: ShotCue[] = [
  {
    time: 0,
    timecode: "00:00",
    title: "Fortnite – Remix Finale",
    client: "Epic Games",
    tools: "Unreal Engine · Niagara",
    thumbnail: "/images/showreel/shot-01-fortnite.webp",
  },
  {
    time: 14,
    timecode: "00:14",
    title: "Marvel's Spider-Man 2",
    client: "Insomniac Games",
    tools: "Proprietary Engine · Houdini",
    thumbnail: "/images/showreel/shot-02-wolverine.webp",
  },
  {
    time: 24,
    timecode: "00:24",
    title: "New World: Aeternum",
    client: "Amazon Games",
    tools: "Unreal Engine · Houdini",
    thumbnail: "/images/showreel/shot-03-magic.webp",
  },
  {
    time: 32,
    timecode: "00:32",
    title: "Until Dawn Remake",
    client: "Ballistic Moon",
    tools: "Unreal Engine 5 · Lumen",
    thumbnail: "/images/showreel/shot-04-wetness.webp",
  },
];

export default function ShowreelPageClient() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasError, setHasError] = useState(false);

  const { copy } = useLanguage();

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

  const getActiveShotIndex = () => {
    for (let i = SHOTS.length - 1; i >= 0; i--) {
      if (currentTime >= SHOTS[i].time) {
        return i;
      }
    }
    return 0;
  };

  const activeIndex = getActiveShotIndex();

  return (
    <div className="relative min-h-screen bg-background pt-24 pb-20 text-white">
      {/* Subtle Cinematic Stage Glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] overflow-hidden">
        <div className="absolute left-1/2 top-10 h-[380px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(88,207,200,0.08),transparent_70%)] blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8">
        {/* Minimal Navigation & Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {copy.common.backToHome}
          </Link>

          <a
            href={HERO.showreelYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground transition-colors hover:text-primary"
          >
            <Youtube className="h-3.5 w-3.5 text-red-400" />
            <span>YouTube 4K</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Crisp, Confident Title */}
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
          <h1 className="font-kanit text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Real-Time VFX Showreel
          </h1>
          <span className="text-xs font-mono text-muted-foreground">
            00:41 · 4K 60FPS
          </span>
        </div>

        {/* Cinema Video Player */}
        <div className="relative mb-8">
          <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-section shadow-[0_20px_50px_-12px_rgba(0,0,0,0.85)] ring-1 ring-white/10">
            {hasError ? (
              <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                <p className="mb-4 text-sm text-muted-foreground">
                  {copy.common.videoUnavailable}
                </p>
                <a
                  href={HERO.showreelYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-red-500"
                >
                  <Youtube className="h-4 w-4" />
                  {copy.common.watchOnYoutube}
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
                    <div className="absolute inset-0 bg-black/25 transition-colors group-hover/poster:bg-black/35" />

                    {/* Glassmorphic Play Trigger */}
                    <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white shadow-2xl backdrop-blur-md transition-all duration-300 group-hover/poster:scale-110 group-hover/poster:border-primary group-hover/poster:bg-primary group-hover/poster:text-slate-900">
                      <Play className="ml-1 h-8 w-8 fill-current" />
                    </div>
                  </button>
                )}

                {started && (
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="pointer-events-auto absolute bottom-14 left-4 right-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1.5 text-xs font-mono text-white backdrop-blur-md transition-colors hover:bg-white/30"
                      >
                        {playing ? <Pause className="h-3.5 w-3.5 fill-white" /> : <Play className="h-3.5 w-3.5 fill-white" />}
                        {playing ? "PAUSE" : "PLAY"}
                      </button>
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-xs font-mono text-white backdrop-blur-md transition-colors hover:bg-white/30"
                      >
                        {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Visual Shot Scrubber (Interactive Jump Bar) */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SHOTS.map((shot, idx) => {
            const isActive = started && activeIndex === idx;

            return (
              <button
                key={shot.title}
                type="button"
                onClick={() => seekTo(shot.time)}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-lg border text-left transition-all duration-200",
                  isActive
                    ? "border-primary bg-card shadow-md shadow-primary/10"
                    : "border-border/70 bg-section/70 hover:border-slate-500 hover:bg-card"
                )}
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                  <Image
                    src={shot.thumbnail}
                    alt={shot.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-mono text-foreground">
                    <Play className="h-2 w-2 fill-current text-primary" />
                    <span>{shot.timecode}</span>
                  </div>
                </div>

                {/* Minimal Label */}
                <div className="p-2.5">
                  <p className="truncate text-xs font-medium text-white transition-colors group-hover:text-primary">
                    {shot.title}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] font-mono text-muted-foreground">
                    {shot.client}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
