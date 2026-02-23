"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  wrapperClassName?: string;
  offset?: [string, string];
}

function WordReveal({
  word,
  progress,
  range,
  opacityRange,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  opacityRange: [number, number];
}) {
  const opacity = useTransform(progress, range, opacityRange);
  const y = useTransform(progress, range, [8, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block mr-[0.25em] will-change-transform"
    >
      {word}
    </motion.span>
  );
}

function parseBoldSegments(text: string): { text: string; bold: boolean }[] {
  const segments: { text: string; bold: boolean }[] = [];
  const regex = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), bold: false });
    }
    segments.push({ text: match[1], bold: true });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), bold: false });
  }
  return segments;
}

export default function TextReveal({
  text,
  as: Tag = "p",
  className,
  wrapperClassName,
  offset = ["start 0.9", "start 0.4"],
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset as any,
  });

  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className={`${wrapperClassName ?? ""} relative`}>
        <Tag className={className}>{text.replace(/\*\*/g, "")}</Tag>
      </div>
    );
  }

  const segments = parseBoldSegments(text);
  const allWords: { word: string; bold: boolean }[] = [];
  segments.forEach((seg) => {
    seg.text.split(/\s+/).filter(Boolean).forEach((word) => {
      allWords.push({ word, bold: seg.bold });
    });
  });

  const totalWords = allWords.length;

  return (
    <div ref={containerRef} className={`${wrapperClassName ?? ""} relative`}>
      <Tag className={className}>
        {allWords.map((item, i) => {
          const start = i / totalWords;
          const end = Math.min(start + 1.5 / totalWords, 1);
          const wordEl = (
            <WordReveal
              key={i}
              word={item.word}
              progress={scrollYProgress}
              range={[start, end]}
              opacityRange={[0.15, 1]}
            />
          );

          if (item.bold) {
            return (
              <strong key={i} className="inline">
                {wordEl}
              </strong>
            );
          }
          return wordEl;
        })}
      </Tag>
    </div>
  );
}
