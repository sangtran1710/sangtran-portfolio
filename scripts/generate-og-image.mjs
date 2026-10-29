import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const imagesDir = path.join(publicDir, "images");

async function generateMainOG() {
  const width = 1200;
  const height = 630;

  // Base background from Wolverine Night Assault
  const bgImage = path.join(imagesDir, "hero-wolverine-night-assault.webp");
  
  // Resize and crop background to 1200x630
  const bgBuffer = await sharp(bgImage)
    .resize(width, height, { fit: "cover", position: "center" })
    .toBuffer();

  // SVG overlay with Studio Slate gradients, typography, and badges
  const svgOverlay = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Horizontal Slate Gradient: 94% on left, transparent on right -->
        <linearGradient id="slateGradH" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#1c212c" stop-opacity="0.96" />
          <stop offset="42%" stop-color="#1c212c" stop-opacity="0.88" />
          <stop offset="70%" stop-color="#1c212c" stop-opacity="0.45" />
          <stop offset="100%" stop-color="#1c212c" stop-opacity="0.15" />
        </linearGradient>

        <!-- Vertical Gradient to ground bottom text -->
        <linearGradient id="slateGradV" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1c212c" stop-opacity="0" />
          <stop offset="60%" stop-color="#1c212c" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#1c212c" stop-opacity="0.95" />
        </linearGradient>

        <!-- Subtle teal glow circle -->
        <radialGradient id="tealGlow" cx="20%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#5eb3ab" stop-opacity="0.16" />
          <stop offset="100%" stop-color="#1c212c" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Gradient scrims -->
      <rect width="${width}" height="${height}" fill="url(#slateGradH)" />
      <rect width="${width}" height="${height}" fill="url(#slateGradV)" />
      <rect width="${width}" height="${height}" fill="url(#tealGlow)" />

      <!-- Hairline outer border -->
      <rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="none" stroke="#364156" stroke-width="2" />

      <!-- Kicker -->
      <text x="80" y="140" font-family="monospace, -apple-system, sans-serif" font-size="14" font-weight="600" letter-spacing="3" fill="#5eb3ab">
        SENIOR VFX ARTIST · AAA PRODUCTION
      </text>

      <!-- Main Title -->
      <text x="80" y="240" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="78" font-weight="700" fill="#ffffff" letter-spacing="-1">
        Henry Tran
      </text>

      <!-- Tagline / Bio -->
      <text x="80" y="310" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="400" fill="#cbd5e1">
        Real-time effects, shaders, and engine tools for games.
      </text>

      <!-- Divider line -->
      <line x1="80" y1="365" x2="800" y2="365" stroke="#364156" stroke-width="1.5" />

      <!-- Key Productions / Shipped credits -->
      <text x="80" y="420" font-family="monospace, -apple-system, sans-serif" font-size="13" font-weight="500" letter-spacing="2" fill="#94a3b8">
        SHIPPED AAA PRODUCTIONS
      </text>
      <text x="80" y="460" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="21" font-weight="600" fill="#ffffff">
        Marvel's Wolverine · Marvel's Spider-Man 2 · Fortnite
      </text>

      <!-- Engine & Tech Stack Pill Bar -->
      <g transform="translate(80, 515)">
        <!-- Stack Text -->
        <text x="0" y="26" font-family="monospace, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#5eb3ab">
          Unreal Engine 5 · Niagara Systems · HLSL Shaders · Houdini Simulation
        </text>
      </g>
    </svg>
  `;

  const finalBuffer = await sharp(bgBuffer)
    .composite([
      {
        input: Buffer.from(svgOverlay),
        top: 0,
        left: 0,
      },
    ])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(imagesDir, "og-main.jpg"));

  console.log("Created og-main.jpg:", finalBuffer);
}

async function generateAboutOG() {
  const width = 1200;
  const height = 630;

  // Avatar path
  const avatarPath = path.join(imagesDir, "Portrait", "avatar.webp");
  
  // Resize avatar to a crisp 340x340
  const avatarBuffer = await sharp(avatarPath)
    .resize(340, 340, { fit: "cover", position: "center" })
    .toBuffer();

  const svgOverlay = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="tealGlowAbout" cx="70%" cy="30%" r="60%">
          <stop offset="0%" stop-color="#5eb3ab" stop-opacity="0.14" />
          <stop offset="100%" stop-color="#1c212c" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Glow -->
      <rect width="${width}" height="${height}" fill="url(#tealGlowAbout)" />

      <!-- Hairline outer border -->
      <rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="none" stroke="#364156" stroke-width="2" />

      <!-- Avatar Box Frame -->
      <rect x="79" y="144" width="342" height="342" rx="20" fill="none" stroke="#5eb3ab" stroke-width="2" stroke-opacity="0.6" />

      <!-- Right Column Details -->
      <text x="470" y="180" font-family="monospace, -apple-system, sans-serif" font-size="13" font-weight="600" letter-spacing="3" fill="#5eb3ab">
        ABOUT · SENIOR VFX ARTIST
      </text>

      <text x="470" y="255" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="64" font-weight="700" fill="#ffffff" letter-spacing="-1">
        Henry Tran
      </text>

      <text x="470" y="320" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#cbd5e1">
        Real-Time VFX, Shaders, and Simulation Pipeline.
      </text>

      <line x1="470" y1="365" x2="1120" y2="365" stroke="#364156" stroke-width="1.5" />

      <!-- Studio & Location Info -->
      <text x="470" y="415" font-family="monospace, -apple-system, sans-serif" font-size="13" font-weight="500" letter-spacing="2" fill="#94a3b8">
        PRODUCTION CREDITS
      </text>
      <text x="470" y="450" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="600" fill="#ffffff">
        Marvel's Wolverine · Spider-Man 2 · Fortnite · New World
      </text>

      <text x="470" y="505" font-family="monospace, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#5eb3ab">
        Ho Chi Minh City, Vietnam · Upwork Top Rated Plus (5.0 ★)
      </text>
    </svg>
  `;

  // Create rounded avatar mask
  const roundedAvatarMask = Buffer.from(
    `<svg width="340" height="340"><rect x="0" y="0" width="340" height="340" rx="18" ry="18" fill="#fff"/></svg>`
  );

  const roundedAvatar = await sharp(avatarBuffer)
    .composite([{ input: roundedAvatarMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const finalBuffer = await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: "#1c212c",
    },
  })
    .composite([
      { input: roundedAvatar, top: 145, left: 80 },
      { input: Buffer.from(svgOverlay), top: 0, left: 0 },
    ])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(imagesDir, "og-about.jpg"));

  console.log("Created og-about.jpg:", finalBuffer);
}

