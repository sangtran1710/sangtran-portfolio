"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/showreel", label: "Reel" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isLanding = pathname === "/";
  const isDarkNav =
    isLanding ||
    pathname === "/showreel" ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/portfolio");

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full border-b transition-colors",
        isDarkNav
          ? "border-white/15 bg-zinc-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-zinc-950/60 shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
          : "border-slate-200 bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/90 shadow-sm"
      )}
    >
      <div className="mx-auto flex h-24 max-w-[90rem] items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <Link href="/" className="group flex flex-row items-baseline gap-2 leading-none">
          <span className={cn(
            "text-2xl sm:text-3xl font-black tracking-[0.12em] uppercase transition-colors",
            isDarkNav ? "text-white group-hover:text-teal-400" : "text-zinc-900 group-hover:text-teal-600"
          )}>
            SANG
          </span>
          <span className={cn(
            "text-2xl sm:text-3xl font-black tracking-[0.12em] uppercase transition-colors",
            isDarkNav ? "text-white group-hover:text-teal-400" : "text-zinc-900 group-hover:text-teal-600"
          )}>
            TRAN.
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={label}
                href={href}
                className={cn(
                  "relative px-4 py-3 text-[13px] sm:text-sm font-extrabold uppercase tracking-[0.12em] transition-all duration-300 hover:-translate-y-0.5 rounded-sm",
                  isActive
                    ? isDarkNav
                      ? "text-teal-400 drop-shadow-[0_0_10px_rgba(45,212,191,0.4)]"
                      : "text-teal-600"
                    : isDarkNav
                      ? "text-white/85 hover:text-white"
                      : "text-slate-600 hover:text-slate-900"
                )}
              >
                {label}
                {isActive && (
                  <span className={cn(
                    "absolute -bottom-0.5 left-1/2 h-[2px] min-w-[60%] -translate-x-1/2 rounded-full",
                    isDarkNav ? "bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.6)]" : "bg-teal-600"
                  )} />
                )}
              </Link>
            );
          })}

          <div className="h-5 w-px bg-white/25 mx-1 lg:mx-2 hidden lg:block" />

          {/* Portfolio CTA button */}
          <Link
            href="/portfolio"
            className={cn(
              "group relative inline-flex items-center justify-center overflow-hidden px-6 py-3.5 text-sm font-extrabold uppercase tracking-[0.14em] transition-all duration-300 rounded-full",
              pathname.startsWith("/portfolio")
                ? isDarkNav
                  ? "border-2 border-teal-400 bg-teal-500/20 text-teal-300 shadow-[0_0_20px_rgba(20,184,166,0.25)]"
                  : "border-2 border-teal-500 bg-teal-50 text-teal-700"
                : isDarkNav
                  ? "border-2 border-teal-400 bg-teal-500 text-white shadow-[0_0_24px_rgba(20,184,166,0.4),0_0_0_1px_rgba(255,255,255,0.1)_inset] hover:shadow-[0_0_32px_rgba(20,184,166,0.5),0_0_0_1px_rgba(255,255,255,0.15)_inset] hover:scale-[1.02] hover:border-teal-300"
                  : "border-2 border-teal-500 bg-teal-500 text-white shadow-md hover:bg-teal-600 hover:border-teal-600 hover:shadow-lg hover:scale-[1.02]"
            )}
          >
            <span className="relative z-10">Portfolio</span>
          </Link>
        </nav>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Open menu"
              className={cn("rounded-none", isDarkNav ? "text-white hover:bg-white/10" : "text-slate-900 hover:bg-slate-100")}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-zinc-950 border-zinc-800 p-0">
            <motion.div
              className="flex flex-col pt-20 px-6 gap-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {NAV_LINKS.map(({ href, label }) => {
                const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <motion.div key={label} variants={itemVariants}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block text-sm font-extrabold uppercase tracking-[0.18em] transition-colors py-2",
                        isActive ? "text-teal-400" : "text-zinc-400 hover:text-white"
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
                className="block text-sm font-extrabold uppercase tracking-[0.18em] text-zinc-400 hover:text-white transition-colors py-2"
              >
                Resume
              </motion.a>
              <motion.div variants={itemVariants}>
                <Link
                  href="/portfolio"
                  onClick={() => setOpen(false)}
                  className="block mt-4 border-2 border-teal-500/40 bg-teal-500/10 px-6 py-4 text-center text-sm font-extrabold uppercase tracking-[0.18em] text-teal-400 transition-colors hover:bg-teal-500 hover:text-zinc-950"
                >
                  Portfolio
                </Link>
              </motion.div>
            </motion.div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
