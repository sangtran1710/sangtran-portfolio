"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SITE, SOCIALS } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.03,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] as any } },
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const { copy } = useLanguage();
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Work" },
    { href: "/showreel", label: "Showreel" },
    { href: "/articles", label: "VFX Studies" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];
  const prefetchRoute = (href: string) => {
    if (href.endsWith(".html")) return;
    router.prefetch(href.split("#")[0]);
  };

  useEffect(() => {
    const warmNavigation = () => {
      const warmRoutes = ["/", "/portfolio", "/about", "/showreel", "/articles"];
      warmRoutes.forEach((href) => router.prefetch(href));
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(warmNavigation, { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = setTimeout(warmNavigation, 350);
    return () => clearTimeout(timeoutId);
  }, [router]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Henry Tran, home"
          className="group inline-flex min-h-11 min-w-11 items-center rounded-md font-sans leading-none outline-none transition-colors duration-200 hover:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-primary/80 focus-visible:ring-offset-4 focus-visible:ring-offset-background motion-reduce:transition-none"
        >
          <span aria-hidden="true" className="inline-flex items-baseline gap-0.5 text-[1.75rem] font-bold tracking-tight">
            <span className="text-white transition-colors duration-200 group-hover:text-primary motion-reduce:transition-none">HT</span>
            <span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop nav — clean, borderless header links */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary navigation"
          onMouseLeave={() => setHoveredNav(null)}
        >
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : href === "/articles"
                  ? pathname.startsWith("/articles") || pathname.startsWith("/blog")
                  : href === "/portfolio"
                    ? pathname.startsWith("/portfolio") || pathname.startsWith("/projects")
                  : pathname.startsWith(href);
            const isHovered = hoveredNav === href;

            return (
              <Link
                key={href}
                href={href}
                prefetch={true}
                onMouseEnter={() => {
                  setHoveredNav(href);
                  prefetchRoute(href);
                }}
                onFocus={() => {
                  setHoveredNav(href);
                  prefetchRoute(href);
                }}
                onBlur={() => setHoveredNav(null)}
                onClick={() => {
                  setHoveredNav(null);
                }}
                className={cn(
                  "relative inline-flex items-center px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
                  isActive
                    ? "text-white font-semibold"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                {/* Active page indicator: sleek glowing spring pill */}
                {isActive && !reducedMotion && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="pointer-events-none absolute inset-0 select-none rounded-md bg-white/[0.08]"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 32,
                    }}
                  />
                )}

                {/* Floating hover capsule that glides across items */}
                {isHovered && !isActive && !reducedMotion && (
                  <motion.div
                    layoutId="navbar-hover-capsule"
                    className="pointer-events-none absolute inset-0 select-none rounded-md bg-white/[0.04]"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 30,
                    }}
                  />
                )}

                <span className="pointer-events-none relative z-10 select-none">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label={copy.nav.openMenu}
              className="min-h-11 min-w-11 rounded-md text-white hover:bg-white/10"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 border-border bg-background p-0 text-white">
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <motion.div
              className="flex flex-col pt-20 px-6 gap-5"
              variants={containerVariants}
              initial={reducedMotion ? false : "hidden"}
              animate="visible"
            >
              {navLinks.map(({ href, label }) => {
                const isActive =
                  href === "/"
                    ? pathname === "/"
                    : href === "/articles"
                      ? pathname.startsWith("/articles") || pathname.startsWith("/blog")
                      : href === "/portfolio"
                        ? pathname.startsWith("/portfolio") || pathname.startsWith("/projects")
                      : pathname.startsWith(href);
                return (
                  <motion.div key={label} variants={itemVariants}>
                    <Link
                      href={href}
                      prefetch={true}
                      onTouchStart={() => prefetchRoute(href)}
                      onFocus={() => prefetchRoute(href)}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block py-2 text-base font-medium transition-colors",
                        isActive ? "text-white" : "text-white/55 hover:text-white"
                      )}
                    >
                      {label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.a
                variants={itemVariants}
                href={SOCIALS.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block py-2 text-base font-medium text-white/55 transition-colors hover:text-white"
              >
                {copy.nav.resume}
              </motion.a>

              {/* Quick Contact Footer in Mobile Drawer */}
              <motion.div
                variants={itemVariants}
                className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3"
              >
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-sans text-xs text-primary hover:underline flex items-center gap-2"
                >
                  <span>{SITE.email}</span>
                </a>
                <div className="flex items-center gap-3 pt-0.5 text-neutral-400">
                  <a
                    href={SOCIALS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors text-xs font-sans"
                  >
                    LinkedIn
                  </a>
                  <span className="text-white/20">·</span>
                  <a
                    href={SOCIALS.artstation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors text-xs font-sans"
                  >
                    ArtStation
                  </a>
                  <span className="text-white/20">·</span>
                  <a
                    href={SOCIALS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors text-xs font-sans"
                  >
                    GitHub
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
