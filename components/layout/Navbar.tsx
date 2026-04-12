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
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as any } },
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
          ? "border-white/10 bg-[linear-gradient(180deg,rgba(7,10,18,0.92),rgba(9,12,19,0.7))] backdrop-blur-2xl supports-[backdrop-filter]:bg-[linear-gradient(180deg,rgba(7,10,18,0.82),rgba(9,12,19,0.55))] shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
          : "border-stone-200/70 bg-[rgba(248,244,236,0.82)] backdrop-blur-2xl supports-[backdrop-filter]:bg-[rgba(248,244,236,0.72)] shadow-[0_10px_35px_rgba(15,23,42,0.05)]"
      )}
    >
      <div className="mx-auto flex h-24 max-w-[90rem] items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <Link href="/" className="group flex flex-row items-baseline gap-2.5 leading-none">
          <span className={cn(
            "text-2xl sm:text-3xl font-black tracking-[0.08em] uppercase transition-colors",
            isDarkNav ? "text-white group-hover:text-teal-300" : "text-slate-900 group-hover:text-teal-700"
          )}>
            SANG
          </span>
          <span className={cn(
            "text-2xl sm:text-3xl font-black tracking-[0.08em] uppercase transition-colors",
            isDarkNav ? "text-white/90 group-hover:text-teal-300" : "text-slate-900 group-hover:text-teal-700"
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
                  "relative rounded-full px-4 py-2.5 text-[13px] sm:text-sm font-bold uppercase tracking-[0.12em] transition-all duration-300",
                  isActive
                    ? isDarkNav
                      ? "bg-white/8 text-teal-300 shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset]"
                      : "bg-white text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
                    : isDarkNav
                      ? "text-white/76 hover:bg-white/5 hover:text-white"
                      : "text-slate-600 hover:bg-white/70 hover:text-slate-900"
                )}
              >
                {label}
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
                  ? "border border-teal-300/40 bg-gradient-to-r from-teal-400/20 to-cyan-400/10 text-teal-100 shadow-[0_16px_40px_rgba(20,184,166,0.18)]"
                  : "border border-teal-500/20 bg-white text-teal-700 shadow-[0_14px_30px_rgba(15,23,42,0.07)]"
                : isDarkNav
                  ? "border border-teal-300/40 bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 shadow-[0_16px_40px_rgba(20,184,166,0.3)] hover:shadow-[0_18px_48px_rgba(20,184,166,0.38)] hover:scale-[1.01]"
                  : "border border-teal-500/20 bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-[0_16px_30px_rgba(20,184,166,0.18)] hover:scale-[1.01] hover:shadow-[0_18px_36px_rgba(20,184,166,0.24)]"
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
          <SheetContent side="right" className="w-72 border-white/10 bg-[linear-gradient(180deg,rgba(7,10,18,0.96),rgba(10,14,22,0.92))] p-0 text-white">
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
