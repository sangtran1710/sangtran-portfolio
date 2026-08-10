"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SOCIALS, SITE } from "@/data/portfolio";

const links = [
  { label: "LinkedIn", href: SOCIALS.linkedin },
  { label: "Resume", href: SOCIALS.resume },
  { label: "ArtStation", href: SOCIALS.artstation },
  { label: "Behance", href: SOCIALS.behance },
];

export default function ContactPageClient() {
  return (
    <div className="min-h-screen bg-[#070a0f] px-6 pb-20 pt-28 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>

        <div className="mt-20 border-b border-white/10 pb-14">
          <h1 className="text-5xl font-medium tracking-tight sm:text-7xl">Contact</h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-white/65">
            Email is the fastest way to reach me.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-10 inline-flex items-center gap-3 border-b border-white/50 pb-2 text-xl font-medium tracking-tight transition-colors hover:border-white hover:text-[#a7d2ce] sm:text-3xl"
          >
            {SITE.email}
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>

        <nav aria-label="Contact links" className="divide-y divide-white/10">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-5 text-lg text-white/70 transition-colors hover:text-white"
            >
              {link.label}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
