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

