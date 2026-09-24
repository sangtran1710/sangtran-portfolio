"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";

interface ProjectVideoProps {
  embedUrl: string;
  watchUrl: string;
  poster: string;
  title: string;
  videoTitle?: string;
}

export default function ProjectVideo({
  embedUrl,
  watchUrl,
  poster,
  title,
  videoTitle,
}: ProjectVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerUrl = `${embedUrl}${embedUrl.includes("?") ? "&" : "?"}autoplay=1`;

  return (
    <div>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-950">
        {isPlaying ? (
          <iframe
            src={playerUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="group absolute inset-0 block h-full w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={`Play ${title}`}
          >
            <Image
              src={poster}
              alt={`${title} video preview`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 transition-colors group-hover:from-black/70" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl transition-transform duration-200 group-hover:scale-110">
                <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
              </span>
            </span>
          </button>
        )}
      </div>
      <a
        href={watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-sm text-[#a7d2ce] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a7d2ce]"
      >
        Watch on YouTube if the video does not play here ↗
      </a>
    </div>
  );
}
