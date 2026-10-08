"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedSite } from "@/lib/portfolio-content";

export default function ContactSection() {
  const { locale } = useLanguage();
  const site = getLocalizedSite(locale);

  return (
    <section id="contact" className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div>
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl font-kanit">
            Email
          </h2>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-block border-b-2 border-slate-600 pb-2 font-mono text-xl font-medium tracking-tight text-white transition-colors hover:border-primary hover:text-primary sm:text-3xl"
          >
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
