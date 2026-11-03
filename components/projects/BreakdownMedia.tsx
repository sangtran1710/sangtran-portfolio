"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, Pause, ArrowUpRight, RotateCcw } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BreakdownMediaProps {
  image: string;
  loopVideo?: string;
  video?: string;
  title: string;
  link?: string;
}

export default function BreakdownMedia({
  image,
  loopVideo,
  video,
  title,
  link,
}: BreakdownMediaProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Auto-play when scrolled into view, auto-pause when scrolled out of view
  useEffect(() => {
    if (!loopVideo || prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;
        if (entry.isIntersecting && !userPaused) {
          void videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [loopVideo, userPaused, prefersReducedMotion]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setUserPaused(true);
    } else {
      void videoRef.current.play().then(() => {
        setIsPlaying(true);
        setUserPaused(false);
      });
    }
  };

  // Case 1: Auto-looping Silent Micro-Video (ArtStation / 80-Level style)
  if (loopVideo && !prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        onClick={togglePlay}
        className="group relative aspect-video w-full cursor-pointer overflow-hidden bg-black"
        role="region"
        aria-label={`${title} looping VFX preview. Click to pause or play.`}
      >
        {/* Poster Image while buffering */}
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 896px"
          className={cn(
            "object-contain transition-opacity duration-500",
            isLoaded ? "opacity-0" : "opacity-100"
          )}
        />

        {/* Looping Silent Video */}
        <video
          ref={videoRef}
          src={loopVideo}
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => setIsLoaded(true)}
          className={cn(
            "h-full w-full object-contain transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Top-Right HUD Badge: Auto-Loop Indicator + Pause Button */}
        <div className="absolute right-3 top-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-white backdrop-blur-md transition-colors group-hover:border-primary/60">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                isPlaying ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              )}
            />
            {isPlaying ? "Looping" : "Paused"}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            aria-label={isPlaying ? "Pause loop" : "Play loop"}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
          >
            {isPlaying ? (
              <Pause className="h-3 w-3 fill-current" />
            ) : (
              <Play className="ml-0.5 h-3 w-3 fill-current text-primary" />
            )}
          </button>
        </div>

        {/* Bottom subtle bar: Full video link if available */}
        {link && (
          <div className="absolute bottom-3 right-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-black/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md hover:bg-white/10 transition-colors"
            >
              <span>Watch full source</span>
              <ArrowUpRight className="h-3 w-3 text-primary" />
            </a>
          </div>
        )}
      </div>
    );
  }

  // Case 2: Standard Audio Video Player (if provided without loopVideo)
  if (video) {
    return (
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <video
          src={video}
          controls
          playsInline
          preload="none"
          poster={image}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  // Case 3: Link with Play Overlay (External Video)
  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-video w-full cursor-pointer overflow-hidden bg-section"
        aria-label={`Watch ${title}`}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-[1.01]"
          sizes="(max-width: 1024px) 100vw, 896px"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-lg backdrop-blur-sm">
            <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
          </div>
        </div>
      </a>
    );
  }

  // Case 4: Pure Static Image
  return (
    <div className="relative aspect-video w-full bg-section">
      <Image
        src={image}
        alt={title}
        fill
        className="object-contain"
        sizes="(max-width: 1024px) 100vw, 896px"
      />
    </div>
  );
}
