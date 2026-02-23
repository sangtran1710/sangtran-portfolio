"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowUpRight, Sparkles, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IGAMING_ARTWORKS } from "@/data/portfolio";

export default function IgamingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hasArtwork = IGAMING_ARTWORKS.length > 0;

  return (
    <section
      ref={sectionRef}
      id="igaming"
      className="relative w-full overflow-hidden"
    >
      {/* Background — charcoal + gold/amber accent (iGaming broadcast feel) */}
      <div className="absolute inset-0 bg-[#0c0a09]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(217,119,6,0.15) 0%, transparent 55%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(251,191,36,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251,191,36,0.3) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0c0a09]/80" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-8 pb-20">
        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
              <Sparkles className="h-3.5 w-3.5" />
              iGaming · ARRISE
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-500/70">
              Live Casino & Broadcast
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Live Casino & Broadcast VFX
          </h1>
          <p className="text-amber-100/70 max-w-2xl text-sm sm:text-base leading-relaxed">
            Overlay packages, win callouts, and real-time motion graphics — designed for readability, loop quality, and broadcast polish.
          </p>
        </header>

        {/* Grid — artwork cards or coming soon */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hasArtwork ? (
            IGAMING_ARTWORKS.map((item, i) => (
              <ArtworkCard key={item.title} item={item} index={i} inView={inView} />
            ))
          ) : (
            <>
              {/* Placeholder cards — design sẵn, chờ artwork */}
              {[1, 2, 3].map((n, i) => (
                <div
                  key={n}
                  className={`flex flex-col rounded-xl border border-amber-500/20 bg-amber-950/20 overflow-hidden transition-all duration-500 ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: inView ? `${i * 0.08}s` : "0s" }}
                >
                  <div className="aspect-video flex items-center justify-center bg-amber-950/40 border-b border-amber-500/10">
                    <Video className="h-12 w-12 text-amber-500/30" strokeWidth={1} />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <p className="text-xs font-medium uppercase tracking-wider text-amber-400/80">
                      Sample {n}
                    </p>
                    <p className="text-sm text-amber-100/50 mt-1">
                      Artwork coming soon
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {hasArtwork && (
          <p className="text-center text-xs text-amber-200/50 mt-8">
            Real-time VFX & motion graphics · Unreal Engine, After Effects
          </p>
        )}

        {!hasArtwork && (
          <div
            className={`mt-12 text-center max-w-md mx-auto rounded-xl border border-amber-500/25 bg-amber-950/20 px-6 py-8 transition-all duration-500 ${
              inView ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: inView ? "0.25s" : "0s" }}
          >
            <p className="text-amber-200/90 text-sm font-medium">
              iGaming & ARRISE-style samples in the pipeline
            </p>
            <p className="text-amber-200/50 text-xs mt-2">
              Mega Wheel overlay, broadcast overlays, and win callouts will be added here.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 mt-4 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
            >
              View all work
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function ArtworkCard({
  item,
  index,
  inView,
}: {
  item: (typeof IGAMING_ARTWORKS)[number];
  index: number;
  inView: boolean;
}) {
  const href = item.link ?? "#";
  const isExternal = href.startsWith("http");

  const content = (
    <>
      <div className="relative aspect-video overflow-hidden bg-amber-950/40 group-hover:border-amber-400/40">
        {item.videoUrl ? (
          <video
            src={item.videoUrl}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/95 text-[#0c0a09] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col border-t border-amber-500/10">
        <h3 className="font-semibold text-sm text-white group-hover:text-amber-200 transition-colors line-clamp-1">
          {item.title}
        </h3>
        <p className="text-xs text-amber-200/60 mt-0.5">{item.category}</p>
        {item.tools && item.tools.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {item.tools.map((tool) => (
              <span
                key={tool}
                className="text-[10px] text-amber-200/50 border border-amber-500/30 rounded px-2 py-0.5 bg-amber-950/30"
              >
                {tool}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );

  const cardClass = `group block flex flex-col rounded-xl border border-amber-500/20 bg-amber-950/20 overflow-hidden transition-all duration-500 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-500/10 ${
    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`;

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
        style={{ transitionDelay: inView ? `${index * 0.08}s` : "0s" }}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className={cardClass}
      style={{ transitionDelay: inView ? `${index * 0.08}s` : "0s" }}
    >
      {content}
    </div>
  );
}
