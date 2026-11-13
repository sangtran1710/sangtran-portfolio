"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SOCIALS, SITE } from "@/data/portfolio";

const links = [
  { label: "LinkedIn", href: SOCIALS.linkedin },
  { label: "Résumé (PDF)", href: SOCIALS.resume },
  { label: "ArtStation", href: SOCIALS.artstation },
  { label: "Behance", href: SOCIALS.behance },
];

export default function ContactPageClient() {
  return (
    <div className="min-h-screen bg-background px-6 pb-20 pt-32 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 text-[13px] text-muted-foreground underline-offset-4 hover:text-white hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <h1 className="font-sans text-4xl font-normal tracking-tight text-white sm:text-7xl">Contact</h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              Email is the fastest way to reach me.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-8 inline-block max-w-full break-all font-sans text-[clamp(1.25rem,5vw,2.25rem)] font-normal tracking-tight text-white underline-offset-8 hover:text-primary hover:underline"
            >
              {SITE.email}
            </a>
          </div>

          <nav aria-label="Contact links" className="divide-y divide-border/60 border-t border-border/60 lg:mt-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-4 text-base text-muted-foreground underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
