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
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
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
  const brandName = "Sang Tran";

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.12),transparent_28%),linear-gradient(180deg,#06080f_0%,#0b1018_100%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-12 pt-28 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-teal-300/90 sm:text-sm">
            Warm, clear, crafted
          </p>

          <h2 className="mb-6 max-w-4xl text-[12vw] font-black uppercase leading-none tracking-[-0.04em] text-white sm:text-[5rem] md:text-[6.5rem]">
            Clean.<br />Bold.<br />Human.
          </h2>

          <p className="mb-12 max-w-2xl text-sm leading-7 text-slate-300/75 sm:text-base">
            Built for studios, collaborators, and recruiters who want to understand
            both the quality of the work and the person behind it.
          </p>

          <a
            href={`mailto:${SITE.email}`}
            className="group mb-16 flex flex-col items-center gap-2 text-slate-300 transition-colors hover:text-teal-200"
          >
            <span className="flex items-center gap-2 text-lg font-medium tracking-wide sm:text-xl">
              {SITE.email}
              <svg className="h-5 w-5 -ml-5 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
            <span className="h-px w-0 bg-teal-500 transition-all duration-500 group-hover:w-full"></span>
          </a>
        </div>

        <div className="flex flex-col gap-8 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
            <span className="flex items-center gap-1.5 text-sm font-medium tracking-wide text-slate-400">
              <MapPin className="h-4 w-4" />
              {ABOUT.location}
            </span>
            <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.18em] text-slate-500 sm:justify-start">
              {FOOTER_LINKS.map(({ href, label }) => (
                <Link key={label} href={href} className="transition-colors hover:text-white">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center justify-center gap-3">
            {SOCIAL_LINKS.map(({ href, label, Icon, className = "" }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:border-teal-400/40 hover:bg-teal-500/10 hover:text-white hover:shadow-[0_0_18px_rgba(20,184,166,0.24)] ${className}`}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 border-t border-white/5 pt-8 text-center text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
          © {year} {brandName}. Built with Next.js & Tailwind.
        </p>
      </div>
    </footer>
  );
}
