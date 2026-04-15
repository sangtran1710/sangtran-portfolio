# ShaderLex

ShaderLex is a standalone learning site for:

- shader study with markdown notes
- randomized active recall sessions
- technical English practice for interviews and production communication
- local progress tracking

This app lives separately from the portfolio so it can be deployed on its own domain or subdomain and linked from the main site later.

## Current MVP Scope

- `Knowledge Vault`: markdown lessons from `content/lessons`
- `Challenge Engine`: question banks from `content/quizzes`
- `Answer Scanner`: backend-scored multiple-choice submission endpoint at `app/api/quiz/submit/route.ts`
- `Learning Progress`: localStorage dashboard at `/progress`

## Routes

- `/`: product landing page
- `/learn`: library overview
- `/learn/[topic]`: topic hub
- `/learn/[topic]/[slug]`: lesson page
- `/practice`: practice overview
- `/practice/[topic]`: randomized session
- `/progress`: local progress dashboard

## Local Content

Add new lessons here:

- `content/lessons/shaders/*.md`
- `content/lessons/english/*.md`

Add or expand question banks here:

- `content/quizzes/shaders.json`
- `content/quizzes/english.json`

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build Checks

```bash
npm run lint
npm run build
```

## Optional Env

- `NEXT_PUBLIC_SITE_URL` for sitemap/metadata base URL

## Next Step

When the product direction feels right, deploy this app separately and add a single link from the portfolio navbar or blog ecosystem instead of mixing both codebases.
