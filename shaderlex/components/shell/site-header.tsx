"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, BookOpenText } from "lucide-react";

import { NAV_ITEMS, SITE_NAME } from "@/data/topics";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-teal-400/25 bg-teal-400/10 text-teal-200">
            <BookOpenText className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-[0.08em] text-white">{SITE_NAME}</p>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Learn. Recall. Iterate.</p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 transition ${
                  isActive ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/practice/shaders"
            className="ml-2 inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-teal-300/12 px-4 py-2 font-medium text-teal-100 transition hover:border-teal-200/40 hover:bg-teal-300/18 hover:text-white"
          >
            Open Practice
            <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
