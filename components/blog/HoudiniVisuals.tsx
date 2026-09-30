"use client";

import React from "react";
import Image from "next/image";
import { Layers } from "lucide-react";

export function VideoPlayer({
  src,
  poster,
  caption,
}: {
  src: string;
  poster?: string;
  title?: string;
  caption?: string;
}) {
  return (
    <figure className="my-8 rounded-xl overflow-hidden border border-[#364156] bg-[#232a38] shadow-2xl transition-all">
      <div className="relative aspect-video w-full bg-[#161a23]">
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
        <figcaption className="px-4 py-3 text-xs text-slate-300 bg-[#161a23] border-t border-[#364156] leading-relaxed">
          {caption}
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
    <div className="group rounded-xl border border-[#364156] bg-[#232a38] p-3 hover:border-[#4b5a75] transition-colors">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#161a23] border border-[#364156] mb-2.5">
        <Image
          src={src}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {channel && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm border border-zinc-700/60 text-[10px] font-mono text-teal-300">
            {channel}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mb-0.5">
        <h4 className="text-sm font-semibold text-zinc-200">{title}</h4>
        {type && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#161a23] border border-[#364156] text-slate-300 font-mono">
            {type}
          </span>
        )}
      </div>
      {text && <p className="text-xs text-zinc-400 leading-snug">{text}</p>}
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
    <div className="my-6 rounded-xl border border-[#364156] bg-[#161a23] p-4">
      {(title || description) && (
        <div className="mb-3">
          {title && (
            <h3 className="text-sm font-bold text-white mb-0.5 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-teal-400" />
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
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <aside className="my-6 border-l-2 border-[#5eb3ab] bg-[#232a38] px-4 py-3 text-xs text-slate-300 rounded-r-xl">
      <div className="leading-relaxed text-zinc-400">
        {children || (
          <span>
            <strong className="text-zinc-200 font-medium">Production note:</strong> Offline Houdini workflows only. No proprietary engine captures or tools are shown.
          </span>
        )}
      </div>
    </aside>
  );
}
