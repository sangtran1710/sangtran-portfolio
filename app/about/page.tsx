import type { Metadata } from "next";
import { ABOUT } from "@/data/portfolio";
import AboutPageClient from "@/components/about/AboutPageClient";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT.bio[0],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Henry Tran",
    description: ABOUT.bio[0],
    url: "/about",
    type: "profile",
    images: ["/images/Portrait/avatar.webp"],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
