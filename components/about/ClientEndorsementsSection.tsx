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
          <span className="text-xs font-mono uppercase tracking-[0.18em] text-primary">
            {copy.about.clientEndorsements}
          </span>
          <span className="text-quiet">·</span>
          <div className="flex items-center gap-1 text-xs text-amber-400 font-medium">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>5.0 (Upwork Verified)</span>
          </div>
        </div>
      </div>

      {/* Featured Compact Review Card */}
      <article className="rounded-xl border border-border bg-section p-5 sm:p-6 transition-colors duration-200 hover:border-border-hover">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 text-xs">
              <span className="font-medium text-white">{featuredReview.title}</span>
              <span className="text-quiet">·</span>
              <span className="font-mono text-xs text-primary">{featuredReview.projectLabel || "Commercial Release"}</span>
              <span className="text-quiet">·</span>
              <span className="text-muted-foreground font-mono text-[11px]">{featuredReview.period}</span>
            </div>

            <blockquote className="text-sm leading-relaxed text-muted-foreground italic border-l-2 border-primary/60 pl-3.5 my-3">
              &ldquo;{featuredReview.review}&rdquo;
            </blockquote>

            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              {featuredReview.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-border bg-card px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
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
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-card hover:text-white"
            >
              <Eye className="h-3.5 w-3.5 text-primary" />
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
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-white transition-colors"
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
                  className="rounded-xl border border-border bg-section p-5"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="ml-1 text-xs font-mono text-white">5.0</span>
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground">{rev.period}</span>
                  </div>
                  <h4 className="text-sm font-medium text-white mb-2">{rev.title}</h4>
                  <p className="text-xs text-muted-foreground italic leading-relaxed mb-3">
                    &ldquo;{rev.review}&rdquo;
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedProof(rev)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProof(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-2xl border border-border bg-background p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
              <div>
                <h4 className="text-sm font-medium text-white">{selectedProof.title}</h4>
                <p className="text-xs text-muted-foreground">Upwork Contract Feedback Proof</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProof(null)}
                className="rounded-full p-1 text-muted-foreground hover:bg-card hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative aspect-[3/1] sm:aspect-[7/2] w-full overflow-hidden rounded-lg border border-border bg-section">
              <Image
                src={selectedProof.image}
                alt={`Upwork review proof for ${selectedProof.title}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5 text-primary" />
                Verified client feedback on Upwork
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedProof(null)}
                className="rounded-lg border-border bg-card text-xs text-foreground hover:bg-card hover:text-white"
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
