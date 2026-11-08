"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const userPaused = useRef(false);

  useEffect(() => {
    const element = videoRef.current;
    if (!element || prefersReducedMotion) return;
    let visible = false;
    const syncPlayback = () => {
      if (visible && !document.hidden && !userPaused.current) {
        void element.play().catch(() => {});
      } else {
        element.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      syncPlayback();
    }, { threshold: 0.25 });
    observer.observe(element);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      element.pause();
    };
  }, [loopVideo, prefersReducedMotion]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    userPaused.current = !videoRef.current.paused;
    if (videoRef.current.paused) {
      void videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Case 1: Silent auto-looping micro-video (true GIF behavior, zero UI clutter)
  if (loopVideo && !prefersReducedMotion) {
    return (
      <button
        type="button"
        onClick={togglePlay}
        className="group relative block aspect-video w-full cursor-pointer overflow-hidden bg-black select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label={`${isPlaying ? "Pause" : "Play"} ${title} preview`}
        aria-pressed={isPlaying}
      >
        <video
          ref={videoRef}
          src={loopVideo}
          poster={image}
          loop
          muted
          playsInline
          preload="none"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="h-full w-full object-contain"
        />

        {/* Minimalist center play icon only shown when user manually pauses */}
        {!isPlaying && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none transition-opacity">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/70 border border-white/20 text-white backdrop-blur-sm">
              <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
            </span>
          </span>
        )}
      </button>
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
          sizes="(max-width: 1024px) 100vw, 1200px"
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
        sizes="(max-width: 1024px) 100vw, 1200px"
      />
    </div>
  );
}
