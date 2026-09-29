"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AmbientAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    if (isPlaying) {
      // Fade out smoothly over ~300ms
      const startVolume = audio.volume;
      const step = startVolume / 10;
      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume > step) {
          audio.volume = Math.max(0, audio.volume - step);
        } else {
          audio.volume = 0;
          audio.pause();
          setIsPlaying(false);
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        }
      }, 30);
    } else {
      // Start at 0 and fade in to 0.32 over ~450ms
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          const targetVolume = 0.32;
          const step = targetVolume / 15;
          fadeIntervalRef.current = setInterval(() => {
            if (audio.volume < targetVolume - step) {
              audio.volume = Math.min(targetVolume, audio.volume + step);
            } else {
              audio.volume = targetVolume;
              if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
            }
          }, 30);
        })
        .catch((err) => {
          console.warn("Audio playback prevented by browser:", err);
          setIsPlaying(false);
        });
    }
  }, [isPlaying]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/ambient-loop.mp3"
        loop
        preload="none"
      />

      <div
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Expandable Info Pill on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 8, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.96 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none hidden sm:flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0c1015]/90 px-3 py-1.5 backdrop-blur-md shadow-lg"
            >
              {/* Mini Equalizer Bars */}
              <div className="flex items-end gap-[2px] h-3 w-3">
                <motion.span
                  className="w-[2px] rounded-full bg-[#5c9d98]"
                  animate={{
                    height: isPlaying ? [3, 11, 5, 12, 3] : 3,
                  }}
                  transition={{
                    repeat: isPlaying ? Infinity : 0,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                />
                <motion.span
                  className="w-[2px] rounded-full bg-[#5c9d98]"
                  animate={{
                    height: isPlaying ? [7, 3, 12, 6, 7] : 3,
                  }}
                  transition={{
                    repeat: isPlaying ? Infinity : 0,
                    duration: 0.7,
                    ease: "easeInOut",
                    delay: 0.15,
                  }}
                />
                <motion.span
                  className="w-[2px] rounded-full bg-[#5c9d98]"
                  animate={{
                    height: isPlaying ? [10, 5, 3, 9, 10] : 3,
                  }}
                  transition={{
                    repeat: isPlaying ? Infinity : 0,
                    duration: 0.9,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                />
              </div>

              <div className="flex flex-col text-[11px] leading-tight font-mono">
                <span className="text-white/90 font-medium">
                  {isPlaying ? "Mellow · Lo-Fi Chill" : "Lo-Fi Chill Beats"}
                </span>
                <span className="text-white/50 text-[10px]">
                  {isPlaying ? "Click to pause" : "Click to chill"}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Micro Vinyl Record Button */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause ambient sound" : "Play ambient sound"}
          className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#0b0e13]/90 p-0 backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.5)] transition-all duration-200 hover:scale-105 hover:border-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5c9d98]"
        >
          {/* Vinyl Disc SVG */}
          <motion.div
            className="relative h-8 w-8 rounded-full"
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              repeat: isPlaying ? Infinity : 0,
              duration: 3.5,
              ease: "linear",
            }}
          >
            <svg
              viewBox="0 0 40 40"
              className="h-full w-full drop-shadow-sm"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Vinyl Body */}
              <circle cx="20" cy="20" r="19" fill="#12161c" stroke="#252c38" strokeWidth="1" />
              
              {/* Concentric Grooves */}
              <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
              <circle cx="20" cy="20" r="13" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
              <circle cx="20" cy="20" r="10" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />

              {/* Center Record Label */}
              <circle cx="20" cy="20" r="6.5" fill="#5c9d98" />
              <circle cx="20" cy="20" r="4.5" fill="#467b77" />

              {/* Center Spindle Hole */}
              <circle cx="20" cy="20" r="1.8" fill="#0b0e13" />
            </svg>
          </motion.div>

          {/* Indicator Dot when playing */}
          {isPlaying && (
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5c9d98] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#5c9d98]" />
            </span>
          )}
        </button>
      </div>
    </>
  );
}
