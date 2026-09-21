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
    <section id="client-endorsements" className="mb-12">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#4f8e89]">
            {copy.about.clientEndorsements}
          </span>
          <span className="text-slate-300">·</span>
          <div className="flex items-center gap-1 text-xs text-amber-600 font-medium">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>5.0 (Upwork Verified)</span>
          </div>
        </div>
      </div>

      {/* Featured Compact Review Card */}
      <article className="rounded-2xl border border-stone-200/90 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-stone-300 hover:shadow-md">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 text-xs">
              <span className="font-semibold text-slate-900">{featuredReview.title}</span>
              <span className="text-slate-300">·</span>
              <span className="font-medium text-[#4f8e89]">{featuredReview.projectLabel || "Commercial Release"}</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500 font-mono text-[11px]">{featuredReview.period}</span>
            </div>

            <blockquote className="text-sm leading-relaxed text-slate-700 italic border-l-2 border-[#4f8e89]/40 pl-3.5 my-3">
              &ldquo;{featuredReview.review}&rdquo;
            </blockquote>

            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              {featuredReview.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-stone-100 px-2 py-0.5 text-[11px] text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center md:self-center flex-shrink-0">
            <button
              type="button"
              onClick={() => setSelectedProof(featuredReview)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-stone-100 hover:text-slate-900"
            >
              <Eye className="h-3.5 w-3.5 text-[#4f8e89]" />
              <span>{copy.about.viewVerifiedReview}</span>
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
