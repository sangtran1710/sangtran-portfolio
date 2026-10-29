import type { Metadata } from "next";
import ContactPageClient from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Henry Tran for Senior VFX Artist roles, technical art consulting, and production collaboration.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Henry Tran — Senior VFX Artist",
    description:
      "Get in touch with Henry Tran for Senior VFX Artist roles, technical art consulting, and production collaboration.",
    url: "/contact",
    type: "website",
    images: [
      {
        url: "/images/og-main.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Henry Tran — Senior VFX Artist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Henry Tran — Senior VFX Artist",
    description:
      "Get in touch with Henry Tran for Senior VFX Artist roles, technical art consulting, and production collaboration.",
    images: ["/images/og-main.jpg"],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
