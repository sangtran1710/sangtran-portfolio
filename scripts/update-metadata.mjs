import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// 1. Update data/portfolio.ts
const portfolioPath = path.join(rootDir, "data", "portfolio.ts");
let portfolioContent = fs.readFileSync(portfolioPath, "utf8");
portfolioContent = portfolioContent.replace(
  /export const SITE = \{[\s\S]*?\};/,
  `export const SITE = {
  title: "Henry Tran — Senior VFX Artist",
  description:
    "Senior VFX Artist specializing in real-time effects, shaders, and engine tools for AAA games, in-engine cinematics, and interactive experiences.",
  email: "sangminhtran1710@gmail.com",
  logo: "/images/logo.webp",
};`
);
fs.writeFileSync(portfolioPath, portfolioContent, "utf8");
console.log("Updated data/portfolio.ts");

// 2. Update app/layout.tsx
const layoutPath = path.join(rootDir, "app", "layout.tsx");
let layoutContent = fs.readFileSync(layoutPath, "utf8");
layoutContent = layoutContent.replace(
  /openGraph:\s*\{[\s\S]*?\},[\s\n]*twitter:\s*\{[\s\S]*?\},/,
  `openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: "website",
    siteName: "Henry Tran VFX",
    images: [
      {
        url: "/images/og-main.jpg",
        width: 1200,
        height: 630,
        alt: "Henry Tran — Senior VFX Artist Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/images/og-main.jpg"],
  },`
);
fs.writeFileSync(layoutPath, layoutContent, "utf8");
console.log("Updated app/layout.tsx");

// 3. Update app/page.tsx
const homePath = path.join(rootDir, "app", "page.tsx");
let homeContent = fs.readFileSync(homePath, "utf8");
homeContent = homeContent.replace(
  /export const metadata: Metadata = \{[\s\S]*?\};/,
  `export const metadata: Metadata = {
  title: {
    absolute: SITE.title,
  },
  description: SITE.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: "/",
    type: "website",
    images: [
      {
        url: "/images/og-main.jpg",
        width: 1200,
        height: 630,
        alt: "Henry Tran — Senior VFX Artist Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/images/og-main.jpg"],
  },
};`
);
fs.writeFileSync(homePath, homeContent, "utf8");
console.log("Updated app/page.tsx");

// 4. Update app/portfolio/page.tsx
const portPath = path.join(rootDir, "app", "portfolio", "page.tsx");
let portContent = fs.readFileSync(portPath, "utf8");
portContent = portContent.replace(
  /export const metadata: Metadata = \{[\s\S]*?\};/,
  `export const metadata: Metadata = {
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
};`
);
fs.writeFileSync(portPath, portContent, "utf8");
console.log("Updated app/portfolio/page.tsx");

// 5. Update app/showreel/page.tsx
const reelPath = path.join(rootDir, "app", "showreel", "page.tsx");
let reelContent = fs.readFileSync(reelPath, "utf8");
reelContent = reelContent.replace(
  /export const metadata: Metadata = \{[\s\S]*?\};/,
  `export const metadata: Metadata = {
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
};`
);
fs.writeFileSync(reelPath, reelContent, "utf8");
console.log("Updated app/showreel/page.tsx");

// 6. Update app/about/page.tsx
const aboutPath = path.join(rootDir, "app", "about", "page.tsx");
let aboutContent = fs.readFileSync(aboutPath, "utf8");
aboutContent = aboutContent.replace(
  /export const metadata: Metadata = \{[\s\S]*?\};/,
  `export const metadata: Metadata = {
  title: "About",
  description:
    "Senior VFX Artist with 6+ years in AAA game development and real-time effects. Experience across Insomniac Games, Epic Games, and Virtuos / Sparx*.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Henry Tran — Senior VFX Artist",
    description:
      "Senior VFX Artist with 6+ years in AAA game development and real-time effects. Experience across Insomniac Games, Epic Games, and Virtuos / Sparx*.",
    url: "/about",
    type: "profile",
    images: [
      {
        url: "/images/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About Henry Tran — Senior VFX Artist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Henry Tran — Senior VFX Artist",
    description:
      "Senior VFX Artist with 6+ years in AAA game development and real-time effects. Experience across Insomniac Games, Epic Games, and Virtuos / Sparx*.",
    images: ["/images/og-about.jpg"],
  },
};`
);
fs.writeFileSync(aboutPath, aboutContent, "utf8");
console.log("Updated app/about/page.tsx");

// 7. Update app/contact/page.tsx
const contactPath = path.join(rootDir, "app", "contact", "page.tsx");
let contactContent = fs.readFileSync(contactPath, "utf8");
contactContent = contactContent.replace(
  /export const metadata: Metadata = \{[\s\S]*?\};/,
  `export const metadata: Metadata = {
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
};`
);
fs.writeFileSync(contactPath, contactContent, "utf8");
console.log("Updated app/contact/page.tsx");

// 8. Update app/articles/page.tsx
const articlesPath = path.join(rootDir, "app", "articles", "page.tsx");
let articlesContent = fs.readFileSync(articlesPath, "utf8");
articlesContent = articlesContent.replace(
  /export const metadata: Metadata = \{[\s\S]*?\};/,
  `export const metadata: Metadata = {
  title: "Technical Notes & R&D",
  description:
    "Field notes on real-time VFX, HLSL shader mechanics, simulation math, and production pipeline tools by Henry Tran.",
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: "Technical Notes & Shader R&D | Henry Tran",
    description:
      "Field notes on real-time VFX, HLSL shader mechanics, simulation math, and production pipeline tools by Henry Tran.",
    url: "/articles",
    type: "website",
    images: [
      {
        url: "/images/og-main.jpg",
        width: 1200,
        height: 630,
        alt: "Technical Notes & Shader R&D by Henry Tran",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Notes & Shader R&D | Henry Tran",
    description:
      "Field notes on real-time VFX, HLSL shader mechanics, simulation math, and production pipeline tools by Henry Tran.",
    images: ["/images/og-main.jpg"],
  },
};`
);
fs.writeFileSync(articlesPath, articlesContent, "utf8");
console.log("Updated app/articles/page.tsx");
