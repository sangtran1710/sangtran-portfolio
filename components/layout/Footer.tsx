import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { SOCIALS, SITE } from "@/data/portfolio";

const BehanceIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.202.836 1.989 2.134 1.989.93 0 1.524-.406 1.720-1H23.726zm-7.714-3.99h4.229c-.108-1.14-.71-1.99-2.013-1.99-1.28 0-1.994.717-2.216 1.99zM3 15.997h4.5c1.396 0 2.2-.628 2.2-1.706 0-1.14-.748-1.694-2.2-1.694H3v3.4zm0-5.997h4.1c1.244 0 2.05-.508 2.05-1.66C9.15 7.138 8.39 6.6 7.1 6.6H3V10z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sang Tran. Built with Next.js &amp; Tailwind.
        </p>

        <div className="flex items-center gap-3">
          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={SOCIALS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={SOCIALS.behance}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Behance"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <BehanceIcon />
          </a>
          <a
            href={`mailto:${SITE.email}`}
            aria-label="Email"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