async function generateShowreelOG() {
  const width = 1200;
  const height = 630;

  // Base background from Wolverine Night Assault
  const bgImage = path.join(imagesDir, "hero-wolverine-night-assault.webp");
  
  const bgBuffer = await sharp(bgImage)
    .resize(width, height, { fit: "cover", position: "center" })
    .toBuffer();

  const svgOverlay = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="centerVignette" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#1c212c" stop-opacity="0.5" />
          <stop offset="60%" stop-color="#1c212c" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#1c212c" stop-opacity="0.95" />
        </radialGradient>
      </defs>

      <!-- Vignette -->
      <rect width="${width}" height="${height}" fill="url(#centerVignette)" />

      <!-- Hairline outer border -->
      <rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="none" stroke="#364156" stroke-width="2" />

      <!-- Play Icon in center -->
      <g transform="translate(550, 160)">
        <circle cx="50" cy="50" r="48" fill="#161a23" stroke="#5eb3ab" stroke-width="2.5" fill-opacity="0.85" />
        <polygon points="43,32 68,50 43,68" fill="#5eb3ab" />
      </g>

      <!-- Title -->
      <text x="600" y="340" text-anchor="middle" font-family="monospace, -apple-system, sans-serif" font-size="14" font-weight="600" letter-spacing="4" fill="#5eb3ab">
        VFX SHOWREEL · AAA GAMEPLAY &amp; CINEMATICS
      </text>

      <text x="600" y="420" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="56" font-weight="700" fill="#ffffff" letter-spacing="-1">
        Henry Tran
      </text>

      <text x="600" y="475" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#cbd5e1">
        Featuring Marvel's Wolverine, Spider-Man 2, Fortnite &amp; New World
      </text>

      <text x="600" y="535" text-anchor="middle" font-family="monospace, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94a3b8">
        Watch Online: Unreal Engine 5 · Niagara · HLSL · Houdini
      </text>
    </svg>
  `;

  const finalBuffer = await sharp(bgBuffer)
    .composite([
      {
        input: Buffer.from(svgOverlay),
        top: 0,
        left: 0,
      },
    ])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(imagesDir, "og-showreel.jpg"));

  console.log("Created og-showreel.jpg:", finalBuffer);
}

async function main() {
  await generateMainOG();
  await generateAboutOG();
  await generateShowreelOG();
  console.log("All OpenGraph cards generated successfully!");
}

main().catch(console.error);
