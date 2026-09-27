"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedSite } from "@/lib/portfolio-content";

export default function ContactSection() {
  const { locale } = useLanguage();
  const site = getLocalizedSite(locale);
  const isVi = locale === "vi";

  return (
    <section id="contact" className="border-t border-white/10 bg-[#070a0f]">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div>
            <h2 className="text-3xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
              {isVi ? "Liên hệ" : "Get in touch"}
            </h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-block border-b-2 border-white/30 pb-2 font-mono text-xl font-medium tracking-tight text-white transition-all hover:border-[#7db5b0] hover:text-[#a7d2ce] sm:text-3xl"
            >
              {site.email}
            </a>
        </div>
      </div>
    </section>
  );
}
