"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  Youtube,
  Film,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedHero } from "@/lib/portfolio-content";

interface ShowreelSectionProps {
  headingLevel?: "h1" | "h2";
}

const REEL_CUES = [
  {
    time: "00:00",
    seconds: 0,
    title: "Marvel's Spider-Man 2",
    client: "Insomniac Games / Sony",
    engine: "Proprietary Engine · Houdini",
  },
  {
    time: "00:10",
    seconds: 10,
    title: "Fortnite - Remix The Finale",
    client: "Epic Games",
    engine: "Unreal Engine · Niagara",
  },
  {
    time: "00:20",
    seconds: 20,
    title: "New World: Aeternum",
    client: "Amazon Games",
    engine: "Unreal Engine · Houdini",
  },
  {
    time: "00:30",
    seconds: 30,
    title: "Technical VFX & R&D",
    client: "Stylized Combat & Shaders",
    engine: "Unreal Engine 5 · Niagara · HLSL",
  },
];

export default function ShowreelSection({
  headingLevel = "h2",
}: ShowreelSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [started, setStarted] = useState(false);
  const { locale, copy } = useLanguage();
  const hero = getLocalizedHero(locale);
  const Heading = headingLevel;

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
      video.play().catch(() => {});
      setPlaying(true);
      setStarted(true);
    }
  };

  return (
    <section id="reel" className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-teal-400">
            Showreel
          </p>
          <Heading className="mt-2 text-3xl font-extrabold uppercase tracking-[0.1em] text-white sm:text-4xl lg:text-5xl">
            {copy.showreel.title}
          </Heading>
        </div>
        <div className="hidden items-center gap-4 sm:flex">
          <p className="text-sm text-zinc-500">{copy.showreel.subtitle}</p>
          <a
            href={hero.showreelYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
          >
            <Youtube className="h-3.5 w-3.5" />
            YouTube
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {hasError ? (
        <div className="flex aspect-video flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50">
          <p className="mb-4 text-sm text-zinc-500">
            {copy.common.videoUnavailable}
          </p>
          <Button
            asChild
            size="lg"
            className="gap-2.5 bg-red-600 hover:bg-red-500"
          >
            <a
              href={hero.showreelYoutube}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="h-5 w-5" strokeWidth={1.5} />
              {copy.common.watchOnYoutube}
              <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
            </a>
          </Button>
        </div>
      ) : (
        <div className="group relative overflow-hidden rounded-2xl bg-zinc-950 shadow-2xl ring-1 ring-white/5">
          <video
            ref={videoRef}
            src={hero.showreelUrl}
            muted
            loop
            playsInline
            controls={started}
            preload="none"
            className="aspect-video w-full object-cover"
            onError={() => setHasError(true)}
          />

          {!started && (
            <button
              type="button"
              onClick={handlePlay}
              aria-label={copy.common.playShowreelVideo}
              className="group/play absolute inset-0 flex cursor-pointer items-center justify-center"
            >
              <Image
                src="/images/optimized/showreel-fortnite-poster.jpg"
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="absolute inset-0 object-cover object-center opacity-95 transition-transform duration-700 group-hover/play:scale-[1.02]"
                aria-hidden
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(4,7,12,0.08)_48%,rgba(4,7,12,0.42)_100%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-zinc-950/0 to-zinc-950/10" />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-2xl backdrop-blur-md transition-all duration-300 group-hover/play:scale-110 group-hover/play:border-teal-400/50 group-hover/play:bg-teal-500/90 group-hover/play:shadow-teal-500/25">
                  <Play className="ml-1 h-8 w-8 fill-white" />
                </div>
                <span className="text-sm font-medium tracking-wide text-white/50 transition-colors group-hover/play:text-white/90">
                  {copy.common.playShowreel}
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
                  aria-label={playing ? copy.common.pause : copy.common.play}
                  className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/25"
                >
                  {playing ? (
                    <Pause className="h-4 w-4 fill-white" />
                  ) : (
                    <Play className="h-4 w-4 fill-white" />
                  )}
                  {playing ? copy.common.pause : copy.common.play}
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/25"
                    aria-label={muted ? copy.common.unmute : copy.common.mute}
                  >
                    {muted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </button>
                  <a
                    href={hero.showreelYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/25"
                  >
                    <Youtube className="h-4 w-4" />
                    <span className="hidden sm:inline">YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <p className="mt-3 text-center text-xs text-zinc-600">
        {hasError
          ? copy.common.youtubeHosted
          : started
            ? copy.common.hoverForControls
            : copy.common.clickToPlay}
      </p>

      {/* Interactive Cue Sheet */}
      <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-7">
        <div className="flex flex-col gap-3 pb-4 border-b border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <Film className="h-4 w-4 text-[#7db5b0]" />
            <h3 className="text-sm font-semibold tracking-wide text-white">
              {copy.showreel.shotBreakdown}
            </h3>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-1.5 text-xs font-medium text-[#7db5b0] transition-colors hover:text-white"
          >
            <span>{locale === "vi" ? "Xem chi tiết dự án tại Work" : "Explore detailed breakdowns in Work"}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {REEL_CUES.map((cue) => (
            <button
              key={cue.time}
              type="button"
              onClick={() => seekTo(cue.seconds)}
              title={locale === "vi" ? `Nhảy đến ${cue.time}` : `Jump to ${cue.time}`}
              className="group flex flex-col justify-between rounded-xl border border-white/5 bg-black/30 p-3.5 text-left transition-all hover:border-[#7db5b0]/40 hover:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold text-[#7db5b0] transition-colors group-hover:text-teal-300">
                  {cue.time}
                </span>
                <span className="text-[10px] text-white/40 transition-colors group-hover:text-white/60">
                  {locale === "vi" ? "Nhấp để phát" : "Click to seek"}
                </span>
              </div>
              <div className="mt-2.5 min-w-0">
                <p className="text-sm font-medium text-white truncate group-hover:text-[#a7d2ce]">
                  {cue.title}
                </p>
                <p className="mt-0.5 text-xs text-white/50 truncate">
                  {cue.client}
                </p>
                <p className="mt-1 text-[11px] text-[#7db5b0]/70 truncate">
                  {cue.engine}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
