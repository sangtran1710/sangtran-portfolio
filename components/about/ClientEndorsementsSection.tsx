"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, CheckCircle, Eye, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedClientReviews } from "@/lib/portfolio-content";
import type { ClientReview } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export default function ClientEndorsementsSection() {
  const { locale, copy } = useLanguage();
  const reviews = getLocalizedClientReviews(locale);
  const [selectedProof, setSelectedProof] = useState<ClientReview | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const isVi = locale === "vi";

  if (!reviews.length) return null;

  const featuredReview = reviews[0];
  const secondaryReviews = reviews.slice(1);

  return (
    <section id="client-endorsements" className="mb-20">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-amber-600 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            Client Testimonial
          </span>
          <span className="text-xs font-medium text-slate-500">Upwork Verified · 100% Job Success</span>
        </div>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {copy.about.clientEndorsements}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          {copy.about.clientEndorsementsBody}
        </p>
      </div>

      {/* Featured Premier Review Card */}
      <article className="rounded-[1.5rem] border border-stone-200 bg-white p-6 sm:p-8 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:border-stone-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                ))}
                <span className="ml-1.5 text-xs font-bold text-slate-900">5.0</span>
              </div>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-medium text-[#4f8e89]">
                {featuredReview.projectLabel || "Commercial Release"}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500">{featuredReview.period}</span>
            </div>

            <h3 className="text-base font-semibold text-slate-900 mb-3">
              {featuredReview.title}
            </h3>

            <blockquote className="text-sm sm:text-[15px] leading-relaxed text-slate-700 italic border-l-2 border-[#4f8e89]/40 pl-4 mb-5">
              &ldquo;{featuredReview.review}&rdquo;
            </blockquote>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Client Endorsement:</span>
              {featuredReview.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-stretch md:items-end justify-center gap-3">
            <button
              type="button"
              onClick={() => setSelectedProof(featuredReview)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-xs font-medium text-slate-700 transition-colors hover:bg-stone-100 hover:text-slate-900"
            >
              <Eye className="h-4 w-4 text-[#4f8e89]" />
              {copy.about.viewVerifiedReview}
            </button>
          </div>
        </div>
      </article>

      {/* Secondary Reviews Toggle */}
      {secondaryReviews.length > 0 && (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <span>
              {showAllReviews
                ? (isVi ? "Thu gọn đánh giá khác ↑" : "Hide additional client reviews ↑")
                : (isVi ? `Xem thêm ${secondaryReviews.length} đánh giá khác từ khách hàng →` : `View ${secondaryReviews.length} additional client reviews →`)}
            </span>
            <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", showAllReviews && "rotate-180")} />
          </button>

          {showAllReviews && (
            <div className="mt-4 grid gap-4 md:grid-cols-2 animate-in fade-in duration-200">
              {secondaryReviews.map((rev) => (
                <article
                  key={rev.title}
                  className="rounded-xl border border-stone-200 bg-stone-50/50 p-5"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="ml-1 text-xs font-bold text-slate-900">5.0</span>
                    </div>
                    <span className="text-[11px] text-slate-500">{rev.period}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">{rev.title}</h4>
                  <p className="text-xs text-slate-600 italic leading-relaxed mb-3">
                    &ldquo;{rev.review}&rdquo;
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedProof(rev)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-[#4f8e89] hover:underline"
                  >
                    <Eye className="h-3 w-3" />
                    {copy.about.viewVerifiedReview}
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      )}

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
