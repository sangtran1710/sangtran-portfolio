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
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import {
  ABOUT,
  SOCIALS,
  SITE,
  SKILL_GROUPS,
  EDUCATION,
  CERTIFICATES,
  ACHIEVEMENT_CREDITS,
} from "@/data/portfolio";
import { useRef, useState } from "react";

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

const socialLinks = [
  { href: SOCIALS.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: SOCIALS.github, icon: Github, label: "GitHub" },
  { href: SOCIALS.behance, icon: BehanceIcon, label: "Behance", custom: true },
  { href: `mailto:${SITE.email}`, icon: Mail, label: SITE.email },
];

export default function AboutPageClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const avatarY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -40]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <div className="min-h-screen pt-24 bg-slate-50">
      {/* Hero header with avatar */}
      <div ref={heroRef} className="relative overflow-hidden bg-slate-50 pb-16">
        <AboutHeroBackground />

        <div className="mx-auto max-w-5xl px-6 pt-8 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16 items-start">
            {/* Avatar */}
            <motion.div
              className="relative mx-auto lg:mx-0 will-change-transform"
              style={!prefersReducedMotion ? { y: avatarY } : undefined}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden ring-1 ring-slate-200/70 shadow-xl shadow-slate-200 group">
                <Image
                  src="/images/Portrait/avatar.png"
                  alt="Sang Tran"
                  fill
                  className="object-cover object-[center_38%] scale-110 transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                  priority
                />
                {/* Teal overlay on hover */}
                <div className="absolute inset-0 bg-teal-500/0 group-hover:bg-teal-500/10 transition-colors duration-500 blend-overlay" />
              </div>
              {/* Decorative dot */}
              <motion.div
                className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-teal-500 ring-4 ring-slate-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              />
            </motion.div>

            {/* Header info */}
            <div>
              <motion.p
                className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                About
              </motion.p>
              <motion.h1
                className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Sang Tran
              </motion.h1>
              <motion.p
                className="text-lg text-slate-600 mb-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Senior VFX Artist
              </motion.p>

              {/* Location + socials row */}
              <motion.div
                className="flex flex-wrap items-center gap-4 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPin className="h-3.5 w-3.5 text-teal-400" />
                  {ABOUT.location}
                </span>
                <span className="h-4 w-px bg-slate-300" />
                <div className="flex items-center gap-3">
                  {socialLinks.map(({ href, icon: Icon, label, custom }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                      className="text-slate-500 hover:text-teal-600 transition-colors"
                      aria-label={label}
                      title={label}
                    >
                      {custom ? <BehanceIcon /> : <Icon className="h-4 w-4" />}
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Bio preview */}
              <motion.p
                className="text-slate-600 text-[15px] sm:text-base leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                {ABOUT.bio[0]}
              </motion.p>

              {/* CTA */}
              <motion.div
                className="mt-6 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="gap-2.5 rounded-full bg-teal-500 hover:bg-teal-600 text-white border-0"
                >
                  <a
                    href={SOCIALS.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Resume
                    <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2.5 rounded-full border-teal-400 text-teal-600 bg-teal-50 hover:bg-teal-100">
                  <Link href="/projects">View Projects</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-5xl px-6 py-16 text-slate-600">
        {/* Bio section */}
        <ScrollReveal variant="fadeUp">
          <section className="mb-16">
            <TextReveal
              text={ABOUT.title}
              as="h2"
              className="text-2xl font-semibold mb-6 text-slate-900"
              offset={["start 0.9", "start 0.6"]}
            />
            <div className="space-y-4 max-w-3xl">
              {ABOUT.bio.slice(1).map((paragraph, i) => (
                <motion.p
                  key={i}
                  className="text-[15px] sm:text-base leading-relaxed text-slate-600"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <div className="h-px bg-slate-200 mb-16" />

        {/* Experience section */}
        <section className="mb-16">
          <TextReveal
            text="Experience"
            as="h2"
            className="text-2xl font-semibold mb-8 text-slate-900"
            offset={["start 0.9", "start 0.65"]}
          />
          <ExperienceTimeline />
        </section>

        <div className="h-px bg-slate-200 mb-16" />

        {/* Skills section */}
        <section className="mb-16">
          <TextReveal
            text="Skills & Tools"
            as="h2"
            className="text-2xl font-semibold mb-8 text-slate-900"
            offset={["start 0.9", "start 0.65"]}
          />
          <div className="grid gap-8 sm:grid-cols-2">
            {SKILL_GROUPS.map((group, i) => (
              <ScrollReveal
                key={group.name}
                variant={i % 2 === 0 ? "slideRight" : "slideLeft"}
                offset={["start 0.95", "start 0.7"]}
              >
                <div className="rounded-2xl border border-slate-200/70 bg-white shadow-sm p-5 transition-all duration-300 hover:border-teal-300/50 hover:shadow-md hover:shadow-slate-200/80">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                    {group.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="text-xs font-normal rounded-full bg-teal-50 text-teal-700 border border-teal-100 hover:bg-teal-100 transition-colors"
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

        <div className="h-px bg-slate-200 mb-16" />

        {/* Education section */}
        <section className="mb-16">
          <TextReveal
            text="Education"
            as="h2"
            className="text-2xl font-semibold mb-8 text-slate-900"
            offset={["start 0.9", "start 0.65"]}
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {EDUCATION.map((edu, i) => (
              <ScrollReveal
                key={i}
                variant="fadeUp"
                offset={["start 0.95", "start 0.75"]}
              >
                <div className="rounded-2xl border border-slate-200/70 bg-white shadow-sm p-5 transition-all duration-300 hover:border-teal-300/50 hover:shadow-md hover:shadow-slate-200/80">
                  <p className="font-medium text-sm text-slate-900">{edu.school}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    {edu.degree}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {edu.year}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {CERTIFICATES.length > 0 && (
          <>
            <div className="h-px bg-slate-200 mb-16" />
            <section>
              <TextReveal
                text="Certificates"
                as="h2"
                className="text-2xl font-semibold mb-8 text-slate-900"
                offset={["start 0.9", "start 0.65"]}
              />
              <div className="grid gap-6 sm:grid-cols-2">
                {CERTIFICATES.map((cert, i) => (
                  <ScrollReveal
                    key={i}
                    variant="fadeUp"
                    offset={["start 0.95", "start 0.75"]}
                  >
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-2xl border border-slate-200/70 bg-white shadow-sm p-5 transition-all duration-300 hover:border-teal-300/50 hover:shadow-md hover:shadow-slate-200/80"
                      >
                        <p className="font-medium text-sm text-slate-900">{cert.name}</p>
                        <p className="text-xs text-slate-600 mt-1">{cert.issuer}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{cert.year}</p>
                        {cert.image && (
                          <div
                            className="mt-3 aspect-video rounded-lg overflow-hidden bg-slate-100 relative border border-slate-200 group/cert cursor-zoom-in"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSelectedCert(cert.image!);
                            }}
                          >
                            <Image src={cert.image} alt={cert.name} fill className="object-cover transition-transform duration-500 group-hover/cert:scale-105" sizes="(max-width: 640px) 100vw, 50vw" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/cert:opacity-100 transition-opacity flex items-center justify-center">
                              <Search className="h-6 w-6 text-white drop-shadow-md" />
                            </div>
                          </div>
                        )}
                      </a>
                    ) : (
                      <div className="rounded-2xl border border-slate-200/70 bg-white shadow-sm p-5 transition-all duration-300 hover:border-teal-300/50 hover:shadow-md hover:shadow-slate-200/80">
                        <p className="font-medium text-sm text-slate-900">{cert.name}</p>
                        <p className="text-xs text-slate-600 mt-1">{cert.issuer}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{cert.year}</p>
                        {cert.image && (
                          <div
                            className="mt-3 aspect-video rounded-lg overflow-hidden bg-slate-100 relative border border-slate-200 group/cert cursor-zoom-in"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSelectedCert(cert.image!);
                            }}
                          >
                            <Image src={cert.image} alt={cert.name} fill className="object-cover transition-transform duration-500 group-hover/cert:scale-105" sizes="(max-width: 640px) 100vw, 50vw" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/cert:opacity-100 transition-opacity flex items-center justify-center">
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

        {/* Certificate Zoom Modal */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8 cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-5xl w-full aspect-[4/3] sm:aspect-[16/9] rounded-xl overflow-hidden shadow-2xl border border-transparent bg-black"
                onClick={(e) => e.stopPropagation()}
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
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 p-2.5 flex items-center justify-center rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/80 backdrop-blur-md transition-all z-10 hover:scale-105"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {ACHIEVEMENT_CREDITS.length > 0 && (
          <>
            <div className="h-px bg-slate-200 mb-16" />
            <section>
              <TextReveal
                text="Featured Credits"
                as="h2"
                className="text-2xl font-semibold mb-2 text-slate-900"
                offset={["start 0.9", "start 0.65"]}
              />
              <p className="text-sm text-slate-500 mb-8">
                Projects where I’m credited
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                {ACHIEVEMENT_CREDITS.map((item, i) => (
                  <ScrollReveal
                    key={i}
                    variant="fadeUp"
                    offset={["start 0.95", "start 0.75"]}
                  >
                    <div className="rounded-2xl border border-slate-200/70 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:border-teal-300/50 hover:shadow-md hover:shadow-slate-200/80">
                      <div className="aspect-[3/4] relative bg-slate-50 border-b border-slate-200/70">
                        <Image
                          src={item.image}
                          alt={item.title ?? "Credit"}
                          fill
                          className="object-contain"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                      {(item.title || item.subtitle) && (
                        <div className="p-4">
                          {item.title && (
                            <p className="font-medium text-sm text-slate-900">{item.title}</p>
                          )}
                          {item.subtitle && (
                            <p className="text-xs text-slate-600 mt-0.5">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
