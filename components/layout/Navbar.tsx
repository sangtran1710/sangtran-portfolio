"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
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
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Work" },
    { href: "/showreel", label: "Showreel" },
    { href: "/articles", label: "Notes" },
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
    <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-white/10 bg-[#0b0e12]">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link href="/" className="group flex flex-row items-baseline gap-0.5 font-kanit leading-none">
          <span className="text-[1.75rem] font-bold text-white transition-colors group-hover:text-white/85">
            HT
          </span>
          <span className="text-[1.75rem] font-bold leading-none text-[#5c9d98]">
            .
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
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
              <Link
                key={href}
                href={href}
                onMouseEnter={() => prefetchRoute(href)}
                onFocus={() => prefetchRoute(href)}
                className={cn(
                  "inline-flex border-b-2 px-3 py-2 text-[0.9375rem] font-medium transition-colors duration-200",
                  isActive
                    ? "border-[#5c9d98] text-white"
                    : "border-transparent text-white/65 hover:text-white",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={copy.nav.openMenu}
              className="rounded-full text-white hover:bg-white/10"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 border-white/10 bg-[#0b0e12] p-0 text-white">
            <motion.div
              className="flex flex-col pt-20 px-6 gap-5"
              variants={containerVariants}
              initial="hidden"
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
            </motion.div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
