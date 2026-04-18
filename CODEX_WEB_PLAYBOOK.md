# Codex Web Playbook

This playbook is the default workflow for building and polishing this portfolio with Codex.

It is designed around four constraints in this repo:

1. `DESIGN.md` defines the visual language.
2. `npm run dev` is the main iteration loop.
3. `npm run qa:screenshots` is the UI review gate.
4. `npm run verify` is the clean handoff gate.

## 1. Core Principle

Use Codex as a design pair, implementation partner, and QA assistant, not just a code generator.

The working loop is:

`brief -> inspect -> edit -> review localhost -> screenshot QA -> clean verify -> handoff`

## 2. Before Starting Any Task

Run:

```bash
git status --short
```

Rules:

- Never overwrite unrelated user changes.
- If the task touches UI, read `DESIGN.md` first.
- Define the page and scope clearly before editing.

Good task framing examples:

- "Refine the homepage hero hierarchy and CTA behavior."
- "Fix portfolio card spacing and keep body copy outside thumbnails."
- "Polish the showreel page while preserving the PlayStation-inspired visual system."

## 3. The Standard UI Workflow

### Step 1. Start the live loop

Run:

```bash
npm run dev
```

Then open `http://localhost:3000` in Codex.

Use Codex to inspect the real page, not just the source files.

### Step 2. Give a focused visual brief

Good prompts are concrete and visual:

```text
Open localhost and review the /portfolio first card.
Keep the PlayStation-inspired direction from DESIGN.md.
Focus on hierarchy, spacing, copy/image separation, and hover behavior.
Implement the fix, then re-check the page visually.
```

Prefer this over vague prompts like:

```text
make it better
```

### Step 3. Iterate in the browser loop

For each pass, check:

- headline weight and hierarchy
- spacing rhythm
- card density
- image and text separation
- CTA hover/focus behavior
- desktop and mobile behavior
- whether the page still feels like this site's design system

### Step 4. Keep comments directional

Comment on the page with short, specific instructions:

- "This headline feels too heavy. Return to quiet authority."
- "The CTA hover is missing the signature lift/ring behavior."
- "This card is too crowded. Reduce supporting copy or add breathing room."
- "The project summary is drifting into the thumbnail area."

## 4. Non-UI Workflow

If the task is mostly content, structure, or logic:

1. Inspect the target page or component.
2. Edit the code.
3. Open localhost and confirm the result still fits the layout.
4. If the change affected visible UI, still run screenshot QA before handoff.

## 5. Screenshot QA Gate

For any UI, layout, spacing, card, or typography change, run:

```bash
npm run qa:screenshots
```

Review outputs in:

`test-results/ui-screenshots/`

Look for:

- text overlaying thumbnails
- weak contrast
- crowded spacing
- broken mobile composition
- hero sections that lost visual focus
- cards that no longer feel consistent with the rest of the site

If the screenshots look wrong, simplify the UI before moving on.

## 6. Clean Verification Gate

Never run `npm run build` directly while `npm run dev` is using port `3000`.

When ready to hand off:

1. Stop the dev server.
2. Run:

```bash
npm run verify
```

This script:

- runs lint with zero warnings allowed
- removes stale `.next`
- performs a clean build
- fails if the build prints warnings

This is the only valid final verification command for this repo.

## 7. Handoff Checklist

Before finishing a task, confirm:

- the page was reviewed on localhost
- `DESIGN.md` was followed for UI work
- `npm run qa:screenshots` was run for UI changes
- screenshots in `test-results/ui-screenshots/` were reviewed
- `npm run verify` passed
- lint/build completed with zero warnings
- no generated cache or output files are left as meaningful changes

## 8. Prompt Templates

### UI polish

```text
Review localhost for [route].
Keep the PlayStation-inspired system from DESIGN.md.
Focus on [hierarchy / spacing / cards / CTA / mobile].
Make the changes, then visually re-check the result before handoff.
Run screenshot QA if the change affects visible UI.
```

### Component rewrite

```text
Refactor [component/file] without breaking the current design language.
Preserve the overall visual identity from DESIGN.md.
After editing, inspect the result on localhost and flag any visual regressions.
```

### Handoff prompt

```text
Before handoff, stop dev if needed, run npm run qa:screenshots for UI changes,
review the generated screenshots, then run npm run verify.
Report whether lint/build passed with zero warnings.
```

## 9. Anti-Patterns

Do not:

- judge UI only from JSX or CSS without checking localhost
- skip `DESIGN.md` for visual changes
- run `npm run build` while `npm run dev` is active on port `3000`
- hand off after "looks good to me" without screenshot QA
- ignore warnings during verification
- leave `.next`, logs, or test output as accidental changes

## 10. Repo-Specific Mindset

This project is not trying to be generic SaaS UI.

Every meaningful frontend change should preserve:

- calm premium hierarchy
- strong surface contrast
- deliberate spacing
- product-forward composition
- clear interaction states

If a change makes the site feel more generic, noisier, or denser, treat that as a regression.
