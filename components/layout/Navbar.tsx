"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SOCIALS, SITE } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/showreel", label: "Reel" },
  { href: "/rnd", label: "Lab" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isLanding = pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full border-b transition-colors",
        isLanding
          ? "border-white/10 bg-black/30 backdrop-blur-md supports-[backdrop-filter]:bg-black/20"
          : "border-zinc-200 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90"
      )}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className={cn(
            "text-sm font-semibold tracking-tight transition-colors",
            isLanding ? "text-white hover:text-teal-400" : "text-zinc-900 hover:text-teal-600"
          )}
        >
          {SITE.title.split("—")[0].trim()}
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className={cn(
                "px-3 py-2 text-sm rounded-md transition-colors",
                pathname === href
                  ? isLanding
                    ? "text-teal-400 font-medium"
                    : "text-teal-600 font-medium"
                  : isLanding
                    ? "text-white/80 hover:text-white hover:bg-white/5"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
              )}
            >
              {label}
            </Link>
          ))}
          <a
            href={SOCIALS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "px-3 py-2 text-sm transition-colors",
              isLanding ? "text-white/80 hover:text-white" : "text-zinc-600 hover:text-zinc-900"
            )}
          >
            Resume
          </a>
          <Button asChild size="sm" className="ml-3 bg-teal-600 hover:bg-teal-500 text-white border-0">
            <Link href="/projects">Work</Link>
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className={isLanding ? "text-white" : "text-zinc-900"}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 bg-zinc-900 border-zinc-800">
            <div className="flex flex-col gap-1 pt-8">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded-md"
                >
                  {label}
                </Link>
              ))}
              <a
                href={SOCIALS.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm text-zinc-300 hover:text-white"
              >
                Resume
              </a>
              <Button asChild size="sm" className="mt-4 mx-4 bg-teal-600 hover:bg-teal-500">
                <Link href="/projects" onClick={() => setOpen(false)}>Work</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
