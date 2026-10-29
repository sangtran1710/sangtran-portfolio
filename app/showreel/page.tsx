import type { Metadata } from "next";
import ShowreelPageClient from "@/components/showreel/ShowreelPageClient";

export const metadata: Metadata = {
  title: "VFX Showreel",
  description:
    "Henry Tran's VFX Showreel featuring AAA gameplay effects, in-engine cinematics, and procedural shaders across Marvel's Wolverine, Spider-Man 2, Fortnite, and New World.",
  alternates: {
    canonical: "/showreel",
  },
  openGraph: {
    title: "VFX Showreel | Henry Tran — Senior VFX Artist",
    description:
      "Henry Tran's VFX Showreel featuring AAA gameplay effects, in-engine cinematics, and procedural shaders across Marvel's Wolverine, Spider-Man 2, Fortnite, and New World.",
    url: "/showreel",
    type: "video.other",
    images: [
      {
        url: "/images/og-showreel.jpg",
        width: 1200,
        height: 630,
        alt: "Henry Tran VFX Showreel Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VFX Showreel | Henry Tran — Senior VFX Artist",
    description:
      "Henry Tran's VFX Showreel featuring AAA gameplay effects, in-engine cinematics, and procedural shaders across Marvel's Wolverine, Spider-Man 2, Fortnite, and New World.",
    images: ["/images/og-showreel.jpg"],
  },
};

export default function ShowreelPage() {
  return <ShowreelPageClient />;
}
