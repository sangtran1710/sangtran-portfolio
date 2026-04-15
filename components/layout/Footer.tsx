"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SOCIALS } from "@/data/portfolio";
import { getLocalizedAbout, getLocalizedSite } from "@/lib/portfolio-content";

const BehanceIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.202.836 1.989 2.134 1.989.93 0 1.524-.406 1.720-1H23.726zm-7.714-3.99h4.229c-.108-1.14-.71-1.99-2.013-1.99-1.28 0-1.994.717-2.216 1.99zM3 15.997h4.5c1.396 0 2.2-.628 2.2-1.706 0-1.14-.748-1.694-2.2-1.694H3v3.4zm0-5.997h4.1c1.244 0 2.05-.508 2.05-1.66C9.15 7.138 8.39 6.6 7.1 6.6H3V10z" />
  </svg>
);

export default function Footer() {
  const { locale, copy } = useLanguage();
  const year = new Date().getFullYear();
  const about = getLocalizedAbout(locale);
  const site = getLocalizedSite(locale);
  const footerLinks = [
    { href: "/", label: copy.nav.home },
    { href: "/showreel", label: "Showreel" },
    { href: "/portfolio", label: copy.nav.portfolio },
    { href: "/blog", label: copy.nav.blog },
    { href: "/about", label: copy.nav.about },
    { href: "/#contact", label: copy.home.contactTitle },
  ];
  const socialLinks = [
    { href: SOCIALS.linkedin, label: "LinkedIn", Icon: Linkedin, className: "hover:text-[#0A66C2]" },
    { href: SOCIALS.github, label: "GitHub", Icon: Github },
    { href: SOCIALS.behance, label: "Behance", Icon: BehanceIcon },
    { href: `mailto:${site.email}`, label: "Email", Icon: Mail },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-[#10161d]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#10161d_0%,#0e141b_100%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-12 pt-24 sm:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <p className="mb-3 text-sm font-medium tracking-[0.12em] text-slate-400 sm:text-base">
            {about.location}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="group flex flex-col items-center gap-2 text-slate-300 transition-colors hover:text-white"
          >
            <span className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-white sm:text-[2rem]">
              {site.email}
              <svg
                className="h-5 w-5 -ml-5 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
            <span className="h-px w-0 bg-white/60 transition-all duration-500 group-hover:w-full"></span>
          </a>
        </div>

        <div className="flex flex-col gap-8 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
            <span className="flex items-center gap-1.5 text-sm font-medium tracking-wide text-slate-400">
              <MapPin className="h-4 w-4" />
              {about.location}
            </span>
            <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-slate-500 sm:justify-start">
              {footerLinks.map(({ href, label }) => (
                <Link key={label} href={href} className="transition-colors hover:text-white">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

        <div className="flex items-center justify-center gap-3">
            {socialLinks.map(({ href, label, Icon, className = "" }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:border-white/18 hover:bg-white/10 hover:text-white ${className}`}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 border-t border-white/5 pt-8 text-center text-xs font-medium text-slate-500">
          &copy; {year} Sang Tran. {copy.common.builtWith}
        </p>
      </div>
    </footer>
  );
}
