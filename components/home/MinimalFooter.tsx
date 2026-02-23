import Link from "next/link";
import { MapPin, Mail, Github, Linkedin } from "lucide-react";
import { SITE, ABOUT, SOCIALS } from "@/data/portfolio";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/showreel", label: "Showreel" },
  { href: "/rnd", label: "RND" },
  { href: "/blog", label: "Blog" },
  { href: "/share", label: "Share" },
  { href: "/projects", label: "Portfolio" },
  { href: "/#contact", label: "Contact" },
];

export default function MinimalFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-muted/30">
      {/* Top: location + email with clearer icons */}
      <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm text-muted-foreground">
        <a
          href={`mailto:${SITE.email}`}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 hover:bg-muted/50 hover:text-foreground transition-colors"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Mail className="h-4 w-4" />
          </span>
          {SITE.email}
        </a>
        <span className="flex items-center gap-2.5 rounded-lg px-3 py-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MapPin className="h-4 w-4" />
          </span>
          {ABOUT.location}
        </span>
      </div>

      {/* About (one line) */}
      <div className="mx-auto max-w-2xl px-6 pb-6 text-center text-sm text-muted-foreground">
        {ABOUT.bio[0]}
      </div>

      {/* Nav + socials */}
      <div className="mx-auto max-w-5xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/40">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm">
          {FOOTER_LINKS.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={SOCIALS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-4 text-center text-xs text-muted-foreground border-t border-border/40">
        © {year} {SITE.title.split("—")[0].trim()}
      </div>
    </footer>
  );
}
