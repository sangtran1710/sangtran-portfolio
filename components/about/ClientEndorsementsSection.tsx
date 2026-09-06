"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, CheckCircle, Eye, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedClientReviews } from "@/lib/portfolio-content";
import type { ClientReview } from "@/data/portfolio";

export default function ClientEndorsementsSection() {
  const { locale, copy } = useLanguage();
  const reviews = getLocalizedClientReviews(locale);
  const [selectedProof, setSelectedProof] = useState<ClientReview | null>(null);

  if (!reviews.length) return null;

  return (
    <section id="client-endorsements" className="mb-20">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-amber-600 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            Client Reviews
          </span>
          <span className="text-xs font-medium text-slate-500">Upwork Verified</span>
        </div>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {copy.about.clientEndorsements}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          {copy.about.clientEndorsementsBody}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((rev) => (
          <article
            key={rev.title}
            className="flex flex-col justify-between rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:border-stone-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
          >
            <div>
              {/* Rating & Date */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                  ))}
                  <span className="ml-1 text-xs font-bold text-slate-900">5.0</span>
                </div>
                <span className="text-[11px] font-medium text-slate-600">
                  {rev.period}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-semibold text-slate-900 leading-snug mb-3">
                {rev.title}
              </h3>

              {/* Review Text */}
              <blockquote className="text-xs sm:text-[13px] leading-relaxed text-slate-700 italic mb-4">
                &ldquo;{rev.review}&rdquo;
              </blockquote>
            </div>

            <div>
              {/* Endorsed skills */}
              <div className="mb-4 pt-3 border-t border-stone-100">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Endorsed by client
                </p>
                <div className="flex flex-wrap gap-1">
                  {rev.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verification Button */}
              <button
                type="button"
                onClick={() => setSelectedProof(rev)}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-stone-100 hover:text-slate-900"
              >
                <Eye className="h-3.5 w-3.5 text-[#4f8e89]" />
                {copy.about.viewVerifiedReview}
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Proof Lightbox Modal */}
      {selectedProof && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProof(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">{selectedProof.title}</h4>
                <p className="text-xs text-slate-500">Upwork Contract Feedback Proof</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProof(null)}
                className="rounded-full p-1 text-slate-400 hover:bg-stone-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative aspect-[3/1] sm:aspect-[7/2] w-full overflow-hidden rounded-lg border border-stone-200 bg-stone-50">
              <Image
                src={selectedProof.image}
                alt={`Upwork review proof for ${selectedProof.title}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                Verified client feedback on Upwork
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedProof(null)}
                className="rounded-full text-xs"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
