# AI Agent Rule: Clean Handoff

Apply this rule before handing work back to the user.

1. Check the worktree first with `git status --short`. Never overwrite or revert unrelated user changes.
2. Do not run `npm run build` while `npm run dev` is running on `localhost:3000`. A production build rewrites `.next` and can corrupt the active dev server with errors like `Cannot find module './948.js'`.
3. Use `npm run verify` for final verification. This stops agents from building over an active dev server, runs lint non-interactively, removes stale `.next`, runs a fresh build, and fails if the build prints warnings.
4. For UI, layout, typography, card, spacing, or visual-design changes, read `DESIGN.md` first and ALWAYS run Playwright QA (`npm run qa:screenshots`) automatically after making changes. Review the generated screenshots under `test-results/ui-screenshots/` to self-verify before handoff.
5. Treat every build warning as a failure. Fix the warning or clearly report the blocker instead of saying the build is clean.
6. If a browser shows a `.next/server/... Cannot find module` error after verification, stop the dev server, delete `.next`, then restart with `npm run dev`.
7. Do not leave generated cache/output files staged or modified. `.next`, `out`, coverage, test reports, logs, and temp files must stay ignored.
8. Final response must include what changed, the exact verification command, and whether lint/build passed with zero warnings. For UI work, always verify that Playwright screenshot QA passed and where the screenshots were generated.
9. **Automated QA Requirement**: Every time any task is finished, the agent must run the E2E Playwright tests and self-verify the site's layout/functionality rather than asking the user to manually verify.
10. **Zero AI-Slop & Impeccable Quality Gate**: All UI work must strictly follow the Studio Slate design system in `DESIGN.md`. Before handoff, run `npx impeccable detect app components` to guarantee 0 anti-pattern detections (no cards-in-cards nesting, no corner icon overlays, no tag pill spam, no colored side-tabs, no gimmick widgets, no flashbang light themes).

---

# Recurring Pitfalls & Mandatory Fixes (Read Before Editing UI, Media, or Routes)

1. **iOS Safari / WebKit `<button>` Overlap Bug**:
   - Tailwind v3 Preflight sets `-webkit-appearance: button` on `[type="button"]`. Never combine `<button>` with `flex items-baseline` — on iOS Safari this draws a misaligned native button box cutting through text (e.g., `Tangent Normal` / `Right` overlap).
   - Keep the global `button, [type="button"], [type="reset"], [type="submit"] { -webkit-appearance: none; appearance: none; -webkit-tap-highlight-color: transparent; }` reset in `app/globals.css`. Use `items-center` or `items-start` on flex buttons and explicit `appearance-none bg-transparent` on borderless row buttons.

2. **Page-Transition Popping & Scroll-Flyback**:
   - **Never** add `scroll-behavior: smooth` to `html` in `app/globals.css`. Next.js App Router's scroll reset on route change will animate from the old scroll offset while the new page is already mounted, causing a visible jump/pop. Use explicit `window.scrollTo({ top: 0, behavior: "smooth" })` only in `ScrollToTop.tsx`.
   - In `components/layout/PageTransitionWrapper.tsx`, skip the initial mount/hydration (`isFirstMount` guard) so SSR pages do not flash/re-pop on hydrate, and animate route changes smoothly from `opacity: 0, translateY(4px)` (`220ms`, `cubic-bezier(0.16, 1, 0.3, 1)`), never from `opacity: 0.55`.
   - Keep `flex min-h-screen flex-col` on `<body>` and `flex-1` on `<main>` in `app/layout.tsx` so `<Footer />` stays anchored at the bottom on shorter routes (`/showreel`, `/contact`).

3. **Mobile (`390×844`) Layout, Touch Targets & SVG Annotations**:
   - Interactive controls (menu button, tabs, toggles, action links, social links) must have at least `min-h-11` (`44px`; `min-h-10` / `40px` minimum for dense filter pills) and zero horizontal overflow (`scrollWidth <= innerWidth`).
   - Never use `grid-cols-2` below `640px` (`sm:`) for titled cards (`/showreel` shots, `Earlier work` archive) — narrow `~155px` columns truncate AAA titles. Use `grid-cols-1` on `<640px`.
   - Keep SVG annotation labels readable on mobile (`fontSize >= 17` in `540×540` viewBoxes) and position right-side labels (`x >= 280`) clear of the `50%` wipe line and top corner badges.
   - Every Radix `SheetContent` / `DialogContent` must include a `<SheetTitle>` / `<DialogTitle>` (`className="sr-only"` if visually hidden) to prevent console warnings.

4. **Media, Cloudflare R2 & Poster Hygiene**:
   - Route all `.mp4`/`.webm` video `src` attributes through `mediaUrl()` from `lib/media.ts` (backed by Cloudflare R2 `NEXT_PUBLIC_MEDIA_BASE_URL`, sanitized against accidental `Value:` prefixes/whitespace).
   - Never render `<video>` thumbnails in card grids without a static `.jpg`/`.webp` `poster` (or use a static `<Image>` thumbnail) so cards never render as black rectangles prior to hover.
   - Verify live video playback checks `readyState >= 3`, `error === null`, and HTTP `200`/`206` from R2.

5. **Content & Visual Consistency**:
   - When removing an article/route, delete the `.mdx` file, any `next.config.mjs` redirects, unused `MDXRemote` component bindings, and E2E test references rather than only filtering it out in UI lists.
   - For editorial VFX Studies sketches (`public/assets/blog/sketches/`), use zero-text Wacom quick-doodle style on flat `#11141B` background rather than staged physical notebook mockups or AI-rendered text.

6. **Pre-Push Verification**:
   - Always run `npx tsc --noEmit` and `npm run lint` (`eslint . --max-warnings=0`) after edits before committing/pushing to `origin/master`.

