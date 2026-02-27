import Link from "next/link";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { SOCIALS, SITE, ABOUT } from "@/data/portfolio";

const BehanceIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.202.836 1.989 2.134 1.989.93 0 1.524-.406 1.720-1H23.726zm-7.714-3.99h4.229c-.108-1.14-.71-1.99-2.013-1.99-1.28 0-1.994.717-2.216 1.99zM3 15.997h4.5c1.396 0 2.2-.628 2.2-1.706 0-1.14-.748-1.694-2.2-1.694H3v3.4zm0-5.997h4.1c1.244 0 2.05-.508 2.05-1.66C9.15 7.138 8.39 6.6 7.1 6.6H3V10z" />
  </svg>
);

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/showreel", label: "Showreel" },
  { href: "/rnd", label: "Case Studies" },
  { href: "/share", label: "Share" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Portfolio" },
  { href: "/#contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  { href: SOCIALS.linkedin, label: "LinkedIn", Icon: Linkedin, className: "hover:text-[#0A66C2]" },
  { href: SOCIALS.github, label: "GitHub", Icon: Github },
  { href: SOCIALS.behance, label: "Behance", Icon: BehanceIcon },
  { href: `mailto:${SITE.email}`, label: "Email", Icon: Mail },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 border-t border-white/5 overflow-hidden">
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-slate-950 pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-6 sm:px-8 pt-32 pb-12 z-10">
        <div className="flex flex-col items-center text-center">
          <p className="text-teal-500 font-semibold tracking-[0.2em] text-xs sm:text-sm uppercase mb-6">
            Let's create something together
          </p>

          <h2 className="text-[10vw] sm:text-[6rem] md:text-[8rem] font-black uppercase tracking-tight leading-none text-slate-100 hover:text-white hover:scale-105 transition-all duration-700 cursor-default select-none mb-12 drop-shadow-2xl">
            OPEN FOR<br />ROLES.
          </h2>

          <a
            href={`mailto:${SITE.email}`}
            className="group flex flex-col items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors mb-20"
          >
            <span className="flex items-center gap-2 text-lg sm:text-xl font-medium tracking-wide">
              {SITE.email}
              <svg className="h-5 w-5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
            <span className="h-px w-0 bg-teal-500 group-hover:w-full transition-all duration-500"></span>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-white/10">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-sm font-medium tracking-wide text-slate-400">
              <MapPin className="h-4 w-4" />
              {ABOUT.location}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ href, label, Icon, className = "" }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className={`flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-teal-500/50 hover:bg-teal-500/10 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)] transition-all duration-300 ${className}`}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <p className="text-center text-xs font-medium tracking-wider text-slate-500 pt-8 mt-8 border-t border-white/5 uppercase">
          © {year} {SITE.title.split("—")[0].trim()}. Built with Next.js & Tailwind.
        </p>
      </div>
    </footer>
  );
}
