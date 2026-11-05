"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SOCIALS } from "@/data/portfolio";

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

  const socialLinks = [
    { href: SOCIALS.linkedin, label: "LinkedIn" },
    { href: SOCIALS.artstation, label: "ArtStation" },
    { href: "https://www.mobygames.com/person/1553845/tran-minh-sang/", label: "MobyGames" },
  ];

  return (
    <footer className="border-t border-border bg-section">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 text-sm text-muted-foreground sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <p className="font-medium text-foreground">&copy; {year} Henry Tran</p>
          <span className="hidden text-muted-foreground/30 sm:inline">·</span>
          <p className="text-sm text-muted-foreground">
            {isVi ? "Kỹ thuật VFX & Shader chuyên sâu" : "Real-Time VFX & Technical Art"}
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground" aria-label="Footer navigation">
            {footerLinks.map(({ href, label }) => (
              <Link key={href} href={href} prefetch={true} className="transition-colors hover:text-primary">
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 border-t border-border/60 pt-4 font-mono text-xs text-muted-foreground sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            {socialLinks.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 transition-colors hover:text-primary"
              >
                <span>{label}</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
