import type { Metadata } from "next";
import PortfolioPageClient from "@/components/portfolio/PortfolioPageClient";

export const metadata: Metadata = {
  title: "Production Portfolio",
  description:
    "Production VFX work by Henry Tran across Marvel's Wolverine, Marvel's Spider-Man 2, Fortnite, New World: Aeternum, and real-time engine tools.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Production Portfolio | Henry Tran",
    description:
      "Production VFX work by Henry Tran across Marvel's Wolverine, Marvel's Spider-Man 2, Fortnite, New World: Aeternum, and real-time engine tools.",
    url: "/portfolio",
    type: "website",
    images: [
      {
        url: "/images/spiderman-2-ps5.jpg",
        width: 1200,
        height: 628,
        alt: "Marvel's Spider-Man 2 Real-Time VFX by Henry Tran",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Production Portfolio | Henry Tran",
    description:
      "Production VFX work by Henry Tran across Marvel's Wolverine, Marvel's Spider-Man 2, Fortnite, New World: Aeternum, and real-time engine tools.",
    images: ["/images/spiderman-2-ps5.jpg"],
  },
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
