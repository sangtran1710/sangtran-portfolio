import type { Metadata } from "next";
import { ABOUT } from "@/data/portfolio";
import AboutPageClient from "@/components/about/AboutPageClient";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT.bio[0],
};

export default function AboutPage() {
  return <AboutPageClient />;
}
