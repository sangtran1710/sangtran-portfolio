# Studio Slate Design System (Anti-Slop Edition)
*Crafted for Henry Tran — Senior VFX Artist*  
*Standardized via Impeccable (`pbakaus/impeccable`)*

---

## 1. Executive Philosophy: Visual-First, Zero AI Slop

The website (`sangtran-portfolio-website`) is the high-end professional showcase of **Henry Tran**, a Senior VFX Artist with AAA production credits on *Marvel's Wolverine*, *Marvel's Spider-Man 2*, and *Fortnite*.

### Core Aesthetic: Studio Slate (`#0d1015`)
Inspired by industry benchmarks like `proceduralpixels.com` and modern AAA pipeline tool interfaces:
- **Calm, Disciplined Authority**: The interface never screams for attention with garish gradients or decorative fluff.
- **Content-Forward**: High-fidelity gameplay VFX, Niagara systems, HLSL shader passes, and simulation breakdowns do 100% of the emotional and visual heavy lifting. The UI chrome is disciplined, quiet, and razor-sharp.
- **Zero AI Clichés**: Every visual decision is intentional. The design strictly rejects generic AI templates ("AI slop") characterized by excessive cards-in-cards, purple gradients, pill tag spam, and decorative widgets.

---

## 2. The 7 Strict Anti-Slop Laws (Enforced via Impeccable)

Every AI coding agent modifying this codebase MUST respect these 7 laws:

### 1. NO "Cards-in-Cards" Nesting
- ❌ **Anti-pattern**: Placing an image inside a heavy gray container, which is itself placed inside a bordered card box (`bg-[#171d24] border border-[#252c34] p-4`).
- ✅ **Standard**: The visual asset (image or video) sits directly on the slate canvas or elevated surface, framed only by a crisp hairline border (`border-[#252c34]/70`). Typography and metadata flow cleanly underneath without outer padding boxes.

### 2. NO Stacked Hover Effects
- ❌ **Anti-pattern**: Combining card lift, drop shadow, teal glow, image zoom, border tint, and title tint on hover, or floating corner icons over thumbnails.
- ✅ **Standard**: Keep a single quiet hover response—preview video playback on project cards and underline on text links. No image scaling, no teal glow, no card lift.

### 3. NO Tag Pill Spam
- ❌ **Anti-pattern**: Enclosing every engine tool or shader name in individual rounded pill boxes (`rounded border border-[#252c34] bg-[#12171d] px-2 py-0.5`).
- ✅ **Standard**: Use clean, elegant inline dot-separated strings in monospace font:
  ```tsx
  {project.tools.slice(0, 3).join(" · ")}
  // Renders: Unreal Engine 5 · Niagara · HLSL
  ```

### 4. NO Side-Tab / Colored Callout Borders
- ❌ **Anti-pattern**: `border-l-2 border-primary` or thick colored left borders on cards, blockquotes, and notices (the universal hallmark of AI markdown templates).
- ✅ **Standard**: Use hairline 4-sided borders (`border border-[#252c34] bg-[#12171d] rounded-lg px-4 py-3`).

### 5. NO Gimmick Widgets
- ❌ **Anti-pattern**: Lo-Fi vinyl audio players, 2D HTML canvas motes/particles floating on the hero, decorative floating back-to-top buttons.
- ✅ **Standard**: No audio players, no synthetic canvas motes. If atmospheric motion is needed, use real production VFX video footage or authentic game keyframes.

### 6. NO Redundant Text Repetition
- ❌ **Anti-pattern**: Listing `Marvel's Wolverine · Spider-Man 2 · Fortnite` 3 times within 1 screen height (in hero text, then in spec bar, then on the cards below).
- ✅ **Standard**: Each section provides distinct, non-overlapping value:
  - Hero: Name, Role (`Senior VFX Artist`), concise bio.
  - Colophon Spec Bar: High-level capabilities (`Production Focus: AAA Games · In-Engine Cinematics`).
  - Featured Cards: The actual project titles and breakdowns.

### 7. NO Flashbang Light-Theme Inconsistencies
- ❌ **Anti-pattern**: Mixing dark slate with cream/white theme pages (such as old `/about` cards).
- ✅ **Standard**: 100% of routes (`/`, `/portfolio`, `/showreel`, `/articles`, `/about`, `/contact`, `/projects/*`) live in the unified Studio Slate palette.

