"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Play, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO, SOCIALS } from "@/data/portfolio";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hasVideo, setHasVideo] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => setVideoLoaded(true);
    const onError = () => setHasVideo(false);

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-zinc-950">
      {/* Video background */}
      {hasVideo && (
        <video
          ref={videoRef}
          src={HERO.showreelUrl}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoLoaded ? "opacity-40" : "opacity-0"
          }`}
        />
      )}

      {/* Fallback gradient when no video */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          hasVideo && videoLoaded ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(20,184,166,0.15) 0%, transparent 70%), linear-gradient(135deg, #09090b 0%, #18181b 100%)",
        }}
      />

      {/* Overlay gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/20 to-zinc-950/80" />

      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-5xl px-6 py-24">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs text-teal-400 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
            Available for new opportunities
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-4">
            {HERO.name}
          </h1>
          <p className="text-xl sm:text-2xl font-medium text-teal-400 mb-6">
            {HERO.tagline}
          </p>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-lg mb-10">
            {HERO.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="gap-2">
              <Link href="/projects">
                View Work
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent"
            >
              <a
                href={HERO.showreelYoutube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Play className="h-4 w-4 fill-current" />
                Watch Reel
              </a>
            </Button>

            <Button
              asChild
              variant="ghost"
              size="lg"
              className="gap-2 text-zinc-400 hover:text-white hover:bg-white/5"
            >
              <a
                href={SOCIALS.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 flex flex-wrap gap-8 border-t border-white/10 pt-8">
          {[
            { value: "7+", label: "Years Experience" },
            { value: "AAA", label: "Project Tier" },
            { value: "UE5", label: "Primary Engine" },
            { value: "Remote", label: "Work Mode" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-zinc-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
