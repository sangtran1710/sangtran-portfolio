import type { Metadata } from "next";
import PortfolioPageClient from "@/components/portfolio/PortfolioPageClient";

export const metadata: Metadata = {
  title: "Portfolio - Sang Tran",
  description:
    "AAA game VFX projects by Sang Tran - Spider-Man 2, Fortnite, New World, and more.",
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
