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
    <footer className="border-t border-border/60 bg-background/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-xs text-muted-foreground sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <p className="font-mono text-muted-foreground">
          <span className="font-medium text-foreground">&copy; {year} Henry Tran</span>
          <span className="mx-2 text-muted-foreground/30">·</span>
          <span>{isVi ? "Kỹ thuật VFX & Shader chuyên sâu" : "Real-Time VFX & Technical Art"}</span>
        </p>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-muted-foreground" aria-label="Footer navigation">
          {footerLinks.map(({ href, label }) => (
            <Link key={href} href={href} prefetch={true} className="transition-colors hover:text-primary">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
