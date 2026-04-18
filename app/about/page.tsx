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
    title: "About Sang Tran",
    description: ABOUT.bio[0],
    url: "/about",
    type: "profile",
    images: ["/images/Portrait/z7554087716035_e6282b2e1378f725e4bcb1b51032c015.jpg"],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
