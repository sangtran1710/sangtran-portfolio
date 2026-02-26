# AGENTS.md

## Cursor Cloud specific instructions

This is a **Next.js 14** portfolio website (`sangtran-portfolio-v2`). It is a single-service, zero-backend app — all content is static data in `data/portfolio.ts`.

### Quick reference

| Action | Command |
|--------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (port 3000) |
| Lint | `npm run lint` |
| Build | `npm run build` |

See `README.md` for full project structure.

### Non-obvious caveats

- **ESLint setup**: The repo ships without an `.eslintrc.json`. For `npm run lint` to work non-interactively, create `.eslintrc.json` with `{"extends": "next/core-web-vitals"}` and install `eslint@^8` + `eslint-config-next@^14` as dev dependencies. The `next lint` command in Next.js 14 is incompatible with ESLint v9.
- **No env vars required**: The app runs without any environment variables. `NEXT_PUBLIC_SITE_URL` is optional (used only for OG metadata).
- **No database or external services**: Everything is self-contained. The dev server is the only service needed.
