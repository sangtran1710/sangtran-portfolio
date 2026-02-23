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
  { href: "/rnd", label: "RND" },
  { href: "/igaming", label: "iGaming" },
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
    <footer className="border-t border-zinc-200 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-5xl px-6 sm:px-8 py-10">
        {/* One row: email + location */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-zinc-600 dark:text-zinc-400 mb-8">
          <a
            href={`mailto:${SITE.email}`}
            className="flex items-center gap-2 rounded-lg py-1.5 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            <Mail className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            {SITE.email}
          </a>
          <span className="hidden sm:inline text-zinc-300 dark:text-zinc-600">·</span>
          <span className="flex items-center gap-2 py-1.5">
            <MapPin className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            {ABOUT.location}
          </span>
        </div>

        {/* Nav + socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm">
            {FOOTER_LINKS.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ href, label, Icon, className = "" }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/80 dark:hover:bg-zinc-700/80 transition-colors ${className}`}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-zinc-500 dark:text-zinc-500 pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800">
          © {year} {SITE.title.split("—")[0].trim()}. Built with Next.js & Tailwind.
        </p>
      </div>
    </footer>
  );
}