---

## 3. Design Tokens & Palette

### Surfaces & Backgrounds
| Token | Hex Value | Usage |
|---|---|---|
| **Base Slate** | `#0d1015` | Global body canvas, hero backgrounds, cinema backdrop |
| **Elevated Slate** | `#12171d` | Card wells, thumbnail containers, code blocks, secondary sections |
| **Surface Accent** | `#171d24` | Interactive button resting states, subtle container fills |
| **Hairline Border** | `#252c34` | Primary structural borders, table lines, dividers (opacity 50-70%) |
| **Hover Border** | `#38424d` | Hover state for interactive cards and buttons |

### Accent, Controls & Radii
| Token | Value | Usage |
|---|---|---|
| **Studio Teal** | `#58cfc8` | Primary solid CTA (max 1 per screen), active tab underline |
| **Teal Hover** | `#70ddd6` | Hover fill on primary solid CTA |
| **Control Radius** | `6px` (`rounded-md`) | Buttons, segmented controls, interactive tabs |
| **Media Radius** | `12px` (`rounded-xl`) | Video players, project thumbnails, portraits |

### Typography & Scale (Inter Only)
5-step scale — nothing rendered below `13px`:
| Step | Size | Usage |
|---|---|---|
| **Display** | `72px` (`text-4xl sm:text-7xl`) | Hero name, page titles |
| **Section** | `36px` (`text-4xl`) | Section headings, primary email CTA |
| **Card / Sub** | `20px` (`text-xl`) | Card titles, subheadings |
| **Body** | `16px` (`text-base`) | Paragraphs, descriptions, list items |
| **Meta** | `13px` (`text-[13px]`) | Years, categories, read times (muted, placed after title/byline) |

Reserve monospace (`font-mono`) strictly for code and shader snippets. Do not use teal kickers above headings. Separate sections using background tone steps (`#0d1015` vs `#12171d`), keeping hairline dividers for real lists only.

---

## 4. Key Page Layout Patterns

### A. Homepage (`/`)
- **Hero**: `Henry Tran` display title in Inter, `Senior VFX Artist` subtitle, one solid teal CTA (`Selected work`), one underlined text link (`Showreel`).
- **Selected Work**: 1 featured wide card + 2-column supporting row, hover plays preview video only.
- **Technical Spotlight**: Left-hand comparison/step viewer + right-hand clickable 3-pass breakdown list.
- **About Me**: Frameless two-column editorial block (portrait + two `18px` sentences on the left, two-line `16px` credits list on the right, large `28–36px` email CTA).

### B. Showreel Page (`/showreel`)
- **Cinema Theater Model**: Video-first layout using native player controls once started, accurate resolution/FPS label matching the local file alongside the YouTube 4K link, and 4 clickable keyframe jump cards below.

### C. About Page (`/about`)
- Unified `#0d1015` dark slate without nested boxes or skill pill tags.
- Experience timeline, credits, endorsements, plain-text skill list, and unframed studio photos.

### D. R&D / Earlier Work (`/portfolio#rnd`)
- 16:9 thumbnail cards (`12px` radius) with title + muted category below, plus a text toggle for earlier commercial archive work.

---

## 5. Automated Verification Checklist

Before committing or handing off any frontend code:
1. **Lint Check**: Run `npm run lint` — must pass with **0 warnings, 0 errors** (`--max-warnings=0`).
2. **Impeccable Anti-Pattern Detection**:
   ```bash
   npx impeccable detect app components
   ```
   Must report `0 anti-patterns found`.
3. **Screenshot Self-Verification**: For visual changes, run Playwright QA tests to verify screenshots under `test-results/ui-screenshots/`.
4. **Git Hygiene**: Run `git status --short` to ensure no temporary scratch or cache files remain untracked.

## Current content policy

The published portfolio is English-only. Vietnamese copy remains as source material; no language switch is currently offered. Design tokens in `app/globals.css` are the implementation source of truth.

## Typography and editorial update

Use Inter for portfolio headings, navigation, body copy and metadata. Reserve monospace for actual code and shader examples. Do not use uppercase metadata strips or credit badges on thumbnails. Credit sources belong on the project detail page.

Write with a measured editorial voice. Headlines can be evocative; descriptions stay specific and personal. Keep action labels short. Do not use dash punctuation to interrupt sentences. Preserve punctuation in official project names and credits.
