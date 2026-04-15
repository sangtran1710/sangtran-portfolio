"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  ArrowLeft,
  Search,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ExperienceTimeline from "@/components/about/ExperienceTimeline";
import AboutHeroBackground from "@/components/about/AboutHeroBackground";
import FeaturedCreditsSection from "@/components/about/FeaturedCreditsSection";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import { SOCIALS } from "@/data/portfolio";
import { useRef, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  getLocalizedAbout,
  getLocalizedCertificates,
  getLocalizedEducation,
  getLocalizedSite,
  getLocalizedSkillGroups,
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
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const { locale, copy } = useLanguage();
  const about = getLocalizedAbout(locale);
  const site = getLocalizedSite(locale);
  const skillGroups = getLocalizedSkillGroups(locale);
  const education = getLocalizedEducation(locale);
  const certificates = getLocalizedCertificates(locale);

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

          <div className="rounded-[2rem] border border-stone-200 bg-[rgba(255,251,245,0.94)] px-6 py-6 shadow-[0_18px_44px_rgba(15,23,42,0.06)] sm:px-8 sm:py-8 lg:px-10 lg:py-10">
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
                    src="/images/Portrait/avatar.png"
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

      <div className="mx-auto max-w-6xl px-6 py-16 text-slate-600">
        <ScrollReveal variant="fadeUp">
          <section className="mb-20">
            <TextReveal
              text={about.title}
              as="h2"
              className="mb-8 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
              offset={["start 0.9", "start 0.6"]}
            />
            <div className="max-w-3xl space-y-5">
              {about.bio.slice(1).map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-base leading-8 text-slate-600 sm:text-[17px]"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <div className="mb-20 h-px bg-slate-200/80" />

        <section className="mb-20">
          <TextReveal
            text={copy.about.experience}
            as="h2"
            className="mb-10 text-3xl font-semibold tracking-tight text-slate-900"
            offset={["start 0.9", "start 0.65"]}
          />
          <ExperienceTimeline />
        </section>

        <div className="mb-20 h-px bg-slate-200/80" />

        <FeaturedCreditsSection />

        <div className="mb-20 h-px bg-slate-200/80" />

        <section className="mb-20">
          <TextReveal
            text={copy.about.skillsAndTools}
            as="h2"
            className="mb-10 text-3xl font-semibold tracking-tight text-slate-900"
            offset={["start 0.9", "start 0.65"]}
          />
          <div className="grid gap-8 sm:grid-cols-2">
            {skillGroups.map((group, index) => (
              <ScrollReveal
                key={group.name}
                variant={index % 2 === 0 ? "slideRight" : "slideLeft"}
                offset={["start 0.95", "start 0.7"]}
              >
                <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:border-stone-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                    {group.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="rounded-full border border-stone-200 bg-stone-50 text-xs font-normal text-slate-700 transition-colors hover:bg-stone-100"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <div className="mb-20 h-px bg-slate-200/80" />

        <section className="mb-20">
          <TextReveal
            text={copy.about.education}
            as="h2"
            className="mb-10 text-3xl font-semibold tracking-tight text-slate-900"
            offset={["start 0.9", "start 0.65"]}
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {education.map((edu, index) => (
              <ScrollReveal
                key={`${edu.school}-${index}`}
                variant="fadeUp"
                offset={["start 0.95", "start 0.75"]}
              >
                <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:border-stone-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                  <p className="text-sm font-medium text-slate-900">{edu.school}</p>
                  <p className="mt-1 text-xs text-slate-600">{edu.degree}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{edu.year}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {certificates.length > 0 && (
          <>
            <div className="mb-20 h-px bg-slate-200/80" />
            <section>
              <TextReveal
                text={copy.about.certificates}
                as="h2"
                className="mb-10 text-3xl font-semibold tracking-tight text-slate-900"
                offset={["start 0.9", "start 0.65"]}
              />
              <div className="grid gap-6 sm:grid-cols-2">
                {certificates.map((cert, index) => (
                  <ScrollReveal
                    key={`${cert.name}-${index}`}
                    variant="fadeUp"
                    offset={["start 0.95", "start 0.75"]}
                  >
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:border-stone-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                      >
                        <p className="text-sm font-medium text-slate-900">{cert.name}</p>
                        <p className="mt-1 text-xs text-slate-600">{cert.issuer}</p>
                        <p className="mt-0.5 text-xs text-slate-500">{cert.year}</p>
                        {cert.image && (
                          <div
                            className="group/cert relative mt-3 aspect-video cursor-zoom-in overflow-hidden rounded-lg border border-stone-200 bg-stone-100"
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              setSelectedCert(cert.image!);
                            }}
                          >
                            <Image
                              src={cert.image}
                              alt={cert.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover/cert:scale-105"
                              sizes="(max-width: 640px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover/cert:opacity-100">
                              <Search className="h-6 w-6 text-white drop-shadow-md" />
                            </div>
                          </div>
                        )}
                      </a>
                    ) : (
                      <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:border-stone-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                        <p className="text-sm font-medium text-slate-900">{cert.name}</p>
                        <p className="mt-1 text-xs text-slate-600">{cert.issuer}</p>
                        <p className="mt-0.5 text-xs text-slate-500">{cert.year}</p>
                        {cert.image && (
                          <div
                            className="group/cert relative mt-3 aspect-video cursor-zoom-in overflow-hidden rounded-lg border border-stone-200 bg-stone-100"
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              setSelectedCert(cert.image!);
                            }}
                          >
                            <Image
                              src={cert.image}
                              alt={cert.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover/cert:scale-105"
                              sizes="(max-width: 640px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover/cert:opacity-100">
                              <Search className="h-6 w-6 text-white drop-shadow-md" />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </ScrollReveal>
                ))}
              </div>
            </section>
          </>
        )}

        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative aspect-[4/3] w-full max-w-5xl overflow-hidden rounded-xl border border-transparent bg-black shadow-2xl sm:aspect-[16/9]"
                onClick={(event) => event.stopPropagation()}
              >
                <Image
                  src={selectedCert}
                  alt="Certificate Full View"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="absolute right-4 top-4 z-10 flex items-center justify-center rounded-full bg-black/50 p-2.5 text-white/70 transition-all hover:scale-105 hover:bg-black/80 hover:text-white backdrop-blur-md"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
