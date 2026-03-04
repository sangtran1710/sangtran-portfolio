"use client";

import Image from "next/image";
import { ACHIEVEMENT_CREDITS } from "@/data/portfolio";
import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function FeaturedCreditsSection() {
  if (!ACHIEVEMENT_CREDITS.length) return null;

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-14 sm:py-16">
        <div className="mb-8">
          <TextReveal
            text="Featured Credits"
            as="h2"
            className="text-2xl sm:text-3xl font-semibold text-slate-900"
            offset={["start 0.9", "start 0.7"]}
          />
          <p className="text-sm text-slate-500 mt-2">
            Projects where I&apos;m credited as a VFX artist.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {ACHIEVEMENT_CREDITS.map((item, i) => (
            <ScrollReveal
              key={i}
              variant="fadeUp"
              offset={["start 0.9", "start 0.7"]}
            >
              <div className="rounded-2xl border border-slate-200/70 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:border-teal-300/50 hover:shadow-md hover:shadow-slate-200/80">
                <div className="aspect-[3/4] relative bg-slate-50 border-b border-slate-200/70">
                  <Image
                    src={item.image}
                    alt={item.title ?? "Credit"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                {(item.title || item.subtitle) && (
                  <div className="p-4">
                    {item.title && (
                      <p className="font-medium text-sm text-slate-900">
                        {item.title}
                      </p>
                    )}
                    {item.subtitle && (
                      <p className="text-xs text-slate-600 mt-0.5">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

