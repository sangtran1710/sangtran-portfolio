# Studio Slate Design System (Anti-Slop Edition)
*Crafted for Henry Tran — Senior VFX Artist*  
*Standardized via Impeccable (`pbakaus/impeccable`)*

---

## 1. Executive Philosophy: Visual-First, Zero AI Slop

The website (`sangtran-portfolio-website`) is the high-end professional showcase of **Henry Tran**, a Senior VFX Artist with AAA production credits on *Marvel's Wolverine*, *Marvel's Spider-Man 2*, and *Fortnite*.

### Core Aesthetic: Studio Slate (`#1c212c`)
Inspired by industry benchmarks like `proceduralpixels.com` and modern AAA pipeline tool interfaces:
- **Calm, Disciplined Authority**: The interface never screams for attention with garish gradients or decorative fluff.
- **Content-Forward**: High-fidelity gameplay VFX, Niagara systems, HLSL shader passes, and simulation breakdowns do 100% of the emotional and visual heavy lifting. The UI chrome is disciplined, quiet, and razor-sharp.
- **Zero AI Clichés**: Every visual decision is intentional. The design strictly rejects generic AI templates ("AI slop") characterized by excessive cards-in-cards, purple gradients, pill tag spam, and decorative widgets.

---

## 2. The 7 Strict Anti-Slop Laws (Enforced via Impeccable)

Every AI coding agent modifying this codebase MUST respect these 7 laws:

### 1. NO "Cards-in-Cards" Nesting
- ❌ **Anti-pattern**: Placing an image inside a heavy gray container, which is itself placed inside a bordered card box (`bg-[#232a38] border border-[#364156] p-4`).
- ✅ **Standard**: The visual asset (image or video) sits directly on the slate canvas or elevated surface, framed only by a crisp hairline border (`border-[#364156]/70`). Typography and metadata flow cleanly underneath without outer padding boxes.

### 2. NO Corner Icon Overlays
- ❌ **Anti-pattern**: Floating a square black button with an `ArrowUpRight` or play icon over the top-right corner of video/image thumbnails on hover.
- ✅ **Standard**: Hover feedback is expressed through gentle image scale (`scale-[1.02]`), hairline border color shift (`group-hover:border-[#5eb3ab]/60`), and title color transition (`group-hover:text-[#5eb3ab]`).

### 3. NO Tag Pill Spam
- ❌ **Anti-pattern**: Enclosing every engine tool or shader name in individual rounded pill boxes (`rounded border border-[#364156] bg-[#161a23] px-2 py-0.5`).
- ✅ **Standard**: Use clean, elegant inline dot-separated strings in monospace font:
  ```tsx
  {project.tools.slice(0, 3).join(" · ")}
  // Renders: Unreal Engine 5 · Niagara · HLSL
  ```

### 4. NO Side-Tab / Colored Callout Borders
- ❌ **Anti-pattern**: `border-l-2 border-primary` or thick colored left borders on cards, blockquotes, and notices (the universal hallmark of AI markdown templates).
- ✅ **Standard**: Use hairline 4-sided borders (`border border-[#364156] bg-[#161a23] rounded-lg px-4 py-3`).

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
| **Base Slate** | `#1c212c` | Global body canvas, hero backgrounds, cinema backdrop |
| **Elevated Slate** | `#161a23` | Card wells, thumbnail containers, code blocks, secondary sections |
| **Surface Accent** | `#232a38` | Interactive button resting states, subtle container fills |
| **Hairline Border** | `#364156` | Primary structural borders, table lines, dividers (opacity 50-70%) |
| **Hover Border** | `#4b5a75` | Hover state for interactive cards and buttons |

### Accent & Highlights
| Token | Hex Value | Usage |
|---|---|---|
| **Studio Teal** | `#5eb3ab` | Primary kicker text, active tab indicators, timeline dots, primary buttons |
| **Teal Hover** | `#72c2ba` | Hover fill on primary buttons and active link text |
| **Teal Glow** | `rgba(94, 179, 171, 0.12)` | Understated radial backdrop glow behind hero / showreel |

### Typography & Text
| Token | Value | Tailwind Class | Usage |
|---|---|---|---|
| **Display Headings** | Kanit (`font-kanit`) | `text-4xl sm:text-5xl font-kanit font-normal` | Page titles, hero name, section headlines |
| **Body Primary** | Inter / System Sans | `text-slate-200` / `text-white` | Body paragraphs, primary labels |
| **Body Secondary** | Inter / System Sans | `text-slate-300` / `text-slate-400` | Subtitles, project descriptions, quotes |
| **Tech Metadata** | Monospace (`font-mono`) | `text-xs font-mono uppercase tracking-[0.16em]` | Kickers, categories, tool stacks, dates |

---

## 4. Key Page Layout Patterns

### A. Homepage (`/`)
- **Hero**: Clean `Senior VFX Artist` kicker, `Henry Tran` display title in Kanit, 1-line bio, two clear CTAs (`Selected work →`, `Technical breakdown →`).
- **Spec Sheet Colophon**: 4-column studio colophon directly under hero:
  - `Discipline`: Real-Time VFX · Shaders · Tech Art
  - `Core Engine Stack`: Unreal Engine 5 · Niagara · HLSL · Houdini
  - `Production Focus`: AAA Games · In-Engine Cinematics
  - `Pipeline & Systems`: Perforce Tooling · GPU Optimization · Python
- **Featured Work**: Flat cards featuring *Marvel's Wolverine*, *Marvel's Spider-Man 2*, and *Fortnite*.

### B. Showreel Page (`/showreel`)
- **Cinema Theater Model**: Video-first layout with zero paragraph bloat.
- **Stage Backlight**: Subtle teal-slate radial ambient glow behind the player.
- **Keyframe Scrubber**: 4 crisp thumbnail keyframes below player (`00:00 Fortnite`, `00:14 Wolverine`, `00:24 New World`, `00:32 Wetness Shader`) that allow direct seeking with a single click.

### C. About Page (`/about`)
- Fully integrated in `#1c212c` dark slate.
- Profile header in `#161a23`/60 with hairline `#364156` border.
- Experience Timeline uses hairline connector lines and `#5eb3ab` glowing indicator dots.
- Upwork verified endorsement and AAA production credits in clean slate cards.

### D. R&D / Stylized Projects (`/portfolio#rnd`)
- Flat visual cards matching `ProjectCard`: 16:9 thumbnail, uppercase teal category, title with hover transition, inline tool stack.
- Collapsible archive accordion for earlier commercial and motion graphics work.

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
