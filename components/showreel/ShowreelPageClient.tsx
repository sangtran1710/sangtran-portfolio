"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Youtube,
  ArrowLeft,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { HERO, PROJECTS } from "@/data/portfolio";
import { mediaUrl } from "@/lib/media";
import { cn } from "@/lib/utils";

interface ShotCue {
  projectSlug: string;
  time: number;
  timecode: string;
  title: string;
  client: string;
  tools: string;
  thumbnail: string;
}

const SHOTS: ShotCue[] = [
  {
    projectSlug: "fortnite-remix",
    time: 0,
    timecode: "00:00",
    title: "Fortnite: Remix Finale",
    client: "Epic Games",
    tools: "Unreal Engine · Niagara",
    thumbnail: "/images/showreel/shot-01-fortnite.webp",
  },
  {
    projectSlug: "spider-man-2",
    time: 14,
    timecode: "00:14",
    title: "Marvel's Spider-Man 2",
    client: "Insomniac Games",
    tools: "Proprietary Engine · Houdini",
    thumbnail: "/images/showreel/shot-02-wolverine.webp",
  },
  {
    projectSlug: "new-world",
    time: 24,
    timecode: "00:24",
    title: "New World: Aeternum",
    client: "Amazon Games",
    tools: "Unreal Engine · Houdini",
    thumbnail: "/images/showreel/shot-03-magic.webp",
  },
  {
    projectSlug: "until-dawn",
    time: 32,
    timecode: "00:32",
    title: "Until Dawn Remake",
    client: "Ballistic Moon",
    tools: "Unreal Engine 5 · Lumen",
    thumbnail: "/images/showreel/shot-04-wetness.webp",
  },
];

const STREAM_IFRAME_URL = (process.env.NEXT_PUBLIC_STREAM_IFRAME_URL ?? "").trim();

export default function ShowreelPageClient() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);
  const [streamStartTime, setStreamStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasError, setHasError] = useState(false);

  const { copy } = useLanguage();

  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    void video.play().catch(() => setHasError(true));
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) handlePlay();
    else video.pause();
  }, [handlePlay]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (event.repeat || event.altKey || event.ctrlKey || event.metaKey ||
          target?.closest("input, textarea, select, button, a, video, [contenteditable]")) return;
      if (event.code === "Space" || event.key.toLowerCase() === "k") {
        event.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [togglePlay]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const seekTo = (seconds: number) => {
    if (STREAM_IFRAME_URL) {
      setStreamStartTime(seconds);
      setCurrentTime(seconds);
      setStarted(true);
      return;
    }
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = seconds;
    if (video.paused) {
      handlePlay();
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
    <div className="relative min-h-screen bg-background pt-32 pb-20 text-white">
      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-1.5 text-[13px] font-sans text-muted-foreground underline-offset-4 hover:text-white hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {copy.common.backToHome}
          </Link>

          <a
            href={HERO.showreelYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-[13px] font-sans text-muted-foreground underline-offset-4 hover:text-white hover:underline"
          >
            <Youtube className="h-3.5 w-3.5 text-red-400" />
            <span>YouTube 4K</span>
          </a>
        </div>

        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
          <h1 className="font-sans text-4xl font-normal tracking-tight text-white">
            VFX Showreel
          </h1>
          <span className="text-[13px] font-sans text-muted-foreground">
            00:41 · 720p 30FPS (4K on YouTube)
          </span>
        </div>

        <div className="relative mb-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-section">
            {hasError ? (
              <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                <p className="mb-4 text-base text-muted-foreground">
                  {copy.common.videoUnavailable}
                </p>
                <a
                  href={HERO.showreelYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-red-500"
                >
                  <Youtube className="h-4 w-4" />
                  {copy.common.watchOnYoutube}
                </a>
              </div>
            ) : STREAM_IFRAME_URL && started ? (
              <iframe
                key={streamStartTime}
                src={`${STREAM_IFRAME_URL}${STREAM_IFRAME_URL.includes("?") ? "&" : "?"}autoplay=true&startTime=${streamStartTime}`}
                title="Henry Tran VFX Showreel"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={mediaUrl(HERO.showreelUrl)}
                  playsInline
                  loop
                  controls={started}
                  preload="metadata"
                  className="h-full w-full object-cover"
                  onPlay={() => { setPlaying(true); setStarted(true); }}
                  onPause={() => setPlaying(false)}
                  onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
                  onError={() => setHasError(true)}
                />

                {!started && (
                  <button
                    type="button"
                    onClick={() => {
                      if (STREAM_IFRAME_URL) {
                        setStreamStartTime(0);
                        setStarted(true);
                        return;
                      }
                      handlePlay();
                    }}
                    aria-label={copy.common.playShowreelVideo}
                    className="group/poster absolute inset-0 flex cursor-pointer items-center justify-center"
                  >
                    <Image
                      src="/images/optimized/showreel-fortnite-poster.jpg"
                      alt="Showreel Poster"
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/25 transition-colors group-hover/poster:bg-black/35" />

                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-md bg-primary text-background transition-colors group-hover/poster:bg-primary-hover">
                      <Play className="ml-0.5 h-7 w-7 fill-current" />
                    </div>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SHOTS.map((shot, idx) => {
            const isActive = started && activeIndex === idx;

            return (
              <button
                key={shot.title}
                type="button"
                onClick={() => seekTo(shot.time)}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-md border text-left transition-colors duration-200",
                  isActive
                    ? "border-primary bg-card"
                    : "border-border/70 bg-section/70 hover:border-slate-500 hover:bg-card"
                )}
              >
                <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                  <Image
                    src={shot.thumbnail}
                    alt={shot.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded bg-black/80 px-1.5 py-0.5 text-[13px] font-sans text-foreground">
                    <Play className="h-2.5 w-2.5 fill-current text-primary" />
                    <span>{shot.timecode}</span>
                  </div>
                </div>

                <div className="p-2.5">
                  <p className="truncate text-[13px] font-medium text-white">
                    {shot.title}
                  </p>
                  <p className="mt-0.5 truncate text-[13px] font-sans text-muted-foreground">
                    {shot.client}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[13px] text-muted-foreground">
          <Link
            href="/portfolio"
            className="inline-flex min-h-11 items-center gap-1.5 font-sans text-[13px] text-white underline-offset-4 hover:underline"
          >
            Selected work →
          </Link>
          <span className="font-sans text-[13px] text-muted-foreground">
            Sparx* · Insomniac Games · Epic Games · Amazon Games
          </span>
        </div>
      </div>
    </div>
  );
}
