"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Footer() {
  const { copy, locale } = useLanguage();
  const year = new Date().getFullYear();
  const isVi = locale === "vi";

  const footerLinks = [
    { href: "/portfolio", label: copy.nav.portfolio },
    { href: "/showreel", label: "Showreel" },
    { href: "/articles", label: copy.nav.blog },
    { href: "/about", label: copy.nav.about },
    { href: "/contact", label: copy.home.contactTitle },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#070a0f]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 text-sm text-white/45 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <p className="font-medium text-white/70">
            &copy; {year} Henry Tran.
          </p>
          <span className="hidden sm:inline text-white/20">/</span>
          <p className="text-xs font-mono text-white/40">
            {isVi ? "Kỹ thuật VFX & Shader chuyên sâu" : "Real-Time VFX & Technical Art"}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono uppercase tracking-wider text-white/55" aria-label="Footer navigation">
          {footerLinks.map(({ href, label }) => (
            <Link key={href} href={href} prefetch={true} className="transition-colors hover:text-[#7db5b0]">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
