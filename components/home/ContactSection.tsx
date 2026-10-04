"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedSite } from "@/lib/portfolio-content";

export default function ContactSection() {
  const { locale } = useLanguage();
  const site = getLocalizedSite(locale);
  const isVi = locale === "vi";

  return (
    <section id="contact" className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary">
            {isVi ? "LIÊN HỆ TRỰC TIẾP" : "DIRECT INQUIRIES"}
          </span>
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl font-kanit">
            {isVi ? "Liên hệ hợp tác" : "Let's connect"}
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
