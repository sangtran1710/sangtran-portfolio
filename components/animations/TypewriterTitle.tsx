"use client";

import { useState, useEffect, useRef } from "react";

const WORDS = ["Backstory", "Road"];
const TYPE_MS = 50;
const PAUSE_AFTER_TYPE_MS = 1500;
const ERASE_MS = 35;
const PAUSE_AFTER_ERASE_MS = 200;

export default function TypewriterTitle({
  prefix = "My ",
  words = WORDS,
  className = "",
  prefixClassName = "",
  wordClassName = "text-teal-400",
  cursorClassName = "text-teal-400",
  reducedMotion = false,
  run = true,
  oneShot = false,
}: {
  prefix?: string;
  words?: string[];
  className?: string;
  prefixClassName?: string;
  wordClassName?: string;
  cursorClassName?: string;
  reducedMotion?: boolean | null;
  run?: boolean;
  /** Gõ xong một từ rồi dừng, không xóa không đổi từ */
  oneShot?: boolean;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "erasing" | "pauseErase" | "done">("typing");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const word = words[wordIndex] ?? words[0];
  const displayText =
    phase === "done" ? word : (phase === "erasing" || phase === "pauseErase" ? word.slice(0, charIndex) : word.slice(0, charIndex));
  const showCursor = phase === "typing" || phase === "erasing" || phase === "pauseErase";

  useEffect(() => {
    if (reducedMotion || !run) return;

    const clear = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    if (phase === "typing") {
      if (charIndex < word.length) {
        timeoutRef.current = setTimeout(() => setCharIndex((c) => c + 1), TYPE_MS);
      } else {
        if (oneShot) {
          setPhase("done");
        } else {
          timeoutRef.current = setTimeout(() => setPhase("pause"), TYPE_MS);
        }
      }
      return clear;
    }

    if (phase === "pause") {
      timeoutRef.current = setTimeout(() => setPhase("erasing"), PAUSE_AFTER_TYPE_MS);
      return clear;
    }

    if (phase === "erasing") {
      if (charIndex > 0) {
        timeoutRef.current = setTimeout(() => setCharIndex((c) => c - 1), ERASE_MS);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("pauseErase");
      }
      return clear;
    }

    if (phase === "pauseErase") {
      timeoutRef.current = setTimeout(() => {
        setPhase("typing");
        setCharIndex(0);
      }, PAUSE_AFTER_ERASE_MS);
      return clear;
    }
  }, [phase, charIndex, word.length, reducedMotion, words.length, run, oneShot]);

  if (reducedMotion || !run) {
    return (
      <span className={className}>
        <span className={prefixClassName}>{prefix}</span>
        <span className={wordClassName}>{words[0]}</span>
      </span>
    );
  }

  return (
    <span className={className}>
      <span className={prefixClassName}>{prefix}</span>
      <span className={wordClassName}>{displayText}</span>
      {showCursor && (
        <span className={`inline-block w-0.5 h-[0.9em] align-middle bg-current ml-0.5 animate-pulse ${cursorClassName}`} aria-hidden />
      )}
    </span>
  );
}
