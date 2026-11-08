"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { CheckCircle, Eye, ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getLocalizedClientReviews } from "@/lib/portfolio-content";
import type { ClientReview } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export default function ClientEndorsementsSection() {
  const { locale, copy } = useLanguage();
  const reviews = getLocalizedClientReviews(locale);
  const proofTrigger = useRef<HTMLButtonElement | null>(null);
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
          <span className="text-xs font-sans tracking-normal text-primary">
            {copy.about.clientEndorsements}
          </span>
          <span className="text-quiet">·</span>
          <span className="text-xs text-muted-foreground">Verified Upwork feedback</span>
        </div>
      </div>

      {/* Featured Compact Review Card */}
      <article className="rounded-xl border border-border bg-section p-5 sm:p-6 transition-colors duration-200 hover:border-border-hover">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 text-xs">
              <span className="font-medium text-white">{featuredReview.title}</span>
              <span className="text-quiet">·</span>
              <span className="font-sans text-xs text-primary">{featuredReview.projectLabel || "Commercial Release"}</span>
              <span className="text-quiet">·</span>
              <span className="text-muted-foreground font-sans text-xs">{featuredReview.period}</span>
            </div>

            <blockquote className="max-w-[65ch] text-sm leading-relaxed text-muted-foreground italic my-3">
              &ldquo;{featuredReview.review}&rdquo;
            </blockquote>

          </div>

          <div className="flex items-center md:self-center flex-shrink-0">
            <button
              type="button"
              onClick={(event) => { proofTrigger.current = event.currentTarget; setSelectedProof(featuredReview); }}
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
                    <span className="text-xs text-primary">Verified client feedback</span>
                    <span className="text-xs font-sans text-muted-foreground">{rev.period}</span>
                  </div>
                  <h4 className="text-sm font-medium text-white mb-2">{rev.title}</h4>
                  <p className="text-xs text-muted-foreground italic leading-relaxed mb-3">
                    &ldquo;{rev.review}&rdquo;
                  </p>
                  <button
                    type="button"
                    onClick={(event) => { proofTrigger.current = event.currentTarget; setSelectedProof(rev); }}
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
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

      <Dialog open={Boolean(selectedProof)} onOpenChange={(open) => { if (!open) setSelectedProof(null); }}>
        <DialogContent
          className="max-w-2xl max-h-[90svh] overflow-y-auto rounded-xl border-border"
          onCloseAutoFocus={(event) => { event.preventDefault(); proofTrigger.current?.focus(); }}
        >
          {selectedProof && <>
            <DialogTitle className="pr-6 text-base font-medium text-white">{selectedProof.title}</DialogTitle>
            <DialogDescription>Upwork contract feedback proof</DialogDescription>
            <div className="relative aspect-[3/1] w-full bg-section">
              <Image src={selectedProof.image} alt={`Upwork review proof for ${selectedProof.title}`} fill className="object-contain" sizes="(max-width: 768px) 100vw, 672px" />
            </div>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-primary" /> Verified client feedback on Upwork
            </p>
          </>}
        </DialogContent>
      </Dialog>
    </section>
  );
}
