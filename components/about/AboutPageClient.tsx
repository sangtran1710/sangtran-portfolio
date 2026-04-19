"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AboutDetails from "@/components/about/AboutDetails";
import AboutHeroBackground from "@/components/about/AboutHeroBackground";
import { SOCIALS } from "@/data/portfolio";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  getLocalizedAbout,
  getLocalizedSite,
} from "@/lib/portfolio-content";

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

export default function AboutPageClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { locale, copy } = useLanguage();
  const about = getLocalizedAbout(locale);
  const site = getLocalizedSite(locale);

  const socialLinks = [
    { href: SOCIALS.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: SOCIALS.github, icon: Github, label: "GitHub" },
    { href: SOCIALS.behance, icon: BehanceIcon, label: "Behance", custom: true },
    { href: `mailto:${site.email}`, icon: Mail, label: site.email },
  ];

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const avatarY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -40]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#11171e_0%,#171d24_10%,#f6f2eb_10%,#f6f2eb_100%)] pt-20">
      <div ref={heroRef} className="relative overflow-hidden pb-16">
        <AboutHeroBackground />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-6">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-white/65 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {copy.common.backToHome}
          </Link>

          <div className="rounded-[2rem] border border-stone-200/90 bg-[#fbf8f2] px-6 py-6 shadow-[0_18px_44px_rgba(15,23,42,0.06)] sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            <div className="grid items-start gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-12">
              <motion.div
                className="relative mx-auto lg:mx-0 will-change-transform"
                style={!prefersReducedMotion ? { y: avatarY } : undefined}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="relative h-64 w-64 overflow-hidden rounded-[1.5rem] ring-1 ring-stone-200 shadow-[0_14px_34px_rgba(15,23,42,0.08)] sm:h-72 sm:w-72 lg:h-80 lg:w-80">
                  <Image
                    src="/images/optimized/avatar-sang-tran.jpg"
                    alt="Sang Tran"
                    fill
                    className="object-cover object-[center_38%]"
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                    priority
                  />
                </div>
              </motion.div>

              <div>
                <motion.p
                  className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#4f8e89]"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {copy.about.kicker}
                </motion.p>
                <motion.h1
                  className="mb-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-[3.35rem]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Sang Tran
                </motion.h1>
                <motion.p
                  className="mb-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {copy.about.shortBio}
                </motion.p>

                <motion.div
                  className="mb-6 flex flex-wrap items-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-[#4f8e89]" />
                    {about.location}
                  </span>
                  <span className="h-4 w-px bg-slate-300" />
                  <div className="flex items-center gap-3">
                    {socialLinks.map(({ href, icon: Icon, label, custom }) => (
                      <a
                        key={label}
                        href={href}
                        target={href.startsWith("mailto") ? undefined : "_blank"}
                        rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                        className="text-slate-500 transition-colors hover:text-slate-900"
                        aria-label={label}
                        title={label}
                      >
                        {custom ? <BehanceIcon /> : <Icon className="h-4 w-4" />}
                      </a>
                    ))}
                  </div>
                </motion.div>

                <motion.p
                  className="max-w-2xl text-base leading-8 text-slate-700"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                >
                  {about.bio[0]}
                </motion.p>

                <motion.div
                  className="mt-8 flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.4 }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="gap-2.5 rounded-full border-0 bg-[#5c9d98] text-white hover:bg-[#538f8a]"
                  >
                    <a href={SOCIALS.resume} target="_blank" rel="noopener noreferrer">
                      {copy.about.downloadResume}
                      <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="gap-2.5 rounded-full border-stone-200 bg-white text-slate-700 hover:bg-stone-50"
                  >
                    <Link href="/portfolio">{copy.about.viewPortfolio}</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AboutDetails />
    </div>
  );
}
