"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  Youtube,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import TypewriterTitle from "@/components/animations/TypewriterTitle";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedHero } from "@/lib/portfolio-content";

export default function ShowreelSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [started, setStarted] = useState(false);
  const { locale, copy } = useLanguage();
  const hero = getLocalizedHero(locale);

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

  return (
    <section id="reel" className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-teal-400">
            Showreel
          </p>
          <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-[0.1em] text-white sm:text-4xl lg:text-5xl">
            <TypewriterTitle
              prefix=""
              words={[copy.showreel.title]}
              run={true}
              reducedMotion={prefersReducedMotion}
              wordClassName="text-white"
              cursorClassName="text-teal-400"
            />
          </h2>
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
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
    </section>
  );
}
