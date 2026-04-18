"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ExperienceTimeline from "@/components/about/ExperienceTimeline";
import FeaturedCreditsSection from "@/components/about/FeaturedCreditsSection";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  getLocalizedAbout,
  getLocalizedCertificates,
  getLocalizedEducation,
  getLocalizedSkillGroups,
} from "@/lib/portfolio-content";

export default function AboutDetails() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const { locale, copy } = useLanguage();
  const about = getLocalizedAbout(locale);
  const skillGroups = getLocalizedSkillGroups(locale);
  const education = getLocalizedEducation(locale);
  const certificates = getLocalizedCertificates(locale);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 text-slate-700">
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
                className="text-base leading-8 text-slate-700 sm:text-[17px]"
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

      <div className="mb-20 h-px bg-stone-300/70" />

      <section className="mb-20">
        <TextReveal
          text={copy.about.experience}
          as="h2"
          className="mb-10 text-3xl font-semibold tracking-tight text-slate-900"
          offset={["start 0.9", "start 0.65"]}
        />
        <ExperienceTimeline />
      </section>

      <div className="mb-20 h-px bg-stone-300/70" />

      <FeaturedCreditsSection />

      <div className="mb-20 h-px bg-stone-300/70" />

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

      <div className="mb-20 h-px bg-stone-300/70" />

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
          <div className="mb-20 h-px bg-stone-300/70" />
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
  );
}
