"use client";

import React from "react";
import Image from "next/image";
import { ShieldAlert, Layers, Film } from "lucide-react";

export function VideoPlayer({
  src,
  poster,
  title,
  caption,
}: {
  src: string;
  poster?: string;
  title?: string;
  caption?: string;
}) {
  return (
    <figure className="my-8 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/60 shadow-2xl transition-all">
      {title && (
        <div className="px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-900/90 flex items-center justify-between text-xs text-zinc-300 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="font-medium text-zinc-200">{title}</span>
          </div>
          <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-sans flex items-center gap-1">
            <Film className="w-3 h-3 text-zinc-500" />
            Houdini Capture
          </span>
        </div>
      )}
      <div className="relative aspect-video w-full bg-black">
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
      </div>
      {caption && (
        <figcaption className="px-4 py-3 text-xs text-zinc-400 bg-zinc-900/40 border-t border-zinc-800/60 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function TextureCard({
  src,
  title,
  channel,
  type,
  description,
}: {
  src: string;
  title: string;
  channel: string;
  type: string;
  description: string;
}) {
  return (
    <div className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 hover:border-teal-500/40 transition-colors">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-950 border border-zinc-800/60 mb-3">
        <img
          src={src}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm border border-zinc-700/60 text-[10px] font-mono text-teal-300">
          {channel}
        </div>
      </div>
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-sm font-semibold text-zinc-200">{title}</h4>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
          {type}
        </span>
      </div>
      <p className="text-xs text-zinc-400 leading-relaxed">{description}</p>
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
    <div className="my-8 rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-5">
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-400" />
              {title}
            </h3>
          )}
          {description && (
            <p className="text-xs text-zinc-400 leading-relaxed">{description}</p>
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
  title = "Production Context & Engine Copyright Notice",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-8 rounded-xl border border-amber-500/30 bg-amber-950/20 p-5 relative overflow-hidden">
      <div className="flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-amber-200 mb-1.5">{title}</h4>
          <div className="text-xs text-zinc-300 leading-relaxed space-y-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
