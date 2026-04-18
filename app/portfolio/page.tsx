import type { Metadata } from "next";
import PortfolioPageClient from "@/components/portfolio/PortfolioPageClient";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "AAA game VFX projects by Sang Tran - Spider-Man 2, Fortnite, New World, and more.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Portfolio - Sang Tran",
    description:
      "AAA game VFX projects by Sang Tran - Spider-Man 2, Fortnite, New World, and more.",
    url: "/portfolio",
    type: "website",
    images: ["/images/spiderman-2-ps5.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Sang Tran",
    description:
      "AAA game VFX projects by Sang Tran - Spider-Man 2, Fortnite, New World, and more.",
    images: ["/images/spiderman-2-ps5.jpg"],
  },
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
