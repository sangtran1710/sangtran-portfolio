import type { Metadata } from "next";

import { ProgressDashboard } from "@/components/progress/progress-dashboard";

export const metadata: Metadata = {
  title: "Progress",
  description: "Track recent ShaderLex sessions and score trends stored on this device.",
};

export default function ProgressPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <p className="eyebrow">Learning Progress</p>
        <h1 className="section-title mt-4">Review recent sessions and keep the loop tight.</h1>
        <p className="section-copy mt-4">
          Session results are stored locally for this MVP. That keeps the prototype lightweight while still letting you see
          trend lines, answer accuracy, and what the backend scanner says to review next.
        </p>
      </div>

      <ProgressDashboard />
    </div>
  );
}
