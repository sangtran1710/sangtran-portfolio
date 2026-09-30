"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedSite } from "@/lib/portfolio-content";

export default function ContactSection() {
  const { locale } = useLanguage();
  const site = getLocalizedSite(locale);
  const isVi = locale === "vi";

  return (
    <section id="contact" className="border-t border-[#242b38] bg-[#0e1117]">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#5eb3ab]">
              {"// GET IN TOUCH"}
            </span>
          </div>
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl font-kanit">
            {isVi ? "Liên hệ hợp tác" : "Let's connect"}
          </h2>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-block border-b-2 border-slate-600 pb-2 font-mono text-xl font-medium tracking-tight text-white transition-colors hover:border-[#5eb3ab] hover:text-[#5eb3ab] sm:text-3xl"
          >
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
