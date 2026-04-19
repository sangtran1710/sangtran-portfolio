"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SOCIALS } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as any } },
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { copy } = useLanguage();
  const isLanding = pathname === "/";
  const isDarkNav =
    isLanding ||
    pathname === "/about" ||
    pathname === "/showreel" ||
    pathname.startsWith("/articles") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/portfolio");
  const navLinks = [
    { href: "/", label: copy.nav.home },
    { href: "/showreel", label: copy.nav.reel },
    {
      href: "/articles",
      label: copy.nav.blog,
      children: [
        { href: "/articles#blog", label: "Blog" },
        { href: "/materials/index.html", label: "ShaderLex" },
      ],
    },
    { href: "/about", label: copy.nav.about },
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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full border-b transition-colors",
        isDarkNav
          ? "border-white/10 bg-[rgba(16,21,28,0.82)] backdrop-blur-xl supports-[backdrop-filter]:bg-[rgba(16,21,28,0.74)] shadow-[0_8px_26px_rgba(15,23,42,0.18)]"
          : "border-stone-200/80 bg-[rgba(246,242,235,0.88)] backdrop-blur-xl supports-[backdrop-filter]:bg-[rgba(246,242,235,0.8)] shadow-[0_8px_26px_rgba(15,23,42,0.04)]"
      )}
    >
      <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <Link href="/" className="group flex flex-row items-baseline gap-1.5 leading-none">
          <span className={cn(
            "text-2xl sm:text-[2rem] font-black tracking-[0.04em] uppercase transition-colors",
            isDarkNav ? "text-white group-hover:text-white/88" : "text-slate-900 group-hover:text-slate-700"
          )}>
            SANG
          </span>
          <span className={cn(
            "text-2xl sm:text-[2rem] font-black tracking-[0.04em] uppercase transition-colors",
            isDarkNav ? "text-white group-hover:text-white/88" : "text-slate-900 group-hover:text-slate-700"
          )}>
            TRAN.
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map(({ href, label, children }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : href === "/articles"
                  ? pathname.startsWith("/articles") || pathname.startsWith("/blog")
                  : pathname.startsWith(href);
            const hasChildren = Boolean(children?.length);
            return (
              <div key={label} className="group/navitem relative">
                <Link
                  href={href}
                  onMouseEnter={() => prefetchRoute(href)}
                  onFocus={() => prefetchRoute(href)}
                  className={cn(
                    "relative inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300",
                    isActive
                      ? isDarkNav
                        ? "bg-white/8 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]"
                        : "bg-white text-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
                      : isDarkNav
                        ? "text-white/70 hover:bg-white/5 hover:text-white"
                        : "text-slate-600 hover:bg-white/70 hover:text-slate-900"
                  )}
                >
                  {label}
                  {hasChildren && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
                </Link>
                {hasChildren && (
                  <div
                    className={cn(
                      "invisible absolute left-1/2 top-full z-50 mt-3 w-52 -translate-x-1/2 rounded-2xl border p-2 opacity-0 shadow-2xl transition-all duration-200 group-hover/navitem:visible group-hover/navitem:translate-y-0 group-hover/navitem:opacity-100 group-focus-within/navitem:visible group-focus-within/navitem:opacity-100",
                      isDarkNav
                        ? "border-white/10 bg-[#151922] text-white"
                        : "border-stone-200 bg-white text-slate-900"
                    )}
                  >
                    {children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onMouseEnter={() => prefetchRoute(child.href)}
                        onFocus={() => prefetchRoute(child.href)}
                        className={cn(
                          "block rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                          isDarkNav
                            ? "text-white/75 hover:bg-white/8 hover:text-white"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="h-5 w-px bg-white/25 mx-1 lg:mx-2 hidden lg:block" />

          {/* Portfolio CTA button */}
          <Link
            href="/portfolio"
            onMouseEnter={() => prefetchRoute("/portfolio")}
            onFocus={() => prefetchRoute("/portfolio")}
            className={cn(
              "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-5 py-[0.7rem] text-sm font-semibold transition-all duration-300",
              pathname.startsWith("/portfolio")
                ? isDarkNav
                  ? "border border-white/14 bg-white/8 text-white"
                  : "border border-stone-200 bg-white text-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
                : isDarkNav
                  ? "border border-[#6ca9a4]/40 bg-[#5c9d98] text-white hover:bg-[#6aa9a4]"
                  : "border border-[#6ca9a4]/20 bg-[#5c9d98] text-white shadow-[0_12px_28px_rgba(92,157,152,0.16)] hover:bg-[#538f8a]"
            )}
          >
            <span className="relative z-10">{copy.nav.portfolio}</span>
          </Link>
        </nav>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={copy.nav.openMenu}
              className={cn("rounded-full", isDarkNav ? "text-white hover:bg-white/10" : "text-slate-900 hover:bg-white")}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 border-stone-200 bg-[#f6f2eb] p-0 text-slate-900">
            <motion.div
              className="flex flex-col pt-20 px-6 gap-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map(({ href, label, children }) => {
                const isActive =
                  href === "/"
                    ? pathname === "/"
                    : href === "/articles"
                      ? pathname.startsWith("/articles") || pathname.startsWith("/blog")
                      : pathname.startsWith(href);
                return (
                  <motion.div key={label} variants={itemVariants}>
                    <Link
                      href={href}
                      onTouchStart={() => prefetchRoute(href)}
                      onFocus={() => prefetchRoute(href)}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block py-2 text-base font-medium transition-colors",
                        isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
                      )}
                    >
                      {label}
                    </Link>
                    {children?.length ? (
                      <div className="ml-4 mt-2 flex flex-col gap-2 border-l border-slate-200 pl-4">
                        {children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onTouchStart={() => prefetchRoute(child.href)}
                            onFocus={() => prefetchRoute(child.href)}
                            onClick={() => setOpen(false)}
                            className="py-1 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </motion.div>
                );
              })}
              <motion.a
                variants={itemVariants}
                href={SOCIALS.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block py-2 text-base font-medium text-slate-500 transition-colors hover:text-slate-900"
              >
                {copy.nav.resume}
              </motion.a>
              <motion.div variants={itemVariants}>
                <Link
                  href="/portfolio"
                  onTouchStart={() => prefetchRoute("/portfolio")}
                  onFocus={() => prefetchRoute("/portfolio")}
                  onClick={() => setOpen(false)}
                  className="mt-4 block rounded-full bg-[#5c9d98] px-6 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#538f8a]"
                >
                  {copy.nav.portfolio}
                </Link>
              </motion.div>
            </motion.div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
