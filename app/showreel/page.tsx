import type { Metadata } from "next";
import ShowreelPageClient from "@/components/showreel/ShowreelPageClient";

export const metadata: Metadata = {
  title: "Showreel",
  description: "VFX Reel 2025 - Real-time VFX / AAA / Cinematic",
  alternates: {
    canonical: "/showreel",
  },
  openGraph: {
    title: "VFX Reel 2025 - Sang Tran",
    description: "VFX Reel 2025 - Real-time VFX / AAA / Cinematic",
    url: "/showreel",
    type: "video.other",
    images: ["/images/Fornite/Screenshot 2025-08-16 005729.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "VFX Reel 2025 - Sang Tran",
    description: "VFX Reel 2025 - Real-time VFX / AAA / Cinematic",
    images: ["/images/Fornite/Screenshot 2025-08-16 005729.png"],
  },
};

export default function ShowreelPage() {
  return <ShowreelPageClient />;
}
