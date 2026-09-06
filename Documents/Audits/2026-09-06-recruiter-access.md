# Recruiter access audit — 2026-09-06

Scope: source and content review, previously inspected live pages, and existing local Playwright suite. No application code or public website changed.

## High priority

1. `data/portfolio.ts:59`: resume points to a Drive folder. Serve a versioned, current PDF through one direct Resume link. Verify anonymously.
2. `data/portfolio.ts:121,133,143`: employment dates differ from latest CV. Align to user-confirmed timeline. Also reconcile `lib/portfolio-content.ts` translations and `lib/i18n.ts:86` experience claim.
3. `data/portfolio.ts:211,222`: Fortnite period and live-event contributions conflict with latest cinematic-only CV. New World similarly contains additional contribution claims. Do not infer replacements; use confirmed scope.
4. `app/page.tsx`: Home renders Hero, FeaturedProjects, Profile, Contact only. `FeaturedProjects.tsx` shows first three AAA items. Add selected technical evidence near the top: Erlangmon, Blender mesh tool, then published storm/transformation if available.
5. `content/blog/mobile-vfx-optimization.mdx:27`: channel packing is incorrectly described as reducing texture draw calls. Describe texture sampling accurately and qualify memory/compression claims.

## Medium priority

6. `components/home/ShowreelSection.tsx`: no native controls or custom seek/time/fullscreen controls; overlay only appears on hover. Add accessible seeking, elapsed/duration and visible touch/focus controls. Include a shot contribution list below the reel.
7. `components/projects/ProjectCard.tsx`: uses client before role in the subtitle. Recruiter needs personal contribution and engine, not only publisher identity.
8. `data/portfolio.ts:87`: explicit remote availability/technical leadership copy conflicts with user's preference for discreet job search. Use neutral role description publicly; availability belongs in the application.
9. Havoc page lacks the implementation evidence claimed in CV. Add short gameplay capture and exact responsibility if publishable.
10. Separate educational notes from measured case studies. Overdraw article does not establish locked 60 FPS for a particular production scene. A measured storm case would be stronger evidence.

## Proposed information architecture

Home: concise identity + Showreel / Technical breakdowns / Resume → 2 technical cases → selected AAA contributions → brief profile/contact.

Work: selected real-time work first; broader motion/AI/video archive retained below.

Case template: final result → personal role and provided assets → one implementation decision → evidence of validation → limits/next steps. No fabricated measurements or confidential assets.

## Maintenance

English data and Vietnamese overrides duplicate claims. Consolidate structured dates, roles and project scope into one source; translations should only change prose. DESIGN.md mixes a Sony reference with portfolio-specific overrides; preserve the portfolio-specific dark, readable approach instead of mechanically applying retail-site styling.

## Acceptance criteria for update

- CV opens directly and matches confirmed experience on About/project pages.
- Home links directly to UE and tool evidence.
- Reel is seekable on mobile and keyboard; shot ownership is legible.
- No unsupported shipped, platform-performance or client-work claims.
- Run `npm run verify` and full `npx playwright test`; inspect desktop/mobile screenshots.
