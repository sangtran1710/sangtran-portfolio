"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import manifest from "@/lib/thumbnail-manifest.json";

interface ThumbnailProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

type Preview = { variants: Record<string, string>; blur: string };

export default function ProjectThumbnail({ src, alt, sizes, priority, className }: ThumbnailProps) {
  const [loadedSource, setLoadedSource] = useState<string | null>(null);
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const reveal = useCallback((element: HTMLImageElement | null) => {
    if (!element?.complete || !element.naturalWidth) return;
    void element.decode().catch(() => {}).then(() => setLoadedSource(src));
  }, [src]);
  const preview = (manifest as Record<string, Preview>)[src];
  if (!preview || failedSource === src) {
    return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={className} />;
  }
  return (
    <>
      <span data-thumbnail-preview aria-hidden="true" className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${preview.blur}")` }} />
      {/* Static variants avoid a cold image-optimization request on first navigation. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={reveal}
        src={preview.variants[960] ?? Object.values(preview.variants).at(-1)}
        srcSet={Object.entries(preview.variants).map(([width, url]) => `${url} ${width}w`).join(", ")}
        sizes={sizes}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={(event) => reveal(event.currentTarget)}
        onError={() => setFailedSource(src)}
        className={`absolute inset-0 h-full w-full ${className ?? ""}`}
        style={{ opacity: loadedSource === src ? undefined : 0, transition: "opacity 180ms ease-out, transform 400ms ease-out" }}
      />
    </>
  );
}
