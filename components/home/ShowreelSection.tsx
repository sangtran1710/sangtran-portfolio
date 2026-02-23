"use client";

import { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO } from "@/data/portfolio";

export default function ShowreelSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const thumbRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [started, setStarted] = useState(false);
  const [thumbReady, setThumbReady] = useState(false);

  // Load a single frame from the video as a thumbnail preview
  useEffect(() => {
    const thumb = thumbRef.current;
    if (!thumb) return;
    const onLoaded = () => {
      thumb.currentTime = 2;
    };
    const onSeeked = () => setThumbReady(true);
    const onError = () => setThumbReady(false);
    thumb.addEventListener("loadeddata", onLoaded);
    thumb.addEventListener("seeked", onSeeked);
    thumb.addEventListener("error", onError);
    return () => {
      thumb.removeEventListener("loadeddata", onLoaded);
      thumb.removeEventListener("seeked", onSeeked);
      thumb.removeEventListener("error", onError);
    };
  }, []);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => setHasError(true));
    setPlaying(true);
    setStarted(true);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section id="reel" className="mx-auto max-w-5xl px-6 py-8">
      {/* Header */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-400 mb-2">
            Showreel
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            VFX Reel 2025
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <p className="text-sm text-zinc-500">
            Real-time VFX · AAA · Cinematic
          </p>
          <a
            href={HERO.showreelYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <Youtube className="h-3.5 w-3.5" />
            YouTube
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Video player */}
      {hasError ? (
        <div className="flex flex-col items-center justify-center aspect-video rounded-2xl bg-zinc-900/50 border border-zinc-800">
          <p className="text-zinc-500 text-sm mb-4">
            Video unavailable locally
          </p>
          <Button
            asChild
            size="lg"
            className="gap-2.5 bg-red-600 hover:bg-red-500"
          >
            <a
              href={HERO.showreelYoutube}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="h-5 w-5" strokeWidth={1.5} />
              Watch on YouTube
              <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
            </a>
          </Button>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-2xl bg-zinc-950 shadow-2xl ring-1 ring-white/5 group">
          <video
            ref={videoRef}
            src={HERO.showreelUrl}
            muted
            loop
            playsInline
            preload="none"
            className="w-full aspect-video object-cover"
            onError={() => setHasError(true)}
          />

          {!started && (
            <button
              onClick={handlePlay}
              aria-label="Play showreel video"
              className="absolute inset-0 flex items-center justify-center cursor-pointer group/play"
            >
              {/* Thumbnail frame from video */}
              <video
                ref={thumbRef}
                src={HERO.showreelUrl}
                muted
                playsInline
                preload="metadata"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  thumbReady ? "opacity-70" : "opacity-0"
                }`}
                aria-hidden
              />
              {/* Fallback gradient when thumbnail not ready */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  thumbReady ? "opacity-0" : "opacity-100"
                }`}
                style={{
                  background:
                    "linear-gradient(135deg, #09090b 0%, #1a1a2e 40%, #16213e 70%, #0f3460 100%)",
                }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-zinc-950/40" />
              {/* Play button */}
              <div className="relative flex flex-col items-center gap-4 z-10">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-2xl transition-all duration-300 group-hover/play:bg-teal-500/90 group-hover/play:border-teal-400/50 group-hover/play:scale-110 group-hover/play:shadow-teal-500/25">
                  <Play className="h-8 w-8 fill-white ml-1" />
                </div>
                <span className="text-white/50 text-sm font-medium tracking-wide group-hover/play:text-white/90 transition-colors">
                  Play Showreel
                </span>
              </div>
            </button>
          )}

          {started && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <button
                  onClick={togglePlay}
                  aria-label={playing ? "Pause video" : "Play video"}
                  className="flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-2 text-white text-sm font-medium hover:bg-white/25 transition-colors"
                >
                  {playing ? (
                    <Pause className="h-4 w-4 fill-white" />
                  ) : (
                    <Play className="h-4 w-4 fill-white" />
                  )}
                  {playing ? "Pause" : "Play"}
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-3 py-2 text-white text-sm hover:bg-white/25 transition-colors"
                    aria-label={muted ? "Unmute" : "Mute"}
                  >
                    {muted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </button>
                  <a
                    href={HERO.showreelYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-3 py-2 text-white text-sm hover:bg-white/25 transition-colors"
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

      <p className="mt-3 text-xs text-zinc-600 text-center">
        {hasError
          ? "Video hosted on YouTube"
          : started
          ? "Hover for controls · Loops automatically"
          : "Click to play"}
      </p>
    </section>
  );
}
