"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedSite } from "@/lib/portfolio-content";
import { SOCIALS } from "@/data/portfolio";

export default function ContactSection() {
  const { locale } = useLanguage();
  const site = getLocalizedSite(locale);

  return (
    <section id="contact" className="border-t border-white/10 bg-[#070a0f]">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">Get in touch</h2>
        <a
          href={`mailto:${site.email}`}
          className="mt-8 block w-fit border-b border-white/40 pb-2 text-2xl font-medium tracking-tight text-white transition-colors hover:border-white hover:text-[#a7d2ce] sm:text-4xl"
        >
          {site.email}
        </a>
        <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-white/65">
          <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">LinkedIn</a>
          <a href={SOCIALS.resume} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Resume</a>
          <a href="/contact" className="transition-colors hover:text-white">Contact details</a>
        </div>
      </div>
    </section>
  );
}
