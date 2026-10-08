"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Layers } from "lucide-react";

export function VideoPlayer({
  src,
  previewSrc,
  poster,
  caption,
}: {
  src: string;
  previewSrc?: string;
  poster?: string;
  title?: string;
  caption?: string;
}) {
  const previewRef = useRef<HTMLVideoElement>(null);
  const [showFullVideo, setShowFullVideo] = useState(false);

  useEffect(() => {
    const video = previewRef.current;
    if (!video || !previewSrc || showFullVideo) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isVisible = false;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !motionPreference.matches) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, { threshold: 0.35 });

    const handleMotionChange = () => {
      if (motionPreference.matches) video.pause();
      else if (isVisible) {
        void video.play().catch(() => {});
      }
    };

    observer.observe(video);
    motionPreference.addEventListener("change", handleMotionChange);
    return () => {
      observer.disconnect();
      motionPreference.removeEventListener("change", handleMotionChange);
      video.pause();
    };
  }, [previewSrc, showFullVideo]);

  return (
    <figure className="my-8 rounded-xl overflow-hidden border border-border bg-card">
      <div className="relative aspect-video w-full bg-section">
        {previewSrc && !showFullVideo ? (
          <video
            ref={previewRef}
            src={previewSrc}
            poster={poster}
            muted
            loop
            playsInline
            preload="none"
            aria-label="Silent loop preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            src={src}
            poster={poster}
            controls
            autoPlay={showFullVideo}
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      {(caption || previewSrc) && (
        <figcaption className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs text-muted-foreground bg-section border-t border-border leading-relaxed">
          {caption && <span>{caption}</span>}
          {previewSrc && !showFullVideo && (
            <button
              type="button"
              onClick={() => setShowFullVideo(true)}
              className="text-primary underline underline-offset-4 hover:text-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Watch full clip
            </button>
          )}
        </figcaption>
      )}
    </figure>
  );
}

export function TextureCard({
  src,
  title,
  caption,
  description,
  channel,
  type,
}: {
  src: string;
  title: string;
  caption?: string;
  description?: string;
  channel?: string;
  type?: string;
}) {
  const text = caption || description;
  return (
    <div className="group rounded-xl border border-border bg-card p-3 hover:border-border-hover transition-colors">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-section border border-border mb-2.5">
        <Image
          src={src}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {channel && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm border border-border/60 text-[10px] font-mono text-teal-300">
            {channel}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mb-0.5">
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        {type && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-section border border-border text-muted-foreground font-mono">
            {type}
          </span>
        )}
      </div>
      {text && <p className="text-xs text-muted-foreground leading-snug">{text}</p>}
    </div>
  );
}

export function TextureGallery({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-6 rounded-xl border border-border bg-section p-4">
      {(title || description) && (
        <div className="mb-3">
          {title && (
            <h3 className="text-sm font-bold text-white mb-0.5 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              {title}
            </h3>
          )}
          {description && (
            <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {children}
      </div>
    </div>
  );
}

export function ProductionNotice({
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <aside className="my-6 border-l-2 border-primary bg-card px-4 py-3 text-xs text-muted-foreground rounded-r-xl">
      <div className="leading-relaxed text-muted-foreground">
        {children || (
          <span>
            <strong className="text-foreground font-medium">Production note:</strong> Offline Houdini workflows only. No proprietary engine captures or tools are shown.
          </span>
        )}
      </div>
    </aside>
  );
}
